import TodoInsert from '@/components/todo/TodoInsert'
import TodoList from '@/components/todo/TodoList'
import TodoTemplate from '@/components/todo/TodoTemplate'

function App() {
  return (
    <main className="h-screen w-screen bg-[#282A3A]">
      <TodoTemplate>
        <TodoInsert />
        <TodoList />
      </TodoTemplate>
    </main>
  )
}

export default App
