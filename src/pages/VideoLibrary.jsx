import React from "react";

const videos = [
  {
    id: 1,
    title: "Introduction to the Constitution of India",
    duration: "8 min",
  },
  {
    id: 2,
    title: "Understanding the Preamble: Justice, Liberty, Equality",
    duration: "10 min",
  },
  {
    id: 3,
    title: "Fundamental Rights Explained with Examples",
    duration: "12 min",
  },
  {
    id: 4,
    title: "Fundamental Duties of Every Citizen",
    duration: "9 min",
  },
  {
    id: 5,
    title: "Landmark Supreme Court Cases on Rights",
    duration: "14 min",
  },
];

function VideoLibrary() {
  return (
    <main className="page">
      <h1 className="hero-title">Video Library</h1>
      <p className="hero-text">
        Browse short explainer videos on the Constitution, rights, and duties.
      </p>

      {/* Your existing demo cards */}
      <section className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <span className="video-thumb-text">Video {video.id}</span>
            </div>
            <div className="video-info">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-meta">{video.duration}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Real YouTube resources */}
      <section className="grid-sections" style={{ marginTop: 32 }}>
        <div className="card">
          <h2 className="card-title">Indian Constitution – General Education</h2>
          <p className="card-text">
            Curated videos that introduce the Constitution and its key features.
          </p>
          <ul className="article-list">
            <li>
              <a
                href="https://www.youtube.com/watch?v=2K9GsKHczZs"
                target="_blank"
                rel="noreferrer"
              >
                IN-DEPTH: Salient Features of the Indian Constitution (Sansad TV)
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=sDstf8ockUo"
                target="_blank"
                rel="noreferrer"
              >
                The Constitution of India – An Introduction
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=f0hbQZYS0HI"
                target="_blank"
                rel="noreferrer"
              >
                Additional Constitution overview video
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/playlist?list=PLIEVEMAFhG48wZr7qyD4coAuF0EgieTz-"
                target="_blank"
                rel="noreferrer"
              >
                Constitution of India – UPSC playlist
              </a>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">
            Education‑Related Constitutional Provisions
          </h2>
          <p className="card-text">
            Videos explaining how the Constitution deals with education.
          </p>
          <ul className="article-list">
            <li>
              <a
                href="https://www.youtube.com/watch?v=ts8QH24BhRs"
                target="_blank"
                rel="noreferrer"
              >
                Education & Constitutional Provisions – Part 1
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=DzXfIJVgyvg"
                target="_blank"
                rel="noreferrer"
              >
                Education & Constitutional Provisions – Part 2
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=69q7wSKGwLc"
                target="_blank"
                rel="noreferrer"
              >
                Education in the Indian Constitution – Overview
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default VideoLibrary;
