import * as React from 'react'
import { useNavigate, Route, Routes, useRoutes } from 'react-router-dom'
import './App.css'
import MainLayout from './Layouts/MainLayout/MainLayout'
import { Dashboard } from './Components/Dashboard'
import TableUser from './Components/Table/TableUser'
import { Login } from './Components/Login'

function App() {
  const userLogged = Boolean(localStorage.getItem('phoneNumber'))

  const navigate = useNavigate()

  React.useEffect(() => {
    // if (!userLogged) {
    //   return navigate('/')
    // } else {
    //   return navigate('/dashboard')
    // }
  }, [userLogged])
  const elements = useRoutes([
    {
      element: (
        <MainLayout>
          <Dashboard>
            <TableUser />
          </Dashboard>
        </MainLayout>
      ),
      path: '/dashboard'
    }
  ])
  return (
    <div className='App'>
      <Routes>
        <Route path={'/dashboard'} element={elements} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
