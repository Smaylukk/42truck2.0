import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import App from './app/App'
import UserStore, { UserType } from './store/UserStore'

export const Context = createContext<UserType | null>(null)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Context.Provider value={{ userStore: new UserStore() }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
