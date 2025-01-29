"use client";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  spaceName: z
    .string()
    .min(5, "Space name too short")
    .max(50, "Space name too long"),
  title: z.string().min(10, "Title is too short").max(100, "Title is too long"),
  message: z.string().min(20, "Message should be more than 20 characters"),
  question1: z
    .string()
    .max(100, "Question should be less than 100 characters")
    .optional(),
  question2: z
    .string()
    .max(100, "Question should be less than 100 characters")
    .optional(),
  question3: z
    .string()
    .max(100, "Question should be less than 100 characters")
    .optional(),
  question4: z
    .string()
    .max(100, "Question should be less than 100 characters")
    .optional(),
  question5: z
    .string()
    .max(100, "Question should be less than 100 characters")
    .optional(),
  collectEmail: z.boolean(),
  collectCompany: z.boolean(),
  collectSocial: z.boolean(),
  collectAddress: z.boolean(),
  // collectRating: z.boolean(),
});
const NewSpaceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spaceName: "",
      title: "",
      message: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      collectEmail: false,
      collectCompany: false,
      collectSocial: false,
      collectAddress: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted!"); // Check if this logs

    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="spaceName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Space name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your space name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="message"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Your custom message <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Enter your message"
                      {...field}
                      className="textarea-class w-full rounded-md border border-gray-300 p-2 text-sm "
                      rows={4} // Adjust the number of rows as needed
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className=" flex flex-col gap-3">
            <FormField
              name="question1"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Questions</FormLabel>
                    <FormControl>
                      <Input placeholder="Question 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="question2"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel> */}
                    <FormControl>
                      <Input placeholder="Question 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="question3"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel> */}
                    <FormControl>
                      <Input placeholder="Question 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="question4"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel> */}
                    <FormControl>
                      <Input placeholder="Question 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="question5"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel> */}
                    <FormControl>
                      <Input placeholder="Question 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="collectEmail"
              render={({ field }) => {
                return (
                  <FormItem className=" flex items-center gap-4">
                    <FormControl className=" mt-2" className=" mt-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <h2 className=" mt-0 text-sm font-semibold">Email</h2>
                  </FormItem>
                );
              }}
            />

            <FormField
              name="collectCompany"
              render={({ field }) => {
                return (
                  <FormItem className=" flex items-center gap-4">
                    <FormControl className=" mt-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <h2 className=" mt-0 text-sm font-semibold">
                      Title, Company
                    </h2>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="collectSocial"
              render={({ field }) => {
                return (
                  <FormItem className=" flex items-center gap-4">
                    <FormControl className=" mt-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <h2 className=" mt-0 text-sm font-semibold">Social link</h2>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="collectAddress"
              render={({ field }) => {
                return (
                  <FormItem className=" flex items-center gap-4">
                    <FormControl className=" mt-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <h2 className=" mt-0 text-sm font-semibold">Address</h2>
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewSpaceForm;
