import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import tobiImg from "../static/img/tobi.jpg";
import shinaImg from "../static/img/shina.jpg";
import afeezImg from "../static/img/afeezImg.jpg";
import { RootState } from "../redux/store";

const AboutMe = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);

  useEffect(() => {
    dispatch(setHeading("ABOUT ME"));
  }, [dispatch]);

  return (
    <div style={{ "--themeColor": theme } as React.CSSProperties}>
      <p className="font-[montserrat] text-2xl mb-5">
        I'm <span className="font-bold">Ajayi Olamide,</span> Frontend Developer
      </p>
      <p>
        A front-end developer with a background in Mechanical Engineering from
        Ekiti State University. I specialize in building responsive and
        user-friendly web applications using HTML, CSS, JavaScript, React.js,
        Redux, Next.js, Typescript and Tailwind CSS. I'm skilled at both enhancing existing projects
        and creating new ones from scratch. I focus on solving problems,
        optimizing performance, and ensuring cross-browser compatibility. I
        enjoy collaborating with teams to bring ideas to life and deliver
        high-quality web experiences.
      </p>
      <p className="font-[montserrat] text-xl mt-5 mb-2 font-bold">My Skills</p>
      <p className="">Some of my skills and how proficient I am with them</p>
      <div className="px-3 py-4 bg-gray-700 mt-2 grid grid-cols-2 gap-4 rounded-lg">
        {[
          { name: "HTML", percent: "100%" },
          { name: "CSS", percent: "100%" },
          { name: "JavaScript", percent: "100%" },
          { name: "React", percent: "100%" },
          { name: "Redux", percent: "100%" },
          { name: "Tailwind CSS", percent: "100%" },
          { name: "Next.js", percent: "100%" },
          { name: "Typescript", percent: "100%" },
          { name: "API Integration", percent: "100%" },
          { name: "Git & GitHub", percent: "100%" },
          { name: "Responsive Design", percent: "100%" },
        ].map((item) => (
          <div key={item.name} style={{ "--percentWidth": item.percent } as React.CSSProperties}>
            <div className="flex justify-between gap-1 text-gray-100 text-sm">
              <p>{item.name}</p>
              {/* <p>{item.percent}</p> */}
            </div>
            <div className="w-full h-[7px] rounded-full bg-black overflow-hidden">
              <div className="bg-[var(--themeColor)] w-[var(--percentWidth)] h-full"></div>
            </div>
          </div>
        ))}
      </div>
      <p className="font-[montserrat] text-xl mt-5 mb-2 font-bold">
        Testimonials
      </p>
      <p className="mb-10">
        Here are some testimonials from some of my clients
      </p>
      <div className="py-4 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14">
        {[
          {
            text: "I have worked with Ola in various capacities, and he has shown how knowledgeable he is in web development. He is very patient and understands tasks easily. I'd recommend him anytime, any day.",
            name: "Aina Adeshina",
            img: shinaImg,
          },
          {
            text: "Ajayi showed exemplary professional conduct. He took his time to understand the problem statement and provided a very comprehensive solution even though the deadline was tight. I look forward to working with him in the future.",
            name: "Tobiloba Owolabi",
            img: tobiImg,
          },
          {
            text: "I've had the pleasure of working with Olamide, and his expertise is outstanding. He’s patient, quick to understand complex tasks, and always delivers high-quality work. Ajayi's skills made a significant difference in our project. I'd recommend him any day.",
            name: "Daramola Afeeez",
            img: afeezImg,
          },
        ].map((testimonial, index) => (
          <div
            className="relative w-full bg-gray-700 p-3 pt-12 rounded-lg flex items-center flex-col justify-between gap-8"
            key={index}
          >
            <div className="absolute bg-white h-20 w-20 rounded-full top-0 left-[50%] -translate-y-1/2 -translate-x-1/2 flex justify-center items-center overflow-hidden">
              {testimonial.img && (
                <img decoding="async" loading="lazy"
                  src={testimonial.img}
                  alt="client"
                  height={1}
                  width={1}
                  className="w-full h-auto max-w-full object-cover"
                />
              )}
            </div>
            <p className="text-[var(--themeColor)] font-bold">
              "
              <span className="text-sm text-white font-normal">
                {testimonial.text}
              </span>
              "
            </p>
            <p className="font-bold text-[var(--themeColor)]">
              {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
