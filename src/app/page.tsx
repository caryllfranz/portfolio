"use client";

import { useState, useEffect, } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { ExternalLink, Mail, } from "lucide-react";
import Image from "next/image";


import { MessageCircle, Send, Bot, User } from "lucide-react";



const projects = [
  {
    num: "01",
    name: "BabAI",
    desc: "AI commuter assistant using GPS tracking, station detection, and customizable alerts with a Filipino AI chatbot.",
    tags: [
      "React Native",
      "Expo",
      "FastAPI",
      "Supabase",
      "Python",
      "LLM",
    ],
    link: "https://github.com/caryllfranz/babai",
    featured: true,
  },
  {
    num: "02",
    name: "DS Salary Predictor",
    desc: "Machine learning salary prediction pipeline using XGBoost, SHAP explainability, and an interactive Streamlit app.",
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Streamlit",
    ],
    link: "https://github.com/caryllfranz/ds-salary-predictor",
  },
  {
    num: "03",
    name: "SpotSecure",
    desc: "AI-powered parking reservation system with license plate recognition and automated access control.",
    tags: [
      "Flutter",
      "Python",
      "YOLOv5",
      "SQLite",
      "Arduino",
      "REST API",
    ],
    link: "https://github.com/caryllfranz/LPR",
  },
  {
    num: "04",
    name: "Report Automation Tool",
    desc: "Automated reporting workflows using Python and SQL to generate Excel reports and reduce manual tasks.",
    tags: [
      "Python",
      "Pandas",
      "OpenPyXL",
      "SQLAlchemy",
      "SQL",
      "Excel",
    ],
    link: "#",
  },
  {
    num: "05",
    name: "Azure AI Helpdesk Chatbot",
    desc: "Enterprise AI chatbot using Azure OpenAI for knowledge retrieval and automated support workflows.",
    tags: [
      "Azure AI",
      "Azure OpenAI",
      "Python",
      "FastAPI",
      "Prompt Flow",
      "LLM",
    ],
    link: "#",
  },
  {
    num: "06",
    name: "YOLOv5 Charger Detection",
    desc: "Object detection model for identifying AC, DC, and battery chargers using YOLOv5 and OpenCV.",
    tags: [
      "Python",
      "YOLOv5",
      "OpenCV",
      "Roboflow",
      "Google Colab",
    ],
    link: "#",
  },
];
const skills = [
  {
    key: "languages",
    values: ["Python", "Java", "SQL"],
  },
  {
    key: "frameworks",
    values: ["Spring Boot", "FastAPI", "React Native",],
  },
  {
    key: "ai",
    values: [
      "Machine Learning",
 "Computer Vision",
 "LLM Integration",
 "Prompt Engineering",
 "RAG"
    ],
  },
  {
    key: "databases",
    values: ["MySQL", "Supabase"],
  },
  {
    key: "cloud",
    values: ["Azure Services"],
  },
  {
    key: "tools",
    values: [
      "Git",
      "Linux",
      "Claude",
      "Power Automate",
      "ChatGPT"
    ],
  },
];

