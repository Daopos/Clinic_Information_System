import { useState } from "react";
import bg from "../../assets/images/bg.jpg";
import { Button, Label, TextInput } from "flowbite-react";
import type { IUserLogin } from "../../types/IUser";
import { authLogin } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    console.log(formData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await authLogin(formData);
      const { ...user } = result;
      dispatch(setUser(user));
      console.log(result);
      // handle success (e.g. navigate, set user, etc.)
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      // optionally show error in UIs
    }
  };

  return (
    <div className="p-20 h-screen bg-primary-100 dark:bg-gray-500">
      <div className="flex min-h-full rounded-xl shadow-lg  border-1 bg-white border-gray-200 dark:bg-gray-800">
        <div className="relative w-full">
          <div
            className="absolute inset-0  bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <div className="absolute inset-0 bg-black opacity-50 rounded-xl" />
          <div className="relative z-10 p-8 text-white">
            <h1 className="mt-15 text-4xl font-bold">
              Welcome to clinic management system
            </h1>
          </div>
        </div>

        <div className="w-full">
          <form
            className="flex flex-col items-center gap-1 p-8 h-full"
            onSubmit={handleLogin}
          >
            <h1 className="font-bold text-5xl mt-10 text-primary">Welcome</h1>
            <h6 className="mb-8 mt-2 text-subtle text-lg">Login with email</h6>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput
                name="email"
                className="w-100"
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
                onChange={handleChnage}
              />
            </div>
            <div className="mt-3">
              <div className="mb-2 block">
                <Label className="w-100" htmlFor="password1">
                  Your password
                </Label>
              </div>
              <TextInput
                name="password"
                className="w-100"
                id="password1"
                type="password"
                required
                onChange={handleChnage}
              />
              <div className="flex ">
                <a
                  href="#"
                  className="text-cyan-600 hover:underline dark:text-cyan-500 w-100 text-end"
                >
                  forgot password?
                </a>
              </div>
            </div>

            <Button className="w-100 mt-5" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
