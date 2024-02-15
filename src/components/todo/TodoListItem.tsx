import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md'

import { cn } from '@/lib/utils'
import { useTodoStore } from '@/store/slice/todo'
import { TodoItem } from '@/types/todo'

interface ITodoListItem {
  content: TodoItem
}

export default function TodoListItem({ content }: ITodoListItem) {
  const { id, text, checked } = content
  // 액션
  const { toggleComplete, remove } = useTodoStore()

  return (
    <div className="flex items-center border-t border-solid border-gray-300 p-4 even:bg-[#f8f9fa]">
      <div className="flex shrink grow basis-0 cursor-pointer" onClick={() => toggleComplete(id)}>
        {checked ? <MdCheckBox className="text-2xl" /> : <MdCheckBoxOutlineBlank className="text-2xl" />}
        <span className={cn('ml-2 shrink grow basis-0 ', { 'text-[#adb5db] line-through': checked })}>{text}</span>
      </div>
      <div
        className="flex cursor-pointer items-center text-2xl text-[#ff6b6b] hover:text-[#ff8787]"
        onClick={() => remove(id)}
      >
        <MdRemoveCircleOutline />
      </div>
    </div>
  )
}
