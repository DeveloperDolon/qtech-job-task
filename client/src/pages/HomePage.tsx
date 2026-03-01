import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import patternImage from "../assets/Pattern.png";
import personImage from "../assets/Pic.png";
import {
  Paintbrush, // For Design
  LineChart, // For Sales
  Megaphone, // For Marketing
  Briefcase, // For Finance, Business
  Monitor, // For Technology
  Code, // For Engineering
  Users, // For Human Resource
  ArrowRight,
} from "lucide-react";

const COMPANIES = [
  {
    name: "Vodafone",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Vodafone_2017_logo.svg/250px-Vodafone_2017_logo.svg.png",
  },
  {
    name: "Intel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/250px-Intel_logo_2023.svg.png",
  },
  {
    name: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
  {
    name: "AMD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
  },
  {
    name: "Talkit",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
];

const CATEGORIES = [
  { icon: Paintbrush, name: "Design", count: 235 },
  { icon: LineChart, name: "Sales", count: 756 },
  { icon: Megaphone, name: "Marketing", count: 140, featured: true },
  { icon: Briefcase, name: "Finance", count: 325 },
  { icon: Monitor, name: "Technology", count: 435 },
  { icon: Code, name: "Engineering", count: 542 },
  { icon: Briefcase, name: "Business", count: 211 }, // Re-using Briefcase for Business
  { icon: Users, name: "Human Resource", count: 346 },
];

const LATEST_JOBS = [
  {
    id: "1",
    company: "Nomad",
    logo: "🌐",
    title: "Social Media Assistant",
    location: "Paris, France",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-green-500",
  },
  {
    id: "2",
    company: "Netlify",
    logo: "🔷",
    title: "Social Media Assistant",
    location: "Paris, France",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-teal-500",
  },
  {
    id: "3",
    company: "Dropbox",
    logo: "📦",
    title: "Brand Designer",
    location: "San Francisco, USA",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-blue-500",
  },
  {
    id: "4",
    company: "Maze",
    logo: "🔮",
    title: "Brand Designer",
    location: "San Francisco, USA",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-purple-500",
  },
  {
    id: "5",
    company: "Terraform",
    logo: "🌿",
    title: "Interactive Developer",
    location: "Hamburg, Germany",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-emerald-600",
  },
  {
    id: "6",
    company: "Udacity",
    logo: "🎓",
    title: "Interactive Developer",
    location: "Hamburg, Germany",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-blue-600",
  },
  {
    id: "7",
    company: "Packer",
    logo: "📮",
    title: "HR Manager",
    location: "Lucern, Switzerland",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-orange-500",
  },
  {
    id: "8",
    company: "Webflow",
    logo: "🌊",
    title: "HR Manager",
    location: "Lucern, Switzerland",
    tags: ["Full Time", "Marketing", "Design"],
    logoColor: "bg-blue-400",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Full Time": "bg-emerald-50 text-emerald-600",
  Marketing: "bg-amber-50 text-amber-600",
  Design: "bg-primary-50 text-primary border border-primary-100",
  Business: "bg-orange-50 text-orange-600",
};

const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="">
      {/* Hero */}
      <section className="relative pt-10 lg:pt-20">
        {/* Background Geometric Lines (Simplified SVG) */}
        <div className="absolute inset-0 z-0 right-0 flex justify-end">
          <img
            src={patternImage}
            alt="Pattern Background"
            className="w-[60%] h-full object-cover"
          />
        </div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 pb-12 lg:pb-32">
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-[#202430] leading-[1.1] font-epilogue mb-6">
                Discover <br />
                more than <br />
                <span className="relative inline-block text-[#26A4FF]">
                  5000+ Jobs
                  {/* Scribble Underline SVG */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="12"
                    viewBox="0 0 351 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 9.5C50.5 3.5 150.5 1.5 347.5 9.5M10.5 5.5C80.5 1.5 220.5 1.5 340.5 6.5"
                      stroke="#26A4FF"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-[#515B6F] text-lg lg:text-xl mb-10 max-w-lg leading-relaxed">
                Great platform for the job seeker that searching for new career
                heights and passionate about startups.
              </p>

              {/* Refined Search Bar */}
              <div className="bg-white p-2 shadow-xl shadow-blue-900/5 rounded-sm flex flex-col md:flex-row items-center gap-2 max-w-3xl border border-gray-100">
                <div className="flex items-center gap-3 flex-1 px-4 w-full">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-[#202430] py-3 placeholder:text-gray-400"
                  />
                </div>

                <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>

                <div className="flex items-center gap-3 flex-1 px-4 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <span className="text-[#202430]">Florence, Italy</span>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-[#4640DE] text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-700 transition-all w-full md:w-auto whitespace-nowrap"
                >
                  Search my job
                </button>
              </div>

              <p className="text-[#515B6F] text-sm mt-5">
                <span className="opacity-70">Popular :</span>{" "}
                {["UI Designer", "UX Researcher", "Android", "Admin"].map(
                  (tag, i) => (
                    <span
                      key={tag}
                      className="font-medium text-[#202430] cursor-pointer hover:text-[#4640DE]"
                    >
                      {tag}
                      {i < 3 ? ", " : ""}
                    </span>
                  ),
                )}
              </p>
            </div>

            {/* Right Image Content */}
            <div className="lg:col-span-5 relative self-end h-full min-h-[500px] hidden lg:block">
              <img
                src={personImage}
                alt="Man pointing"
                className="absolute bottom-0 right-0 h-[90%] object-contain z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#7C8493] text-lg font-medium mb-10 opacity-70">
            Companies we helped grow
          </p>

          <div className="flex flex-wrap items-center justify-between gap-10">
            {COMPANIES.map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#202430] font-epilogue leading-tight">
              Explore by <span className="text-[#26A4FF]">category</span>
            </h2>
            <button
              onClick={() => navigate("/jobs")}
              className="text-[#4640DE] text-base font-semibold flex items-center gap-2 hover:gap-3 transition-all group"
            >
              Show all jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  navigate(
                    `/jobs?category=${cat.name.toUpperCase().replace(/ /g, "_")}`,
                  )
                }
                className={`flex flex-col items-start p-6 rounded-lg border border-[#E4E5E8] transition-all hover:shadow-lg
                  ${cat.featured ? "bg-[#4640DE] text-white" : "bg-white text-[#202430] hover:border-[#4640DE]"}
                `}
              >
                <div
                  className={`mb-4 ${cat.featured ? "text-white" : "text-[#4640DE]"}`}
                >
                  <cat.icon size={36} strokeWidth={1.5} />{" "}
                  {/* Render Lucide icon */}
                </div>
                <h3
                  className={`font-semibold text-xl mb-1 ${cat.featured ? "text-white" : "text-[#202430]"}`}
                >
                  {cat.name}
                </h3>
                <p
                  className={`text-sm flex items-center gap-1 group transition-colors
                  ${cat.featured ? "text-white opacity-70" : "text-[#7C8493]"}
                `}
                >
                  {cat.count} jobs available
                  <ArrowRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${cat.featured ? "text-white" : "text-[#7C8493]"} opacity-70`}
                  />
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full" />
            <div className="absolute -right-5 bottom-0 w-24 h-24 bg-white/5 rounded-full" />
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold font-epilogue mb-2">
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-primary-100 text-sm">
                Start posting jobs for only $10.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate("/admin/login")}
                className="bg-white text-primary font-bold px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
              >
                Sign Up For Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark font-epilogue">
              Latest <span className="text-primary">jobs open</span>
            </h2>
            <button
              onClick={() => navigate("/jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Show all jobs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LATEST_JOBS.map((job) => (
              <div
                key={job.id + job.company}
                className="flex items-start gap-4 p-5 border border-brand-lightgray rounded-xl hover:border-primary hover:shadow-sm transition-all cursor-pointer"
                onClick={() => navigate("/jobs")}
              >
                <div
                  className={`w-12 h-12 ${job.logoColor} rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg`}
                >
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-brand-dark text-sm">
                    {job.title}
                  </h3>
                  <p className="text-brand-gray text-xs mt-0.5">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${TAG_COLORS[tag] || "bg-gray-100 text-gray-600"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
