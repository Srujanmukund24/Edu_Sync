import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from './UserContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserContextProvider>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </UserContextProvider>  
    </React.StrictMode>
)
