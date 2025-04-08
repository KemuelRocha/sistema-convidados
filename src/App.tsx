import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from './components/Sidebar/Sidebar.component'
import AppRoutes from './router'
import { Box, Container } from '@mui/material'
import { Header } from './components/Header/Header.component'

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Box sx={{ marginLeft: '250px' }}
        component="main"
        display="flex"
        flexDirection="column"
        height="100vh"
      >
        <Box
          sx={{
            paddingTop: '88px',
            width: '100vw',
            maxHeight: '1200px',
          }}
        >
          <Header />
        </Box>
        <AppRoutes />
      </Box>
    </BrowserRouter>
  )
}

export default App
