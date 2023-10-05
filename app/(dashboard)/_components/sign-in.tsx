"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Authentication() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  }

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  }

  function toggleIsSigningUp() {
    setIsSigningUp(!isSigningUp);
  }
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email,
        password,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, login]);

  return (
    // <div className="flex justify-center">
    <div className="p-8 max-w-md w-full space-y-4">
      <h2 className="text-3xl font-bold text-center">
        {isSigningUp ? "Sign Up" : "Sign In"}
      </h2>
      <form onSubmit={isSigningUp ? handleSignUp : handleSignIn}>
        <div className="flex flex-col space-y-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 rounded-md p-2"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300 rounded-md p-2"
            value={password}
            onChange={handlePasswordChange}
          />
          {isSigningUp && (
            <>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="border border-gray-300 rounded-md p-2"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </>
          )}
          <button
            onClick={isSigningUp ? register : login}
            className="bg-blue-500 text-white rounded-md p-2 mt-10 w-full hover:bg-blue-700 transition"
          >
            {isSigningUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="flex flex-row justify-center items-center space-x-2">
            <div
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
            </div>
            <div
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FaGithub size={30} />
            </div>
          </div>
          <p className="text-neutral-500 mt-12">
            {isSigningUp
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 hover:underline"
              onClick={toggleIsSigningUp}
            >
              {isSigningUp ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
      </form>
    </div>
    // </div>
  );
}
