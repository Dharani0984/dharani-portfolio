import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "Python", level: 92, color: "#3b82f6" },
  { name: "Django", level: 90, color: "#059669" },
  { name: "React JS", level: 88, color: "#06b6d4" },
  { name: "Django REST Framework", level: 87, color: "#7c3aed" },
  { name: "MySQL / PostgreSQL", level: 82, color: "#d97706" },
  { name: "PHP Laravel", level: 78, color: "#dc2626" },
  { name: "Redux", level: 80, color: "#7c3aed" },
  { name: "Git / Postman", level: 85, color: "#374151" },
];

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "CredRight Finance Pvt Ltd",
    period: "Aug 2023 – Present",
    location: "Hyderabad, India",
    type: "FinTech",
    color: "#3b82f6",
    points: [
      "Architected full-stack LOS (Loan Origination System) with Django backend & React JS frontend",
      "Designed RESTful APIs using Django REST Framework for dashboards and mobile apps",
      "Built responsive component-driven React JS UI for loan dashboards and approval flows",
      "Led a team of 2.5 Python developers; conducted code reviews and training sessions",
      "Optimized MySQL queries and Django ORM reducing API latency significantly",
    ],
  },
  {
    role: "Software Engineer",
    company: "Web Synergies Pvt. Ltd",
    period: "Jan 2022 – Jul 2023",
    location: "Hyderabad, India",
    type: "Enterprise",
    color: "#059669",
    points: [
      "Enhanced reusable PHP (Laravel) backend modules for enterprise web applications",
      "Integrated React JS components with Django REST APIs establishing clean data contracts",
      "Built Laravel RESTful APIs for Credright Sales Mobile App supporting 7 business modules",
      "Collaborated cross-functionally to troubleshoot, test, and optimize application performance",
    ],
  },
  {
    role: "Web Developer",
    company: "App Clouds Software Solutions",
    period: "Sep 2019 – Dec 2022",
    location: "Hyderabad, India",
    type: "Full Stack",
    color: "#d97706",
    points: [
      "Built full-stack features using PHP (Laravel), MySQL, jQuery, HTML5 and CSS3",
      "Maintained technical documentation for system architecture and API contracts",
      "Delivered end-to-end projects for Aparna Constructions, Sunergeo, and STCMI",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Tech Integra Solutions",
    period: "Feb 2019 – Sep 2019",
    location: "Hyderabad, India",
    type: "PHP / Laravel",
    color: "#7c3aed",
    points: [
      "Contributed to SalonCloudsPlus — a salon management platform using PHP (Laravel)",
      "Managed backend MySQL database querying and API endpoints for online booking modules",
    ],
  },
];

