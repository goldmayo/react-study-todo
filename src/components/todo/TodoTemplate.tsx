import React from 'react'

interface ITodoTemplate {
  children: React.ReactNode
}

export default function TodoTemplate({ children }: ITodoTemplate) {
  return (
    <div className="mx-auto w-[512px] overflow-hidden rounded pt-24">
      <div className="flex h-16 items-center justify-center bg-[#22b8cf] text-2xl text-white">TODO LIST</div>
      <div className="bg-white">{children}</div>
    </div>
  )
}
