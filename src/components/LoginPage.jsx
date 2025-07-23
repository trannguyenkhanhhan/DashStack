import { useState, useEffect } from "react";
import ApiService from "../apis/ApiService";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPass = localStorage.getItem("rememberPass");

    if (savedEmail && savedPass) {
      setEmail(savedEmail);
      setPass(savedPass);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await ApiService.callApiAsync("account", "GET");
      const accounts = res.data?.data ?? [];

      const matchedUser = accounts.find(
        (acc) =>
          acc.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          acc.pass.trim() === pass.trim()
      );

      if (matchedUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accountId", matchedUser._id);

        if (remember) {
          localStorage.setItem("rememberEmail", email);
          localStorage.setItem("rememberPass", pass);
        } else {
          localStorage.removeItem("rememberEmail");
          localStorage.removeItem("rememberPass");
        }

        await ApiService.callApiAsync(`account/${matchedUser._id}`, "PUT", {
          ...matchedUser,
          success: "true",
        });

        setIsLoggedIn(true);
        navigate("/");
      } else {
        setError("Email or Password is wrong.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred while logging in.");
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

      <div className="bg-[#0d122f] p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md">
        <h2 className="text-2xl font-bold text-[#DDD6F3] text-center mb-4">
          Welcome back
        </h2>
        <p className="text-sm text-[#9182B3] text-center mb-8">
          Please login to your account
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
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

          <div className="flex justify-between items-center text-sm text-[#9182B3]">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-[#4935A3]"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline text-[#8c778e]">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3f1d42] hover:bg-[#391a3b] text-gray-400 font-semibold py-2 rounded-xl transition"
          >
            Login
          </button>

          {error && (
            <p className="text-[#9182B3] text-sm text-center">{error}</p>
          )}
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#3f1d42] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
