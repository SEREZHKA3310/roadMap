import { memo, useContext } from "react"
import TodoItem, { type TodoItemProps } from "./Todoitem"
import { TasksContext } from "../context/TasksContext"

export type ToDoListProps = {
  tasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | []
  filteredTasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | null
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

const TodoList = () => {
  const {
      tasks,
      filteredTasks
    } = useContext(TasksContext)
  const hasTasks = tasks.length > 0
  const isEmptyFiltetedTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className="todo__empty-message">There are no tasks yet</div>
  }
  if (hasTasks && isEmptyFiltetedTasks) {
    return <div className="todo__empty-message">Tasks not found</div>
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className='todo__item'
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
