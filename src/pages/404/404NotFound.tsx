import { Link } from "react-router-dom"
import Section from "../../components/Section/Section"

export const NotFound = () => {
  return (
    <Section>
        <div className="flex flex-col max-sm:min-h-dvw sm:mt-25 gap-8 items-center justify-center">
            <h1 className="text-center font-bold text-3xl text-[var(--error)]">404 - Not Found</h1>
            <p className="text-center font-semibold">The page you are looking for does not exist.</p>
            <Link to={'/'}>
                <button className="max-sm:w-80 bg-[var(--error)]">
                    Go to Home
                </button>
            </Link>
        </div>
    </Section>
  )
}

