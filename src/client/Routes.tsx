import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
export const Page = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={Home()} />
        </Routes>
      </div>
    </div>
  );
};
