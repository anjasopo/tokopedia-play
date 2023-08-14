import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LayoutLanding = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default LayoutLanding;
