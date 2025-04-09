import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import AppRoutes from './router'
import { Box, ThemeProvider } from '@mui/material'
import darkTheme from './theme'

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
          <Sidebar />
          <Box
            sx={{
              marginLeft: '250px',
              width: 'calc(100vw - 360px)',
              maxWidth: '1200px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            component="main"
          >
            <AppRoutes />
          </Box>
        </Box>
      </BrowserRouter >
    </ThemeProvider>
  )
}

export default App
