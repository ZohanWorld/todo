/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/state-in-constructor */
import { useState } from 'react'
import './new-tasks-form.css'

function NewTasksForm({ addItem }) {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const queryChange = (e) => {
    const input = e.target.value
    setText(input)
  }

  const minChange = (e) => {
    const input = e.target.value
    setMin(input)
  }

  const secChange = (e) => {
    const input = e.target.value
    setSec(input)
  }

  const formSubmit = (e) => {
    const timer = min * 60 + parseInt(sec, 10)
    e.preventDefault()
    addItem(text, timer)
    setText('')
    setMin('')
    setSec('')
  }

  return (
    <form onSubmit={formSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={queryChange}
        value={text}
        type="text"
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={minChange}
        value={min}
        type="number"
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={secChange}
        value={sec}
        type="number"
        required
      />
      <button type="submit" />
    </form>
  )
}

export default NewTasksForm
