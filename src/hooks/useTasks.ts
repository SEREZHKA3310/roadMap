import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import tasksAPI from "../api/taskAPI"

interface TodoItemProps {
  className?: string,
  id: string,
  title: string,
  isDone: boolean
  readonly?: boolean
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

interface ToDoListProps {
  tasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | []
  filteredTasks: Omit<TodoItemProps, "className" | 'onDeleteTaskButtonClick' | 'onTaskCompleteChange'>[] | null
  onDeleteTaskButtonClick: (id: string) => void
  onTaskCompleteChange: (id: string, isDone: boolean) => void
}

const useTasks = () => { 
  const [tasks, setTasks] = useState<ToDoListProps['tasks']>([])
  
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] =  useState('')
  
    const newTaskInputRef = useRef(null)
  
    const deleteAllTasks = useCallback(() => {
      tasksAPI.deleteAll(tasks)
        .then(() => setTasks([]))
    }, [tasks])
  
    const deleteTask = useCallback((taskId: string) => {
      tasksAPI.delete(taskId)
        .then(() => {
          setTasks(tasks.filter(({id}) => id !== taskId))
        })
    }, [tasks])
  
    const toggleTaskComplete = useCallback((taskId: string, isDone: boolean) => {
      tasksAPI.toggleComplete(taskId, isDone)
        .then(() => {
          setTasks(
            tasks.map((task) => {
              if (task.id === taskId) {
                return {...task, isDone: isDone}
              }
              return task
            })
          )
        })
    }, [tasks])
  
    const addTask = useCallback((title) => {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title, 
        isDone: false
      }

      tasksAPI.add(newTask)
        .then((addedTask) => {
          setTasks((prevTasks) => [...prevTasks, addedTask])
          setNewTaskTitle('')
          setSearchQuery('')
          newTaskInputRef.current.focus()
        })
    }, [])
  
    useEffect(() => {
      newTaskInputRef.current.focus()

      tasksAPI.getAll().then(setTasks)
    }, [])
  
    const filteredTasks = useMemo(() => {
      const clearSearchQuery = searchQuery.trim().toLowerCase()
      
      return clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
    }, [searchQuery, tasks])

    return {
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,

      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask
    }
}

export default useTasks