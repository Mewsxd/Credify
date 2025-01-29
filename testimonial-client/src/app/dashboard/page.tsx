"use client";
import { Button } from "@/components/ui/button";
import { useMainContext } from "@/hooks/useMainContext";
import { FaPlus } from "react-icons/fa6";
import { HiFolderPlus } from "react-icons/hi2";
import NewSpaceModal from "./new-space-modal";

const DashboardPage = () => {
  const { userData } = useMainContext();

  if (!userData) {
    return (
      <div className=" max-w-5xl px-4 mx-auto font-inter">
        <p className="text-xl font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" max-w-5xl px-4 mx-auto font-inter">
      <div className=" flex justify-between items-center">
        <p className=" text-4xl font-semibold">Spaces</p>
        {userData.spaces?.length > 0 && (
          <Button className=" flex items-center gap-2">
            <FaPlus /> Create space
          </Button>
        )}
      </div>
      {userData.spaces?.length === 0 && (
        <div className=" bg-gray-300 flex flex-col space-y-4 items-center p-10 rounded-xl my-12">
          <HiFolderPlus className=" text-3xl" />
          <p className=" text-2xl font-semibold">No spaces yet</p>
          <p>Create your first space to start collecting testimonials</p>
          {/* <Button className=" flex items-center gap-2">
            <FaPlus /> Create space
          </Button> */}
          <NewSpaceModal />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
