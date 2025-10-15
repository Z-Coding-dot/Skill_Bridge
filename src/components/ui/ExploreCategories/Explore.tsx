import Section from '../../Section/Section'
import {exploreCategories} from '../../../lib/consts/exploreCategories/explore.data';

const Explore = () => {
  return (
    <Section>
        <h1 className='text-center text-lg sm:text-4xl font-bold mb-2 sm:mb-4 mt-20'>Explore Categories</h1>
         <p className='sm:mb-16 mb-6 text-center'>Discover opportunities across diverse skill categories</p>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {exploreCategories.map((category) => (
                <div key={category.title} className='card'>
                         <span className={`card size-12 rounded-xl p-3 flex items-center justify-center mb-4`}>
                        <category.icon className="size-8 font-bold text-white"/>
                </span>
                <h3 className="text-xl font-bold mb-6">{category.title}</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6">{category.description}</p>
                 <span className='text-xs'>{category.opportunities}</span>                
                </div>
            ))}
         </div>
           <div className='mt-10 text-center'>
           <button className=''>Discover More</button>
           </div>
    </Section>
  )
}

export default Explore
