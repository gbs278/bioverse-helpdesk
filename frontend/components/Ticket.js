import { useState, useEffect } from "react";

const Ticket = ({ id, name, email, description, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowChangeStatus(false);

    setNewStatus("");
  };
  const handleStatusUpdate = () => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    fetch(`${backendURL}/api/tickets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        closeModal();
        localStorage.setItem("changedStatus", "true");
        const statusChange = `Ticket id ${id} status changde from ${status} to ${newStatus} \nName: ${name}\nDescription: ${description}\nEmail Address: ${email}`;
        localStorage.setItem("ticketStatusChange", statusChange);
        const shouldReload = window.confirm(statusChange);
        if (shouldReload) {
          window.location.reload(); // Reload the page if user confirms
        }
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        // Handle errors
      });
  };
  useEffect(() => {
    const statusChanged = localStorage.getItem("changedStatus");
    const statusMessage = localStorage.getItem("ticketStatusChange");

    // Check if the status has changed and it's the same ticket
    if (statusChanged === "true") {
      console.log(statusMessage);

      // Clear the flags in localStorage
      localStorage.removeItem("changedStatus");
      localStorage.removeItem("ticketStatusChange");
    }
  }, []); // useEffect runs whenever the 'id' changes

  //  from-gray-900 to-gray-800
  return (
    <div className="border p-4 my-4 rounded-md shadow-md bg-white">
      <p className="text-black">{description}</p>
      <button
        className="mt-2 bg-gray-900 text-white px-3 py-1 rounded-md"
        onClick={openModal}
      >
        View Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-black">
            <h2 className="text-2xl text-black font-semibold mb-4">
              Ticket Details
            </h2>

            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            {showChangeStatus ? (
              <div>
                <div>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="mt-4 bg-gray-400 text-white px-3 py-1 rounded-md"
                  >
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button
                    className="mt-4 bg-gray-800 text-white px-3 py-1 rounded-md"
                    onClick={handleStatusUpdate}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="mt-4 bg-gray-400 text-white px-3 py-1 rounded-md"
                onClick={() => setShowChangeStatus(true)}
              >
                Change Status
              </button>
            )}
            <button
              className="mt-4 bg-gray-800 text-white px-3 py-1 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
