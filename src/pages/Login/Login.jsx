import { useState } from "react";
import Input from "../../components/Input/Input";
import Label from "../../components/label/Label";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            placeHolder="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-polo-blue-500 text-polo-blue-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Need an account?{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
