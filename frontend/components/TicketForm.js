"use client";
import React, { useState } from "react";

const TicketForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmit = async (e) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    e.preventDefault();
    try {
      const response = await fetch(`${backendURL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          problemDescription,
          status: "New",
        }),
      });

      if (response.ok) {
        console.log("Ticket submitted successfully!");
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
