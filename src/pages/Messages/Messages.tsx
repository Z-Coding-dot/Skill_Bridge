import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { getMessages, } from "@/api/messages.api";

export const Messages = () => {
 const { data, isLoading } = useQuery({
  queryKey: ["messages"],
  queryFn: getMessages,
});

const messages = Array.isArray(data) ? data : [];


  if (isLoading) return <Section>Loading messages...</Section>;

  return (
    <Section>
      <h1 className="text-xl font-semibold mb-6">Messages</h1>

      {messages.length === 0 ? (
        <p className="text-stone-400">You have no messages.</p>
      ) : (
        <div className="flex flex-col gap-4 mt-12">
          {messages.map((msg) => (
            <div key={msg.id}
              className="flex flex-col bg-2card p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{msg.senderId}</span>
                <span className="text-xs text-stone-400">{msg.createdAt}</span>
              </div>
              <p className="text-white">{msg.text}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};
