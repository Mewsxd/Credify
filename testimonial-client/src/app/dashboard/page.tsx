import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

const DashboardPage = () => {
  return (
    <div className=" max-w-5xl px-4 mx-auto font-inter">
      <p className=" font-inter">DashboardPage</p>
      <div className=" flex justify-between items-center">
        <p className=" text-4xl font-semibold">Spaces</p>
        <Button className=" flex items-center gap-2">
          <FaPlus /> Create space
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
