/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import './task-list.css'
import { Component } from 'react'

import Task from '../task/task'

export default class TaskList extends Component {
  state = {
    text: '',
  }

  inputChange = (e) => {
    this.setState(() => {
      return {
        text: e.target.value,
      }
    })
  }

  formSubmit = (id, e) => {
    e.preventDefault()
    this.props.changeValue(this.state.text, id)
    this.setState({
      text: '',
    })
  }

  render() {
    const { data, toggleDone, deleteItem, editItem } = this.props
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
          <form onSubmit={(e) => this.formSubmit(id, e)}>
            <input type="text" className="edit" onChange={this.inputChange} />
          </form>
        </li>
      )
    })
    return <ul className="todo-list">{elems}</ul>
  }
}
