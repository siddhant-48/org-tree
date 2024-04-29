const mongoose = require("mongoose");
const Employee = require("./schemas/Employee");
const Connection = require("./schemas/Connection");
const User = require("../server/schemas/User");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "kajbnsd";

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  })
);

mongoose.connect("mongodb://localhost:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", async () => {
  console.log("Connected to MongoDB database");

  //insert documents
  //   try {
  //     const add = await Employee.insertMany([
  //       {
  //         id: 1001,
  //         name: "Siddhant Patki",
  //         role: "Intern",
  //         location: "Pune",
  //         department: "DU-2",
  //       },
  //       {
  //         id: 1002,
  //         name: "Mahesh",
  //         role: "Software Engineer",
  //         location: "Mumbai",
  //         department: "DU-1",
  //       },
  //       {
  //         id: 1003,
  //         name: "Sam",
  //         role: "Web Developer",
  //         location: "Chennai",
  //         department: "DU-2",
  //       },

  // {
  //     "id": 1004,
  //     "name": "John Doe",
  //     "role": "Software Engineer",
  //     "location": "New York",
  //     "department": "DU-1"
  // },
  // {
  //     "id": 1005,
  //     "name": "Joker",
  //     "role": "Software IT",
  //     "location": "Canada",
  //     "department": "DU-2"
  // },
  // {
  //     "id": 1006,
  //     "name": "Sean",
  //     "role": "Mechanical Engineer",
  //     "location": "Germany",
  //     "department": "DU-1"
  // }

  //     ]);
  //     console.log("Added successfully", add);
  //   } catch (error) {
  //     console.log(error);
  //   }
});

app.get("/", async (req, res) => {
  console.log("hello");
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

//getuser from token
app.post("/userEmail", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const user_email = user.email;
    const userData = await User.findOne({ email: user_email });
    if (userData) {
      res.status(200).send({ status: "ok", user: userData });
    } else {
      res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user email:", err);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

//signup form
app.post("/signup", (req, res) => {
  console.log("formdata req:", req.body);
  const insert = new User(req.body);
  insert
    .save()
    .then((savedData) => {
      console.log("Data saved:", savedData);
      return res.status(200).json({
        message: "data recieved",
        data: savedData,
      });
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ message: "Error inserting data", error: err });
    });
});

//signin
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if ((await user.password) == password) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else return res.json({ error: "error" });
    }
    // return res.status(401).json({ message: "Password is invalid" });
    // return res.status(200).json({ message: "Signin Successfull", user });
  } catch (error) {
    console.log(error);
  }
});

//add employees test regular
// app.post("/employee-add", async (req, res) => {
//   console.log("in post");
//   const { id, name, role, location, department } = req.body;

//   // Basic validation checks
//   if (!id || isNaN(id) || !name || !role || !location || !department) {
//     return res.status(400).json({ error: "Invalid data provided" });
//   }

//   try {
//     const existingEmployee = await Employee.findOne({ id });
//     if (existingEmployee) {
//       return res
//         .status(409)
//         .json({ message: "Employee with this ID already exists" });
//     }

//     await Employee.create({
//       id,
//       name,
//       role,
//       location,
//       department,
//     });

//     return res.status(201).json({ message: "Employee data saved" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Error saving employee data" });
//   }
// });

