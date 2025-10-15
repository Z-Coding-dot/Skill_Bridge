import Explore from "../../components/ui/ExploreCategories/Explore"
import Hero from "../../components/ui/Hero/Hero"
import { HowWorks } from "../../components/ui/HowWorks/HowWorks"

const Home = () => {
  return (
    <div className="min-h-dvw">
        <Hero />
        <HowWorks/>
        <Explore/>
    </div>
  )
}

export default Home
