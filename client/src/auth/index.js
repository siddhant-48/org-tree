//form functions
//sign up
export const signup = async (user) => {
  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Data received successfully:", data);
      return data;
    } else {
      console.error("Error during signup:", response.status);
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
  }
};

//sign in
// export async function signin(userData) {
//   try {
//     // console.log("in signin");
//     const response = await fetch("http://localhost:5000/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "UserRegister");
//         if (data.status == "ok");
//         alert("Signed in Successfully");
//         window.localStorage.setItem("token", data.data);
//         // window.location.href = "./"
//       });
      
//     // if (!response.ok) {
//     //   throw new Error("Failed to sign in");
//     // }

//     // alert("Signed in successfully!");
//     // const data = await response.json();
//     // // Assuming your backend returns user data upon successful sign-in
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
export async function signin(userData) {
  try {
    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to sign in");
    }
    
    const data = await response.json();
    alert("Signed in Successfully");
    window.localStorage.setItem("token", data.data);
    // window.location.href = "./";
    
    return data; // Return the response data
  } catch (error) {
    throw error;
  }
}

