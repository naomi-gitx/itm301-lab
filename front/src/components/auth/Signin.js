import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // State to store error messages
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
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if(response){
        console.log(response);
        
      }
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Нэвтрэхэд алдаа гарлаа");
      }
  
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
  
      // Navigate to the dashboard or home page after successful login
      navigate("/");
  
    } catch (error) {
      setError(error.message);
      console.error("Error during sign-in:", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-primary mb-4">
        Нэвтрэх хуудас
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <div className="mb-6">
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

        <button
          type="submit"
          className="w-full bg-button text-white py-2 px-4 rounded-lg hover:bg-accent-dark"
        >
          Нэвтрэх
        </button>
      </form>

      <p className="text-center mt-4">
        Бүртгэлгүй хэрэглэгч үү?{" "}
        <Link to="/signup" className="text-accent-dark">
          Бүртгүүлэх
        </Link>
      </p>
    </div>
  );
};

export default Signin;
