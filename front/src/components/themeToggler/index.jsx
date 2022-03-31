import React, { useContext } from "react";
import "../../assets/styles/ThemeToggler.scss";
import { ThemeContext } from "../../services/utils/themeService";
import sun from "../../assets/svgs/sun.svg";
import moon from "../../assets/svgs/moon.svg";

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === "light" ? (
        <label htmlFor="theme-toggler" className="theme-toggler">
          <input
            type="checkbox"
            id="theme-toggler"
            onChange={(e) =>
              setTheme(e.currentTarget.checked ? "dark" : "light")
            }
          />
          <div>
            <img src={moon} alt="" className="theme-toggler__icon show" />
            <img src={sun} alt="" className="theme-toggler__icon hide" />
          </div>
        </label>
      ) : (
        <label htmlFor="theme-toggler" className="theme-toggler">
          <input
            type="checkbox"
            id="theme-toggler"
            onChange={(e) =>
              setTheme(e.currentTarget.checked ? "dark" : "light")
            }
            checked
          />
          <div>
            <img src={moon} alt="" className="theme-toggler__icon hide" />
            <img src={sun} alt="" className="theme-toggler__icon show" />
          </div>
        </label>
      )}
    </>
  );
};

export default ThemeToggler;
