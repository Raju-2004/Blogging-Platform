import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
    let img = e.target.files
    console.log(img)
  };

  return (
    <div className="w-full bg-white z-10 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="path_to_your_logo_image"
              alt="Logo"
              className="h-8 w-auto mr-8"
            />
          </Link>
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="Search blogs..."
            className="mr-4 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:bg-gray-200"
          />
          <Link to={`/search/${searchText}`} className="mr-4">
            <button className="px-4 py-2 rounded-md focus:outline-none">
              Search
            </button>
          </Link>
        </div>

        <div className="hidden sm:flex items-center">
          <Link to="/signup" className="mr-4">
            <button className="px-4 py-2 rounded-md focus:outline-none">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 rounded-md focus:outline-none">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
