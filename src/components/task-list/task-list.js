/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import './task-list.css'
import { useState } from 'react'

import Task from '../task/task'

function TaskList({ data, toggleDone, deleteItem, editItem, changeValue }) {
  const [text, setText] = useState('')

  const inputChange = (e) => {
    setText(e.target.value)
  }

  const formSubmit = (id, e) => {
    e.preventDefault()
    changeValue(text, id)
    setText('')
  }

  const elems = data.map((value) => {
    const { id, description, done, show, edit, timeStamp, timer } = value
    let className
    if (done) {
      className = 'completed'
    }
    if (edit) {
      className += ' editing'
    }
    if (!show) {
      return null
    }

    return (
      <li className={className} key={id}>
        <Task
          description={description}
          done={done}
          timer={timer}
          deleteItem={(e) => deleteItem(id, e)}
          editItem={(e) => editItem(id, e)}
          timeStamp={timeStamp}
          toggleDone={(e) => toggleDone(id, e)}
        />
        <form onSubmit={(e) => formSubmit(id, e)}>
          <input type="text" className="edit" onChange={inputChange} />
        </form>
      </li>
    )
  })

  return <ul className="todo-list">{elems}</ul>
}

export default TaskList
