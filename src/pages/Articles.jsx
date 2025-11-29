import React from "react";

function Articles() {
  return (
    <main className="page articles-page">
      <header className="articles-header">
        <h1 className="articles-title">Important Articles</h1>
        <p className="articles-subtitle">
          A quick overview of selected Articles related to the Preamble,
          Fundamental Rights, Directive Principles, and Duties.
        </p>
      </header>

      {/* PREAMBLE */}
      <section id="preamble" className="article-card article-card--with-media">
        <div className="article-media-placeholder">
          {/* Later: replace this div with an <img src="..."/> of the Constitution */}
          <span className="article-media-label">Preamble image</span>
        </div>
        <div className="article-content">
          <h2 className="article-heading">Preamble</h2>
          <p className="article-text">
            Introduces the Constitution and states India is a Sovereign,
            Socialist, Secular, Democratic Republic committed to justice,
            liberty, equality, and fraternity. 
          </p>
        </div>
      </section>

      {/* FUNDAMENTAL RIGHTS */}
      <section id="rights" className="article-card">
        <h2 className="article-heading">Fundamental Rights (Articles 14–21)</h2>
        <ul className="article-list">
          <li>
            <strong>Article 14</strong> – Equality before law for all persons.
          </li>
          <li>
            <strong>Article 15</strong> – Prohibits discrimination on religion,
            race, caste, sex, or place of birth.
          </li>
          <li>
            <strong>Article 16</strong> – Equal opportunity in public
            employment.
          </li>
          <li>
            <strong>Article 19</strong> – Core freedoms like speech and
            expression, assembly, association, movement, residence, and
            profession.
          </li>
          <li>
            <strong>Article 21</strong> – Protection of life and personal
            liberty.
          </li>
        </ul>
      </section>

      {/* DIRECTIVE PRINCIPLES */}
      <section className="article-card">
        <h2 className="article-heading">
          Directive Principles (Articles 39, 39A, 41–43, 48A)
        </h2>
        <ul className="article-list">
          <li>
            <strong>Article 39</strong> – Principles for adequate livelihood,
            distribution of resources, and prevention of exploitation.
          </li>
          <li>
            <strong>Article 39A</strong> – Equal justice and free legal aid.
          </li>
          <li>
            <strong>Article 41–43</strong> – Right to work, education, and just
            and humane conditions of work.
          </li>
          <li>
            <strong>Article 48A</strong> – Protection of environment, forests,
            and wildlife.
          </li>
        </ul>
      </section>

      {/* FUNDAMENTAL DUTIES */}
      <section id="duties" className="article-card article-card--with-media">
        <div className="article-media-placeholder article-media-placeholder--icon">
          {/* Later: insert icon for duties / citizenship */}
          <span className="article-media-label">Duties icon</span>
        </div>
        <div className="article-content">
          <h2 className="article-heading">Fundamental Duties (Article 51A)</h2>
          <p className="article-text">
            Lists duties such as respecting the Constitution, national flag and
            anthem, protecting the environment, and promoting harmony among
            people.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Articles;