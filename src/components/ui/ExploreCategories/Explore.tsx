import Section from '../../Section/Section'
import {exploreCategories} from '../../../lib/consts/exploreCategories/explore.data';
import * as m from "motion/react-client"
import { ArrowRight } from 'lucide-react';
const Explore = () => {
  return (
    <Section>
        <m.h1
         initial={{ opacity: 0, y: 50 }}
			            whileInView={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.8, delay: 0.4 }}
         className='text-center text-lg sm:text-4xl font-bold mb-2 sm:mb-4 mt-20'>Explore Categories</m.h1>
         <m.p
          initial={{ opacity: 0, y: 50 }}
			            whileInView={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.9, delay: 0.4 }} 
         className='sm:mb-16 mb-6 text-center'>Discover opportunities across diverse skill categories</m.p>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {exploreCategories.map((category, index) => (
                <m.div
                 key={index}
                 initial={{ opacity: 0, y: 50 }}
			            whileInView={{ opacity: 1, y: 0 }}
			            transition={{ duration: 0.8, delay: 0.4 * index }}
                  className='card'>
                         <span className={`card size-12 rounded-xl p-3 flex items-center justify-center mb-4`}>
                        <category.icon className="size-8 font-bold text-white"/>
                </span>
                <h3 className="text-xl font-bold mb-6">{category.title}</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6">{category.description}</p>
                 <span className='text-xs'>{category.opportunities}</span>                
                </m.div>
            ))}
         </div>
           <div className='mt-10 flex justify-center text-center'>
           <button className='px-8 py-3 flex items-center justify-center gap-2 transition-all duration-700 ease-in group'>Discover More
             <ArrowRight className='transform-translate group-hover:translate-x-2'/></button>
           </div>
    </Section>
  )
}

export default Explore
