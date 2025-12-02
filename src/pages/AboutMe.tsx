import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import PulseSkeleton from "../components/general/PulseSkeleton";
import TestimonialCard from "../components/aboutMe/TestimonialCard";
import TestimonialCardSkeleton from "components/aboutMe/TestimonialCardSkeleton";
import PageWrapper from "components/wrappers/PageWrapper";

const AboutMe = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

  const runOperation = async (): Promise<User> => {
    const response = await api.get("/user");
    return response.data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["/user"],
    queryFn: runOperation,
  });

  return (
    <PageWrapper heading="ABOUT ME">
      <div
        className="flex flex-col gap-[3.125rem]"
        style={{ "--themeColor": theme } as React.CSSProperties}
      >
        <div className="flex flex-col gap-5">
          <p
            className="text-2xl flex gap-1 items-center flex-wrap"
            data-aos="zoom-in"
          >
            I'm <span className="font-bold">Ajayi Olamide,</span>{" "}
            {isLoading ? (
              <Loader2 size={20} strokeWidth={2} className="animate-spin" />
            ) : (
              data?.jobTitle
            )}
          </p>
          <div data-aos="fade-up">
            {isLoading || !data ? (
              <div className="flex flex-col gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PulseSkeleton
                    key={i}
                    backgroundColor="#99a1af"
                    width={"100%"}
                    height={20}
                  />
                ))}
              </div>
            ) : (
              <p>{data.homePageAbout}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold" data-aos="fade-up">
            My Skills
          </p>
          <p data-aos="fade-up">Technologies and tools I work with</p>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 px-3 py-4 bg-gray-700 rounded-lg"
            data-aos="fade-up"
          >
            {isLoading || !data
              ? Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center text-sm font-medium text-gray-100"
                  >
                    <span className="text-[var(--themeColor)] mr-2">•</span>
                    <PulseSkeleton width={75} height={18} />
                  </div>
                ))
              : data?.skills.map((skill) => (
                  <div
                    key={skill.shortName}
                    className="flex items-center text-sm font-medium text-gray-100"
                  >
                    <span className="text-[var(--themeColor)] mr-2">•</span>
                    <p>{skill.fullName}</p>
                  </div>
                ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold" data-aos="fade-up">
              Testimonials
            </p>
            <p data-aos="fade-up">
              Here are some testimonials from some of my clients
            </p>
          </div>
          <div
            className="grid grid-cols-1 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14"
            data-aos="zoom-in"
          >
            {isLoading || !data
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TestimonialCardSkeleton key={i} />
                ))
              : data.testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    name={`${testimonial.lastName} ${testimonial.firstName}`}
                    img={testimonial.profilePicture}
                    text={testimonial.testimonial}
                  />
                ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutMe;
