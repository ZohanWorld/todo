import './footer.css'
import TaskFilter from '../tasks-filter/task-filter'

function Footer({ data, showAll, showActive, showCompleted, clearCompleted }) {
  const todoLeft = data.filter((value) => value.done === false)
  return (
    <footer className="footer">
      <span className="todo-count">{todoLeft.length} items left</span>
      <TaskFilter showAll={showAll} showCompleted={showCompleted} showActive={showActive} />
      <button className="clear-completed" onClick={clearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
