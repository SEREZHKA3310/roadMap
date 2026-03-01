import { useEffect, useState } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./Todoinfo"
import TodoList, {type ToDoListProps} from "./TodoList"

const Todo = () => {
  const [tasks, setTasks] = useState<ToDoListProps['tasks']>(() => {
      const savedTasks = localStorage.getItem('tasks')
      
      if (savedTasks) {
        return JSON.parse(savedTasks) as ToDoListProps['tasks']
      }

      return [
        {id: "task-1", title: 'Купить молоко', isDone: false},
        {id: "task-2", title: 'Погладить кота', isDone: true}
      ]
    })

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] =  useState('')

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

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      setTasks([...tasks, {id: crypto?.randomUUID() ?? Date.now().toString(), title: newTaskTitle, isDone: false}])
      
      setNewTaskTitle('')
      setSearchQuery('')
    }
  }

  useEffect(()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
  
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        onButtonSubmit={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo 
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}

export default Todo