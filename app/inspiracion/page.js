"use client";

import { useEffect, useState } from "react";
import { getQuotes } from "../../lib/api";

export default function Inspiracion() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuotes() {
      try {
        const data = await getQuotes();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No se encontraron frases.");
        }

        setQuotes(data);
        setCurrentIndex(
          Math.floor(Math.random() * data.length)
        );
      } catch (err) {
        console.error("Error al obtener frases:", err);
        setError(
          err.response?.data?.error ||
          "No pudimos cargar las frases. Intenta más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    loadQuotes();
  }, []);

  function nextQuote() {
    setCurrentIndex((previousIndex) =>
      (previousIndex + 1) % quotes.length
    );
  }

  const quote = quotes[currentIndex];

  return (
    <main className="page-container">
      <div className="section-heading">
        <span className="eyebrow">UN MOMENTO PARA TI</span>
        <h1>Inspiración</h1>
        <p>
          Encuentra una pequeña frase que acompañe tu día.
        </p>
      </div>

      <section className="quote-card">
        {loading ? (
          <p>Cargando frases bonitas...</p>
        ) : error ? (
          <p>{error}</p>
        ) : quote ? (
          <>
            <span className="quote-symbol">“</span>
            <h2>{quote.q}</h2>
            <p className="quote-author">
              — {quote.a || "Autor desconocido"}
            </p>
            <button
              type="button"
              className="main-button"
              onClick={nextQuote}
            >
              Otra frase
            </button>
          </>
        ) : null}

        {loading && (
          <p>Conectando con la API...</p>
        )}

        <p className="quote-attribution">
          Frases proporcionadas por{" "}
          <a
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ZenQuotes
          </a>
        </p>
      </section>
    </main>
  );
}
