import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StepIndicator from "./StepIndicator";
import Step1UserInfo from "./Step1UserInfo";
import Step2Skills from "./Step2Skills";
import Step3Password from "./Step3Password";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../assets/login_signUp.webp";
import logo from "../../assets/header/SkillBridge.svg";
import { useAuth } from "../../context/AuthContext";
import {motion} from 'motion/react';


/* form types */
type FormData = {
  name: string;
  email: string;
  bio?: string;
  skills: { value: string }[]; 
  password: string;
  confirmPassword: string;
};

/* validation schema */
const schema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  bio: yup.string().nullable(),
  skills: yup
    .array()
    .of(yup.object({ value: yup.string().required() }))
    .min(1, "Add at least one skill"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 chars"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      skills: [],
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = (data: FormData) => {
    login({email: data.email});
    navigate("/dashboard");

    // send to server here 

  };

  const handleNext = async () => {
    const fieldsToValidate =
      step === 1 ? ["name", "email"] : step === 2 ? ["skills"] : [];
    const ok = await trigger(fieldsToValidate as any);
    if (!ok) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <FormProvider {...methods}>
      <div className="flex bg-[var(--login-bg)] ">
        <motion.div
         initial={{opacity: 0, x: 50}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
         className="hidden w-1/2 sm:flex flex-col items-center justify-center">
          <img src={signup} alt="sing Up photo" className="1xl:w-70 2xl:w-100" />
          <div className="mt-10 mr-12 2xl:mr-16">
            <StepIndicator step={step} />
          </div>
        </motion.div>
        <motion.div
        initial={{opacity: 0, x: -50}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.5}}
         className="w-full h-screen flex flex-col justify-center items-start sm:w-1/2 p-8 bg-primary sm:bg-white text-[var(--text-primary)] 2xl:px-40 2xl:pt-16">
          <Link to="/">
            <img
              src={logo}
              alt="skillBridge logo"
              className="object-cover object-center 1xl:w-60 2xl:w-90 3xl:w-120 1xl:ml-7 2xl:ml-0 3xl:ml-20"
            />
          </Link>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full 1xl:min-w-[220px] 2xl:min-w-[400px]">
            {step === 1 && <Step1UserInfo />}
            {step === 2 && <Step2Skills />}
            {step === 3 && <Step3Password />}

            <div className="mt-6 flex gap-3 w-full 1xl:min-w-[280px] 2xl:min-w-[400px]">
              {step > 1 && (
                <button type="button" onClick={handleBack}className="px-4 py-2 border">Back</button>
              )}

              {step < 3 ? (
                <button
                  type="button" onClick={handleNext} className="w-full text-center 1xl:py-1 text-medium xl:text-lg bg-login-bg hover:bg-blue-950">Next</button>
              ) : (
                <button type="submit" className="px-6 py-2 bg-[var(--success)] w-full"> Create Account </button>
              )}
            </div>
            <div className="flex items-center justify-center mt-4 gap-2 w-full 1xl:min-w-[280px] 2xl:min-w-[400px]">
              <p className="font-semibold text-center">Already a member?</p>
              <Link to="/login" className="text-[var(--accent)] font-bold">
                Sign In
              </Link>
            </div>

          </form>
        </motion.div>
      </div>
    </FormProvider>
  );
}
