import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPANIES = ["vodafone", "intel", "TESLA", "AMD", "Talkit"];

const CATEGORIES = [
  { icon: "✏️", name: "Design", count: 235, bg: "bg-white" },
  { icon: "📊", name: "Sales", count: 756, bg: "bg-white" },
  { icon: "📢", name: "Marketing", count: 140, bg: "bg-primary", featured: true },
  { icon: "💼", name: "Finance", count: 325, bg: "bg-white" },
  { icon: "💻", name: "Technology", count: 435, bg: "bg-white" },
  { icon: "</>", name: "Engineering", count: 542, bg: "bg-white" },
  { icon: "🏢", name: "Business", count: 211, bg: "bg-white" },
  { icon: "👥", name: "Human Resource", count: 346, bg: "bg-white" },
];

const LATEST_JOBS = [
  { id: "1", company: "Nomad", logo: "🌐", title: "Social Media Assistant", location: "Paris, France", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-green-500" },
  { id: "2", company: "Netlify", logo: "🔷", title: "Social Media Assistant", location: "Paris, France", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-teal-500" },
  { id: "3", company: "Dropbox", logo: "📦", title: "Brand Designer", location: "San Francisco, USA", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-blue-500" },
  { id: "4", company: "Maze", logo: "🔮", title: "Brand Designer", location: "San Francisco, USA", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-purple-500" },
  { id: "5", company: "Terraform", logo: "🌿", title: "Interactive Developer", location: "Hamburg, Germany", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-emerald-600" },
  { id: "6", company: "Udacity", logo: "🎓", title: "Interactive Developer", location: "Hamburg, Germany", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-blue-600" },
  { id: "7", company: "Packer", logo: "📮", title: "HR Manager", location: "Lucern, Switzerland", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-orange-500" },
  { id: "8", company: "Webflow", logo: "🌊", title: "HR Manager", location: "Lucern, Switzerland", tags: ["Full Time", "Marketing", "Design"], logoColor: "bg-blue-400" },
];

const TAG_COLORS: Record<string, string> = {
  "Full Time": "bg-emerald-50 text-emerald-600",
  "Marketing": "bg-amber-50 text-amber-600",
  "Design": "bg-primary-50 text-primary border border-primary-100",
  "Business": "bg-orange-50 text-orange-600",
};

const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight font-epilogue mb-4">
                Discover<br />
                more than<br />
                <span className="text-primary underline decoration-4">5000+ Jobs</span>
              </h1>
              <p className="text-brand-gray text-base mb-8 max-w-md">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>

              <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-sm p-2 flex flex-col sm:flex-row gap-2 border border-gray-100">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <svg className="w-4 h-4 text-brand-gray flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Job title or keyword"
                    className="flex-1 outline-none text-sm text-brand-dark placeholder:text-brand-gray"
                  />
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 border-l border-gray-200">
                  <svg className="w-4 h-4 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-sm text-brand-gray">Florence, Italy</span>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  Search my job
                </button>
              </form>

              <p className="text-brand-gray text-xs mt-3">
                <span className="font-medium">Popular:</span>{" "}
                <span className="space-x-1">
                  {["UI Designer", "UX Researcher", "Android", "Admin"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => navigate(`/jobs?search=${encodeURIComponent(tag)}`)}
                      className="hover:text-primary hover:underline transition-colors"
                    >
                      {tag},
                    </button>
                  ))}
                </span>
              </p>
            </div>

            <div className="hidden md:flex justify-center relative">
              <div className="w-64 h-72 bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <span className="text-8xl">👨‍💼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gray text-xs mb-6">Companies we helped grow</p>
          <div className="flex flex-wrap gap-8 items-center">
            {COMPANIES.map((company) => (
              <span key={company} className="text-gray-400 font-bold text-sm tracking-wider uppercase">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark font-epilogue">
              Explore by <span className="text-primary">category</span>
            </h2>
            <button
              onClick={() => navigate("/jobs")}
              className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Show all jobs →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/jobs?category=${cat.name.toUpperCase().replace(/ /g, "_")}`)}
                className={`${cat.featured ? "bg-primary text-white" : "bg-white text-brand-dark border border-brand-lightgray hover:border-primary"} 
                  rounded-xl p-5 text-left transition-all hover:shadow-md group`}
              >
                <div className="text-2xl mb-3">{cat.icon}</div>
                <h3 className={`font-semibold text-sm mb-1 ${cat.featured ? "text-white" : "text-brand-dark"}`}>
                  {cat.name}
                </h3>
                <p className={`text-xs flex items-center gap-1 ${cat.featured ? "text-primary-100" : "text-brand-gray"}`}>
                  {cat.count} jobs available
                  <span className={`group-hover:translate-x-1 transition-transform inline-block`}>→</span>
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
                Start posting<br />jobs today
              </h2>
              <p className="text-primary-100 text-sm">Start posting jobs for only $10.</p>
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
                <div className={`w-12 h-12 ${job.logoColor} rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg`}>
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-brand-dark text-sm">{job.title}</h3>
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
