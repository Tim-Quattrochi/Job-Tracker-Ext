import { useState } from "react";
import Input from "../../components/Input/Input";
import Label from "../../components/label/Label";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { APP_NAME } from "../../config/constants";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import validateForm from "../../utilities/validateForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData, "register");

    if (Object.keys(errors).length > 0) {
      return toast.error(Object.values(errors).join("\n"));
    }

    try {
      const { user } = await register(formData).unwrap();

      if (user) {
        dispatch(setCredentials(user));
        localStorage.setItem(APP_NAME, JSON.stringify(user));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
            labelName="Name"
          />
          <Input
            type="text"
            name="name"
            id="name"
            placeHolder="Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
            labelName="Email"
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeHolder="Email"
            autoComplete="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
            labelName="Password"
          />

          <Input
            type="password"
            name="password"
            id="password"
            placeHolder="Password"
            autoComplete="new-password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
            labelName="Confirm Password"
          />

          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeHolder="Confirm Password"
            autoComplete="new-password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            type="submit"
            className="bg-polo-blue-500 text-polo-blue-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2"
          >
            Have an account?{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
