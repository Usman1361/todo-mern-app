import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateComponents from "./components/PrivateComponents";
import { useEffect } from "react";
import Todo from "./pages/Todo";
function App() {
  const Navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/");
    }
  }, []);
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route element={<PrivateComponents />}>
          <Route
            path="/"
            element={
              <>
                <Todo />
              </>
            }
          />
        </Route>

        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
