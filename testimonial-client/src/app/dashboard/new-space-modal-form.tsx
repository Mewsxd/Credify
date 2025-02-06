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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { server_url } from "@/util/http";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";

const formSchema = z.object({
  spaceName: z
    .string()
    .min(5, "Space name too short")
    .max(50, "Space name too long"),
  title: z.string().min(10, "Title is too short").max(100, "Title is too long"),
  message: z.string().min(20, "Message should be more than 20 characters"),
  image: z.instanceof(File, { message: "Image is required" }).optional(),
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
  collectRating: z.boolean(),
  collectionType: z.string(),
  darkTheme: z.boolean(),
});

const NewSpaceForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      image: undefined,
      collectRating: true,
      collectionType: "",
      darkTheme: false,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
      form.setValue("image", file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const questions = [];

    //Push questions that are not empty
    if (values.question1) {
      questions.push(values.question1);
    }
    if (values.question2) {
      questions.push(values.question2);
    }
    if (values.question3) {
      questions.push(values.question3);
    }
    if (values.question4) {
      questions.push(values.question4);
    }
    if (values.question5) {
      questions.push(values.question5);
    }

    //Delete the question1,2,3,4,5 fields because they the backend expects a singular questions array
    delete values.question1;
    delete values.question2;
    delete values.question3;
    delete values.question4;
    delete values.question5;

    //@ts-ignore append questions array
    values.questions = questions;

    console.log("Form submitted!", values);

    // try {
    //   const response = await axios.post(server_url + "/space", values, {
    //     withCredentials: true,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <FormField
            control={form.control}
            name="spaceName"
            render={({ field }) => (
              <FormItem className=" my-4">
                <FormLabel>
                  Space name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your space name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-4">
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-4">
                <FormLabel>
                  Your custom message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Enter your message"
                    {...field}
                    className="textarea-class w-full rounded-md border border-gray-300 p-2 text-sm"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-4">
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
                {selectedFile && (
                  <p className="text-sm text-green-600">
                    File selected: {selectedFile.name}
                  </p>
                )}
              </FormItem>
            )}
          />
          <div className=" flex flex-col my-4 gap-3">
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
          </div>
          <div className=" flex flex-col space-y-2 my-10">
            <FormField
              name="collectEmail"
              render={({ field }) => {
                return (
                  <FormItem className=" flex items-center gap-4">
                    <FormControl className=" mt-2">
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
          </div>
          <div className=" flex items-center gap-14 my-4">
            <div>
              <h2 className=" mt-0 mb-2 text-sm font-semibold">
                Collection type
              </h2>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Text and Video">Text and Video</SelectItem>
                  <SelectItem value="Text only">Text only</SelectItem>
                  <SelectItem value="Video only">Video only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormField
              name="collectRating"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <h2 className=" mt-0 text-sm font-semibold">
                      Collect star rating
                    </h2>
                    <FormControl className=" mt-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              name="darkTheme"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <h2 className=" mt-0 text-sm font-semibold">
                      Choose a theme
                    </h2>
                    <FormControl className=" mt-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewSpaceForm;
