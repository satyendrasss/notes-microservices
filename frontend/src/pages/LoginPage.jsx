import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const redirectTo =
    location.state?.from?.pathname || "/home";


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;


    setError("");
    setLoading(true);


    try {

      await login(
        email.trim(),
        password
      );


      navigate(
        redirectTo,
        {
          replace: true,
        }
      );


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-white
      px-6
      dark:bg-neutral-950
    ">

      <div className="w-full max-w-md">


        <div className="mb-10 text-center">

          <h1 className="
            mt-6
            text-3xl
            font-semibold
            tracking-tight
            text-neutral-900
            dark:text-white
          ">
            Welcome back
          </h1>


          <p className="
            mt-2
            text-sm
            text-neutral-600
            dark:text-neutral-400
          ">
            Sign in to continue to your workspace.
          </p>

        </div>



        <div className="
          rounded-2xl
          border
          border-neutral-200
          bg-white
          p-8
          dark:border-neutral-800
          dark:bg-neutral-900
        ">


          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >


            {/* Email */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-neutral-700
                dark:text-neutral-300
              ">
                Email
              </label>


              <input

                type="email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="name@example.com"

                autoComplete="email"

                required

                autoFocus

                className="
                  w-full
                  rounded-lg
                  border
                  border-neutral-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-neutral-900
                  dark:border-neutral-700
                  dark:bg-neutral-950
                  dark:text-white
                  dark:focus:border-white
                "
              />

            </div>



            {/* Password */}

            <div>

              <div className="
                mb-2
                flex
                items-center
                justify-between
              ">

                <label className="
                  text-sm
                  font-medium
                  text-neutral-700
                  dark:text-neutral-300
                ">
                  Password
                </label>


                <a
                  href="/forgot-password"
                  className="
                    text-sm
                    text-neutral-500
                    hover:text-neutral-900
                    dark:hover:text-white
                  "
                >
                  Forgot password?
                </a>

              </div>



              <input

                type="password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                placeholder="••••••••"

                autoComplete="current-password"

                required

                className="
                  w-full
                  rounded-lg
                  border
                  border-neutral-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-neutral-900
                  dark:border-neutral-700
                  dark:bg-neutral-950
                  dark:text-white
                  dark:focus:border-white
                "
              />

            </div>



            {error && (

              <p className="
                rounded-lg
                bg-red-50
                px-3
                py-2
                text-sm
                text-red-600
                dark:bg-red-950
                dark:text-red-400
              ">
                {error}
              </p>

            )}



            <label className="
              flex
              items-center
              gap-3
              text-sm
              text-neutral-600
              dark:text-neutral-400
            ">

              <input
                type="checkbox"
                className="
                  h-4
                  w-4
                  rounded
                  border-neutral-300
                "
              />

              Remember me

            </label>




            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-lg
                bg-neutral-900
                py-3
                font-medium
                text-white
                transition
                hover:bg-black
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:bg-white
                dark:text-black
                dark:hover:bg-neutral-200
              "
            >

              {loading
                ? "Signing in..."
                : "Sign In"
              }

            </button>


          </form>



          <div className="
            my-8
            flex
            items-center
          ">

            <div className="
              h-px
              flex-1
              bg-neutral-200
              dark:bg-neutral-800
            "/>


            <span className="
              px-4
              text-sm
              text-neutral-500
            ">
              or
            </span>


            <div className="
              h-px
              flex-1
              bg-neutral-200
              dark:bg-neutral-800
            "/>

          </div>



          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-lg
              border
              border-neutral-300
              py-3
              text-sm
              font-medium
              transition
              hover:bg-neutral-100
              dark:border-neutral-700
              dark:hover:bg-neutral-800
            "
          >
            Continue with Google
          </button>



          <p className="
            mt-8
            text-center
            text-sm
            text-neutral-600
            dark:text-neutral-400
          ">
            Don't have an account?{" "}

            <a
              href="/register"
              className="
                font-medium
                text-neutral-900
                hover:underline
                dark:text-white
              "
            >
              Create one
            </a>

          </p>


        </div>



        <p className="
          mt-8
          text-center
          text-xs
          text-neutral-500
        ">
          © 2026 Notes. All rights reserved.
        </p>


      </div>

    </div>
  );
}