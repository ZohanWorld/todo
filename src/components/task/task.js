import { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import './task.css'

function Task({ timer, description, done, editItem, deleteItem, timeStamp, toggleDone }) {
  const [timerStartTime, setTimerStartTime] = useState(null)
  const [timerStarted, setTimerStarted] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [newTimer, setTimer] = useState(null)

  const stopTimer = () => {
    setTimerStarted(false)
    setTotalTime(seconds)
    clearInterval(newTimer)
  }

  useEffect(() => {
    setSeconds(timer)
    setTotalTime(timer)
    return () => stopTimer()
  }, [])

  useEffect(() => {
    if (timerStarted) {
      const timerInterval = setInterval(() => {
        const now = Date.now()
        const timeDifference = Math.floor((now - timerStartTime) / 1000)
        setSeconds(totalTime - timeDifference)
        if (seconds === 0) {
          stopTimer()
        }
      }, 100)
      setTimer(timerInterval)

      return () => clearInterval(timerInterval)
    }
  }, [timerStarted, timerStartTime, seconds])

  const startTimer = () => {
    if (!timerStarted) {
      setTimerStartTime(Date.now())
      setTimerStarted(true)
    }
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={toggleDone} />
      <label>
        <span className="title">{description} </span>
        <span className="description">
          <button className="icon icon-play" type="button" onClick={startTimer} />
          <button className="icon icon-pause" type="submit" onClick={stopTimer} />
          {`  ${Math.floor(seconds / 60)}:${seconds % 60}`}
        </span>
        <span className="description">Created {formatDistance(timeStamp, Date.now())} ago</span>
      </label>
      <button className="icon icon-edit" type="button" onClick={editItem} />
      <button className="icon icon-destroy" onClick={deleteItem} type="button" />
    </div>
  )
}

export default Task
