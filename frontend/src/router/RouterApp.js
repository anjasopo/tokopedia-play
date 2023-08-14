import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import LayoutLanding from "../widget/LayoutLanding";
import VideoList from "../pages/VideoList";
import VideoDetail from "../pages/VideoDetail";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutLanding>
              <Home />
            </LayoutLanding>
          }
        />

        <Route
          path="/search-video"
          element={
            <LayoutLanding>
              <VideoList />
            </LayoutLanding>
          }
        />

        <Route
          path="/:idData"
          element={
            <LayoutLanding>
              <VideoDetail />
            </LayoutLanding>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
