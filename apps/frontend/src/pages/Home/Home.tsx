import { FinalCta } from "../../components/ui/CTA/FinalCta"
import Explore from "../../components/ui/ExploreCategories/Explore"
import Hero from "../../components/ui/Hero/Hero"
import { HowWorks } from "../../components/ui/HowWorks/HowWorks"
import { Testimonials } from "../../components/ui/TestimonialsDemo/Testimonials"

const Home = () => {
  return (
    <div className="min-h-dvw">
        <Hero />
        <HowWorks/>
        <Explore/>
        <Testimonials/>
        <FinalCta/>
    </div>
  )
}

export default Home
