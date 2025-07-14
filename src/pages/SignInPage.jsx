import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../apis/ApiService";

const SignInPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await ApiService.callApiAsync("account", "GET");
      const existing = res.data?.data || [];

      const isEmailUsed = existing.some(
        (acc) => acc.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (isEmailUsed) {
        setError("This email is already registered.");
        return;
      }

      await ApiService.callApiAsync("account", "POST", {
        user_name: userName,
        email,
        pass,
        img: "https://jbagy.me/wp-content/uploads/2025/03/anh-avatar-vo-tri-meo-1-768x1024.jpg",
        success: "false"
      });
      

      navigate("/login"); 
    } catch (err) {
      console.error("Sign up failed:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?semt=ais_hybrid&w=740')`,
      }}
    >

      <div className="absolute inset-0 bg-[#1F2937]/10 backdrop-blur-sm"></div>

      <div className="bg-[#0d122f] p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md z-10">
        <h2 className="text-2xl font-bold text-[#DDD6F3] text-center mb-4">
          Create an Account
        </h2>
        <p className="text-sm text-[#9182B3] text-center mb-8">
          Please sign up to continue
        </p>

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm text-[#9182B3] mb-1">Username</label>
            <input
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 bg-[#252a44] text-[#DDD6F3] placeholder-[#9182B3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#9182B3] mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#252a44] text-[#DDD6F3] placeholder-[#9182B3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#9182B3] mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-4 py-2 bg-[#252a44] text-[#DDD6F3] placeholder-[#9182B3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3f1d42] hover:bg-[#391a3b] text-gray-400 font-semibold py-2 rounded-xl transition"
          >
            Sign Up
          </button>

          {error && (
            <p className="text-[#9182B3] text-sm text-center">{error}</p>
          )}
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#3f1d42] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
