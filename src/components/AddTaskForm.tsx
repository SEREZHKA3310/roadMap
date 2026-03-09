import { useContext } from "react"
import Button from "./Button"
import Field from "./Field"
import { TasksContext } from "../context/TasksContext"

type AddTaskFormProps = {
  onButtonSubmit: () => void
  newTaskTitle: string,
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>
}

const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef
  } = useContext(TasksContext)

  const onSubmit = (event: Event) => {
    event.preventDefault()
    addTask()
  }

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        label="New task title "
        id="new-task"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.currentTarget.value)}
        ref={newTaskInputRef}
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default AddTaskForm