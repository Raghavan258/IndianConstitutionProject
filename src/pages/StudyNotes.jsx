import React from "react";

const notes = [
  {
    id: 1,
    title: "Preamble – Key Ideas",
    summary: "Brief notes on justice, liberty, equality, and fraternity.",
  },
  {
    id: 2,
    title: "Fundamental Rights Overview",
    summary: "Short explanation of Articles 14–21 with examples.",
  },
  {
    id: 3,
    title: "Fundamental Duties List",
    summary: "Mnemonic and bullet list of Article 51A duties.",
  },
  {
    id: 4,
    title: "Directive Principles Basics",
    summary: "Important DPSPs linked to social and economic justice.",
  },
];

function StudyNotes() {
  return (
    <main className="page">
      <h1 className="hero-title">Study Notes</h1>
      <p className="hero-text">
        Quick reference notes to revise key concepts of the Constitution.
      </p>

      <section className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h2 className="note-title">{note.title}</h2>
            <p className="note-summary">{note.summary}</p>
            <button className="link-chip">Open Note (demo)</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default StudyNotes;
