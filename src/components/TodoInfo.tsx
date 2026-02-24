type TodoInfoProps = {
  total: number,
  done: number
}

const TodoInfo = ({total, done}: TodoInfoProps) => {
  const hasTasks = total > 0

  return (
    <div>
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button className="todo__delete-all-button" type="button">
          Delete all
        </button>
      )}
    </div>
  )
}

export default TodoInfo