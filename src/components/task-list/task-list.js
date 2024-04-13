import './task-list.css'
import Task from '../task/task'

function TaskList({ data, toggleDone, deleteItem }) {
  const elems = data.map((value) => {
    const { id, description, done, show, timeStamp } = value
    let className
    if (done) {
      className = 'completed'
    }
    if (!show) {
      return null
    }

    return (
      <li className={className} key={id} onClick={() => toggleDone(id)}>
        <Task description={description} done={done} deleteItem={(e) => deleteItem(id, e)} timeStamp={timeStamp} />
        <input type="text" className="edit" value="Editing task" readOnly />
      </li>
    )
  })
  return <ul className="todo-list">{elems}</ul>
}

export default TaskList