const experiences = [
  {
    role: "Software Analyst",
    company: "Accenture",
    period: "2026 – Present",
    bullets: [
      "Enhanced and maintain enterprise Java applications.",
      "Collaborate with cross-functional teams to resolve incidents.",
      "Automated reporting workflows using Python",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Accenture",
    period: "2024 – 2025",
    bullets: [
      "Maintained enterprise applications in a production environment.",
      "Performed issue analysis and application support tasks.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Technomancer inc.",
    period: "2024",
    bullets: [
      "Developed responsive web pages and application features.",
      "Worked with HTML, CSS, JavaScript, PHP, Laravel framework and SQL.",
    ],
  },
];

function TypingAnimation() {
  const line1 = "Software Engineer";
  const line2 = "AI • Machine Learning • Data Science/Engineering";

  const text = `${line1}\n${line2}`;

  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const parts = displayed.split("\n");

  return (
    <div
      style={{
        fontSize: "12px",
        fontWeight: 600,
        minHeight: "40px",
        lineHeight: 1.7,
      }}
    >
      <div style={{ color: "var(--foreground)" }}>
        {parts[0]}
        {displayed.indexOf("\n") === -1 && (
          <span
            style={{
              color: "var(--accent)",
              animation: "blink 1s infinite",
            }}
          >
            |
          </span>
        )}
      </div>

      {parts.length > 1 && (
        <div style={{ color: "var(--accent)" }}>
          {parts[1]}
          <span
            style={{
              color: "var(--accent)",
              animation: "blink 1s infinite",
            }}
          >
            |
          </span>
        </div>
      )}
    </div>
  );
}
  


function ProjectCard({ p }: { p: typeof projects[0] & { private?: boolean; link: string | null } }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyClone = () => {
    navigator.clipboard.writeText(`git clone ${p.link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: `0.5px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "10px", overflow: "hidden",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(232,107,0,0.08)" : "none",
      }}
    >
      {/* Terminal header */}
      <div style={{
        background: "var(--background)", borderBottom: "0.5px solid var(--border)",
        padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840" }} />
        </div>
       <span
  style={{
    fontSize: "10px",
    color: "var(--muted-light)",
  }}
>
  project_{p.num}
</span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: "14px", fontFamily: "inherit" }}>
        {/* Clone command */}
        <div style={{
          fontSize: "11px", color: "var(--muted-light)", marginBottom: "10px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--background)", borderRadius: "6px", padding: "8px 10px",
          border: "0.5px solid var(--border)"
        }}>
          <span>
            <span style={{ color: "var(--accent)" }}>$ </span>
            <span style={{ color: "var(--muted)" }}>git clone </span>
            <span style={{ color: "var(--foreground)" }}>
              {p.private ? "..." : `github.com/caryllfranz/${p.link.split("/").pop()}`}
            </span>
          </span>
          {!p.private && (
            <button onClick={copyClone} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontSize: "9px", color: copied ? "var(--accent)" : "var(--muted-light)",
              fontFamily: "inherit", padding: "0"
            }}>
              {copied ? "copied!" : "copy"}
            </button>
          )}
        </div>

        {/* Tags as checkmarks */}
        <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column", gap: "3px" }}>
          {p.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "11px", color: "var(--muted)" }}>
              <span style={{ color: "#28c840" }}>✔ </span>{tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        
        <div style={{ height: "0.5px", background: "var(--border)", margin: "12px 0", opacity: 0.6 }} /> 
        {/* Name + desc */}
        {/* Run command */}
<div
  style={{
    fontSize: "11px",
    color: "var(--muted-light)",
    marginBottom: "6px",
  }}
>
  <span style={{ color: "var(--accent)" }}>$ </span>
  ./run_project
</div>

{/* Project name */}
<div
  style={{
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--foreground)",
    marginBottom: "8px",
  }}
>
  {p.name}
</div>

{/* Description */}
<p
  style={{
    fontSize: "11px",
    color: "var(--muted)",
    lineHeight: 1.7,
    marginBottom: "12px",
  }}
>
  {p.desc}
</p>
        

        {/* Links */}
        <div style={{ marginTop: "12px" }}>
  {!p.private && (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "11px",
        color: "var(--accent)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontWeight: 600,
      }}
    >
      <ExternalLink size={12} />
      Open Repository
    </a>
  )}
