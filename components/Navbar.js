
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        Mi Diario
      </Link>

      <div className="nav-links">
        <Link href="/">Inicio</Link>
        <Link href="/notas">Mis notas</Link>
        <Link href="/acerca">Acerca de</Link>
      </div>
    </nav>
  );
}
