import { NavLink } from "react-router-dom";
import { useEffect, useReducer, useCallback } from "react";

import classes from "./Header.module.css";

const WINDOWBREAKPOINT = 675;

const initialState = {
  showNavLinks: true,
  collapsed: false
};

const reducer = (state, action) => {
  if (action.type === "showHideNavLinks") {

    if (window.innerWidth < WINDOWBREAKPOINT) {
      //if already collapsed, leave nav links as is. If collapsing now, hide nav links.
      state.showNavLinks = state.collapsed ? state.showNavLinks : false;
      state.collapsed = true;
    } else {
      state.showNavLinks = true;
      state.collapsed = false;
    } 

    return {
      showNavLinks: state.showNavLinks,
      collapsed: state.collapsed
    };
  } else if (action.type ==="clickMenuIcon") {
    return {
      showNavLinks: !state.showNavLinks,
      collapsed: state.collapsed
    };
  };
};


const Header = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const onClickHandler = () => {
    dispatch({ type: "clickMenuIcon" });
  };
  
  const showHideNavLinks = (useCallback(() => {
      dispatch({ type: "showHideNavLinks"});
    }, [])
  );

  useEffect(() => {
    showHideNavLinks();
  }, [showHideNavLinks]);


  const ulClass = state.showNavLinks ? classes.showNavLinks : classes.hideNavLinks;

  window.addEventListener('resize', showHideNavLinks);

  return (
    <header>
      <nav className={classes.nav}>
        <div>
          <span className={`material-icons ${classes.menuIcon}`} onClick={onClickHandler}>menu</span>
        </div>
        <ul className={ulClass}>
        <li>
            <NavLink to="/home" activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/crosswords" activeClassName={classes.active}>
              Crosswords
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
