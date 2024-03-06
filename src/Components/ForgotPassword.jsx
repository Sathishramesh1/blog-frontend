import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgetPasswordApi } from "../Utils/api";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  async function sendDataToMail(values) {
    console.log("Working sendDataToMail");
    setLoading(true);
    try {
      const response = await ForgetPasswordApi(values);
     
      setLoading(false);
      toast.success("Reset Link send to your Mail", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // You can use navigate here if needed
      navigate("/", { state: { message: "Reset Link send to your Mail, Please Verify you Mail" } });
    } catch (err) {
      setLoading(false);
      setError("Email is not Register");
      toast.error("Email is not Register", {
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
    },
    validationSchema: validation,
    onSubmit: sendDataToMail,
  });

  function changeBgForgotPassword() {
    document.getElementById("change").classList.add("auth");
    console.log("Working changeBgForgotPassword");
  }

  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
        <div className="content row gx-0 login">
          <div className="col-md-5">
            <div className="bg-main text-white h-100 d-flex align-items-center justify-content-center flex-column  text-center">
            <div className="card h-100 w-100" >
  <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1709704693~exp=1709708293~hmac=6d9eb9ac6aefac187937c6092d41b26c2ea25ef4183421729875891e854be9cd&w=740" className="card-img-top login-img" alt="..."/>
  
  <div className="card-body">  
              <h2 className=" card-title mb-3 fw-bold">Need An Account?</h2>
              <Link to="/register">
                <button className="btn btn-primary fw-bold rounded-pill py-2 px-4">
                  Register
                </button>
              </Link>
              </div>
</div>    </div>
          </div>
          <div className="col-md-7 bg-light">
            <div className="text-center p-5">
              <h1 className="text-main fw-bolder">Forgot Password</h1>
              <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Enter Email"
                  name="email"
                  value={formik.values.email} // Use formik.values for input value
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <button
                  onClick={() => changeBgForgotPassword()}
                  id="change"
                  type="submit"
                  className="btn-style  btn-primary bg-main text-white text-center mt-3 w-100"
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
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
