import { useFormContext } from "react-hook-form";

export default function Step1UserInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-1 w-full 1xl:min-w-[280px] 2xl:min-w-[400px]">
        <h2 className="text-center sm:text-gray-800 font-bold 2xl:text-2xl -mt-5 2xl:-mt-8">Create an Account</h2>
      <label className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">Full Name</label>
      <input {...register("name")} placeholder="Yahya Nori" className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none" />
      {errors.name && <p className="text-red-600 text-sm">{errors.name.message as string}</p>}

      <label className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">Email</label>
      <input {...register("email")} placeholder="example@gmail.com" className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none" />
      {errors.email && <p className="text-red-600 text-sm">{errors.email.message as string}</p>}

      <label className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">Bio (optional)</label>
      <textarea {...register("bio")} placeholder="Tell us about yourself..." className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none" />
    </div>
  );
}
