import { useState } from 'react'
import Header from "./components/Header/Header.jsx"
import Main from "./components/Main/Main.jsx"
import Tarefa from './components/Tarefas/Tarefa.jsx'

function App() {


  return (
    <div>
      <Header/>
      <Tarefa />
    </div>
  )
}

export default App