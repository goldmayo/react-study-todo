import React, { useCallback } from 'react'
import { List, ListRowRenderer } from 'react-virtualized'

import TodoListItem from '@/components/todo/TodoListItem'
import { useTodoStore } from '@/store/slice/todo'

function TodoList() {
  const { todos } = useTodoStore()

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index]
      return (
        <div key={key} style={style}>
          <TodoListItem key={todo.id} content={todo} />
        </div>
      )
    },
    [todos],
  )
  return (
    <List
      className="max-h-[513px] min-h-[320px] overflow-y-auto"
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  )
}
export default React.memo(TodoList)

// import React from 'react'

// import TodoListItem from '@/components/todo/TodoListItem'
// import { useTodoStore } from '@/store/slice/todo'
// import { TodoItem } from '@/types/todo'

// function TodoList() {
//   const { todos } = useTodoStore()
//   return (
//     <div
//       className="max-h-[513px] min-h-[320px] overflow-y-auto"
//     >
//       {todos.map((item: TodoItem) => (
//         <TodoListItem key={item.id} content={item} />
//       ))}
//     </div>
//   )
// }

// export default React.memo(TodoList)
