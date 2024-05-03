/* eslint-disable react/state-in-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { Component } from 'react'

import Footer from '../footer/footer'
import NewTasksForm from '../new-tasks-form/new-tasks-form'
import './App.css'
import TaskList from '../task-list/task-list'

class App extends Component {
  maxId = 100

  state = {
    data: [],
  }

  addItem = (description, timer) => {
    this.setState(({ data }) => {
      return {
        data: [...data, this.createItem(description, timer)],
      }
    })
  }

  toggleDone = (id) => {
    this.setState(({ data }) => {
      return {
        data: this.toggleProperty(data, id, 'done'),
      }
    })
  }

  deleteItem = (id, e) => {
    e.stopPropagation()
    this.setState(({ data }) => {
      const idx = data.findIndex((value) => value.id === id)
      const newArray = [...data.slice(0, idx), ...data.slice(idx + 1)]
      return {
        data: newArray,
      }
    })
  }

  changeValue = (text, id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((value) => value.id === id)
      const oldItem = data[idx]
      const newItem = { ...oldItem, description: text, edit: false }
      const newArray = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
      return {
        data: newArray,
      }
    })
  }

  editItem = (id, e) => {
    e.stopPropagation()
    this.setState(({ data }) => {
      return {
        data: this.toggleProperty(data, id, 'edit'),
      }
    })
  }

  showCompleted = () => {
    this.setState(({ data }) => {
      const newArray = [...data].map((value) => {
        if (!value.done) {
          value.show = false
        } else {
          value.show = true
        }
        return value
      })
      return {
        data: newArray,
      }
    })
  }

  showActive = () => {
    this.setState(({ data }) => {
      const newArray = [...data].map((value) => {
        if (value.done) {
          value.show = false
        } else {
          value.show = true
        }
        return value
      })
      return {
        data: newArray,
      }
    })
  }

  showAll = () => {
    this.setState(({ data }) => {
      const newArray = [...data].map((value) => {
        value.show = true
        return value
      })
      return {
        data: newArray,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ data }) => {
      const newArray = data.filter((value) => value.done === false)
      return {
        data: newArray,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((value) => value.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  createItem(description, timer) {
    return {
      description,
      done: false,
      show: true,
      edit: false,
      timer,
      timeStamp: Date.now(),
      id: this.maxId++,
    }
  }

  render() {
    const { data } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTasksForm addItem={this.addItem} />
        </header>
        <main className="main">
          <TaskList
            data={data}
            toggleDone={this.toggleDone}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            changeValue={this.changeValue}
          />
          <Footer
            data={data}
            showCompleted={this.showCompleted}
            showAll={this.showAll}
            showActive={this.showActive}
            clearCompleted={this.clearCompleted}
          />
        </main>
      </section>
    )
  }
}

export default App
