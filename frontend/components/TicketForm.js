// TicketForm.js
"use client"; // This is a client component
import React, { useState } from "react";

const TicketForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://my-help-desk-49b4693cd9d4.herokuapp.com//api/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            problemDescription,
            status: "New", // Assuming the default status for new tickets is 'New'
          }),
        }
      );

      if (response.ok) {
        console.log("Ticket submitted successfully!");
        // Reset form fields after successful submission
        setName("");
        setEmail("");
        setProblemDescription("");
      } else {
        console.error("Failed to submit ticket", response);
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Problem Description:
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TicketForm;