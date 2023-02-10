import { useRoutes } from 'react-router-dom'
import './App.css'
import MainLayout from './Layouts/MainLayout/MainLayout'
import { Dashboard } from './Components/Dashboard'
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
import TableUser from './Components/Table/TableUser'
import { Login } from './Components/Login'
function App() {
  const elements = useRoutes([
    {
      path: '/dashboard',
      element: (
        <Dashboard>
          <TableUser />
        </Dashboard>
      )
    },
    {
      path: '/*',
      element: <Login />
    }
  ])
  return (
    <>
      <div className='App'>
        <MainLayout>{elements}</MainLayout>
      </div>
    </>
  )
}

export default App
