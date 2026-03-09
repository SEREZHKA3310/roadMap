import { memo } from "react"
import TodoItem, { type TodoItemProps } from "./Todoitem"

export type ToDoListProps = {
  tasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | []
  filteredTasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | null
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

const TodoList = ({tasks, filteredTasks, onDeleteTaskButtonClick, onTaskCompleteChange, firstIncompleteTaskRef, firstIncompleteTaskId}: ToDoListProps) => {
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
      {(filteredTasks ?? tasks).map(({ id, title, isDone }) => (
        <TodoItem
          className='todo__item'
          key={id}
          id={id}
          ref={firstIncompleteTaskId === id ? firstIncompleteTaskRef : null}
          title={title}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          isDone={isDone}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
