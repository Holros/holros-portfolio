import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import { useSelector } from "react-redux";
import githubIcon from "../static/icon/icons8-github.svg";
import linkedInIcon from "../static/icon/icons8-linkedin.svg";
import whatsappIcon from "../static/icon/icons8-whatsapp.svg";
import emailIcon from "../static/icon/icons8-email-100.png";
import callIcon from "../static/icon/icons8-call-contact.png";

const Contact = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("CONTACT"));
  }, [dispatch]);
  return (
    <div style={{ "--themeColor": theme }}>
      <p className="font-[montserrat] text-xl mb-5">
        Feel free to <span className="font-bold">contact</span> me!
      </p>
      <div className="my-[7vh] grid grid-cols-2 gap-2">
        {[
          {
            img: whatsappIcon,
            link: "https://wa.me/2348149914662",
            text: "Whatsapp",
          },
          { img: callIcon, link: "tel:+2348149914662", text: "Call me" },
          {
            img: emailIcon,
            link: "mailto:olasco4real28@gmail.com",
            text: "Email me",
          },
          {
            img: githubIcon,
            link: "https://github.com/Holros",
            text: "Github",
          },
          {
            img: linkedInIcon,
            link: "https://linkedin.com/in/holros",
            text: "LinkedIn",
          },
        ].map((type, index) => (
          <a
            href={type.link}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 items-center hover:bg-[var(--themeColor)] py-2 hover:px-2 hover:text-white group rounded-lg font-bold text-sm"
            key={index}
          >
            <div className="p-2 border border-red group-hover:bg-gray-300 rounded-full">
              <img
                src={type.img}
                alt={type.text}
                className="max-w-full h-auto w-10"
              />
            </div>{" "}
            <p>{type.text}</p>
          </a>
        ))}
      </div>
      <div className="flex justify-center font-bold text-2xl mt-6">Thanks!</div>
    </div>
  );
};

export default Contact;
