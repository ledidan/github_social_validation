import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import { findGithubUserProfile, likeGithubUser, searchGithubUsers } from '../../apis/profile.api'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { useQueryString } from '../../utils/utils'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { GitUser } from '../../types/profile'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite } from '../../app/reducer/gitUsers.slice'

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

export default function () {
  const [userProfile, setUserProfile] = React.useState<GitUser | any>()
  const [query, setQuery] = React.useState('')
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [favorite, setFavorite] = React.useState(false)
  const [profileIsOpen, setProfileIsOpen] = React.useState(false)

  const favorites = useSelector((state: any) => state.favorite_github_users)

  const dispatch = useDispatch()
  const queryString: { page?: string | number } = useQueryString()
  const page = Number(queryString.page) || 1
  // Handle Profile Dialog
  const handleProfileOpen = () => {
    setProfileIsOpen(true)
  }
  React.useEffect(() => {
    localStorage.setItem('favorite_github_users', JSON.stringify(favorites))
  }, [])

  const handleProfileClose = () => {
    setProfileIsOpen(false)
  }
  const queryClient = useQueryClient()

  const userGitQuery = useQuery({
    // queryKey: [{ q: query, page: page, per_page: rowsPerPage }],
    queryKey: ['dashboard', query, page, rowsPerPage],
    queryFn: () => {
      // return searchGithubUsers(query, page, rowsPerPage)
      const controller = new AbortController()
      const signal = controller.signal as any

      setTimeout(() => {
        controller.abort()
      }, 5000)
      return searchGithubUsers(query, page, rowsPerPage, signal)
    },
    staleTime: 3 * 1000,
    keepPreviousData: true,
    retry: 0
  })

  const handlePrefetchGitUser = async (id: number) => {
    const profileUser = await queryClient.fetchQuery(['dashboard', String(id)], {
      queryFn: () => findGithubUserProfile(id),
      staleTime: 10 * 1000
    })
    setUserProfile(profileUser)
  }

  const totalUser = Number(userGitQuery.data?.data.total_count) || 0
  const totalPage = Math.ceil(totalUser / rowsPerPage)
  const likeUserMutation = useMutation({
    mutationFn: (id: number) => {
      return likeGithubUser(`${id}`)
    },
    onSuccess: (_, id) => {
      toast.success(`You liked Github User: ${id}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: 'light'
      })
      queryClient.invalidateQueries({
        queryKey: ['dashboard', query, page, rowsPerPage],
        exact: true
      })
      const existingData = JSON.parse(localStorage.getItem('favorite_github_users') || '[]')
      const newData = Array.isArray(existingData) ? [...existingData, id] : [id]
      localStorage.setItem('favorite_github_users', JSON.stringify(newData))
      dispatch(addToFavorite(id))
    }
  })

  const handleClick = async (id: number) => {
    setFavorite(true)
    return likeUserMutation.mutate(id)
  }

  return (
    <>
      <ToastContainer />
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
      <div className='relative mt-6 overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700  dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                ID
              </th>
              <th scope='col' className='py-3 px-6'>
                Profile
              </th>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Favorite
              </th>
            </tr>
          </thead>
          <tbody>
            {userGitQuery.data?.data.items.map((user: any, index: number) => (
              <tr key={index} className='border-b bg-white hover:bg-gray-50 dark:border-gray-800'>
                <td className='py-3 px-6'>{user.id}</td>
                <td className='py-3 px-6'>
                  <a
                    onClick={handleProfileOpen}
                    className='mr-5 cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    <img
                      src={user.avatar_url}
                      alt='github user'
                      className='h-12 w-12'
                      onMouseEnter={() => handlePrefetchGitUser(user.id)}
                    />
                  </a>
                </td>
                <td className='whitespace-nowrap  py-4 px-6 font-medium text-gray-900 dark:text-gray-700'>
                  {user.login}
                </td>
                <td className='py-3 px-6'>
                  <button onClick={() => handleClick(user.id)}>
                    {/* <FavoriteBorderIcon color='primary' /> */} {favorite ? 'liked' : 'like'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-6 flex justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing
            <span className=' m-1 font-medium'>{totalPage >= 1 ? rowsPerPage : 0}</span>
            of
            <span className=' m-1 font-medium'>{totalPage}</span>
            results
          </p>
        </div>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              {page === 1 ? (
                <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '>
                  Previous
                </span>
              ) : (
                <Link
                  to={`/dashboard?page=${page - 1}`}
                  className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                >
                  Previous
                </Link>
              )}
            </li>
            {Array.from({ length: totalPage > 10 ? 10 : totalPage }, (_, index) => {
              const pageNumber = index + 1
              const isActive = page === pageNumber
              return (
                <li key={pageNumber}>
                  <Link
                    className={classNames(
                      'border border-gray-300 py-2 px-3 leading-tight  hover:bg-gray-100 hover:text-gray-700',
                      {
                        'bg-gray-300 text-gray-700': isActive,
                        'bg-white text-gray-500': !isActive
                      }
                    )}
                    to={`/dashboard?page=${pageNumber}`}
                  >
                    {pageNumber}
                  </Link>
                </li>
              )
            })}
            {totalPage > 10 && (
              <li>
                <span className='border border-gray-300 py-2 px-3 leading-tight  hover:bg-gray-100 hover:text-gray-700'>
                  ...
                </span>
              </li>
            )}
            {page !== totalPage ? (
              <li>
                <Link
                  to={`/dashboard?page=${page + 1}`}
                  className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  Next
                </Link>
              </li>
            ) : (
              <li>
                <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700   dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Next
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <Dialog
        open={profileIsOpen}
        onClose={handleProfileOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Github Profile'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700  dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    ID
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Profile
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Public Repos
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Favorite
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700  '>
                  <td className='py-3 px-6'>{userProfile?.data.id}</td>
                  <td className='py-3 px-6'>
                    <Link
                      target='_blank'
                      to={`${userProfile?.data.html_url}`}
                      onClick={handleProfileOpen}
                      className='mr-5 cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      <img src={userProfile?.data.avatar_url} alt='github user' className='h-12 w-12' />
                    </Link>
                  </td>
                  <th scope='row' className='whitespace-nowrap  py-4 px-6 font-medium text-gray-900 dark:text-gray-700'>
                    {userProfile?.data.login}
                  </th>
                  <td className='py-3 px-6'>{userProfile?.data.public_repos}</td>
                  <td className='py-3 px-6'>{userProfile?.data.followers}</td>
                </tr>
              </tbody>
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