</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm Caryll's AI assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHover, setChatHover] = useState(false);

  const sendSuggestedPrompt = async (prompt: string) => {
  setMessages((prev) => [...prev, { role: "user", text: prompt }]);
  setLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: data.reply,
      },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Sorry, something went wrong!",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "24px 24px 48px" }}>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "var(--card)", border: "0.5px solid var(--border)",
        borderRadius: "10px", padding: "12px 20px", marginBottom: "48px"
      }}>
        <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "13px" }}>
          caryll_franz<span style={{ color: "var(--muted-light)" }}>.py</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {["about", "projects", "skills", "ask_me","certificates", "contact"].map((link) => {
  if (link === "ask_me") {
    return (
      <button
        key={link}
        onClick={() => setChatOpen(true)}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "var(--muted-light)",
          fontSize: "11px",
          fontFamily: "inherit",
        }}
      >
        <span style={{ color: "var(--border)" }}>./</span>
        {link}
      </button>
    );
  }

  return (
    <a
      key={link}
      href={`#${link}`}
      style={{
        color: "var(--muted-light)",
        fontSize: "11px",
        textDecoration: "none",
      }}
    >
      <span style={{ color: "var(--border)" }}>./</span>
      {link}
    </a>
  );
})}
          <span style={{
            fontSize: "10px", fontWeight: 700,
            background: "var(--accent)", color: "#fff",
            borderRadius: "20px", padding: "3px 10px"
          }}>open to work</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ marginBottom: "64px" }}>
        <div style={{ 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  gap: "40px",
  flexWrap: "wrap-reverse"
}}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "11px", color: "var(--muted-light)", marginBottom: "12px" }}>
              <span style={{ color: "var(--accent)" }}>~/portfolio</span> $ whoami
            </p>
            <h1 style={{
              fontSize: "52px", fontWeight: 800, letterSpacing: "-2px",
              lineHeight: 1.05, marginBottom: "12px", color: "var(--foreground)"
            }}>
              Caryll Franz<br />
              <span style={{ color: "var(--accent)" }}>M. Cariño</span>
            </h1>
            <div style={{ marginBottom: "16px" }}>
              <TypingAnimation />
            </div>
           <div
  style={{
    background: "var(--card)",
    border: "0.5px solid var(--border)",
    borderRadius: "10px",
    overflow: "hidden",
    maxWidth: "470px",
    marginBottom: "24px",
  }}
>
  {/* terminal header */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 12px",
      borderBottom: "0.5px solid var(--border)",
      background: "var(--background)",
    }}
  >
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />

    <span
      style={{
        marginLeft: "8px",
        fontSize: "10px",
        color: "var(--muted-light)",
      }}
    >
      about.py
    </span>
  </div>

  {/* terminal body */}
  <div
  style={{
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontFamily: "JetBrains Mono, Consolas, monospace",
    fontSize: "11px",
  }}
>
  <div style={{ color: "var(--muted-light)", marginBottom: "4px" }}>
    <span style={{ color: "var(--accent)" }}>$ </span>
    python profile.py
  </div>

  {[
    ["name", '"Caryll Franz M. Cariño"'],
    ["role", '"Software Engineer"'],

    ["transition", '"AI • Machine Learning • Data Science"'],
    ["location", '"Philippines"'],
    ["status", '"Open to Remote Opportunities"'],
    ["Currently", '"Software Analyst @ Accenture"'],
  ].map(([key, value]) => (
    <div
      key={key}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: "95px",
          color: "var(--accent)", // orange
        }}
      >
        {key}
      </span>

      <span
        style={{
          color: "var(--border)",
          marginRight: "10px",
        }}
      >
        =
      </span>

      <span
        style={{
          color: "var(--foreground)", // white
        }}
      >
        {value}
      </span>
    </div>
  ))}

  <div
    style={{
      marginTop: "10px",
      color: "var(--muted-light)",
      fontStyle: "italic",
    }}
  >
    // Always learning.
  </div>
