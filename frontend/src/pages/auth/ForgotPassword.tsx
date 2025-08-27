import { useState } from "react";
import { sendChangePasswordLink } from "../../services/Auth";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    try {
      await sendChangePasswordLink(email);
      toast.success("Reset link sent!");
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Forgot Password
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                Enter your email address and we’ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <a
                  href="/login"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Back to Login
                </a>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold text-green-600">
                ✅ Reset Link Sent
              </h2>
              <p className="text-gray-600 text-sm">
                Please check your inbox for a password reset link. Don’t forget
                to also check your spam folder.
              </p>
              <a
                href="/login"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Back to Login
              </a>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
