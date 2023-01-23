import { Route, Redirect } from "react-router-dom";

// import Header from "./components/Layout/Header"
import Crosswords from "./pages/Crosswords";

const routes = [
  // { path: "/"},
  // { path: "/home", Component: Crosswords },
  { path: "*", Component: Crosswords },
];

function App() {
  // const location = useLocation();

  return (
    <div>
      {/* {location.pathname !== "/home" ? <Header /> : null} */}
      <div className="mainPageContainer">
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} exact>
              {path === '/' ? <Redirect to='/home' /> : <Component />}
          </Route>
        ))}
      </div>
    </div>
  );
}

export default App;
