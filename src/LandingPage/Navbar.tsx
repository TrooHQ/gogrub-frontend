import Logo from "../assets/trooLogo1.svg";
import Arrow from "../assets/arrow_downward.svg";
import ArrowRight from "../assets/chevron_right.svg";
import ArrowRightActive from "../assets/chevron_right_Active.svg";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CloseLineIcon, Menu1LineIcon } from "../assets/icons";
import ArrowDown from "../assets/keyboard_arrow_down.svg";

const Navbar = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [open, setopen] = useState(true);
  const [scroll, setScroll] = useState(true);
  const handleToggle1 = () => {
    setToggle2(false);
    setToggle1(!toggle1);
  };

  const handleToggle2 = () => {
    setToggle1(false);
    setToggle2(!toggle2);
  };
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [menu, setMenu] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const terms2 = [
    "restaurant",
    "hotel",
    "lounges",
    "cafe",
    "fast-food",
    "food-truck",
  ];
  const terms = ["pos", "kds", "table-ordering", "digital-ordering", "payment"];
  const includesTerm = terms.some((term) => location.pathname.includes(term));
  const includesTerm2 = terms2.some((term2) =>
    location.pathname.includes(term2)
  );
  const handleToggleMenu = () => {
    setMenu(!menu);
    setMenu2(false);
  };

  const handleToggleMenu2 = () => {
    setMenu2(!menu2);
    setMenu(false);
  };
  return (
    <div className=" pb-[120px]">
      <div
        className={`fixed top-0 w-full  z-[99999999999] ${
          !scroll && "shadow-md bg-slate-50"
        }`}
      >
        <div className="  py-[35px] lg:mx-[158px] md:border-b border-[#CBCAE7] grid md:flex items-center justify-between gap-[20px] md:gap-0">
          <div className=" mx-[10px] md:mx-0">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div
            className={`md:flex md:items-center text-white font-[400] ${
              !open ? "block" : "hidden"
            }`}
          >
            <ul className=" hidden md:flex items-center gap-[20px]">
              <li className=" ">
                <button
                  className={`focus:outline-none flex items-center gap-[5px] text-[14px] font-[500] ${
                    menu || includesTerm2 ? "text-[#5855B3]" : "text-[#414141]"
                  }`}
                  onClick={handleToggleMenu}
                >
                  Troo for{" "}
                  <span>
                    <img src={Arrow} alt="" />
                  </span>
                </button>
              </li>

              <li className=" ">
                <button
                  className={`focus:outline-none flex items-center gap-[5px] text-[14px] font-[500] ${
                    menu2 || includesTerm ? "text-[#5855B3]" : "text-[#414141]"
                  }`}
                  onClick={handleToggleMenu2}
                >
                  Troo Products{" "}
                  <span>
                    <img src={Arrow} alt="" />
                  </span>
                </button>
              </li>

              <li className=" flex items-center gap-[5px] text-[14px] font-[500] text-[#414141]">
                About us
              </li>

              <NavLink to="/login">
                <li className=" flex items-center gap-[5px] text-[14px] font-[500]  py-[8px] px-[16px] text-[#414141] rounded-[5px] ">
                  Log in
                </li>
              </NavLink>

              <NavLink to="/request-demo">
                <li className=" flex items-center gap-[5px] text-[14px] font-[500]  py-[8px] px-[16px] bg-[#121212] rounded-[5px] text-white">
                  Schedule A Demo
                </li>
              </NavLink>
            </ul>
          </div>
          {open === true && (
            <div
              className="absolute top-10 right-[30px] md:hidden cursor-pointer "
              onClick={() => setopen(false)}
            >
              <Menu1LineIcon />
            </div>
          )}
        </div>
        {menu && (
          <div className="absolute shadow-md top-[220px] left-1/2 transform  -translate-y-1/2 bg-white border border-gray-300 rounded-[10px] py-[24px] px-[31px]">
            <div className=" grid grid-cols-2 gap-[16px]">
              <Link to="/lounges">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/lounges`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>Bars</p>
                    <p className={`text-[14px] font-[400]`}>
                      Sell more and improve service
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/lounges" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>

              <Link to="/restaurant">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/restaurant`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>Restaurants</p>
                    <p className={`text-[14px] font-[400]`}>
                      Let the customer order from the table
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/restaurant" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>

              <Link to="/cafe">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/cafe`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>
                      Cafes & Bakeries
                    </p>
                    <p className={`text-[14px] font-[400]`}>
                      Increase turnover and streamline processes
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/cafe" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
              <Link to="/fast-food">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/fast-food`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>Fast food</p>
                    <p className={`text-[14px] font-[400]`}>
                      Boost your business sales
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/fast-food" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
              <Link to="/hotel">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/hotel`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>Hotels</p>
                    <p className={`text-[14px] font-[400]`}>
                      Let your clients order from their room
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/hotel" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
              <Link to="/food-truck">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/food-truck`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>Food Trucks</p>
                    <p className={`text-[14px] font-[400]`}>
                      Eliminate queues and increase your turnover
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/food-truck" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
        {menu2 && (
          <div className="absolute shadow-md top-[220px] left-1/2 transform  -translate-y-1/2 bg-white border border-gray-300 rounded-[10px] py-[24px] px-[31px]">
            <div className=" grid grid-cols-2 gap-[16px]">
              <Link to="/pos">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/pos`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>POS</p>
                    <p className={`text-[14px] font-[400]`}>
                      Restaurant-grade ePOS register
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/pos" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>

              <Link to="/digital-ordering">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/digital-ordering`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>
                      Digital Ordering
                    </p>
                    <p className={`text-[14px] font-[400]`}>
                      Drive sales with online ordering workflows
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/digital-ordering" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>

              <Link to="/kds">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/kds`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>KDS</p>
                    <p className={`text-[14px] font-[400]`}>
                      Keep your front and back house in sync
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/kds" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
              <Link to="/payment">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/payment`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>
                      Payment Processing
                    </p>
                    <p className={`text-[14px] font-[400]`}>
                      Receive payments faster and smarter
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/payment" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
              <Link to="/table-ordering">
                <div className=" flex items-center justify-between w-[301px]">
                  <div
                    className={`${
                      location.pathname === `/table-ordering`
                        ? `text-[#5855B3]`
                        : "text-[#414141] "
                    }`}
                  >
                    <p className={`text-[16px] font-[500] `}>Table Ordering</p>
                    <p className={`text-[14px] font-[400]`}>
                      Order from anywhere in-store
                    </p>
                  </div>
                  <div className="">
                    {location.pathname === "/table-ordering" ? (
                      <img src={ArrowRightActive} />
                    ) : (
                      <img src={ArrowRight} alt="" />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      {!open && (
        <div
          className={`bg-[#E7E7E7] z-[99999999999999999] w-[100%] h-screen md:hidden fixed top-0 px-[24px] py-[40px] ${
            !open
              ? "right-0 transition-transform transform translate-x-0 md:translate-x-full"
              : "right-[calc(100vw - 375px)] transition-transform transform translate-x-full md:translate-x-0"
          }`}
        >
          <div
            className="flex items-center justify-end mb-[36px] md:hidden cursor-pointer"
            onClick={() => setopen(true)}
          >
            <CloseLineIcon />
          </div>
          <div className="">
            <NavLink to="/demo/login/gogrub-portal">
              <li className=" list-none text-center gap-[5px] text-[14px] font-[500] py-[10px] px-[16px] bg-[#121212] rounded-[5px] text-white">
                Log in
              </li>
            </NavLink>

            <div className=" mt-[40px]">
              <div className="faq-item">
                <div className="py-[16px] border-[#B6B6B6]">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={handleToggle1}
                  >
                    <p className="font-[500] text-[18px] text-[#414141]">
                      Troo for
                    </p>
                    <img
                      src={ArrowDown}
                      alt=""
                      className={`transition-all ${
                        toggle1 ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {toggle1 && (
                    <div className=" my-[16px] grid gap-[16px] px-[16px] md:px-0">
                      <NavLink to="/lounges">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Bars
                        </p>
                      </NavLink>
                      <NavLink to="/cafe">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Cafes & Bakeries
                        </p>
                      </NavLink>
                      <NavLink to="/hotel">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Hotels
                        </p>
                      </NavLink>
                      <NavLink to="/restaurant">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Restaurants
                        </p>
                      </NavLink>
                      <NavLink to="/fast-food">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Fast Foods
                        </p>
                      </NavLink>
                      <NavLink to="/food-truck">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Food Trucks
                        </p>
                      </NavLink>
                    </div>
                  )}
                </div>

                <div
                  className="cursor-pointer py-[16px] border-[#B6B6B6]"
                  onClick={handleToggle2}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-[500] text-[18px] text-[#414141]">
                      Products
                    </p>
                    <img
                      src={ArrowDown}
                      alt=""
                      className={`transition-all ${
                        toggle2 ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {toggle2 && (
                    <div className=" my-[16px] grid gap-[16px] px-[16px] md:px-0">
                      <NavLink to="/pos">
                        {" "}
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          POS
                        </p>
                      </NavLink>
                      <NavLink to="/kds">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          KDS
                        </p>
                      </NavLink>
                      <NavLink to="/table-ordering">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Table Ordering
                        </p>
                      </NavLink>
                      <NavLink to="/digital-ordering">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Digital Ordering
                        </p>
                      </NavLink>

                      <NavLink to="/payment">
                        <p className=" text-[#000000] text-[16px] font-[400]">
                          Payment Proceessing
                        </p>
                      </NavLink>
                    </div>
                  )}
                </div>
                <div className=" py-[16px]">
                  <p className="font-[500] text-[18px] text-[#414141]">
                    About Us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
