import Field from "./Field"

type SearchTaskFormProps = {
  onSearchInput: (query: string) => void
}

const SearchTaskForm = ({onSearchInput}: SearchTaskFormProps) => {
  return (
    <form className="todo__form" onSubmit={(event: Event) => event.preventDefault()}>
      <Field
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
        onInput={(event) => onSearchInput(event.target.value)}
      />
    </form>
  )
}

export default SearchTaskForm