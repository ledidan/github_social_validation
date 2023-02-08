import { useRoutes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import MainLayout from './Layouts/MainLayout/MainLayout'
import { Dashboard } from './Components/Dashboard'
import { Table } from './Components/Table'
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
    <div className='App'>
      <MainLayout>{elements}</MainLayout>
    </div>
  )
}

export default App
