import { useState } from "react";
// import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const tweets_api_base_url = "http://localhost:8082";

  interface GoogleOauthResponse {
    credential?: string;
  }

  // const handleLoginGoogleSuccess = async (response: GoogleOauthResponse) => {
  //   try {

  //     // Membuat permintaan GET ke endpoint login Google di backend
  //     const response = await fetch(
  //       `${tweets_api_base_url}/api/auth/login/google`
  //     );

  //     if (!response.ok) {
  //       // Handle kesalahan jika respons tidak ok
  //       const errorResponse = await response.json();
  //       alert("error: " + errorResponse.message);
  //       return;
  //     }

  //     // Respons sukses dari backend
  //     const successResponse = await response.json();

  //     // Simpan token akses ke penyimpanan lokal
  //     localStorage.setItem("access_token", successResponse.data.access_token);

  //     // Redirect ke halaman beranda
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error during Google login:", error);
  //     alert("An error occurred during Google login.");
  //   }
  // };

  const handleLoginGoogleSuccess = async (response: GoogleOauthResponse) => {
    try {
      console.log("response google success:", response);

      // Kirim kredensial Google ke backend untuk verifikasi
      const backendResponse = await fetch(
        tweets_api_base_url +
          "/api/auth/login/google?access_token=" +
          response.credential,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const backendResponseJson = await backendResponse.json();

      if (backendResponse.status !== 200) {
        // Tangani kesalahan backend, misalnya, kredensial Google tidak valid
        alert("error: " + backendResponseJson.message);
        return;
      }

      // Simpan token akses backend ke penyimpanan lokal
      localStorage.setItem(
        "access_token",
        backendResponseJson.data.access_token
      );

      // Alihkan ke halaman beranda
      navigate("/");
    } catch (error) {
      console.error("Terjadi masalah ketika Login with Google:", error);
      alert("Terjadi masalah ketika Login with Google.");
    }
  };
  return (
    <div className=" min-h-screen">
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div> */}
      <h1>Login</h1>

      <form>
        <input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);

            console.log("email value", email);
          }}
          placeholder="Masukkan email"
        />
        <input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);

            console.log("password value", password);
          }}
          type="password"
          placeholder="Masukkan password"
        />

        <button
          onClick={async (e) => {
            e.preventDefault(); //agar ketika mengclick sumbit browser tidak auto reload

            const payload = {
              email: email,
              password: password,
            };

            const response = await fetch(
              tweets_api_base_url + "/api/auth/login",
              {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }
            );

            const responseJson = await response.json();

            if (response.status !== 200) {
              alert("error: " + responseJson.message);
            }
            if (response.status === 200) {
              alert("Login berhasil");
            }

            localStorage.setItem(
              "access_token",
              responseJson.data.access_token
            );

            // If login succeed, redirect ke home
            navigate("/");
          }}
        >
          Login
        </button>
      </form>

      <button>Login with Google</button>

      <GoogleOAuthProvider clientId="154306404543-bvkd8kc1q0ijbunm4meekbb9lf685sf0.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleLoginGoogleSuccess} />;
      </GoogleOAuthProvider>
    </div>
  );
}
