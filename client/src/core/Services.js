import React, { useState, useEffect, useRef } from "react";
import TreeNode from "../components/TreeNode";
import "../index.css";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Services = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [employeeID, setEmployeeID] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    role: "",
    location: "",
    department: "",
  });
  const [empID, setEmpID] = useState({
    id: "",
    name: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //add employee modal
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const api = "http://localhost:5000/employees-Add";
  //   fetch(api, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => response.text()) //response in txt
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting student data:", error);
  //     });
  // };
  // const [errorMessage, setErrorMessage] = useState("");
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Check if any field is empty
  //   const isEmptyField = Object.values(userData).some((value) => value === "");

  //   if (isEmptyField) {
  //     setErrorMessage("Please fill out all fields.");
  //     return; // Don't submit the form if any field is empty
  //   }

  //   // Clear any previous error message
  //   setErrorMessage("");

  //   const api = "http://localhost:5000/employees-Add";
  //   fetch(api, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting student data:", error);
  //     });
  // };

  //add reporting modal
  const handleSubmitRep = (e) => {
    e.preventDefault();

    const selectedEmployeeName =
      document.querySelector("#employeeSelect").value; // Assuming employee name is directly available as the value of the select element
    const selectedReportingIds = Array.from(
      document.querySelectorAll("#reportingSelect option:checked")
    ).map((option) => option.value);

    // Make the PUT request with the selected IDs
    fetch("http://localhost:5000/addReportings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeName: selectedEmployeeName,
        reportingIds: selectedReportingIds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error submitting reportings:", error);
      });
  };

  // Inside Services component
  useEffect(() => {
    getEmployeeIDs();
  }, []);

  function getEmployeeIDs() {
    fetch(`http://localhost:5000/employees/ids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Assuming data is an array of employee objects
        const employeeIds = data.map((employee) => employee.name);
        setEmployeeID(employeeIds);
        console.log(employeeIds, "Employee IDs");
      })
      .catch((error) => {
        console.error("Error fetching employee IDs:", error);
      });
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen1);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("default-search").value.trim();
    console.log(inputValue, "handlesearch");
    if (inputValue) {
      fetch(`http://localhost:5000/singleID?name=${inputValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("ok", data);
          if (data.status == "error" && data.message == "User not found") {
            setData([]);
          } else setData(data.data);
        });
    } else {
      console.log("hi");
    }
  };

  //states
  const [errors, setErrors] = useState({});

  //focus
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const locationRef = useRef(null);
  const departmentRef = useRef(null);

  //validation
  const validateForm = () => {
    const { id, name, role, location, department } = userData;
    const formErrors = {};

    // Check for required fields
    if (!id.trim()) {
      formErrors.id = "ID is required";
    }
    if (!name.trim()) {
      formErrors.name = "Name is required";
    }
    if (!role.trim()) {
      formErrors.role = "Role is required";
    }
    if (!location.trim()) {
      formErrors.location = "Location is required";
    }
    if (!department.trim()) {
      formErrors.age = "Department is required";
    }

    return formErrors;
  };
  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const api = "http://localhost:5000/employees-Add";
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Response from server:", data);
        })
        .catch((error) => {
          console.error("Error submitting student data:", error);
        });
    } else {
      // Focus on the first input field with an error
      if (formErrors.id) {
        idRef.current.focus();
      } else if (formErrors.name) {
        nameRef.current.focus();
      } else if (formErrors.role) {
        roleRef.current.focus();
      } else if (formErrors.location) {
        locationRef.current.focus();
      } else if (formErrors.department) {
        departmentRef.current.focus();
      }
    }
  };

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
      <div className="w-9/12 mx-auto flex justify-evenly mt-5">
        <div>
          {/* <!-- Modal toggle --> */}
          <button
            onClick={toggleModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add Employee
          </button>

          {/* <!-- Main modal --> */}
          {isModalOpen && (
            <div
              id="crud-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75"
            >
              <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add new Employee
                    </h3>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="id"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Employee ID:
                        </label>
                        <input
                          ref={idRef}
                          type="number"
                          name="id"
                          id="id"
                          value={userData.id}
                          onChange={handleInput}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.id && "input-error"
                          }`}
                          placeholder="Enter Employee ID"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Name
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          name="name"
                          id="name"
                          value={userData.name}
                          onChange={handleInput}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.name && "input-error"
                          }`}
                          placeholder="Enter your Name"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="role"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Role
                        </label>
                        <input
                          ref={roleRef}
                          type="text"
                          name="role"
                          id="role"
                          value={userData.role}
                          onChange={handleInput}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.role && "input-error"
                          }`}
                          placeholder="Enter your Role"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="location"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Location
                        </label>
                        <input
                          ref={locationRef}
                          type="text"
                          name="location"
                          id="location"
                          value={userData.location}
                          onChange={handleInput}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.location && "input-error"
                          }`}
                          placeholder="Enter your Location"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="department"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Department
                        </label>
                        <input
                          ref={departmentRef}
                          type="text"
                          name="department"
                          id="department"
                          value={userData.department}
                          onChange={handleInput}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.department && "input-error"
                          }`}
                          placeholder="Enter your Department"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="error-container">
                      {Object.values(errors).map((error, index) => (
                        <p key={index} className="error-message">
                          {error}
                        </p>
                      ))}
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Add new Employee
                    </button>
                    {/* {errorMessage && (
                      <p
                        style={{
                          color: "red",
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "3px",
                        }}
                      >
                        {errorMessage}
                      </p>
                    )} */}
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ////////////////////////// */}
        <div>
          {/* <!-- Modal toggle --> */}
          <button
            onClick={toggleModal1}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add Reportings
          </button>
          {/* <!-- Main modal --> */}
          {isModalOpen1 && (
            <div
              id="crud-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75"
            >
              <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add new Reporting.
                    </h3>
                    <button
                      onClick={toggleModal1}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="id"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Employee
                        </label>

                        <select
                          id="employeeSelect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          onChange={(e) =>
                            setSelectedEmployeeName(e.target.value)
                          }
                        >
                          {employeeID.map((id) => (
                            <option key={id} value={id}>
                              {id}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2 ">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Add Reportings
                        </label>
                        <select
                          multiple
                          id="reportingSelect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        >
                          {/* Filter out the selected employee name from the options */}
                          {employeeID
                            .filter((id) => id !== selectedEmployeeName)
                            .map((id) => (
                              <option key={id} value={id}>
                                {id}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmitRep}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Add Reportings
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {data.length > 0 && (
        <div className="mt-8 flex-column justify-center">
          {/* <h2 className="text-2xl font-bold mb-4">Searched Employees</h2> */}
          <div className="grid grid-cols-3 gap-4">
            {/* {data.map((employee) => (
              <div key={employee.id} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-gray-500 mb-2">{employee.role}</p>
                <p className="text-gray-500">{employee.location}</p>
                <p className="text-gray-500">
                  Department: {employee.department}
                </p>
              </div>
            ))} */}
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
        </div>
      )}
    </>
  );
};

export default Services;
