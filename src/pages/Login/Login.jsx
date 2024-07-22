/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/slices/auth.actions.js";
import { useToast } from "../../hooks/Toaster";
import AuthLayout from "../Layout/AuthLayout.jsx";

const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function Login() {
  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const loading = useSelector((state) => state.auth.loading);
  const { errorToast, successToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      errorToast("Please fill in all fields");
      return;
    }
    dispatch(signin({ email, password })).then((res) => {
      if (res.error) {
        errorToast(res.error.message);
        return;
      } else {
        console.log(res);
        successToast("You are successfully logged in.");
        setCredentials(INITIAL_STATE);
        navigate("/");
      }
    });
  };

  return (
    <AuthLayout>
      <div>
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold text-4xl mt-24 text-center">
            Welcome Back{" "}
          </h1>
          <Input
            name="email"
            label="Email address"
            value={credentials.email}
            handleChange={handleChange}
            styles="mt-4"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={credentials.password}
            handleChange={handleChange}
            styles="mt-4"
          />

          <Button styles="w-full mt-4 text-white" loading={loading}>
            Signin
          </Button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
