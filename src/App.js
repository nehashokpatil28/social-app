import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./storage/Login";
import Register from "./storage/Register";
import Navbar from "./storage/Navbar";
import HomePage from "./storage/HomePage";
import Success from "./storage/Success";
import ComplaintTracker from "./storage/ComplaintTracker";
import axios from "axios";
import AdminHomePage from "./storage/AdminHomePage";

const App = () => {
    const navigate = useNavigate();
    const [fileValue, setFileValue] = useState([]);
    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });

    const [registerState, setRegisterState] = useState({
        email: "",
        password: "",
        firstName: "",
        address: "",
        city: "",
        role: "",
        mobileNumber: "",
        lastName: ""
    })



    const [searchBy, setSearchBy] = useState({
        search: ""
    });

    const [complaintData, setComplaintData] = useState({
        complaintType: "",
        description: "",
        city: "",
        district: "",
        state: "",
        postalCode: ""
    });

    // const [departmentName, setDepartmentName] = useState({
    //     complaintType: ""
    // });

    const [addApi, setAddApi] = useState("");

    const [userData, setUserData] = useState({});

    //handles login page change event
    const handLoginChange = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }
    const registerFieldChange = (e) => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async () => {
        console.log("*******LoginPage********")
        await axios.post(`/login`, {
            ...loginState
        }).then((response) => {
            setUserData(response?.data?.result[0])
            if (response?.data?.result[0].role === "admin") {
                navigate("admin-home-page")
            }
            else if (response?.data?.result[0].role === "user") {
                navigate("home")
            }
            else {
                alert("enter valid username and password")
            }
        }).then(res => {
            

        }).catch(err => console.log(err))
    }


    const handleFileUpload = (e) => {
        const formData = new FormData();
     
        // Update the formData object
        formData.append(
          "image",
          e?.target?.files[0],
          e?.target?.files[0].name
        );
              setFileValue(formData)

        // const fr = new FileReader()
        // fr.readAsArrayBuffer(e?.target?.files[0])
        // fr.onload = function () {
        //     // you can keep blob or save blob to another position
        //     const blob = new Blob([fr.result])
        //     setFileValue(fr.result)
        // }
    }

    const handleRegister = () => {
        axios.post('/registerUser', {
            ...registerState
        }).then((response) => {
            console.log(response)
            navigate("/")
            alert("user successfully created")
        })
    }
     console.log("fileValue", fileValue)

    const handChangeAddress = (e) => {
        setComplaintData({
            ...complaintData,
            [e.target.name]: e.target.value
        })
    }

    const handleComplaintSubmission = () => {
        axios.post("/complaintDetails", {
            ...complaintData,
            image:""
        }).then((response) => {
            console.log(response)
            navigate("success",{
                state:{
                    complaintId:response.data.result.complaintId
                }
            })
            console.log("responseresponse",response.data.result.complaintId)
            alert("complaint successfully registered")
        })
    }

    const handlecomplaintIDsearchBy = (e) => {
        setSearchBy({
            ...searchBy,
            [e.target.name]: e.target.value
        })
    }

    const getComplaintDetails = () => {
        axios.get("https://jsonplaceholder.typicode.com/albums").then((response) => {
            setAddApi(response?.data?.slice(0, 5))
        })
    }
   
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/"
                    element={<Login handLoginChange={handLoginChange} loginUser={loginUser} />} />
                <Route path="admin-home-page"
                    element={<AdminHomePage />} />
                <Route exact path="home"
                    element={<HomePage handleFileUpload={handleFileUpload} handChangeAddress={handChangeAddress} handleComplaintSubmission={handleComplaintSubmission} />}></Route>
                <Route exact path="success"
                    element={<Success />} />
                <Route exact path="register"
                    element={<Register registerFieldChange={registerFieldChange} handleRegister={handleRegister} />} />
                <Route exact path="complaint-tracker"
                    element={<ComplaintTracker handlecomplaintIDsearchBy={handlecomplaintIDsearchBy} getComplaintDetails={getComplaintDetails} rows={addApi} />} />
            </Routes>
        </div>
    )
}

export default App;