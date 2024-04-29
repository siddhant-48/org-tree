import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Paginate } from "../components/Paginate";

function Details() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    role: "",
    location: "",
    department: "",
  });
  //function to get all employees
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
      });
  };
  console.log("this is details", data);
  useEffect(() => {
    getEmployees();
  }, []);

  // //edit employee
  // const handleEdit = (id) => {
  //   console.log(id);
  // };

  // //toggle modal
  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  // //handle input
  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  // //handlesubmit
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

  const handleDelete = (employeeId) => {
    console.log("Deleting employee with ID:", employeeId);
    if (window.confirm("Are you sure you want to delete?")) {
      fetch("http://localhost:5000/deleteEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: employeeId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
        });
      getEmployees();
    } else {
      console.log("hi");
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto flex justify-center mt-20">
        <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Employee ID</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Role</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Reportings</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {/* <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          </tbody> */}
          <tbody>
            {data.map((employee) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={employee.id}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {employee.name}
                </td>
                <td className="px-6 py-4">{employee.id}</td>
                <td className="px-6 py-4">{employee.role}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td>
                  <div className="edit-btn">
                    <Link
                      className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      //   onClick={() => handleEdit(employee.id)}
                      to={`/details/${employee.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="px-6 py-4 font-medium text-red-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Paginate /> */}
    </>
  );
}
export default Details;
