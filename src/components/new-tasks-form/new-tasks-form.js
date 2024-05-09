/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/state-in-constructor */
import { Component } from 'react'
import './new-tasks-form.css'

export default class NewTasksForm extends Component {
  state = {
    text: '',
    min: '',
    sec: '',
  }

  inputChange = (state, value) => {
    this.setState(() => {
      return {
        [state]: value,
      }
    })
  }

  queryChange = (e) => {
    const input = e.target.value
    this.inputChange('text', input)
  }

  minChange = (e) => {
    const input = e.target.value
    this.inputChange('min', input)
  }

  secChange = (e) => {
    const input = e.target.value
    this.inputChange('sec', input)
  }

  formSubmit = (e) => {
    const { addItem } = this.props
    const { text, min, sec } = this.state
    const timer = min * 60 + parseInt(sec, 10)
    e.preventDefault()
    addItem(text, timer)
    this.setState({
      text: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { text, min, sec } = this.state
    return (
      <form onSubmit={this.formSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.queryChange}
          value={text}
          type="text"
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.minChange}
          value={min}
          type="number"
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.secChange}
          value={sec}
          type="number"
          required
        />
        <button type="submit" />
      </form>
    )
  }
}
