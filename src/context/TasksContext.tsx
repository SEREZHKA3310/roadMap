import { createContext, useState, useRef, useCallback, useMemo, useEffect } from "react";

type TodoItemProps = {
  className?: string,
  id: string,
  title: string,
  isDone: boolean
  readonly?: boolean
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

type ToDoListProps = {
  tasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | []
  filteredTasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | null
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

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

  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

  const deleteAllTasks = useCallback(() => {
    setTasks([])  
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(tasks.filter(({id}) => id !== taskId))
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId: string, isDone: boolean) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone: isDone}
        }
        return task
      })
    )
  }, [tasks])
  
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()
    
    return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
  }, [searchQuery, tasks])

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle, 
        isDone: false
      }
      setTasks((prevTasks) => [...prevTasks, newTask])
      
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  }, [newTaskTitle])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, [])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}