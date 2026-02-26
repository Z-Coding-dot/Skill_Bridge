import Section from '../../Section/Section'
import * as m from "motion/react-client"
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { exploreCategories } from '@/lib/consts/exploreCategories/explore.data';
import SpotlightCard from '@/components/Card/SpotlightCard';
const Explore = () => {
  return (
    <Section>
        <m.h1
         initial={{ opacity: 0, y: 50 }}
			            whileInView={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.8, delay: 0.4 }}
         className='text-center text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-4 mt-20'>Explore Categories</m.h1>
         <m.p
          initial={{ opacity: 0, y: 50 }}
			            whileInView={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.9, delay: 0.4 }} 
         className='sm:mb-16 mb-6 text-center text-xs sm:text-xs lg:text-base'>Discover opportunities across diverse skill categories</m.p>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {exploreCategories.map((category, index) => (
                <m.div
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
			            whileInView={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.3, delay: 0.2 * index }}
                  className=' hover:shadow-2xl group'>
                    <SpotlightCard className='max-sm:py-3 max-sm:px-4'>
                  <span className={`group-hover:border-text-primary card size-10 sm:size-14 rounded-xl p-3 flex items-center justify-center mb-2 sm:mb-4`}>
                        <category.icon className="size-8 font-bold text-text-primary"/>
                </span>
                <h3 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4 lg:mb-6">{category.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 lg:mb-6">{category.description}</p>
                 <span className='text-[10px] sm:text-xs'>{category.opportunities}</span>     
                 </SpotlightCard>           
                </m.div>
            ))}
         </div>
           <div className='mt-10 flex justify-center text-center'>
            <Link to="/taskBoard">
           <button className='w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 transition-all duration-700 ease-in group'>Discover More
             <ArrowRight className='transform-translate group-hover:translate-x-2'/></button>
           </Link>
           </div>
    </Section>
  )
}

export default Explore
