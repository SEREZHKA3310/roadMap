import TodoItem, { type TodoItemProps } from "./Todoitem"

export type ToDoListProps = {
  tasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | []
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

const TodoList = ({tasks = [], onDeleteTaskButtonClick, onTaskCompleteChange}: ToDoListProps) => {
  const hasTasks = true

  if (!hasTasks) {
    return <div className="todo__empty-message"></div>
  }

  return (
    <ul className="todo__list">
      {tasks.map(({ id, title, isDone }) => (
        <TodoItem
          className='todo__item'
          key={id}
          id={id}
          title={title}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          isDone={isDone}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  )
}

export default TodoList
