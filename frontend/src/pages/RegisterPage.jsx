export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 dark:bg-neutral-950">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 text-center">
          <a
            href="/"
            className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white"
          >
            Notes
          </a>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Start organizing your notes in a secure workspace.
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <form className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-white"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Use at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-white"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-0 dark:border-neutral-700"
              />

              <span>
                I agree to the{" "}
                <a
                  href="/terms"
                  className="font-medium text-neutral-900 hover:underline dark:text-white"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="font-medium text-neutral-900 hover:underline dark:text-white"
                >
                  Privacy Policy
                </a>.
              </span>
            </label>

            {/* Create Account */}
            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-900 py-3 font-medium text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            <span className="px-4 text-sm text-neutral-500">or</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          {/* Google */}
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 py-3 text-sm font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
            <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.8 1.1 8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.3c-2.1 1.6-4.7 2.6-7.3 2.6-5.3 0-9.8-3.3-11.4-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6.3 6.8l.1-.1 6.3 5.3C35 39.6 44 34 44 24c0-1.3-.1-2.3-.4-3.5z"
              />
            </svg>

            Continue with Google
          </button>

          {/* Login */}
          <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-neutral-900 hover:underline dark:text-white"
            >
              Sign In
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-neutral-500">
          © 2026 Notes. All rights reserved.
        </p>
      </div>
    </div>
  );
}