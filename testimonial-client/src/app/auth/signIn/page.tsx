"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { server_url } from "@/util/http";
import Link from "next/link";
import axios from "axios";
import { useContext } from "react";
import MainContext from "@/store/MainContext";
import { useMainContext } from "@/hooks/useMainContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password should be more than 8 characters")
    .max(20, "Password should not be more than 20 characters"),
});

const SignIn = () => {
  const { setUserData } = useMainContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const data = values;
    const res = await axios.post(server_url + "/auth/signIn", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    //@ts-ignore
    setUserData(res.data.data);
  };

  return (
    <div className="max-w-md font-inter  mx-auto flex flex-col items-center">
      <div className=" w-full  p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a strong password between 8-20 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className=" py-4">
        <p>
          Don't have an account? Sign up{" "}
          <Link href={"/auth/signUp"} className=" underline">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
