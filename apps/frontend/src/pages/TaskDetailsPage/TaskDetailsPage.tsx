import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import { ArrowLeft, Calendar, ExternalLink, User } from "lucide-react";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import { getTaskById } from "@/api/tasks.api";
import { submitApplication } from "@/api/applications.api";
import { TaskDetailsSkeleton } from "@/components/Loaders/TaskDetailsPageSkeleton";
import { ROUTES } from "@/routes/routeConfig";

export const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: task, isPending } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id as string),
    enabled: Boolean(id),
  });

  const applyMutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      navigate(`/${ROUTES.MESSAGES}`, {
        state: {
          receiverId: task!.postedBy.id,
          initialMessage: `Hi, I would like to apply for your task "${task!.title}".`,
          receiverName: task!.postedBy.name,
          receiverAvatar: task!.postedBy.avatar ?? "",
        },
      });
    },
  });

  if (isPending) return <TaskDetailsSkeleton />;

  if (!task) {
    return (
      <Section>
        <div className="min-h-screen flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl sm:text-4xl">😟 Oops, Task Not Found</h1>
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
      <ScrollToTop />

      {/* Breadcrumb */}
      <div className="flex items-center mt-10 sm:mt-24 sm:ml-8">
        <span
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-100"
        >
          <ArrowLeft className="size-5" />
          Back to Tasks
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-6 xl:gap-10 my-10 sm:mx-10">
        {/* First column */}
        <div className="flex-2 border border-[var(--border)] p-6 rounded-t-xl sm:rounded-l-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-2xl xl:text-3xl">{task.title}</h1>
            <span className="text-sm sm:text-lg bg-[var(--success)] text-[var(--text-primary)] rounded-xl px-4 py-1 font-semibold">
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

            <p className="mt-8 mb-12 whitespace-pre-wrap">{task.description}</p>

            <div className="my-5 w-full h-[0.2px] bg-[var(--border)]" />
            <h2>Task Details</h2>

            <div className="flex items-center justify-between mt-5">
              <span className="text-xs sm:text-base flex items-center gap-2">
                <Calendar className="size-3 sm:size-6" /> Posted:
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="my-5 w-full h-[0.2px] bg-[var(--border)]" />

            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-base flex items-center gap-2">
                <Calendar className="size-3 sm:size-6" /> Deadline:
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Second column */}
        <div className="flex-1 sm:h-[300px] flex flex-col justify-between border border-[var(--border)] p-6 rounded-b-xl sm:rounded-r-xl">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h2 className="mb-5">Posted By</h2>
              {task.postedBy.avatar
                ? <img src={task.postedBy.avatar} alt={task.postedBy.name} className="size-16 rounded-full object-cover mt-2 mb-1" />
                : <span className="size-16 rounded-full mt-2 mb-1 bg-card-bg flex items-center justify-center"><User className="size-10 text-white" /></span>
              }
            </div>
            <div className="flex flex-col items-start mt-10">
              <span className="text-sm sm:text-base xl:text-2xl text-[var(--text-trinary)]">
                {task.postedBy.name}
              </span>
              <Link to={`/profile/${task.postedBy.id}`} className="flex items-center gap-2 mt-2">
                <p className="text-xs lg:text-sm">View Profile</p>
                <ExternalLink className="size-4 lg:size-5" />
              </Link>
            </div>
          </div>

          {/* Apply */}
          <div className="mt-10 flex flex-col gap-2">
            <button
              onClick={() =>
                applyMutation.mutate({
                  taskId: task.id,
                  pitch: `Hi, I would like to apply for your task "${task.title}".`,
                })
              }
              disabled={applyMutation.isPending || applyMutation.isSuccess}
              className="w-full py-3 bg-[var(--success)] hover:bg-green-600 disabled:opacity-60"
            >
              {applyMutation.isPending ? "Applying..." : applyMutation.isSuccess ? "Applied!" : "Apply for this task"}
            </button>

            {applyMutation.isError && (
              <p className="text-xs text-red-500 text-center">
                You may have already applied for this task.
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};
