import React, { useState, useEffect } from "react";

// Card component to display employee details
const EmployeeCard = ({ employee }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        minWidth: "150px",
        position: "relative",
      }}
    >
      <h3>
        <b>Name: </b> {employee.name}
      </h3>
      <p>
        <b>Role: </b> {employee.role}
      </p>
    </div>
  );
};

// Recursive function to render the organizational tree with connectors
const renderTree = (node, level = 0) => {
  if (!node.reportings || node.reportings.length === 0) {
    return <EmployeeCard employee={node} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <EmployeeCard employee={node} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        {node.reportings.map((assignee) => (
          <div
            key={assignee.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {renderTree(assignee, level + 1)}
          </div>
        ))}
      </div>
      {node.reportings.map((assignee, index) => (
        <svg
          key={index}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
          width="40"
          height={node.reportings.length * 50 - 50}
        >
          <line
            x1="20"
            y1="0"
            x2="20"
            y2={node.reportings.length * 50 - 50}
            style={{
              stroke: "#ccc",
              strokeWidth: 1,
            }}
          />
        </svg>
      ))}
    </div>
  );
};

const OrgTreeWithConnectors = (data) => {
  return renderTree(data.data);
};

const App = () => {
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("default-search").value.trim();
    if (inputValue) {
      fetch(`http://localhost:5000/employee2?name=${inputValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "error" && data.message === "User not found") {
            setData([]);
          } else setData(data);
        });
    } else {
      console.log("hi");
    }
  };

  useEffect(() => {
    // Fetch initial data
  }, []);

  return (
    <>
      <form onSubmit={handleSearch} className="max-w-md mx-auto mt-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Employees..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div>
        <OrgTreeWithConnectors data={data} />
      </div>
    </>
  );
};

export default App;
