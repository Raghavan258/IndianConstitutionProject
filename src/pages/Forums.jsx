import React from "react";
import { useLocation } from "react-router-dom";

const topics = {
  preamble: {
    title: "Preamble Forum",
    intro: "Discuss the vision, values, and guiding principles in the Preamble.",
  },
  rights: {
    title: "Fundamental Rights Forum",
    intro: "Share questions and examples related to Fundamental Rights.",
  },
  duties: {
    title: "Fundamental Duties Forum",
    intro: "Talk about how citizens can practise their Fundamental Duties daily.",
  },
};

function Forums() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topicKey = searchParams.get("topic") || "preamble";
  const topic = topics[topicKey] || topics.preamble;

  const demoThreads = [
    {
      id: 1,
      title: "How does this apply in daily life?",
      replies: 4,
    },
    {
      id: 2,
      title: "Example from recent news related to this topic",
      replies: 2,
    },
    {
      id: 3,
      title: "Doubt about interpretation of one clause",
      replies: 3,
    },
  ];

  return (
    <main className="page">
      <h1 className="hero-title">{topic.title}</h1>
      <p className="hero-text">{topic.intro}</p>

      <section className="forum-grid">
        {demoThreads.map((t) => (
          <div key={t.id} className="forum-card">
            <h2 className="forum-title">{t.title}</h2>
            <p className="forum-meta">{t.replies} replies • demo thread</p>
            <button className="link-chip">Open Thread (demo)</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Forums;
