import React, { useState, useEffect } from "react";

// Sample organizational data
const orgData = {
  name: "CEO",
  designation: "Chief Executive Officer",
  assignees: [
    {
      name: "Manager A",
      designation: "Manager",
      assignees: [
        {
          name: "Employee A1",
          designation: "Employee",
          assignees: [
            { name: "Employee A1", designation: "Employee" },
            { name: "Employee A2", designation: "Employee" },
          ],
        },
        { name: "Employee A2", designation: "Employee" },
      ],
    },
    {
      name: "Manager B",
      designation: "Manager",
      assignees: [
        { name: "Employee B1", designation: "Employee" },
        { name: "Employee B2", designation: "Employee" },
      ],
    },
  ],
};

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
      <h3>{employee.name}</h3>
      <p>{employee.designation}</p>
    </div>
  );
};

// Recursive function to render the organizational tree with connectors
const renderTree = (node) => {
  if (!node.assignees || node.assignees.length === 0) {
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
        style={{ display: "flex", flexDirection: "row", position: "relative" }}
      >
        {node.assignees.map((assignee) => (
          <div
            key={assignee.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {renderTree(assignee)}
          </div>
        ))}
      </div>
      {node.assignees.map((assignee, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            width: "20px",
            height: "0",
            zIndex: "-1",
          }}
        ></div>
      ))}
    </div>
  );
};

const OrgTreeWithConnectors = () => {
  return renderTree(orgData);
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmployees = () => {
      fetch("http://localhost:5000/getEmployees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
          // console.log(data.data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    };
    getEmployees();
  }, []);

  console.log("this is details", data);

  return (
    <div>
      <OrgTreeWithConnectors />
    </div>
  );
};

export default App;
