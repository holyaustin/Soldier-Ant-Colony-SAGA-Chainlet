import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bgtalk.mp4";

const Landing = () => {
  const navigate = useNavigate();

  const getstarted = async () => {
    try {
      navigate("/battleground");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex w-full mf:flex-row flex-col justify-center items-center"
      style={{ height: "100vh",

      }}
    >
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-1 font-bold">
          <h1 className="text-4xl sm:text-7xl text-green-300 font-semibold">
            Soldier Ant Colony <br />
          </h1><br />
          <p className="text-left mt-1 text-white md:w-10/12 w-11/12 text-4xl font-black">
            A community-based <br />
            play to earn game. <br /><br />
            Earn with our marketplace <br />
            through collaboration<br /><br />
            Bionatures attack exhbited <br />
            by one of the smallest <br />
            creatures on planet earth.
          </p><br />
          <div className="md:flex-[0.8] flex-initial justify-left items-center">

            {/** <img src={logo2} alt="welcome" className="w-100 cursor-pointer" />  */}
          </div>

          <br />

          {/** {!currentAccount && ( )} */}
          <button
            type="button"
            onClick={getstarted}
            className="flex flex-row justify-center items-center my-5 bg-green-300 p-3 rounded-full cursor-pointer hover:bg-green-800 hover:text-white"
          >

            <p className="text-black text-3xl font-semibold py-3 px-10 mx-14 hover:text-white hover:text-white">
              Get Started
            </p>
          </button>

        </div>
      </div>
      <div className="sm:flex-[0.9] lg:flex-[0.9]flex-initial justify-left items-center content-center">
        <video
          loop
          autoPlay
          muted
          style={{
            position: "absolute",
            width: "50%",
            // left: "20%",
            top: "20%",
            height: "70%",
            objectFit: "cover",
            transform: "tanslate(-50%, -50%)",
            zindex: "-1",
          }}
        >
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
          <source
            src={bg}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/** <img src={logo1} alt="welcome" className="w-100 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default Landing;
