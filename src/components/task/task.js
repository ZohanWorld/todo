import { formatDistance } from 'date-fns'
import './task.css'

function Task({ description, done, deleteItem, timeStamp }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} readOnly />
      <label>
        <span className="description">{description} </span>
        <span className="created">created {formatDistance(timeStamp, Date.now())}</span>
      </label>
      <button className="icon icon-edit" type="button" />
      <button className="icon icon-destroy" onClick={deleteItem} type="button" />
    </div>
  )
}

export default Task
