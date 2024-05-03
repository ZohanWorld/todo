/* eslint-disable react/state-in-constructor */
import { formatDistance } from 'date-fns'
import './task.css'
import { Component } from 'react'

export default class Task extends Component {
  state = {
    minutes: 0,
    seconds: 0,
    timerStarted: false,
    timer: null,
  }

  componentDidMount() {
    const { timer } = this.props
    this.setState({ minutes: timer.minutes, seconds: timer.seconds })
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    const { timerStarted } = this.state
    if (!timerStarted) {
      const timer = setInterval(() => {
        const { seconds, minutes } = this.state
        if (seconds > 0) {
          this.setState(() => ({
            seconds: seconds - 1,
          }))
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval)
          } else {
            this.setState(() => ({
              minutes: minutes - 1,
              seconds: 59,
            }))
          }
        }
      }, 1000)
      this.setState({ timer })
    }
  }

  stopTimer = () => {
    const { timer } = this.state
    clearInterval(timer)
  }

  render() {
    const { description, done, editItem, deleteItem, timeStamp, toggleDone } = this.props
    const { minutes, seconds } = this.state
    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={toggleDone} />
        <label>
          <span className="title">{description} </span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={this.startTimer} />
            <button className="icon icon-pause" type="submit" onClick={this.stopTimer} />
            {`  ${minutes}:${seconds}`}
          </span>
          <span className="description">Created {formatDistance(timeStamp, Date.now())} ago</span>
        </label>
        <button className="icon icon-edit" type="button" onClick={editItem} />
        <button className="icon icon-destroy" onClick={deleteItem} type="button" />
      </div>
    )
  }
}
