import Section from '../../Section/Section'
import { ArrowRight } from 'lucide-react'

export const FinalCta = () => {
  return (
   <Section>
    <div className="mt-24 flex justify-center">
            <div className="w-300 flex items-center justify-between rounded-2xl px-12 py-5 h-40 bg-[var(--card-bg)]">
                <div className='w-150'>
                    <h2 className='text-4xl font-bold mb-3'>Unlock Your Potential</h2>
                    <p className='text-lg'>Join an exclusive community of creators and innovators. Get started today and redefine what's possible.</p>
                </div>
                <div className=''>
                <button className='px-8 py-4 text-lg flex items-center justify-center gap-2 group'>Begin Your Journey
                <ArrowRight className='transform-translate group-hover:translate-x-2'/></button>
                </div>
           </div>
      </div>
   </Section>
  )
}

