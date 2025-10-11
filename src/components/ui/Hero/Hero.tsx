import Section from "../../Section/Section";

export default function Hero() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">
        Connect Talent. Build Skills. Get Hired.
      </h1>
      <p className="max-w-2xl mx-auto text-[var(--text-secondary)]">
        SkillBridge links students, freelancers, and companies through real-world tasks, internships, and projects.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button>Explore Tasks</button>
        <button className="bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-primary)]">
          Post a Task
        </button>
      </div>
    </Section>
  );
}
