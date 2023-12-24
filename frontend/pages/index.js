import { useEffect } from "react";
import FormButton from "../components/FormButton";

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "false");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <header className="text-5xl font-bold mb-4">
        {" "}
        {/* Adjusted margin-bottom here */}
        Add Ticket to Help Desk
      </header>
      <FormButton />
    </div>
  );
};

export default Home;
