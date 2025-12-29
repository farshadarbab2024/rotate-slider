import React from "react";
import "./App.css";
import hitlerImage from "./assets/images/profile/Adolf Hitler.jpg";
import himmlerImage from "./assets/images/profile/Heinrich Himmler.jpg";
import gobbelsImage from "./assets/images/profile/Paul Goebbels.jpg";
import rommelImage from "./assets/images/profile/erwin_rommel.jpeg";
import goringImage from "./assets/images/profile/Hermann Goring.jpg";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface Profile {
  image: any;
  alt: string;
  fullName: string;
  bio: string;
  jobTitle: string;
}

const PentagonDots = () => {
  const info: Profile[] = [
    {
      image: hitlerImage,
      alt: "Adolf Hitler",
      fullName: "Adolf Hitler",
      bio: "Adolf Hitler, Chancellor of Germany and Supreme Commander of the Armed Forces during the Nazi regime",
      jobTitle: "Chancellor",
    },
    {
      image: himmlerImage,
      alt: "Heinrich Himmler",
      fullName: "Heinrich Himmler",
      bio: "Heinrich Himmler, Reichsführer-SS and one of the most powerful officials in Nazi Germany",
      jobTitle: "Deputy Leader",
    },
    {
      image: goringImage,
      alt: "Hermann Göring",
      fullName: "Hermann Göring",
      bio: "Hermann Göring, Commander-in-Chief of the German Air Force and a senior leader of the Nazi regime",
      jobTitle: "Commander of the German Air Force",
    },
    {
      image: rommelImage,
      alt: "Erwin Rommel",
      fullName: "Erwin Rommel",
      bio: "Erwin Rommel, German Field Marshal and Commander of Axis forces in North Africa during World War II",
      jobTitle: "Army Commander-in-Chief",
    },
    {
      image: gobbelsImage,
      alt: "Paul Joseph Goebbels",
      fullName: "Paul Joseph Goebbels",
      bio: "Paul Joseph Goebbels, Reich Minister of Propaganda and a leading figure in the Nazi government",
      jobTitle: "Minister of Defense",
    },
  ];

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const radius = 100; // distance from center
  const center = 102; // half of container (w-64 = 256px)
  const profiles = info?.map((profile, i) => {
    const angle = ((i + -slideIndex) * 72 - 90) * (Math.PI / 180); // rotate -90° to start from top
    const x = center + radius * Math.cos(angle) - 10; // 10 = half of dot size
    const y = center + radius * Math.sin(angle) - 10;

    return (
      <div
        key={i}
        className="w-[100px] h-[100px] overflow-hidden rounded-full absolute hover:scale-110
        hover:border-red-300 border-[2px] border-red-50 cursor-pointer transition-all duration-400 ease-out"
        style={{
          left: `${x * 2.6}px`,
          top: `${y * 2.6}px`,
          borderColor: i == slideIndex ? "#dd0303" : "",
          boxShadow:
            i == slideIndex ? "0px 0px 10px rgba(222, 2, 2, 1)" : "none",
        }}
        onClick={() => handleProfileClicked(i)}
      >
        <img src={profile?.image} alt={profile?.alt} />
      </div>
    );
  });

  const handleProfileClicked = (index: number) => {
    setSlideIndex(index);
    console.log("index: ", index);
  };

  useEffect(() => {
    console.log("slideIndex: ", slideIndex);
  }, [slideIndex]); //ntdelete

  const nextSlide = () => {

    if (slideIndex >= (info?.length - 1)) {
      setSlideIndex(0);
    } else {
      setSlideIndex((prev) => prev + 1);
    }
  };
  const beforeSlide = () => {
    if (slideIndex <= 0) {
      setSlideIndex(info?.length - 1);
    } else {
      setSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="w-screen h-screen relative overflow-y-hidden
    bg-[#fffefe] flex items-center justify-center"
    >
      {/* Profiles */}
      <div className="w-[580px] h-[520px] relative">{profiles}</div>

      {/* The Box */}
      <motion.div
        key={slideIndex}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-[330px] h-[240px] absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-[40%] py-4 rounded-lg bg-white
        px-4"
        style={{
          boxShadow: "0px 0px 20px rgba(100, 1, 1, 0.2)",
        }}
      >
        <img
          src={info?.[slideIndex]?.image}
          alt={info?.[slideIndex]?.alt}
          className="rounded-full w-[80px] h-[80px] mx-auto
        shadow-lg border-[3px] border-white absolute top-0 right-1/2 
        translate-x-1/2 -translate-y-1/2"
        />
        <span className="text-center font-bold text-gray-800 block mt-10">
          {info?.[slideIndex]?.fullName}
        </span>
        <span className="text-center text-gray-600 block mt-1 text-[15px] font-medium">
          {info?.[slideIndex]?.jobTitle}
        </span>

        <hr className="border-gray-600 my-2" />

        <p className="text-justify text-gray-600 cursor-default text-[15px]">
          {info?.[slideIndex]?.bio}
        </p>

        {[0, 1].map((_, index: number) => {
          return (
            <div
              key={"next_before_button" + index}
              className="rounded-full w-[40px] h-[40px] flex items-center justify-center
              cursor-pointer hover:bg-red-100 transition duration-200 absolute translate-x-1/2
              bottom-[10px]"
              style={{
                right: index == 0 ? "58%" : "42%",
              }}
              onClick={() => (index == 1 ? nextSlide() : beforeSlide())}
            >
              <FaAngleRight
                style={{
                  transform: index == 0 ? "rotate(180deg)" : undefined,
                }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <div
      className="flex items-center justify-center gap-x-2
      absolute bottom-[20px] right-1/2 translate-x-1/2"
      >
        {info?.map((_, index: number) => {
          return (
            <div
              key={`dot${index}`}
              className="rounded-full w-[8px] h-[8px] bg-gray-700 cursor-pointer"
              style={{
                backgroundColor: slideIndex == index ? "var(--yellow)" : ""
              }}
              onClick={() => setSlideIndex(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default PentagonDots;
