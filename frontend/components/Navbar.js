import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-900 sticky">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-between h-20 text-white">
          <li>
            <Link href="/">
              <h1>Add Ticket</h1>
            </Link>
          </li>
          <li>
            <Link href="/admin">
              <h1>Admin Panel</h1>
            </Link>
          </li>
          <li>
            <a
              href="https://www.galbenshushan.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gal's Portfolio Website 😊
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
