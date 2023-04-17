import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './core/theme'
import { UserContext, userInitalValue } from './core/context/UserContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <UserContext.Provider value={userInitalValue}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </UserContext.Provider>
  </ChakraProvider>
)