</div>
</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
              <a href="#projects" style={{
                padding: "8px 18px", background: "var(--accent)", color: "#fff",
                borderRadius: "5px", fontSize: "12px", fontWeight: 700, textDecoration: "none"
              }}>./view_projects</a>
              <a href="/cv.pdf" target="_blank" style={{
                padding: "8px 18px", color: "var(--accent)",
                border: "0.5px solid var(--accent)", borderRadius: "5px",
                fontSize: "12px", fontWeight: 500, textDecoration: "none"
              }}>download_cv</a>
            </div>
            <div style={{ display: "flex", gap: "28px" }}>
              {[
                { num: "4", suffix: "+", label: "// projects" },
                { num: "2", suffix: "+", label: "// years exp" },
                { num: "3", suffix: "x", label: "// ml models" }
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--foreground)" }}>
                    {s.num}<span style={{ color: "var(--accent)" }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--muted-light)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AVATAR */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: "-12px", borderRadius: "36px",
              border: "1px solid var(--accent)", opacity: 0.2
            }} />
            <div style={{
              width: 200, height: 280, borderRadius: "30px",
              overflow: "hidden", border: "2px solid var(--accent)",
              position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,.15)"
            }}>
              <Image src="/profile_picv2.png" alt="Caryll Franz M. Cariño" fill
                style={{ objectFit: "cover", objectPosition: "center top" }} priority />
            </div>
            <div style={{
              position: "absolute", bottom: "6px", right: "6px",
              width: "18px", height: "18px", borderRadius: "50%",
              background: "var(--accent)", border: "2px solid var(--background)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff" }} />
            </div>
          </div>
        </div>
      </section>
      {/* EXPERIENCE */}
