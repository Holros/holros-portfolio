import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import  { removeAuthTokens } from "api/api";
import PageWrapper from "components/wrappers/PageWrapper";
import { logout } from "../redux/slice/isLoggedInSlice";
import ProfileInfo from "components/edit/ProfileInfo";
import Skills from "components/edit/skills/Skills";
import Testimonials from "components/edit/testimonials/Testimonials";
import Projects from "components/edit/projects/Projects";


export default function EditPage() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<
    "profile" | "skills" | "projects" | "testimonials"
  >("projects");

  const tabs = [
    { id: "profile", label: "Profile Info" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
  ];

  return (
    <PageWrapper heading="EDIT PORTFOLIO">
      <div
        className="flex flex-col gap-8 min-h-screen"
        style={{ "--themeColor": theme } as React.CSSProperties}
      >
        <p className="text-xl" data-aos="zoom-in">
          Manage your <span className="font-bold">content</span> and update your
          portfolio.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? "bg-white text-gray-800 border-x border-t border-gray-300"
                  : "hover:text-gray-800 hover:bg-gray-100 text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            removeAuthTokens();
            dispatch(logout());
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition w-fit ${"bg-red-500 text-white hover:bg-red-500"}`}
        >
          Logout
        </button>

        {/* Tab Content Area */}
        <div className="bg-white p-4 rounded-lg min-h-[400px] border border-gray-300 shadow-lg">
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
                <p className="text-sm">
                  Update your bio, job title, and resume link here.
                </p>
              </div>
              <ProfileInfo />
            </div>
          )}

          {activeTab === "skills" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Skill Set</h2>
                <p className="text-sm">
                  Add or remove technologies you work with.
                </p>
              </div>
              <Skills />
            </div>
          )}

          {activeTab === "projects" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Portfolio Projects</h2>
                <p className="text-sm">
                  Showcase your best work. Upload images and link your code.
                </p>
              </div>
              <Projects />
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Client Testimonials</h2>
                <p className="text-sm">Manage what people say about you.</p>
              </div>
              <Testimonials />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
