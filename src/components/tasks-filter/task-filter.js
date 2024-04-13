import './task-filter.css'

function TaskFilter({ showAll, showActive, showCompleted }) {
  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={showAll} type="button">
          All
        </button>
      </li>
      <li>
        <button onClick={showActive} type="button">
          Active
        </button>
      </li>
      <li>
        <button onClick={showCompleted} type="button">
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
