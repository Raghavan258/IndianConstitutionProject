import React, { useState } from "react";

const SECTIONS = {
  parliament: {
    title: "Indian Constitution – Key Basics",
    image: "/parliament.jpg",
    paragraphs: [
      "The Constitution of India is the supreme law of the land. It lays down the framework for government at the Union, State, and local levels, and protects the fundamental rights of citizens.",
      "It establishes India as a sovereign, socialist, secular, democratic republic and seeks to secure justice, liberty, equality, and fraternity for all.",
      "Some core ideas every citizen should know include the Preamble, Fundamental Rights, Fundamental Duties, Directive Principles of State Policy, and the basic structure doctrine, which prevents Parliament from destroying the essential features of the Constitution.",
    ],
  },
  supremeCourt: {
    title: "Judiciary in India",
    image: "/supreme court.png",
    paragraphs: [
      "India has a single integrated judicial system with the Supreme Court at the top, followed by High Courts in the states and various subordinate courts at district and local levels.[web:513][web:525]",
      "The judiciary interprets the Constitution, settles disputes between citizens and governments, reviews laws through judicial review, and protects fundamental rights.[web:513][web:516][web:518]",
      "The independence of the judiciary is part of the basic structure of the Constitution, meaning it cannot be taken away even by a constitutional amendment.[web:508][web:511][web:518]",
    ],
  },
  ambedkar: {
    title: "Dr B. R. Ambedkar & the Constitution",
    image: "/br ambedhkar.png",
    paragraphs: [
      "Dr B. R. Ambedkar was the Chairman of the Drafting Committee of the Constituent Assembly and is widely regarded as the principal architect of the Indian Constitution.[web:514][web:520][web:523]",
      "He ensured that the Constitution enshrined social justice, equality, and fundamental rights, including the abolition of untouchability and protections for historically marginalised communities.[web:514][web:517][web:526]",
      "Ambedkar’s work on the Constitution, his role as the first Law Minister of independent India, and his lifelong struggle against caste discrimination make him central to understanding how the Constitution was formed.[web:514][web:520][web:526]",
    ],
  },
};

function ConstitutionExplore() {
  const [sectionKey, setSectionKey] = useState("parliament");
  const section = SECTIONS[sectionKey];

  return (
    <main className="page">
      <h1 className="hero-title">Constitution Explorer</h1>
      <p className="hero-text">
        Click an image to explore the Constitution, the judiciary, and the story of its making.
      </p>

      {/* Image strip */}
      <div className="constitution-strip">
        <button
          className={
            "constitution-card" +
            (sectionKey === "parliament" ? " constitution-card--active" : "")
          }
          onClick={() => setSectionKey("parliament")}
        >
          <img
            src="/parliament.jpg"
            alt="Indian Parliament building"
            className="constitution-card-image"
          />
          <span className="constitution-card-label">Indian Constitution</span>
        </button>

        <button
          className={
            "constitution-card" +
            (sectionKey === "supremeCourt" ? " constitution-card--active" : "")
          }
          onClick={() => setSectionKey("supremeCourt")}
        >
          <img
            src="/supreme court.png"
            alt="Supreme Court of India"
            className="constitution-card-image"
          />
          <span className="constitution-card-label">Judiciary in India</span>
        </button>

        <button
          className={
            "constitution-card" +
            (sectionKey === "ambedkar" ? " constitution-card--active" : "")
          }
          onClick={() => setSectionKey("ambedkar")}
        >
          <img
            src="/br ambedhkar.png"
            alt="Dr B. R. Ambedkar"
            className="constitution-card-image"
          />
          <span className="constitution-card-label">Dr B. R. Ambedkar</span>
        </button>
      </div>

      {/* Detail panel with image + text */}
      <section className="constitution-detail card">
        <h2 className="card-title">{section.title}</h2>
        <div className="constitution-detail-body">
          <img
            src={section.image}
            alt={section.title}
            className="constitution-detail-image"
          />
          <div className="constitution-detail-text">
            {section.paragraphs.map((p, idx) => (
              <p key={idx} className="card-text">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ConstitutionExplore;
