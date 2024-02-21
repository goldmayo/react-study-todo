import React from 'react'

import TodoListItem from '@/components/todo/TodoListItem'
import { useTodoStore } from '@/store/slice/todo'
import { TodoItem } from '@/types/todo'

function TodoList() {
  const { todos } = useTodoStore()
  return (
    <div className="max-h-[513px] min-h-[320px] overflow-y-auto">
      {todos.map((item: TodoItem) => (
        <TodoListItem key={item.id} content={item} />
      ))}
    </div>
  )
}

export default React.memo(TodoList)
