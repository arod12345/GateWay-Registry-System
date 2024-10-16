import React, { useContext } from "react";
import { SideBar, Navbar } from "../components";
import AppContext from "../context/AppContext";
import { FaInfoCircle } from "react-icons/fa";
import { FaFacebook, FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa6";

const About = () => {
  const { collapse } = useContext(AppContext);
  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col items-center bg-white  px-1 py-1`}
      >
        <Navbar
          icon={<FaInfoCircle size={22} className="mr-4" />}
          content="About"
          chevronTrue={false}
        />

        <div className="flex flex-col shadow-lg border-1 rounded-md p-8 border-primaryColor w-[80%] text-mainThemeColor mt-12">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Gate Way Registry System
          </h1>
          <p className="font-bold text-lg underline">Version:1.00</p>
          <p className="my-4">
            Description: Vanguard Securities' Gate Registry System (GRS) is a
            meticulously designed, technologically advanced solution for
            documenting and maintaining comprehensive records of visitors,
            firearms, and vehicular traffic within secured premises. This
            sophisticated system facilitates the efficient management of
            incoming individuals and their associated possessions, while also
            empowering authorized users to access and generate detailed reports
            from the curated data. GRS is tailored to meet the specific needs
            and requirements of its users, ensuring optimal security and
            operational efficiency.
          </p>
          <p className="text-sm">
            <span className=" underline ">Vanguard Securites.</span>All
            Rights Reserverd &copy;2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