<section id="experience" style={{ marginBottom: "48px" }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    }}
  >
    <span style={{ fontSize: "10px", color: "var(--muted-light)" }}>
      01
    </span>

    <span
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "2px",
        color: "var(--accent)",
      }}
    >
      EXPERIENCE
    </span>

    <div
      style={{
        flex: 1,
        height: "0.5px",
        background: "var(--border)",
      }}
    />
  </div>

  <div
    style={{
      background: "var(--card)",
      border: "0.5px solid var(--border)",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    {/* terminal header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 14px",
        borderBottom: "0.5px solid var(--border)",
        background: "var(--background)",
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />

      <span
        style={{
          marginLeft: "8px",
          fontSize: "10px",
          color: "var(--muted-light)",
        }}
      >
        experience.log
      </span>
    </div>

    {/* body */}
    <div style={{ padding: "18px" }}>
      <div
        style={{
          fontSize: "11px",
          color: "var(--muted-light)",
          marginBottom: "18px",
        }}
      >
        <span style={{ color: "var(--accent)" }}>$ </span>
        cat experience.log
      </div>

      {experiences.map((exp, index) => (
        <div key={index} style={{ marginBottom: index !== experiences.length - 1 ? "24px" : 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "6px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {exp.role}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "var(--accent)",
                  marginTop: "2px",
                }}
              >
                {exp.company}
              </div>
            </div>

            <span
              style={{
                fontSize: "10px",
                color: "var(--muted-light)",
              }}
            >
              {exp.period}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {exp.bullets.map((bullet) => (
              <div
                key={bullet}
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: "#28c840" }}>✔ </span>
                {bullet}
              </div>
            ))}
          </div>

          {index !== experiences.length - 1 && (
            <div
              style={{
                height: "0.5px",
                background: "var(--border)",
                marginTop: "18px",
                opacity: 0.6,
              }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* PROJECTS */}
      <section id="projects" style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "10px", color: "var(--muted-light)" }}>02</span>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "var(--accent)" }}>PROJECTS</span>
          <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
        </div>
        <div style={{ 
  display: "grid", 
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
  gap: "10px" 
}}>
          {projects.map((p, i) => <ProjectCard key={i} p={p} />)}
          {/* <div style={{
            border: "0.5px dashed var(--border)", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "8px", minHeight: "180px"
          }}>
            
            
          </div> */}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "10px", color: "var(--muted-light)" }}>03</span>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "var(--accent)" }}>SKILLS</span>
          <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
        </div>
        <div style={{ background: "var(--card)", border: "0.5px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
          <div style={{
            display: "flex", gap: "6px", marginBottom: "16px",
            paddingBottom: "12px", borderBottom: "0.5px solid var(--border)", alignItems: "center"
          }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
            <span style={{ fontSize: "11px", color: "var(--muted-light)", marginLeft: "8px" }}>skills.py — Python 3.12</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {skills.map((s, i) => (
              <div key={s.key} style={{ fontSize: "12px", lineHeight: 1.6 }}>
                <span style={{ color: "var(--muted-light)" }}>{i + 1}{"  "}</span>
                <span style={{ color: "var(--accent)" }}>{s.key}</span>
                <span style={{ color: "var(--muted)" }}> = </span>
                <span style={{ color: "var(--muted-light)" }}>[</span>
                {s.values.map((v, vi) => (
                  <span key={v}>
                    <span style={{ color: "var(--foreground)" }}>"{v}"</span>
                    {vi < s.values.length - 1 && <span style={{ color: "var(--muted-light)" }}>, </span>}
                  </span>
                ))}
                <span style={{ color: "var(--muted-light)" }}>]</span>
              </div>
            ))}
            <div style={{ fontSize: "11px", color: "var(--border)", marginTop: "4px" }}>
              {skills.length + 1}{"  "}// currently_learning = ["dbt", "Airflow", "MLflow"]
            </div>
          </div>
        </div>
      </section>
{/* CERTIFICATES */}
{/* CERTIFICATES */}
<section id="certificates" style={{ marginBottom: "48px" }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    }}
  >
    <span style={{ fontSize: "10px", color: "var(--muted-light)" }}>04</span>
    <span
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "2px",
        color: "var(--accent)",
      }}
    >
      CERTIFICATES
    </span>
    <div
      style={{
        flex: 1,
        height: "0.5px",
        background: "var(--border)",
      }}
    />
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "10px",
    }}
  >
    {[
      {
        name: "Claude 101",
        issuer: "Anthropic",
      },
      {
        name: "Data Analytics Essentials",
        issuer: "Cisco",
      },
      {
        name: "Intermediate Python",
        issuer: "DataCamp",
      },
      {
        name: "Python",
        issuer: "Kaggle",
      },
      {
        name: "Intermediate SQL",
        issuer: "Kaggle",
      },
      {
        name: "Advanced SQL",
        issuer: "Kaggle",
      },
    ].map((cert, i) => (
      <div
        key={i}
        style={{
          background: "var(--card)",
          border: "0.5px solid var(--border)",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "4px",
          }}
        >
          {cert.name}
        </p>

        <p
          style={{
            fontSize: "10px",
            color: "var(--muted)",
          }}
        >
          {cert.issuer}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* CONTACT */}
      <section id="contact" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "10px", color: "var(--muted-light)" }}>05</span>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "var(--accent)" }}>CONTACT</span>
          <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
        </div>
        <div style={{
          background: "var(--card)", border: "0.5px solid var(--border)",
          borderRadius: "10px", padding: "40px", textAlign: "center"
        }}>
          <span style={{
            fontSize: "10px", color: "var(--accent)",
            background: "var(--accent-light)", border: "0.5px solid var(--accent-border)",
            borderRadius: "20px", padding: "4px 12px", display: "inline-block", marginBottom: "16px"
          }}>{"{ open_to_work: true }"}</span>
          <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--foreground)", marginBottom: "8px" }}>Let's connect</p>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.8, marginBottom: "24px" }}>
            Open to data science, ML, and AI engineering roles.<br />Remote preferred. Based in the Philippines.
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <a href="mailto:caryllcarino@gmail.com" style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", background: "var(--accent)", color: "#fff",
              borderRadius: "5px", fontSize: "12px", fontWeight: 700, textDecoration: "none"
            }}>
              <Mail size={12} /> email_me
            </a>
            <a href="https://linkedin.com/in/caryllfmc" target="_blank" style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", color: "var(--accent)",
              border: "0.5px solid var(--accent)", borderRadius: "5px",
              fontSize: "12px", fontWeight: 500, textDecoration: "none"
            }}>linkedin</a>
            <a href="https://github.com/caryllfranz" target="_blank" style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", color: "var(--accent)",
              border: "0.5px solid var(--accent)", borderRadius: "5px",
              fontSize: "12px", fontWeight: 500, textDecoration: "none"
            }}>github</a>
          </div>
        </div>
      </section>

      
{/* FLOATING CHAT */}
<div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}>
  {!chatOpen ? (
    <button
  onClick={() => setChatOpen(true)}
  onMouseEnter={() => setChatHover(true)}
  onMouseLeave={() => setChatHover(false)}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 18px",
    borderRadius: "999px",
    background: "var(--accent)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 400,
    fontSize: "12px",
    animation: "glow 2.5s ease-in-out infinite",
    boxShadow: chatHover
      ? "0 14px 40px rgba(232,107,0,.45)"
      : "0 8px 30px rgba(232,107,0,.35)",
    transform: chatHover ? "scale(1.06)" : "scale(1)",
    transition: "all .2s ease",
  }}
