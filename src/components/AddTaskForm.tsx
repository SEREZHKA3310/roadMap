import Button from "./Button"
import Field from "./Field"

type AddTaskFormProps = {
  onButtonSubmit: () => void
  newTaskTitle: string,
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>
}

const AddTaskForm = ({onButtonSubmit, newTaskTitle, setNewTaskTitle}: AddTaskFormProps) => {
  const onSubmit = (event: Event) => {
    event.preventDefault()
    onButtonSubmit()
  }

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        label="New task title "
        id="new-task"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.currentTarget.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default AddTaskForm