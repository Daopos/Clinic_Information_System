import bg from "../../assets/images/bg.jpg";
import { Button, Label, TextInput } from "flowbite-react";
const Login = () => {
  return (
    <div className="p-20 h-screen bg-primary-100 ">
      <div className="flex min-h-full rounded-xl shadow-lg  border-1 bg-white border-gray-200">
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
          <form className="flex flex-col items-center gap-1 p-8 h-full">
            <h1 className="font-bold text-5xl mt-10 text-primary">Welcome</h1>
            <h6 className="mb-8 mt-2 text-subtle text-lg">Login with email</h6>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput
                className="w-100"
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mt-3">
              <div className="mb-2 block">
                <Label className="w-100" htmlFor="password1">
                  Your password
                </Label>
              </div>
              <TextInput
                className="w-100"
                id="password1"
                type="password"
                required
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
