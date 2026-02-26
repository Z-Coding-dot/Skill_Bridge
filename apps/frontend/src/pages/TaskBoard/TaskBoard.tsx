import { Calendar, Search } from "lucide-react"
import Section from "../../components/Section/Section"
import { mockTasks } from "../../lib/consts/mockTasks/mockTask.data";
import { Input } from "../../components/Search/Input";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";



export const TaskBoard = () => {
  const categories = ['All', 'Gig', 'Internship', 'Tutoring', 'Project', 'Freelance'];
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const selectedCategory = searchParams.get('category') || 'All';

  const filteredTasks = mockTasks.filter((task) => {
    const matchCategory = selectedCategory === "All" || task.category === selectedCategory;
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  })

  return (
    <Section>
      <ScrollToTop/>
      <h1 className="text-center mt-25 sm:mt-32 mb-3 text-2xl sm:text-4xl xl:text-5xl font-bold">Browse <span className="text-[var(--primary)]">Opportunities</span></h1>
      <p className="text-center text-sm sm:text-base xl:text-lg tracking-tight mb-10">Explore a variety of tasks and projects to enhance your skills.</p>
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5"/>
          <Input
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="pl-10" placeholder="Search tasks..."/>
        </div>
        {/* Categories Filter */}
        <div className="max-w-lg mx-auto mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category}
             onClick={() => setSearchParams(category === 'All' ? {} : {category})}

             className={ clsx(` ${selectedCategory === category ? 'bg-[var(--primary)]' : 'bg-transparent border border-[var(--primary)]'} pb-2 px-4 text-xs sm:text-sm font-medium 
                            text-muted-foreground transition-colors cursor-pointer`)}>
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Task List */}
      <div>
        {/* task found  */}
        <div>
        <h3 className="mb-6"> {filteredTasks.length} {filteredTasks.length === 1 ? 'Opportunity' : 'Opportunities'} Found</h3>
        </div>
        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
          {filteredTasks.map((task) => (
            <Link to={`/tasks/${task.id}`} key={task.id}>
            <div className="card max-sm:p-3">
              <div className="flex justify-end items-center mb-3">
                <span className="text-xs sm:text-sm bg-[var(--success)] text-[var(--text-primary)] rounded-xl px-2 py-0.5 font-semibold ">{task.category}</span>
              </div>
              <h4 className="text-sm sm:text-lg font-semibold mb-3 line-clamp-1">{task.title}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-5 mb-4 line-clamp-3 text-[var(--text-trinary)]">{task.description}</p>
              <div className="flex justify-between items-center my-2">
                <span className="text-xs sm:text-sm flex items-center gap-1"> <Calendar className="size-3 sm:size-5"/> Deadline:</span>
                <span className="text-xs text-muted-foreground">{task.deadline}</span>
              </div>
              <div className="flex items-center space-x-3">
                <img src={task.postedBy.avatar} alt={task.postedBy.name} className="w-8 h-8 rounded-full mt-2 mb-1"/>
                <span className="text-xs sm:text-base text-[var(--text-trinary)]">{task.postedBy.name}</span>
              </div>
              {/* details button  */}
              <button className="w-full mt-4 sm:py-2 bg-[var(--primary)] rounded-md text-sm sm:text-base font-medium hover:bg-[var(--primary-dark)] transition-colors">View Details</button> 
            </div>
              </Link>
          ))}
        </div>
        {/* no task found  */}
        {filteredTasks.length === 0 && (
           <div className="text-center py-12">
            <p className="text-xl text-gray-600">No tasks found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </Section>
  )
}
