"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import NewSpaceForm from "./new-space-modal-form";

const NewSpaceModal = () => {
  return (
    <Dialog>
      <DialogTrigger className=" flex items-center gap-2">
        {/* <Button className=" flex items-center gap-2"> */}
        <FaPlus /> Create space
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <div className=" w-full flex font-inter">
          <div className=" preview w-[35%] border">
            <p>Hello</p>
          </div>
          <div className=" form w-[65%] border p-4">
            <h1 className=" text-3xl font-bold text-center py-4">
              Create a new Space
            </h1>
            <p className=" text-center text-gray-500">
              After the Space is created, it will generate a dedicated page for
              collecting testimonials.
            </p>
            <NewSpaceForm />
          </div>
        </div>
        {/* <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.This action cannot be
            undone. 
          </DialogDescription>
        </DialogHeader> */}
      </DialogContent>
    </Dialog>
  );
};

export default NewSpaceModal;
