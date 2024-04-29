import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

function About() {
  const [data, setData] = useState([]);

  // Function to get all employees
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
      })
      .catch((error) => console.error("Error fetching employees:", error));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="flex flex-wrap justify-center mt-6 space-x-8">
      {/* Map over the employee data and generate cards */}
      {data.map((employee) => (
        <Card
          key={employee.id}
          className="w-60 border border-gray-300 rounded-lg mb-6"
        >
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {employee.name}
            </Typography>
            <Typography className="text-sm text-gray-500">
              {employee.role}
            </Typography>
            <Typography className="text-sm text-gray-500">
              {employee.location}
            </Typography>
            <Typography className="text-sm text-gray-500">
              STRATEGIC BUSINESS UNIT: {employee.department}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default About;
