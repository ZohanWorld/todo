/* eslint-disable eqeqeq */
/* eslint-disable react/state-in-constructor */
import { formatDistance } from 'date-fns'
import './task.css'
import { Component } from 'react'

export default class Task extends Component {
  state = {
    timerStartTime: null,
    timerStarted: false,
    totalTime: 0,
    seconds: 0,
    timer: null,
  }

  componentDidMount() {
    const { timer } = this.props
    this.setState({ seconds: timer, totalTime: timer })
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    const { timerStarted, totalTime } = this.state
    if (!timerStarted) {
      this.setState({ timerStartTime: Date.now() }, () => {
        const { timerStartTime } = this.state
        this.setState({ timerStarted: true })
        const timerInterval = setInterval(() => {
          const { seconds } = this.state
          if (seconds === 0) {
            this.stopTimer()
          } else {
            const now = Date.now()
            const timeDifference = Math.floor((now - timerStartTime) / 1000)
            this.setState({ seconds: totalTime - timeDifference })
          }
        }, 100)
        this.setState({ timer: timerInterval })
      })
    }
  }

  stopTimer = () => {
    const { timer, seconds } = this.state
    this.setState({ timerStarted: false, totalTime: seconds })
    clearInterval(timer)
  }

  render() {
    const { description, done, editItem, deleteItem, timeStamp, toggleDone } = this.props
    const { seconds } = this.state
    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={toggleDone} />
        <label>
          <span className="title">{description} </span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={this.startTimer} />
            <button className="icon icon-pause" type="submit" onClick={this.stopTimer} />
            {`  ${Math.floor(seconds / 60)}:${seconds % 60}`}
          </span>
          <span className="description">Created {formatDistance(timeStamp, Date.now())} ago</span>
        </label>
        <button className="icon icon-edit" type="button" onClick={editItem} />
        <button className="icon icon-destroy" onClick={deleteItem} type="button" />
      </div>
    )
  }
}
