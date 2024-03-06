import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../Utils/Utils";
import { ResetPasswordApi } from "../Utils/api";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { randomString } = useParams(); // Get the random string from the URL

  // Define a validation schema for the form
  const validation = yup.object({
    password: yup.string().required("Password is required"),
  });

  // Function to send updated password data to the server
  async function sendUpdatedData() {
    console.log("Working sendUpdatedData");
    setLoading(true);
    try {
      // Replace ":randomString" with the extracted random string
      const response= await ResetPasswordApi(formik.initialValues,randomString)
      
      console.log("response", response);
      setLoading(false);
      toast.success("Password Updated Successfully", {
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
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Random String is not valid");
      toast.error("Random String is not valid", {
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

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendUpdatedData,
  });

  // Function to change background for the update password button
  function changeBgUpdatePassword() {
    document.getElementById("change").classList.add("auth");
    console.log("Working changeBgUpdatePassword");
  }

  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
        <div className="content row gx-0 login">
          <div className="col-md-5">
            <div className="bg-main text-white h-100 d-flex align-items-center justify-content-center flex-column  text-center">
            <div className="card h-100 w-100" >
  <img src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7966.jpg?t=st=1709704907~exp=1709708507~hmac=36f540ec8f23e6764f1c4098cd118b58fc27c87c282038579169abbc829ed492&w=740" className="card-img-top login-img" alt="..."/>
  
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
              <h1 className="text-main fw-bolder">Update Password</h1>
              <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <div className="position-relative">
                  <input
                    id="password-input"
                    type="password"
                    className="form-control mt-3"
                    placeholder="Enter Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <i
                    onClick={togglePasswordVisibility}
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
                  onClick={changeBgUpdatePassword}
                  id="change"
                  type="submit"
                  className="btn-style text-center mt-3 w-100"
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
                    "Update Password"
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
