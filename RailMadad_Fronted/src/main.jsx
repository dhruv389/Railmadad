import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./App.css";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { FirebaseProvider } from './firebase/firebase.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <FirebaseProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </FirebaseProvider>
  </StrictMode>,
)
