import { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import Ticket from "../components/Ticket";
import Link from "next/link";

const AdminPanel = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tickets, setTickets] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log("got backend url ", backendURL);
    fetch(`${backendURL}/api/tickets`)
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {!authenticated ? (
        <SignIn setAuthenticated={setAuthenticated} />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex w-full items-center justify-center">
            <header className="text-5xl font-bold mb-4 text-white">
              {" "}
              {/* Adjusted margin-bottom here */}
              Admin Panel - View Tickets
            </header>
          </div>

          <div className="flex flex-grow">
            {/* Column 1 - New Tickets */}
            <div className="flex-1 border p-4 flex flex-col bg-gradient-to-r">
              <h2 className="text-xl mb-4 text-blue-500 text-center">
                New Tickets
              </h2>
              {tickets
                .filter((ticket) => ticket.status === "New")
                .map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    name={ticket.name}
                    email={ticket.email}
                    description={ticket.problem_description}
                    status={ticket.status}
                  />
                ))}
            </div>

            {/* Column 2 - In Progress Tickets */}
            <div className="flex-1 border p-4 flex flex-col bg-gradient-to-r">
              <h2 className="text-xl mb-4 text-yellow-500 text-center">
                In Progress Tickets
              </h2>
              {tickets
                .filter((ticket) => ticket.status === "In Progress")
                .map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    name={ticket.name}
                    email={ticket.email}
                    description={ticket.problem_description}
                    status={ticket.status}
                  />
                ))}
            </div>

            {/* Column 3 - Resolved Tickets */}
            <div className="flex-1 border p-4 flex flex-col bg-gradient-to-r rounded">
              <h2 className="text-xl mb-4 text-green-500 text-center">
                Resolved Tickets
              </h2>
              {tickets
                .filter((ticket) => ticket.status === "Resolved")
                .map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    name={ticket.name}
                    email={ticket.email}
                    description={ticket.problem_description}
                    status={ticket.status}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
