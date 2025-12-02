import Section from '../../Section/Section'
import { ArrowRight } from 'lucide-react'

export const FinalCta = () => {
  return (
   <Section>
    <div className="my-24 flex flex-col justify-between items-center">
            <div className="w-full sm:w-250 xl:w-350 flex max-sm:flex-col sm:items-center sm:justify-between rounded-2xl px-4 py-3 sm:px-8 sm:py-3 lg:px-12 lg:py-5 sm:h-40 bg-[var(--card-bg)]">
                <div className='sm:w-120 lg:w-150'>
                    <h2 className='text-xl sm:text-4xl font-bold mb-3'>Unlock Your Potential</h2>
                    <p className='text-sm sm:text-base lg:text-lg mb-5'>Join an exclusive community of creators and innovators. Get started today and redefine what's possible.</p>
                </div>
                <div>
                <button className='w-full sm:w-auto text-base py-2 sm:px-4 lg:px-8 sm:py-3 lg:py-4 flex items-center justify-center gap-2 group'>Begin Your Journey
                <ArrowRight className='transform-translate group-hover:translate-x-2'/></button>
                </div>
           </div>
      </div>
   </Section>
  )
}

