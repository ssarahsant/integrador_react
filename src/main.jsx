// importações
import React from 'react'
// responsavel por sobrepor o dom do html e da acesso para manipular qualquer elementos 
import ReactDOM from 'react-dom/client'
// importa o componete
import { App } from './App.jsx'
import './global.css'

// o reactdom enxerga os elementos html da página e prossibilita a manipulação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
