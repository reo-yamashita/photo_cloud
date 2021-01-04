import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ClipLoader from "react-spinners/ClipLoader";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/reducers/authReducer";

const validationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(signIn(values));
      setLoading(true);
      resetForm();
    },
  });

  if (auth.uid) return <Redirect to="/" />;

  return (
    <div className="relative">
      <div className="mx-auto max-w-xl py-3">
        <div className="absolute inset-x-0 m-auto mt-12 flex justify-center">
          <ClipLoader size={150} color={"#c3f3fa"} loading={loading} />
        </div>
        {!loading ? (
          <div className="mt-10 sm:mt-20 px-4">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                //autoFocus={true}
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                // {...formik.getFieldProps("email")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                //  {...formik.getFieldProps("password")}
              />
              <div className="p-3 text-center">
                <Button variant="outlined" type="submit" className="focus:outline-none">
                  SignIn
                </Button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignIn;
