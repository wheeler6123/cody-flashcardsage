import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom'
import './index.css'
import Deck from './components/Deck.tsx'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/decks/:deckId',
    element: <Deck />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>,
)
