import { memo } from "react"

type TodoInfoProps = {
  total: number,
  done: number,
  onDeleteAllButtonClick: () => void
}

const TodoInfo = ({total, done, onDeleteAllButtonClick}: TodoInfoProps) => {
  const hasTasks = total > 0

  return (
    <div>
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={onDeleteAllButtonClick}
        >
          Delete all
        </button>
      )}
    </div>
  )
}

export default memo(TodoInfo)