>
  <MessageCircle size={20}/>
  Ask AI
</button>
  ) : (
    <div
  style={{
    width: "min(560px, calc(100vw - 40px))",
height: "min(720px, calc(100vh - 40px))",
    background: "var(--card)",
    border: "0.5px solid var(--border)",
    borderRadius: "14px",
    boxShadow: "0 10px 40px rgba(0,0,0,.18)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }}
>
      {/* Chat header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 16px", borderBottom: "0.5px solid var(--border)",
        background: "var(--accent)"
      }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
          $ python assistant.py --portfolio
        </span>
        <button onClick={() => setChatOpen(false)} style={{
          background: "transparent", border: "none",
          color: "#fff", cursor: "pointer", fontSize: "16px"
        }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{
        display: "flex", flexDirection: "column", gap: "10px",
        padding: "14px", maxHeight: "auto", flex:1,overflowY: "auto"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "6px",
            flexDirection: msg.role === "user" ? "row-reverse" : "row"
          }}>
            <div
  style={{
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "0.5px solid var(--border)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent)",
    background:
      msg.role === "user"
        ? "var(--accent-light)"
        : "var(--background)",
  }}
>
  {msg.role === "user" ? (
    <User size={30} strokeWidth={2.2}/>
  ) : (
    <Bot size={30} strokeWidth={2.2}/>
  )}
</div>
            <div style={{
              fontSize: "11px", lineHeight: 1.7, padding: "8px 10px",
              maxWidth: "75%",
              borderRadius: msg.role === "user" ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
              background: msg.role === "user" ? "var(--accent)" : "var(--background)",
              color: msg.role === "user" ? "#fff" : "var(--muted)",
              border: "0.5px solid var(--border)"
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              border: "0.5px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", color: "var(--accent)", background: "var(--background)"
            }}>AI</div>
            <div style={{
              fontSize: "11px", padding: "8px 10px", borderRadius: "8px 8px 8px 2px",
              background: "var(--background)", color: "var(--muted)", border: "0.5px solid var(--border)",
animation: "pulse 1s infinite"
            }}>● ● ●</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
  style={{
    borderTop: "0.5px solid var(--border)",
    background: "var(--background)",
    padding: "10px",
  }}
>
  {/* Suggested Prompts */}
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginBottom: "10px",
    }}
  >
    {[
      "Tell me about your projects",
      "What tech stack do you use?",
      "Download your CV",
    ].map((prompt) => (
      <button
  key={prompt}
  onClick={() => sendSuggestedPrompt(prompt)}
  style={{
    padding: "6px 10px",
    borderRadius: "999px",
    border: "0.5px solid var(--border)",
    background: "var(--card)",
    color: "#e86b00",
    fontSize: "10px",
    cursor: "pointer",
  }}
>
  {prompt}
</button>
    ))}
  </div>

  {/* Input */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    <span style={{ color: "var(--accent)", fontSize: "11px" }}>$</span>

    <input
      style={{
        flex: 1,
        background: "transparent",
        fontSize: "11px",
        color: "var(--foreground)",
        outline: "none",
        border: "none",
        fontFamily: "inherit",
      }}
      placeholder="Ask me anything..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />

    <button
      onClick={sendMessage}
      style={{
        background: "var(--accent)",
        border: "none",
        borderRadius: "8px",
        width: "40px",
        height: "40px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Send size={18} />
    </button>
  </div>
</div>
    </div>
  )}
</div>

    </main>
  );
}