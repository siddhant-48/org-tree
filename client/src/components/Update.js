import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: "",
    name: "",
    role: "",
    location: "",
    department: "",
  });
  console.log("ID:",id);
  useEffect(() => {
    // log
    const getEmployees = () => {
      fetch("http://localhost:5000/test/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((res) => {
          setValues({
            ...values,
            id: id,
            name: res.data.name,
            role: res.data.role,
            location: res.data.location,
            department: res.data.department,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    
    getEmployees();
  }, [id]);

  const navigate = useNavigate();

  //handle input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleCloseModal = () => {
    // getEmployees();
    navigate(-1); //previous page
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // destructure
    const { id, name, role, location, department } = values;
    const data = {
      id: id,
      name: name,
      role: role,
      location: location,
      department: department,
    };
    fetch(`http://localhost:5000/updateEmployee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update employee details");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Employee details updated successfully:", responseData);
        // You can add any additional logic here, such as showing a success message or navigating to another page
      })
      .catch((error) => {
        console.error("Error updating employee details:", error);
      });
  };
  console.log(values);
  return (
    <>
      <div>
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
                  Edit Employee Details
                </h3>
                <button
                  onClick={handleCloseModal}
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
                      type="text"
                      name="id"
                      id="id"
                      value={values.id}
                      onChange={handleInput}
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="ID"
                      required=""
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
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleInput}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      type="text"
                      name="role"
                      id="role"
                      value={values.role}
                      onChange={handleInput}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      type="text"
                      name="location"
                      id="location"
                      value={values.location}
                      onChange={handleInput}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      type="text"
                      name="department"
                      id="department"
                      value={values.department}
                      onChange={handleInput}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Enter your Department"
                      required=""
                    />
                  </div>
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
                  Save Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Update;
