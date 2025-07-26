import { RouterProvider } from "react-router";
import "./App.css";
import router from "./routes.tsx";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const user = await fetchMe(); // GET /me, sends cookie
  //       dispatch(setUser(user));
  //     } catch (err) {
  //       dispatch(clearUser()); // Not logged in
  //     }
  //   };

  //   init();
  // }, []);
  return <RouterProvider router={router} />;
}

export default App;
