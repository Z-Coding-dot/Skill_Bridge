import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import loginImg from "../../assets/login_signUp.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/header/SkillBridge.svg';
import {motion} from 'motion/react';

type SignInField = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const {register, handleSubmit,  formState: { errors },} = useForm<SignInField>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data: SignInField) => {
    console.log(data);
    login({email: data.email});
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-row-reverse items-center min-h-screen">
      <motion.div
      initial={{opacity: 0, x: 20}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.3, delay: 0.2}}
       className="hidden sm:flex w-1/2 flex-col items-center justify-center bg-[var(--login-bg)]">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src={loginImg} alt="login page" className="1xl:w-70 2xl:w-100" />
          <h1 className="text-base sm:text-xl xl:text-2xl font-semibold text-[var(text-primary)] mr-12 mt-6 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-[var(text-secondary)] mr-14">
            Sign in to continue your journey
          </p>
        </div>
      </motion.div>

      <motion.div
      initial={{opacity: 0, x: -20}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.3, delay: 0.2}}
       className="bg-primary sm:bg-white sm:w-1/2 w-full 1xl:min-w-[220px] 2xl:min-w-[400px]">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Link to="/">
          <img src={logo} alt="SkillBridge" className="block sm:hidden w-70 -mt-15 mr-10" />
          </Link>
          <h1 className="sm:text-black text-center text-3xl sm:text-5xl font-bold mb-2 sm:mb-10 mr-14">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 px-4 max-sm:w-full 1xl:min-w-[280px] 2xl:min-w-[400px]">
            {/* Email */}
            <div className="flex flex-col gap-1 w-full 1xl:min-w-[280px] 2xl:min-w-[400px] mb-2">
              <label htmlFor="email" className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">Email</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none"/>

              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>)}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 w-full 1xl:min-w-[280px] 2xl:min-w-[400px] mb-2">
              <label htmlFor="password" className="text-secondary sm:text-gray-700 1xl:text-sm 2xl:text-base">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder=".........."
                className="w-full 1xl:py-1 2xl:py-2 1xl:text-sm 2xl:text-base bg-gray-200 text-gray-900 mb-1 border-none"/>

              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-center 1xl:py-2.2 text-medium xl:text-lg bg-login-bg hover:bg-blue-950 mt-4">
              Log In
            </button>
          </form>

          {/* Redirect */}
          <div className="flex items-center mt-4 space-x-2">
            <p className="font-semibold">New here?</p>
            <Link to="/signup" className="text-[var(--accent)] font-bold">
              Create Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
