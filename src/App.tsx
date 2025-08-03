import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useNavigationType } from "react-router-dom";

import Feed from "./layouts/Feed";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";






// import ShareModal from "./components/global/ShareModal";
// import Modal from "./components/global/Modal";
// import {
//   closeShareModel,
//   updatePathQueue,
// } from "./lib/redux/slices/controlSlice";

import Sidebar from "./layouts/Sidebar";
import { useViewport } from "./hooks/useViewport";
import BottomNav from "./mobile components/BottomNav";
import { MOBILE_VIEW_ENDPOINT } from "./constants";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  const lang = useSelector((state: any) => state?.user?.lang);

  const { isMobile, sizeInfo } = useViewport();
  //const lang = localStorage.getItem("lang") || reduxLang;


  return (
    <div
      className="text-primary dark:text-white  "
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      <Routes>
       
        <Route path="not-found" element={<NotFound />} />
        <Route path="login" element={<LoginPage/>}/>
        <Route path="Register" element={<RegisterPage/>}/>
        
       
        <Route
          path="*"
          element={
            <div className="flex w-full h-dvh ">
              {/* <Sidebar /> */}
              <Sidebar />
              <Feed />
              {sizeInfo.currentWidth < MOBILE_VIEW_ENDPOINT && <BottomNav />}
              {/* {isShareModelOpen && (
                <Modal
                  isOpen={isShareModelOpen}
                  onClose={() => {
                    dispatch(closeShareModel());
                  }}
                >
                  <ShareModal inviteLink={shareModelInfo.link} />
                </Modal>
              )} */}
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
