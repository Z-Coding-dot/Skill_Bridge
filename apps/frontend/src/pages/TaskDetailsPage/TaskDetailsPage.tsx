import { Link, useNavigate, useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { mockTasks } from "../../lib/consts/mockTasks/mockTask.data";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";

export const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = mockTasks.find((task) => task.id === id);

  if (!task) {
    return (
      <Section>
        <div className="min-h-screen flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl sm:text-4xl"> 😟 Oops, Task Not Found</h1>
          <Link to={"/taskBoard"}>
            <button className="sm:w-70 sm:h-10 w-full sm:text-lg">
              Return to task board
            </button>
          </Link>
        </div>
      </Section>
    );
  }
  return (
    <Section>
        <ScrollToTop/>
      {/* BreadCrumb  */}
      <div className="flex items-center mt-10 sm:mt-24 sm:ml-8">
        <span
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-100"
        >
          <ArrowLeft className="size-5" />
          Back to Tasks
        </span>
      </div>
      {/* contents */}
      <div className="flex flex-col sm:flex-row gap-6 xl:gap-10 my-10 sm:mx-10">
        {/* first column */}
        <div className="flex-2 border border-[var(--border)] p-6 rounded-t-xl sm:rounded-l-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-2xl xl:text-3xl">{task.title}</h1>
            <span className="text-sm sm:text-lg bg-[var(--success)] text-[var(--text-primary)] rounded-xl px-4 py-1 font-semibold ">
              {task.category}
            </span>
          </div>
          <div className="my-5 w-full h-0.5 bg-[var(--border)]" />
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2>Descriptions</h2>
              <h2 className="bg-gray-600 px-2 py-0.5 rounded-lg text-center">
                {task.status}
              </h2>
            </div>
            <p className="mt-8 mb-12">{task.description}</p>
            <div className="my-5 w-full h-[0.2px] bg-[var(--border)]" />
            <h2>Task Details</h2>
            <div className="flex items-center justify-between mt-5">
              <span className="text-xs sm:text-base flex items-center gap-2">
                <Calendar className="size-3 sm:size-6" /> Posted:
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {task.createdAt}
              </span>
            </div>
            <div className="my-5 w-full h-[0.2px] bg-[var(--border)]" />
            <div className="flex items-center justify-between ">
              <span className="text-xs sm:text-base flex items-center gap-2">
                <Calendar className="size-3 sm:size-6" /> Deadline:
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {task.deadline}
              </span>
            </div>
          </div>
        </div>
        {/* second column */}
        <div className="flex-1 flex flex-col justify-between border border-[var(--border)] p-6 rounded-b-xl sm:rounded-r-xl">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <h2 className="mb-5 truncate">Posted By</h2>
              <img
                src={task.postedBy.avatar}
                alt={task.postedBy.name}
                className="size-16 sm:w-18 sm:h-18 rounded-full mt-2 mb-1"
              />
            </div>
            <div className="flex flex-col items-start mt-10">
              <span className="text-sm sm:text-base xl:text-2xl text-[var(--text-trinary)]">
                {task.postedBy.name}
              </span>
              <Link to={"/"} className="flex items-center gap-2 mt-2">
                <p className="text-xs lg:text-sm">View Profile</p>
                <ExternalLink className="size-4 lg:size-5" />
              </Link>
            </div>
          </div>
          {/* Apply for this task */}
          <div className="mt-10">
            <button className="w-full py-3 bg-[var(--success)] hover:bg-green-600">
              Apply for this task
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};
