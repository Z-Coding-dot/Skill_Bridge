import type { ReactNode } from 'react';
import { Container } from '../Container/Container';

interface SectionsProps {
    className?: string;
    children: ReactNode;
    id?: string;
}

const Section = ({children, className ="", id}: SectionsProps) => {
 return (
    <section
    id={id}
    className={`2xl:py-4 py-[1.563rem] ${className}`}>
    <Container>{children}</Container>
  </section>
  )
}

export default Section