const projects = [
  {
    title: "LOS – Loan Origination System",
    tech: ["Python (Django)", "React JS", "MySQL", "DRF"],
    desc: "Full-stack FinTech platform automating loan origination workflows. Django REST APIs + React JS dashboards enabling real-time loan tracking and reporting.",
    icon: "💳",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
  },
  {
    title: "Credright Sales Mobile App",
    tech: ["PHP (Laravel)", "MySQL", "RESTful APIs"],
    desc: "Backend API platform powering field sales mobile app with 7 business modules — loan sales, disbursement tracking, and customer management.",
    icon: "📱",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
  },
  {
    title: "SalonCloudsPlus",
    tech: ["PHP (Laravel)", "MySQL", "jQuery", "HTML5"],
    desc: "Salon & spa management platform with online booking, confirmations, and marketing tools. Built backend APIs and frontend features across multiple regions.",
    icon: "✂️",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
  },
  {
    title: "Other FinTech & Real Estate Projects",
    tech: ["Django", "Laravel", "React", "MySQL"],
    desc: "Loan Process CRM, Aparna Constructions, My Dry Salon, TRU Salon & Spa, STCMI — across FinTech, real estate, and hospitality verticals.",
    icon: "🏗️",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
];

const competencies = [
  "Full Stack Development", "Python Django", "React JS Frontend",
  "REST API Design", "Django REST Framework", "Database Optimization",
  "Team Leadership", "Agile / Scrum", "Code Review",
  "Software Architecture", "FinTech Platforms", "PHP Laravel",
];

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SkillBar({ name, level, color, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(level), delay);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: "#e2e8f0", letterSpacing: "0.02em" }}>{name}</span>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: color, fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          width: `${width}%`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 12px ${color}66`
        }} />
      </div>
    </div>
  );
}

function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Section({ children, id, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section id={id} ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      ...style
    }}>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) { setActiveNav(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = ["home", "about", "skills", "experience", "projects", "contact"];

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "#040b14",
      color: "#e2e8f0",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #040b14; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 99px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes particle-float {
          0%{transform:translateY(0) translateX(0) scale(1); opacity:0.7}
          33%{transform:translateY(-60px) translateX(20px) scale(1.2); opacity:1}
          66%{transform:translateY(-30px) translateX(-15px) scale(0.8); opacity:0.5}
          100%{transform:translateY(0) translateX(0) scale(1); opacity:0.7}
        }
        .nav-link { cursor:pointer; padding:8px 16px; border-radius:8px; font-size:13px; font-weight:500; letter-spacing:0.04em; text-transform:uppercase; transition:all 0.3s; color:#94a3b8; }
        .nav-link:hover { color:#3b82f6; background:rgba(59,130,246,0.1); }
        .nav-link.active { color:#3b82f6; background:rgba(59,130,246,0.15); }
        .card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:16px; transition:all 0.4s; }
        .card:hover { background:rgba(255,255,255,0.06); border-color:rgba(59,130,246,0.3); transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(59,130,246,0.1); }
        .btn-primary { background:linear-gradient(135deg,#3b82f6,#06b6d4); border:none; color:#fff; padding:14px 32px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; letter-spacing:0.04em; transition:all 0.3s; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(59,130,246,0.5); }
        .btn-outline { background:transparent; border:1px solid rgba(59,130,246,0.5); color:#3b82f6; padding:14px 32px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; letter-spacing:0.04em; transition:all 0.3s; }
        .btn-outline:hover { background:rgba(59,130,246,0.1); border-color:#3b82f6; transform:translateY(-2px); }
        .tag { display:inline-block; padding:4px 12px; border-radius:99px; font-size:11px; font-weight:600; letter-spacing:0.05em; }
        .section-title { font-size:clamp(28px,5vw,42px); font-weight:800; letter-spacing:-0.02em; margin-bottom:8px; }
        .section-sub { color:#64748b; font-size:15px; margin-bottom:48px; }
        .glow-blue { text-shadow: 0 0 30px rgba(59,130,246,0.6); }
        .contact-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:14px 18px; color:#e2e8f0; font-size:14px; font-family:inherit; outline:none; transition:all 0.3s; }
        .contact-input:focus { border-color:#3b82f6; background:rgba(59,130,246,0.05); box-shadow:0 0 0 3px rgba(59,130,246,0.15); }
        .contact-input::placeholder { color:#475569; }
      `}</style>

      {/* Cursor glow */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        left: mousePos.x - 200, top: mousePos.y - 200,
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }} />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "fixed", pointerEvents: "none", zIndex: 0,
          left: `${10 + i * 8}%`, top: `${15 + (i % 5) * 18}%`,
          width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2,
          borderRadius: "50%",
          background: i % 4 === 0 ? "#3b82f6" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#7c3aed" : "#059669",
          opacity: 0.4,
          animation: `particle-float ${4 + i * 0.7}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(4,11,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s",
        padding: "0 clamp(16px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 18, fontWeight: 700, color: "#3b82f6" }}>
            &lt;DK /&gt;
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {navLinks.map(link => (
              <div key={link} className={`nav-link${activeNav === link ? " active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px clamp(16px,5vw,80px) 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "15%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", zIndex: 0, animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", zIndex: 0, animation: "float 8s ease-in-out infinite 2s" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ height: 2, width: 40, background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: "#3b82f6", letterSpacing: "0.1em" }}>SENIOR UI FULL STACK DEVELOPER</span>
              </div>
              <h1 style={{ fontSize: "clamp(42px,8vw,80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
                Dharani Kumar
                <br />
                <span style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4, #7c3aed)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite" }}>
                  Nellore
                </span>
              </h1>
              <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, maxWidth: 540, marginBottom: 40 }}>
                Results-driven engineer with <span style={{ color: "#3b82f6", fontWeight: 700 }}>7 years</span> building scalable full-stack applications.
                Expert in <span style={{ color: "#06b6d4", fontWeight: 600 }}>Python · Django · React JS</span> — from REST API design to responsive interfaces.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
                <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects →</button>
                <button className="btn-outline" onClick={() => scrollTo("contact")}>Hire Me</button>
              </div>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["7+", "Years Experience"], ["4+", "Companies"], ["10+", "Projects"], ["FinTech", "Specialization"]].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#3b82f6", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, letterSpacing: "0.05em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div style={{ position: "relative", animation: "float 5s ease-in-out infinite" }}>
              <div style={{ position: "relative", width: 280, height: 280 }}>
                {/* Pulse rings */}
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    border: "1px solid rgba(59,130,246,0.3)",
                    animation: `pulse-ring 3s ease-out infinite`,
                    animationDelay: `${i * 0.8}s`,
                  }} />
                ))}
                {/* Spinning border */}
                <div style={{
                  position: "absolute", inset: -4, borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #3b82f6, #06b6d4, #7c3aed, #3b82f6)",
                  animation: "spin-slow 4s linear infinite",
                }} />
                <div style={{
                  position: "absolute", inset: 2, borderRadius: "50%",
                  background: "#040b14",
                }} />
                <div style={{
                  position: "absolute", inset: 8, borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e3a5f, #0f2440)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 88, fontWeight: 900,
                  color: "#3b82f6",
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                }}>
                  DK
                </div>
                {/* Tech badges */}
                {[
                  { label: "Python", angle: -30, dist: 150, color: "#3b82f6" },
                  { label: "React", angle: 90, dist: 145, color: "#06b6d4" },
                  { label: "Django", angle: 200, dist: 150, color: "#059669" },
                ].map(({ label, angle, dist, color }) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <div key={label} style={{
                      position: "absolute",
                      left: "50%", top: "50%",
                      transform: `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px))`,
                      background: `${color}22`,
                      border: `1px solid ${color}44`,
                      borderRadius: 8, padding: "4px 12px",
                      fontSize: 11, fontWeight: 700, color: color,
                      fontFamily: "'Fira Code', monospace",
                      whiteSpace: "nowrap",
                    }}>{label}</div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 2s ease-in-out infinite" }}>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, #3b82f6)" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" style={{ padding: "100px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#3b82f6", letterSpacing: "0.12em", marginBottom: 12 }}>// ABOUT ME</div>
            <h2 className="section-title">Who I Am</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9, marginBottom: 20 }}>
                I'm a <strong style={{ color: "#e2e8f0" }}>Senior Software Engineer</strong> with 7 years of experience delivering high-impact full-stack products. Formerly a Laravel developer, now fully focused on <strong style={{ color: "#3b82f6" }}>Python · Django · React JS</strong> across backend, frontend, and API layers.
              </p>
              <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9, marginBottom: 32 }}>
                Proven track record in <strong style={{ color: "#06b6d4" }}>FinTech platforms</strong>, team leadership, and delivering scalable solutions. I architect systems that handle real-world financial data with precision and reliability.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  { icon: "✉", val: "nellore.dharani0984@gmail.com" },
                  { icon: "📍", val: "Hyderabad, India" },
                  { icon: "📞", val: "+91 95509 48939" },
                ].map(({ icon, val }) => (
                  <div key={val} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b" }}>
                    <span>{icon}</span><span style={{ color: "#94a3b8" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { num: 7, suf: "+", label: "Years Experience", color: "#3b82f6" },
                { num: 10, suf: "+", label: "Projects Delivered", color: "#06b6d4" },
                { num: 4, suf: "", label: "Companies", color: "#7c3aed" },
                { num: 99, suf: "%", label: "Client Satisfaction", color: "#059669" },
              ].map(({ num, suf, label, color }) => (
                <div key={label} className="card" style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 42, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Fira Code', monospace" }}>
                    <AnimatedCounter target={num} suffix={suf} />
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 8, letterSpacing: "0.04em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" style={{ padding: "100px clamp(16px,5vw,80px)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#3b82f6", letterSpacing: "0.12em", marginBottom: 12 }}>// TECH STACK</div>
            <h2 className="section-title">Skills & Technologies</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#64748b", marginBottom: 32, fontFamily: "'Fira Code', monospace", letterSpacing: "0.06em" }}>PROFICIENCY LEVELS</h3>
              {skills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 100} />
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#64748b", marginBottom: 32, fontFamily: "'Fira Code', monospace", letterSpacing: "0.06em" }}>CORE COMPETENCIES</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {competencies.map((c, i) => (
                  <span key={c} className="tag" style={{
                    background: `rgba(${i % 3 === 0 ? "59,130,246" : i % 3 === 1 ? "6,182,212" : "124,58,237"},0.12)`,
                    color: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#06b6d4" : "#a78bfa",
                    border: `1px solid rgba(${i % 3 === 0 ? "59,130,246" : i % 3 === 1 ? "6,182,212" : "124,58,237"},0.25)`,
                    padding: "8px 16px", fontSize: 12,
                  }}>{c}</span>
                ))}
              </div>
              <div style={{ marginTop: 40, padding: 24, borderRadius: 12, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: "#3b82f6", marginBottom: 12 }}>education.mca</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Master of Computer Applications</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Vikrama Simhapuri University — 2013–2016</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>VR Institute of PG Studies</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" style={{ padding: "100px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#3b82f6", letterSpacing: "0.12em", marginBottom: 12 }}>// CAREER JOURNEY</div>
            <h2 className="section-title">Work Experience</h2>
          </div>
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #3b82f6, rgba(59,130,246,0.1))" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 72 }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute", left: -60, top: 24,
                    width: 16, height: 16, borderRadius: "50%",
                    background: exp.color, border: "3px solid #040b14",
                    boxShadow: `0 0 16px ${exp.color}88`,
                  }} />
                  <div className="card" style={{ padding: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <span className="tag" style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30`, fontSize: 11 }}>{exp.type}</span>
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0", letterSpacing: "-0.01em" }}>{exp.role}</h3>
                        <div style={{ fontSize: 15, color: exp.color, fontWeight: 600, marginTop: 4 }}>{exp.company}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#3b82f6", background: "rgba(59,130,246,0.1)", padding: "4px 12px", borderRadius: 6 }}>{exp.period}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>📍 {exp.location}</div>
                      </div>
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", gap: 12, fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>
                          <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ padding: "100px clamp(16px,5vw,80px)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#3b82f6", letterSpacing: "0.12em", marginBottom: 12 }}>// FEATURED WORK</div>
            <h2 className="section-title">Key Projects</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {projects.map((p, i) => (
              <div key={i} className="card" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
                {/* Background accent */}
                <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: p.bg, filter: "blur(30px)" }} />
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.map(t => (
                    <span key={t} className="tag" style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25`, fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ padding: "100px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#3b82f6", letterSpacing: "0.12em", marginBottom: 12 }}>// GET IN TOUCH</div>
            <h2 className="section-title">Let's Work Together</h2>
            <p style={{ fontSize: 16, color: "#64748b", marginTop: 12 }}>Open to new opportunities — feel free to reach out!</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
            {[
              { icon: "✉", label: "Email", val: "nellore.dharani0984@gmail.com", color: "#3b82f6" },
              { icon: "📞", label: "Phone", val: "+91 95509 48939", color: "#06b6d4" },
              { icon: "📍", label: "Location", val: "Hyderabad, India", color: "#7c3aed" },
              { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/dharani-kumar-nellore", color: "#059669" },
            ].map(({ icon, label, val, color }) => (
              <div key={label} className="card" style={{ padding: "24px", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.05em", marginBottom: 4 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500, wordBreak: "break-all" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: "40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>NAME</label>
                <input className="contact-input" placeholder="Your name" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>EMAIL</label>
                <input className="contact-input" placeholder="your@email.com" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>SUBJECT</label>
              <input className="contact-input" placeholder="What's this about?" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>MESSAGE</label>
              <textarea className="contact-input" rows={5} placeholder="Tell me about your project..." style={{ resize: "vertical" }} />
            </div>
            <button className="btn-primary" style={{ width: "100%", fontSize: 15 }}>Send Message →</button>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "40px clamp(16px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 14, color: "#3b82f6", marginBottom: 8 }}>&lt;DK /&gt; Dharani Kumar Nellore</div>
        <div style={{ fontSize: 12, color: "#334155" }}>Senior UI Full Stack Developer · Python · Django · React JS · Hyderabad, India</div>
        <div style={{ fontSize: 11, color: "#1e293b", marginTop: 16 }}>© {new Date().getFullYear()} Dharani Kumar Nellore. All rights reserved.</div>
      </footer>
    </div>
  );
}
