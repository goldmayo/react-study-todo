import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// import dummy_todo_list from '@/core/data/todo_dummy.json'
import { Todo, TodoItem } from '@/types/todo'

type TodoStore = {
  todos: Todo
  add: (todoItem: TodoItem) => void
  remove: (todoId: number) => void
  toggleComplete: (todoId: number) => void
}
// 벌크 데이터 생성
function createBulkTodos(): Todo {
  const array = []
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할일 ${i}`,
      checked: false,
    })
  }
  return array
}

// 더미 데이터 로드

//데이터
// const dummy_todos: Todo = dummy_todo_list
const dummy_todos: Todo = createBulkTodos()

// 전역 스토어
export const useTodoStore = create<TodoStore>()(
  immer(
    devtools((set, get) => ({
      // 데이터
      todos: [...dummy_todos],
      // 액션
      add: (todoItem: TodoItem) => {
        const { todos } = get()
        // 계산
        const newTodos = TodoController(todos).add(todoItem).get()
        set((state) => {
          state.todos = newTodos
        })
      },
      // 액션
      remove: (todoId: number) => {
        const { todos } = get()
        // 계산
        const filterdTodos = TodoController(todos).remove(todoId).get()
        set((state) => {
          state.todos = filterdTodos
        })
      },
      // 액션
      toggleComplete(todoId) {
        const { todos } = get()
        // 계산
        const newTodos = TodoController(todos).toggleComplete(todoId).get()
        // set({ todos: newTodos })
        //immer style
        set((state) => {
          state.todos = newTodos
        })
      },
    })),
  ),
)

// 함수형 프로그래밍 기법이라는데 모름 진짜 모름;;
// 함수형 프로그래밍(데이터 계산 액션) + OOP가 적절하게 섞이면 비즈니스 로직을 다루기 용이함

// 비즈니스 로직을 컴포넌트에서 분리

// 계산
const TodoController = (todos: Todo) => ({
  add: (todo: TodoItem) => {
    return TodoController([...todos, todo])
  },

  remove: (todoId: number) => {
    let filterdTodos = todos.filter((todo) => todo.id !== todoId)
    return TodoController([...filterdTodos])
  },

  toggleComplete: (todoId: number) => {
    let newTodos = todos.map((todo) => (todo.id === todoId ? { ...todo, checked: !todo.checked } : todo))
    return TodoController([...newTodos])
  },
  // TodoController의 현재 todos를 리턴
  get: () => todos,
})
