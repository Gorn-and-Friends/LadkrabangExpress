import { BrowserRouter } from "react-router-dom";
import Router from "../routes";
import ThemeProvider from "../services/utils/themeService";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
