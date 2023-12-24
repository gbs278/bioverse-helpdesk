const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const { Pool } = require("pg");
require("dotenv").config();
app.use(express.json());
app.use(cors());

const URL = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: URL,
  ssl: { rejectUnauthorized: false },
});

// Get all tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM tickets");
    const tickets = result.rows;
    res.json(tickets);
    client.release();
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create a new ticket
app.post("/api/tickets/", async (req, res) => {
  const { name, email, problemDescription, status } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO tickets (name, email, problem_description, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, problemDescription, status]
    );

    const newTicket = result.rows[0];
    res.status(201).json(newTicket);
    client.release();
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update ticket status by ID
app.put("/api/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
      [newStatus, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Ticket not found" });
    } else {
      res.json({ message: "Ticket status updated successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ticket status", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