//get all employees
app.get("/employees", async (req, res) => {
  try {
    let emps = await Employee.find({});
    res.send({ status: "ok", data: emps });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

//add employees employees via req.body
app.post("/employees-Add", async (req, res) => {
  try {
    const { id, name, role, location, department } = req.body;
    const prefixedId = "EMP" + id;

    //check for same id employee
    const existingEmployee = await Employee.findOne({ id: prefixedId });

    //send error if employee exists
    if (existingEmployee) {
      return res
        .status(400)
        .json({ status: "error", message: "Employee ID already exists" });
    }
    const newEmployee = new Employee({
      id: prefixedId,
      name: name,
      role: role,
      location: location,
      department: department,
    });

    // save employee
    const savedEmployee = await newEmployee.save();
    res.json({ status: "ok", message: "employee saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//get single employee
app.get("/singleEmployee/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ id: employeeId });
    if (!employee) {
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
      });
    }
    res.json({
      status: "found",
      data: employee,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//add employees under EMPLOYEE
app.put("/addReportings", async (req, res) => {
  try {
    const { employeeName, reportingIds } = req.body;

    const employee = await Employee.findOne({ name: employeeName });

    if (!employee) {
      return res
        .status(404)
        .json({ status: "error", message: "Employee not found" });
    }

    // Add reporting IDs to the employee's reportings array
    employee.reportings.addToSet(...reportingIds);

    // Update the reporting count
    employee.reportingCount = employee.reportings.length;

    // Save the updated employee
    await employee.save();

    res.json({ status: "ok", data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// app.put("/addReportings", async (req, res) => {
//   try {
//     const { employeeId, employeeIds } = req.body;

//     const employee = await Employee.findOne({ id: employeeId });
//     if (!employee) {
//       return res
//         .status(404)
//         .json({ status: "error", message: "Employee not found" });
//     }

//     employeeIds.forEach(async (id) => {
//       employee.reportings.addToSet(id);
//     });

//     employee.reportingCount = employee.reportings.length;

//     // Save employee
//     await employee.save();

//     res.json({ status: "ok", data: employee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "error", message: "Internal server error" });
//   }
// });

//get reportings for a employee
app.get("/getReportings", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const employee = await Employee.findOne({ id: employeeId });
    if (!employee) {
      return res
        .status(404)
        .json({ status: "error", message: "Employee not found" });
    }

    const reportings = employee.reportings;
    const reportingEmployees = await Employee.find({ id: { $in: reportings } });

    res.json({ status: "ok", data: reportingEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//get IDs of employees
app.get("/employees/ids", async (req, res) => {
  try {
    const employees = await Employee.find({}, { _id: 0 }); // exclude the _id field
    res.json(employees); // send array of employees
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all employees
const getAllEmployees = async (req, res) => {
  try {
    let allUsers = await Employee.find({});
    // res.send({ status: "ok", data: allUsers });
    return allUsers;
  } catch (err) {
    console.log(err);
  }
};
//get employees
app.get("/getEmployees", async (req, res) => {
  let allUsers = await getAllEmployees(req, res);
  res.send({ status: "ok", data: allUsers });
});

//get single employee from id
app.get("/getEmployee/:id", async (req, res) => {
  const { id } = req.params;
  let employee = await getSingleEmployee(id);
  if (employee) {
    res.send({ status: "ok", data: employee });
  } else {
    res.status(404).send({ status: "error", message: "Employee not found" });
  }
});
//function
const getSingleEmployee = async (id) => {
  try {
    let employee = await Employee.findById(id);
    return employee;
  } catch (err) {
    console.error("Error finding employee:", err);
    throw err;
  }
};

//test
app.get("/test/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (employee) {
      res.send({ status: "ok", data: employee });
    } else {
      res.status(404).send({ status: "error", message: "Employee not found" });
    }
  } catch (err) {
    console.error("Error finding employee:", err);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});

//update api
app.put("/updateEmployee/:id", async (req, res) => {
  const { id } = req.params;
  const { name, role, location, department } = req.body;

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: id },
      { name, role, location, department },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete employee id
app.post("/deleteEmployee", async (req, res) => {
  try {
    const { userid } = req.body;
    const result = await Employee.deleteOne({ id: userid });

    if (result.deletedCount === 1) {
      res.send({ status: "ok", data: "Deleted" });
    } else {
      res.send({ status: "error", data: "Employee not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", data: "Internal server error" });
  }
});

//search employee
app.get("/singleID", async (req, res) => {
  try {
    const { name } = req.query;
    const lowerCaseName = name.toLowerCase();

    const employee = await Employee.findOne({
      name: { $regex: new RegExp(`^${lowerCaseName}$`, "i") },
    });
    if (!employee) {
      return res
        .status(404)
        .json({ status: "error", message: "Employee not found" });
    } else return res.json({ status: "okay", data: [employee] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

//hierarchy
// async function getEmployeeWithHierarchy(employeeName, processedEmployees = new Set()) {
//   console.log(`Fetching employee with name: ${employeeName}`);
  
//   // Check if this employee has already been processed
//   if (processedEmployees.has(employeeName)) {
//     console.log(`Employee ${employeeName} has already been processed`);
//     return null;
//   }

//   const employee = await Employee.findOne({ name: employeeName });
//   if (!employee) {
//     console.log(`Employee with name ${employeeName} not found`);
//     return null;
//   }

//   // Add the employee to the set of processed employees
//   processedEmployees.add(employeeName);

//   const employeeWithHierarchy = {
//     id: employee.id,
//     name: employee.name,
//     role: employee.role,
//     location: employee.location,
//     department: employee.department,
//     reportings: [],
//   };

//   console.log(`Processing reportings for employee ${employee.name}`);
//   for (const reportingName of employee.reportings) {
//     console.log(`Fetching reporting employee with name: ${reportingName}`);
//     const reportingEmployee = await getEmployeeWithHierarchy(reportingName, processedEmployees);
//     if (reportingEmployee) {
//       console.log(`Found reporting employee: ${reportingEmployee.name}`);
//       employeeWithHierarchy.reportings.push(reportingEmployee);
//     }
//   }

//   return employeeWithHierarchy;
// }

// // GET employee by name and their reporting hierarchy
// app.get('/employee1', async (req, res) => {
//   try {
//     const { name } = req.body;

//     // Find the employee by name
//     const employee = await Employee.findOne({ name });

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     console.log(`Found employee ${employee.name}, ID: ${employee.id}`);

//     // Get the employee details with reporting hierarchy recursively
//     const employeeWithHierarchy = await getEmployeeWithHierarchy(employee.name);

//     console.log('Response:', employeeWithHierarchy);

//     res.json(employeeWithHierarchy);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

//test2
async function getEmployeeWithHierarchy(employeeName, processedEmployees = new Set()) {
  console.log(`Fetching employee with name: ${employeeName}`);

  // Check if this employee has already been processed
  if (processedEmployees.has(employeeName)) {
    console.log(`Employee ${employeeName} has already been processed`);
    return null;
  }

  const employee = await Employee.findOne({ name: employeeName });
  if (!employee) {
    console.log(`Employee with name ${employeeName} not found`);
    return null;
  }

  // Add the employee to the set of processed employees
  processedEmployees.add(employeeName);

  const employeeWithHierarchy = {
    id: employee.id,
    name: employee.name,
    role: employee.role,
    location: employee.location,
    department: employee.department,
    reportings: [],
  };

  console.log(`Processing reportings for employee ${employee.name}`);
  for (const reportingName of employee.reportings) {
    console.log(`Fetching reporting employee with name: ${reportingName}`);
    const reportingEmployeeWithHierarchy = await getEmployeeWithHierarchy(reportingName, processedEmployees);
    if (reportingEmployeeWithHierarchy) {
      console.log(`Found reporting employee: ${reportingEmployeeWithHierarchy.name}`);
      employeeWithHierarchy.reportings.push(reportingEmployeeWithHierarchy);
    }
  }

  return employeeWithHierarchy;
}

// GET employee by name and their reporting hierarchy
app.get('/employee2', async (req, res) => {
  try {
    const { name } = req.body;

    // Find the employee by name
    const employee = await Employee.findOne({ name });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    console.log(`Found employee ${employee.name}, ID: ${employee.id}`);

    // Get the employee details with reporting hierarchy recursively
    const employeeWithHierarchy = await getEmployeeWithHierarchy(employee.name);

    console.log('Response:', employeeWithHierarchy);

    res.json(employeeWithHierarchy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});