import { z } from 'zod'

export const TodoSchema = z.object({
  todo_input: z.string().min(2, { message: '2자 이상 입력해주세요.' }),
})

export type TodoInterface = z.infer<typeof TodoSchema>
