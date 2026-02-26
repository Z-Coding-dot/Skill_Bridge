import { useFormContext } from "react-hook-form";

export default function Step3Password() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-1 w-full 1xl:min-w-[280px] 2xl:min-w-[400px]">
      <label className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">Password</label>
      <input {...register("password")} type="password" className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none" />
      {errors.password && <p className="text-red-600 text-sm">{errors.password.message as string}</p>}

      <label className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">Confirm Password</label>
      <input {...register("confirmPassword")} type="password" className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none" />
      {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message as string}</p>}
    </div>
  );
}
