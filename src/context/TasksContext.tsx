import { createContext, useState, useRef, useCallback, useMemo, useEffect } from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTaskScroll from "../hooks/useincompleteTaskScroll";

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

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const {
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
  } = useTasks()


  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId
  } = useIncompleteTaskScroll(tasks)

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