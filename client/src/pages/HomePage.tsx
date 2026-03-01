import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import patternImage from "../assets/Pattern.png";
import personImage from "../assets/Pic.png";
import dashboardImage from "../assets/dashboard.png";
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

const FEATURED_JOBS = [
  {
    id: 1,
    company: "Revolut",
    title: "Email Marketing",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Revolut_logo.svg",
    tags: [
      { label: "Marketing", color: "text-orange-400 bg-orange-50" },
      { label: "Design", color: "text-teal-500 bg-teal-50" },
    ],
  },
  {
    id: 2,
    company: "Dropbox",
    title: "Brand Designer",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
    tags: [
      { label: "Design", color: "text-teal-500 bg-teal-50" },
      { label: "Business", color: "text-blue-600 bg-blue-50" },
    ],
  },
  {
    id: 3,
    company: "Pitch",
    title: "Email Marketing",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    type: "Full Time",
    logo: "https://pitch.com/favicon-32x32.png",
    tags: [{ label: "Marketing", color: "text-orange-400 bg-orange-50" }],
  },
  {
    id: 4,
    company: "Blinklist",
    title: "Visual Designer",
    location: "Granada, Spain",
    description:
      "Blinklist is looking for Visual Designer to help team desi ...",
    type: "Full Time",
    logo: "https://www.blinkist.com/favicon.ico",
    tags: [{ label: "Design", color: "text-teal-500 bg-teal-50" }],
  },
  {
    id: 5,
    company: "ClassPass",
    title: "Product Designer",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    type: "Full Time",
    logo: "https://classpass.com/favicon.ico",
    tags: [
      { label: "Marketing", color: "text-orange-400 bg-orange-50" },
      { label: "Design", color: "text-teal-500 bg-teal-50" },
    ],
  },
  {
    id: 6,
    company: "Canva",
    title: "Lead Designer",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    type: "Full Time",
    logo: "https://www.canva.com/favicon.ico",
    tags: [
      { label: "Design", color: "text-teal-500 bg-teal-50" },
      { label: "Business", color: "text-blue-600 bg-blue-50" },
    ],
  },
  {
    id: 7,
    company: "GoDaddy",
    title: "Brand Strategist",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    type: "Full Time",
    logo: "https://www.godaddy.com/favicon.ico",
    tags: [{ label: "Marketing", color: "text-orange-400 bg-orange-50" }],
  },
  {
    id: 8,
    company: "Twitter",
    title: "Data Analyst",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    tags: [{ label: "Technology", color: "text-red-400 bg-red-50" }],
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* The Angled Background Shape */}
          <div
            className="bg-[#4640DE] w-full min-h-[440px] relative flex items-center"
            style={{
              // Point 1: Top-Left (cut starts)
              // Point 2: Top Edge (cut ends)
              // Point 3: Top-Right (square)
              // Point 4: Right Edge (bottom cut starts)
              // Point 5: Bottom Edge (bottom cut ends)
              // Point 6: Bottom-Left (square)
              clipPath:
                "polygon(0% 30%, 15% 0%, 100% 0%, 100% 70%, 85% 100%, 0% 100%)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full px-8 md:px-20 py-16 md:py-0">
              {/* Left Content */}
              <div className="z-10 text-white">
                <h2 className="text-4xl md:text-[56px] font-bold font-epilogue leading-[1.1] mb-6">
                  Start posting <br />
                  jobs today
                </h2>
                <p className="text-white/90 text-lg md:text-xl font-medium mb-10">
                  Start posting jobs for only $10.
                </p>
                <div>
                  <button
                    onClick={() => navigate("/admin/login")}
                    className="bg-white text-[#4640DE] font-bold px-10 py-4 rounded-sm hover:bg-gray-100 transition-all text-lg shadow-xl"
                  >
                    Sign Up For Free
                  </button>
                </div>
              </div>

              {/* Right Side - Dashboard Placement */}
              <div className="hidden md:block relative self-stretch">
                <img
                  src={dashboardImage} // Replace with your actual image path
                  alt="Dashboard UI Mockup"
                  className="absolute top-1/2 -translate-y-1/2 left-4 w-[130%] max-w-none shadow-2xl rounded-sm"
                  style={{
                    filter: "drop-shadow(0 35px 60px rgba(0,0,0,0.4))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* featured job list -->  */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#202430] font-epilogue">
              Featured <span className="text-[#26A4FF]">jobs</span>
            </h2>
            <button className="text-[#4640DE] font-bold flex items-center gap-2 hover:underline transition-all group">
              Show all jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_JOBS.map((job) => (
              <div
                key={job.id}
                className="border border-[#E4E5E8] p-6 flex flex-col bg-white hover:border-[#4640DE] transition-colors cursor-pointer"
              >
                {/* Top Row: Logo & Type Badge */}
                <div className="flex justify-between items-start mb-6">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="border border-[#4640DE] text-[#4640DE] px-3 py-1 text-xs font-semibold">
                    {job.type}
                  </span>
                </div>

                {/* Job Titles */}
                <h3 className="text-[#202430] text-lg font-bold mb-1 leading-tight">
                  {job.title}
                </h3>
                <p className="text-[#7C8493] text-sm mb-4">
                  {job.company} <span className="mx-1">•</span> {job.location}
                </p>

                {/* Description Excerpt */}
                <p className="text-[#7C8493] text-sm mb-6 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Bottom Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
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
