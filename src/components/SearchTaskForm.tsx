import { useContext } from "react"
import Field from "./Field"
import { TasksContext } from "../context/TasksContext"

type SearchTaskFormProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchTaskForm = () => {
  const {
    searchQuery,
    setSearchQuery
  } = useContext(TasksContext)
  
  return (
    <form className="todo__form" onSubmit={(event: Event) => event.preventDefault()}>
      <Field
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.currentTarget.value)}
      />
    </form>
  )
}

export default SearchTaskForm