import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { MdAdd } from 'react-icons/md'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TodoSchema } from '@/lib/schema/Todo'
import { useTodoStore } from '@/store/slice/todo'

const FormSchema = TodoSchema

export default function TodoInsert() {
  // 전역 스토어를 사용하여 props drilling 회피
  const { add } = useTodoStore()

  // 데이터
  const nextId = useRef(2500)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      todo_input: '',
    },
  })

  // todo의 종류가 다양해지면 todo 객체 생성 로직을 담당하는 class로 관리

  // 액션
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // 객체 생성
    const id = nextId.current
    const text = data.todo_input
    const checked = false
    // 추가
    // 액션
    add({ id, text, checked })
    // 계산
    nextId.current += 1
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex bg-[#495057] ">
        <FormField
          control={form.control}
          name="todo_input"
          render={({ field }) => (
            <FormItem className="shrink grow basis-0">
              <FormControl>
                <Input
                  className="rounded-none border-gray-800 p-2 text-xl text-white placeholder:text-[#dee2e6] focus:border-white"
                  placeholder="할 일을 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={'add'} type="submit">
          <MdAdd />
        </Button>
      </form>
    </Form>
  )
}
