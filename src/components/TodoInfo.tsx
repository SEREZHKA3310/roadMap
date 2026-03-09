import { memo, useContext, useMemo } from "react"
import { TasksContext } from "../context/TasksContext"

type TodoInfoProps = {
  total: number,
  done: number,
  onDeleteAllButtonClick: () => void
}

const TodoInfo = () => {
  const {
    tasks,
    deleteAllTasks
  } = useContext(TasksContext)

  const total = tasks.length
  const hasTasks = total > 0
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  return (
    <div>
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  )
}

export default memo(TodoInfo)