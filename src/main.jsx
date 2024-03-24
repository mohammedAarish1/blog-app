import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseContextProvider } from './context/FirebaseContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContextProvider>
  </React.StrictMode>
)
