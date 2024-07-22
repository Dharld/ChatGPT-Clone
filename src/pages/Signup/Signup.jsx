import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/auth.actions.js";
import { useToast } from "../../hooks/Toaster";
import AuthLayout from "../Layout/AuthLayout.jsx";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};
export default function Signup() {
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
    const { username, email, password } = credentials;
    if (!username || !email || !password) {
      errorToast("Please fill in all fields");
      return;
    }
    dispatch(signup({ email, password, username })).then((res) => {
      console.log(res);
      if (res.error) {
        errorToast(res.error.message);
        return;
      } else {
        successToast("Account created successfully");
        setCredentials(INITIAL_STATE);
        navigate("/login");
      }
    });
  };

  return (
    <AuthLayout>
      <div>
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold text-4xl mt-24 text-center">
            Create Account
          </h1>
          <Input
            name="username"
            label="Username"
            value={credentials.username}
            handleChange={handleChange}
            styles="mt-4"
          />
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
            Signup
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
