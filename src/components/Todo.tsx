import { useState } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./Todoinfo"
import TodoList, {type ToDoListProps} from "./TodoList"

const Todo = () => {
  const [tasks, setTasks] = useState<ToDoListProps['tasks']>([
    {id: "task-1", title: 'Купить молоко', isDone: false},
    {id: "task-2", title: 'Погладить кота', isDone: true}
  ])

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const deleteAllTasks = () => {
    setTasks([])  
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(({id}) => id !== taskId))
  }

  const toggleTaskComplete = (taskId: string, isDone: boolean) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone: isDone}
        }
        return task
      })
    )
  }

  const filterTasks = (query: string) => {
    setTasks(tasks.filter(({title}) => title.includes(query)))
  }

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      console.log(tasks)
      setTasks([...tasks, {id: crypto?.randomUUID() ?? Date.now().toString(), title: newTaskTitle, isDone: false}])
      setNewTaskTitle('')
    }
  }

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        onButtonSubmit={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo 
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}

export default Todo