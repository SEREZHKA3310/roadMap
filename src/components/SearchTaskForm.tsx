import Field from "./Field"

type SearchTaskFormProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchTaskForm = ({searchQuery, setSearchQuery}: SearchTaskFormProps) => {
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