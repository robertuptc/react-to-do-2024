import './App.css'
import { useState } from 'react'

function App() {

  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  console.log(highlightedIndex)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setInputValue('')
    setTasks([...tasks, {text: inputValue, completed: false}]) 
  }


  const handleDelete = (index) => {
    setTasks(tasks.filter((currentTask, i) => i !== index))
  }


  const strikethroughTask = (index) => {
    setTasks(tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task))
  }


  return (
    <>
      <div id="title">
        <h1>TO-DO</h1>
      </div>

      <div id="tasks">
        <ol id="task-list">
          {
            tasks.length ? 
            tasks.map((task, index) => 
              <li 
                key={index} 
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  backgroundColor: highlightedIndex == index ? 'yellow' : ''
                }}
                onClick={() => strikethroughTask(index)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(null)}
              > 
                  {task.text} 

                  <button onClick={(e) =>{ e.stopPropagation(); handleDelete(index); }}>Delete</button>
              </li>
            ) :
            'You are up to date!' 
          }
        </ol>



        
      </div>

      <div className="form-input">
        <form onSubmit={ e => handleSubmit(e) }>
          <input 
            type="text" 
            placeholder="New Task" 
            value ={inputValue} 
            onChange={(e) => {setInputValue(e.target.value)}}

          />

          <button type="submit">Add</button>
        </form>
      </div>

    </>
  )
}

export default App
