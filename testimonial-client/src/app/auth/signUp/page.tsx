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

const formSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters").max(50),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should be more than 8 characters")
      .max(20, "Password should not be more than 20 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path of error
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const data = values;
    delete data.confirmPassword;
    const req = await fetch(server_url + "/auth/signUp", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // Ensure JSON data is correctly identified
      },
    });
    const res = await req.json();
    console.log(res);
  };

  return (
    <div className="max-w-md font-inter  mx-auto flex flex-col items-center">
      <div className=" w-full  p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Enter your full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
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
          Already have an account? Log in{" "}
          <Link href={"/auth/signIn"} className=" underline">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
