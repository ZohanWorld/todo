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

  // eslint-disable-next-line react/state-in-constructor
  state = {
    data: [this.createItem('Completed task'), this.createItem('Editing task'), this.createItem('Active task')],
  }

  addItem = (description) => {
    this.setState(({ data }) => {
      return {
        data: [...data, this.createItem(description)],
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

  showCompleted = () => {
    this.setState(({ data }) => {
      const newArray = [...data].map((value) => {
        if (!value.done) {
          value.show = false
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

  createItem(description) {
    return {
      description,
      done: false,
      show: true,
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
          <TaskList data={data} toggleDone={this.toggleDone} deleteItem={this.deleteItem} />
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
