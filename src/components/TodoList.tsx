import TodoItem, { type TodoItemProps } from "./Todoitem"

type ToDoListProps = {
  tasks: Array<Omit<TodoItemProps, "className">> | []
}

const TodoList = ({tasks = []}: ToDoListProps) => {
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
          isDone={isDone}
        />
      ))}
    </ul>
  )
}

export default TodoList
