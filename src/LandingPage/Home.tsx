import Navbar from "./Navbar";
import Circle from "../assets/greyCircle.svg";
import HeroSection from "./HeroSection";
import BusinessTabs from "./BusinessTabs";
import Organize from "./Organize";
import Built from "./Built";
import FAQ from "./LandingPageFAQ";
import Blog from "./Blog";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="relative">
      {/* <div className="max-w-[1440px] md:mx-[40px] 2xl:mx-auto 2xl:max-w-full"> */}
      <Navbar />
      {/* </div> */}
      <HeroSection />
      <div className="mt-[30px]">
        <img
          src={Circle}
          alt=""
          className="hidden md:block absolute top-0 left-0 w-[1132px] -z-50"
        />
        <div className="z-10">
          <BusinessTabs />
        </div>
        <Organize />
        <Built />
        <FAQ />
        <Blog />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
