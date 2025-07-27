import { RouterProvider } from "react-router";
import "./App.css";
import router from "./routes.tsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { me } from "./services/Auth.ts";
import { clearUser, setUser } from "./store/user/userSlice.ts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await me(); // GET /me, sends cookie
        dispatch(setUser(user));
      } catch {
        dispatch(clearUser()); // Not logged in
      }
    };

    init();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
