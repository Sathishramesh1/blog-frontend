import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../Utils/Utils";
import { LoginUser } from "../Utils/api";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup.string().required("Password is required"),
  });

  async function sendDataToLogin(values) {
    setLoading(true);
    try {
      const response = await LoginUser (values);

      const data = response.data;

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.userName);

      toast.success("Welcome To Home Page", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/home", { state: { message: "Hi" } });
    } catch (err) {
      setLoading(false);
      setError("Email or password is not valid");
      toast.error("Email or password is not valid", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToLogin,
  });

  function changeBgLogin() {
    document.getElementById("change").classList.add("auth");
  }

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0 ">
        <div className="content row gx-0 login">
          <div className="col-md-5">
            <div className="bg-main text-white h-100 d-flex align-items-center justify-content-center flex-column  text-center ">
            <div className="card h-100 w-100" >
  <img src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1709703133~exp=1709703733~hmac=dfb84c38ffa99d94e50967b7efaca00b7399f0967333ffd2167b5b3d8a238484" className="card-img-top login-img" alt="..."/>
  
  <div className="card-body">  
              <h2 className=" card-title mb-3 fw-bold">Need An Account?</h2>
              <Link to="/register">
                <button className="btn btn-primary fw-bold rounded-pill py-2 px-4">
                  Register
                </button>
              </Link>
              </div>
</div>
            </div>
          </div>
          <div className="col-md-7 bg-light">
            <div className="text-center p-5">
              <h1 className="text-main fw-bolder">Login Now</h1>
              <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Enter Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <div className="position-relative">
                  <input
                    id="password-input"
                    type="password"
                    className="form-control mt-3"
                    placeholder="Enter Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  <i
                    onClick={() => togglePasswordVisibility()}
                    className="fa-regular fa-eye-slash eyeIcon"
                  ></i>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <button
                  onClick={() => changeBgLogin()}
                  id="change"
                  type="submit"
                  className="btn-style bg-main text-center text-white mt-3 w-100"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Oval
                        height={30}
                        width={30}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#86b7fe"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="mt-3">
                  Demo info: Email: demo@gmail.com |
                  Password: Demo1234
                </p>

                <div className="mt-2">
                  <Link to="/forgotPassword" className="forgot-password-link">
                    Forgot Password
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
