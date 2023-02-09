import * as React from 'react'
import Paper from '@mui/material/Paper'
import { styled, alpha } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { searchGithubUsers } from '../../apis/profile.api'
import { GithubUser } from '../../types/profile'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100ch'
    }
  }
}))
interface Column {
  id: 'id' | 'login' | 'avatar_url' | 'html_url' | 'public_repos' | 'followers' | 'action'
  label: string
  minWidth?: number
  align?: 'center'
  format?: (value: string | number) => void
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 120 },
  { id: 'login', label: 'Name', minWidth: 100 },
  {
    id: 'avatar_url',
    label: 'Avatar',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'html_url',
    label: 'Link Github',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'public_repos',
    label: 'Public Repos',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'followers',
    label: 'Followers',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
]

interface Data {
  id: number
  login: string
  avatar_url: string
  html_url: string
  public_repos: string
  followers: number
  action: () => void
}

function createData(
  id: number,
  login: string,
  avatar_url: string,
  html_url: string,
  public_repos: string,
  followers: number,
  action: () => void
): Data {
  return { id, login, avatar_url, html_url, public_repos, followers, action }
}

interface GithubUsersData {
  total_count: number
  items: Data[]
}
export default function StickyHeadTable() {
  const [query, setQuery] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const queryClient = useQueryClient()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: [{ q: query, page: page, per_page: rowsPerPage }],
    queryFn: () => {
      return searchGithubUsers(query, page, rowsPerPage)
    },
    staleTime: 5 * 1000,
    keepPreviousData: true,
    retry: 0
  })

  let rows = []
  if (data && data?.data.items) {
    rows = data?.data.items.map((item: GithubUser, index: number) =>
      createData(index + 1, item.login, item.avatar_url, item.html_url, item.public_repos, item.followers, item.action)
    )
  }

  return (
    <>
      <Search sx={{ width: '100%' }} className='mb-3 shadow-sm'>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Enter github user...'
          inputProps={{ 'aria-label': 'search' }}
          type='text'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Search>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'string' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}
