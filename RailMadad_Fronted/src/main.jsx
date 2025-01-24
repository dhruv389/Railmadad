import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./App.css";
import {AuthProvider} from "./Context/userContext.jsx" 

import { FirebaseProvider } from './firebase/firebase.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider> 
  <FirebaseProvider>
   
    <App />
   
    </FirebaseProvider>
    </AuthProvider>
  </StrictMode>,
)
