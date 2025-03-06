import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Animecards} from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Animecards />
  </StrictMode>,
)
