import React from "react";

const quizzes = [
  {
    id: 1,
    title: "Basics of the Constitution",
    questions: 10,
    level: "Beginner",
  },
  {
    id: 2,
    title: "Fundamental Rights Quiz",
    questions: 12,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Fundamental Duties Check",
    questions: 8,
    level: "Beginner",
  },
  {
    id: 4,
    title: "Preamble & Values Scenario Quiz",
    questions: 10,
    level: "Advanced",
  },
];

function Quizzes() {
  return (
    <main className="page">
      <h1 className="hero-title">Quizzes & Assessments</h1>
      <p className="hero-text">
        Test your understanding with short quizzes. Each quiz is auto‑graded.
      </p>

      <section className="quiz-grid">
        {quizzes.map((q) => (
          <div key={q.id} className="quiz-card">
            <h2 className="quiz-title">{q.title}</h2>
            <p className="quiz-meta">
              {q.questions} questions • {q.level}
            </p>
            <button className="link-chip">Start Quiz (demo)</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Quizzes;
