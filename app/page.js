import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">TU ESPACIO PERSONAL</span>

        <h1>Un lugar para guardar tus ideas.</h1>

        <p>
          A veces las mejores ideas aparecen en los momentos
          más inesperados. Este es tu espacio para escribir,
          recordar y organizar tus pensamientos.
        </p>

        <Link href="/notas#crear" className="main-button">
           Comenzar a escribir
        </Link>
      </div>

      <div className="hero-decoration">
        <span>♡</span>
        <p>Escribe, sueña y recuerda.</p>
      </div>
    </section>
  );
}
