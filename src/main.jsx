import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TokenProvider } from './components/tokenProvaider'


ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <TokenProvider>
      <App/>
    </TokenProvider>
  </React.StrictMode>,
)
