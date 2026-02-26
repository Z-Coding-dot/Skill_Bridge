import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function Step2Skills() {
  const {control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const [input, setInput] = useState("");

  const addSkill = () => {
    const v = input.trim();
    if (!v) return;
    // prevent duplicates
    if (fields.some(f => f.value.toLowerCase() === v.toLowerCase())) {
      setInput("");
      return;
    }
    append({ value: v });
    setInput("");
  };

  return (
    <div className="1xl:min-w-[280px] 2xl:min-w-[400px]">
      <h3 className="font-semibold mb-2 sm:text-gray-950 text-center text-sm 1xl:text-base 2xl:text-lg">Your Skills</h3>
      <p className="mb-3 text-center text-sm 1xl:text-base 2xl:text-base">Add skills you can showcase or want to learn</p>

      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
          placeholder="e.g., React, Python"
          className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none"
        />
        <button type="button" onClick={addSkill} className="px-4 py-2 border">Add</button>
      </div>

      {errors.skills && (
        <p className="text-red-600 text-sm mb-2">{(errors.skills as any).message}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {fields.map((f, idx) => (
          <div key={f.id} className="px-3 py-1 bg-gray-200 rounded flex items-center gap-2">
            <span className="capitalize text-sm text-gray-800">{f.value}</span>
            <button type="button" onClick={() => remove(idx)} aria-label={`remove ${f.value}`}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
