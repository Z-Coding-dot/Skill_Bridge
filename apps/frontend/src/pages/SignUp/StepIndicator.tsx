
type Props = { step: number };
export default function StepIndicator({ step }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {[1,2,3].map(n => (
        <div key={n} className="flex items-center">
          <div className={`rounded-full p-2 ${step === n ? "bg-green-500 text-white" : "bg-gray-300"}`}>
            {n}
          </div>
          {n < 3 && <div className={`h-0.5 w-12 ${step >= n ? "bg-green-400" : "bg-gray-300"} mx-2`} />}
        </div>
      ))}
    </div>
  );
}
