import React from 'react'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return <main className='col-span-3 h-full'>{children}</main>
}
