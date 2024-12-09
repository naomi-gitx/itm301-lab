import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Нууц үг давтахгүй байна.");
      return;
    }

    // Create a form data object to handle file uploads
    const requestBody = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,  // You can send the image as a base64 string or a URL
    };

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Sending as JSON
        },
        body: JSON.stringify(requestBody),  // Send as JSON string
      });

      if (!response.ok) {
        throw new Error("Бүртгэл хийхэд алдаа гарлаа.");
      }

      navigate("/authenticate");
    } catch (error) {
      console.error(error);
      alert("Бүртгэл хийхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-primary mb-4">
        Бүртгүүлэх хуудас
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Нэр
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            И-мэйл
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Нууц үг
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Нууц үг давтах
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Зураг
          </label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-button text-white py-2 px-4 rounded-lg hover:bg-accent-dark"
        >
          Бүртгүүлэх
        </button>
      </form>

      <p className="text-center mt-4">
        Бүртгэлтэй хэрэглэгч үү?{" "}
        <Link to="/authenticate" className="text-accent-dark">
          Нэвтрэх
        </Link>
      </p>
    </div>
  );
};

export default Signup;
