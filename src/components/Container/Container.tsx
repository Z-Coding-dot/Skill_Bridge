import{ type ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export const Container = ({children, className = ""}: ContainerProps) => {
  return (
    <div
    className={`3xl:px-20 2xl:px-[4.688rem] px-10 mx-auto w-full max-w-[110rem] ${className}`}>
    {children}
  </div>
  )
}

