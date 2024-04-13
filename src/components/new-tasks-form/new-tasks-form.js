/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/state-in-constructor */
import { Component } from 'react'

export default class NewTasksForm extends Component {
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

  formSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.text)
    this.setState({
      text: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.inputChange}
          value={this.state.text}
        />
      </form>
    )
  }
}
