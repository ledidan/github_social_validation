import { useRoutes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import MainLayout from './Layouts/MainLayout/MainLayout'
import { Dashboard } from './Components/Dashboard'
import { Table } from './Components/Table'
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
function App() {
  const elements = useRoutes([
    {
      path: '/dashboard',
      element: (
        <Dashboard>
          <Table />
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
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
function RequireAuth() {
  let location = useLocation()
  const phoneInfo = localStorage.getItem('phoneNumber')

  if (phoneInfo) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/dashboard' state={{ from: location }} />
  }

  return <Outlet />
}
export default App
