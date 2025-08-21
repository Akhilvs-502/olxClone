import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Context, firebaseContext } from './store/context.tsx'
import {firebase} from './fireBase/config.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <firebaseContext.Provider value={firebase}>
      <Context>
          <App />
      </Context>
    </firebaseContext.Provider>

    

  </StrictMode>,
)
