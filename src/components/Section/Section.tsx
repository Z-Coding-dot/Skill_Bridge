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
    className={`py-12 sm:py-16 lg:py-24 bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300 ${className}`}>
    <Container>{children}</Container>
  </section>
  )
}

export default Section

