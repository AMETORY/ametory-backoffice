import { Button, TextInput } from "flowbite-react";
import { useState, type FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { processLogin } from "../services/api/authApi";
import toast from "react-hot-toast";
import { Link } from "react-router";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLogin = async () => {
    try {
      const resp: any = await processLogin(email, password);
      await login(resp.token);
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };
  return (
    <div
      className="flex h-full max-h-screen w-full"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Left side (branding) */}
      <div className="relative flex w-1/2 items-center justify-center bg-gradient-to-tl from-[#1A202C] to-[#35548a] text-white">
        <div className="text-center">
          <div className="mb-4 text-4xl font-bold">
            <img src="/icon-512.png" alt="" className="w-32" />
          </div>
        </div>
        <div
          className="absolute rotate-[30deg]"
          style={{
            bottom: -80,
            left: -100,
            opacity: 0.3,
          }}
        >
          <img src="/icon-512.png" className="w-[300px] text-white" alt="" />
        </div>
      </div>

      {/* Right side (form) */}
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="mb-6 text-2xl font-semibold">
            Login to your Dashboard
          </div>
          <form>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <TextInput
                type="email"
                placeholder="Your Email"
                className=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <TextInput
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendLogin();
                  }
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              color={"primary"}
              onClick={() => {
                sendLogin();
              }}
            >
              Log in
            </Button>
            <div className="mt-2 flex flex-row justify-end gap-2 text-right">
              <Link
                to="/register"
                className="text-sm text-[#0D92F4] hover:underline"
              >
                Daftar Sekarang?
              </Link>
              <Link
                to="/forgot"
                className="text-gray text-gray-500 hover:underline"
              >
                Lupa Password?
              </Link>
            </div>
            <div className="mt-2 text-right"></div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
