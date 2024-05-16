/* eslint-disable react/state-in-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { useState } from 'react'

import Footer from '../footer/footer'
import NewTasksForm from '../new-tasks-form/new-tasks-form'
import './App.css'
import TaskList from '../task-list/task-list'

function App() {
  let maxId = 100

  const [data, setData] = useState([])

  const deleteItem = (id, e) => {
    e.stopPropagation()
    setData((state) => {
      const idx = state.findIndex((value) => value.id === id)
      const newArray = [...state.slice(0, idx), ...state.slice(idx + 1)]
      return newArray
    })
  }

  const changeValue = (text, id) => {
    setData((state) => {
      const idx = state.findIndex((value) => value.id === id)
      const oldItem = state[idx]
      const newItem = { ...oldItem, description: text, edit: false }
      const newArray = [...state.slice(0, idx), newItem, ...state.slice(idx + 1)]
      return newArray
    })
  }

  const showCompleted = () => {
    setData((state) => {
      const newArray = [...state].map((value) => {
        if (!value.done) {
          value.show = false
        } else {
          value.show = true
        }
        return value
      })
      return newArray
    })
  }

  const showActive = () => {
    setData((state) => {
      const newArray = [...state].map((value) => {
        if (value.done) {
          value.show = false
        } else {
          value.show = true
        }
        return value
      })
      return newArray
    })
  }

  const showAll = () => {
    setData((state) => {
      const newArray = [...state].map((value) => {
        value.show = true
        return value
      })
      return newArray
    })
  }

  const clearCompleted = () => {
    setData((state) => {
      const newArray = state.filter((value) => value.done === false)
      return newArray
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((value) => value.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const toggleDone = (id) => {
    setData((state) => toggleProperty(state, id, 'done'))
  }

  const editItem = (id, e) => {
    e.stopPropagation()
    setData((state) => toggleProperty(state, id, 'edit'))
  }

  const createItem = (description, timer) => {
    return {
      description,
      done: false,
      show: true,
      edit: false,
      timer,
      timeStamp: Date.now(),
      id: maxId++,
    }
  }

  const addItem = (description, timer) => {
    setData((state) => [...state, createItem(description, timer)])
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTasksForm addItem={addItem} />
      </header>
      <main className="main">
        <TaskList
          data={data}
          toggleDone={toggleDone}
          deleteItem={deleteItem}
          editItem={editItem}
          changeValue={changeValue}
        />
        <Footer
          data={data}
          showCompleted={showCompleted}
          showAll={showAll}
          showActive={showActive}
          clearCompleted={clearCompleted}
        />
      </main>
    </section>
  )
}

export default App
