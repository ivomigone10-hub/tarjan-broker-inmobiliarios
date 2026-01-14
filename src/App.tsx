import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const navLinks = [
  { name: "Inicio", href: "#" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Por qué elegirnos", href: "#diferenciales" },
  { name: "Contacto", href: "#contacto" },
];

export default function App() {
  const [headerWhite, setHeaderWhite] = useState(false);

  // ✅ useRef tipado para formulario
  const form = useRef<HTMLFormElement | null>(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // ✅ Evento tipado
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    if (!form.current) {
      setSending(false);
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSending(false);
          setSent(true);
          form.current?.reset();
        },
        () => {
          setSending(false);
          alert("Hubo un error al enviar. Probá nuevamente.");
        }
      );
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const header = document.getElementById("main-header");
      if (heroSection && header) {
        const heroTopAbs = heroSection.offsetTop;
        const headerHeight = header.offsetHeight;
        const scrollY = window.scrollY;

        if (
          scrollY + headerHeight >= heroTopAbs &&
          scrollY < heroTopAbs + heroSection.offsetHeight - headerHeight
        ) {
          setHeaderWhite(true);
        } else {
          setHeaderWhite(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="bg-[#f7f9fb] min-h-screen"
      style={{ fontFamily: "'Libre Baskerville', serif" }}
    >
      {/* Nav */}
      <header
        id="main-header"
        className="fixed w-full z-40 bg-transparent backdrop-blur-sm transition-colors duration-300"
      >
        <nav className="max-w-5xl mx-auto px-8 py-6 flex justify-center gap-8 items-center">
          <span
            className={`text-xl font-extrabold tracking-wide uppercase transition-colors duration-300 ${
              headerWhite ? "text-white drop-shadow" : "text-[#003366]"
            }`}
            style={{
              fontFamily: "'Libre Baskerville', serif",
              letterSpacing: ".12em",
              marginRight: 36,
            }}
          >
            Tarján Brokers Inmobiliarios
          </span>
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-base font-semibold hover:underline hover:text-[#225599] transition-colors duration-300 ${
                    headerWhite ? "text-white drop-shadow" : "text-[#003366]"
                  }`}
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="pt-32">
        {/* HERO */}
        <section
          id="hero"
          className="relative text-white text-center py-32 md:py-40 border-b-4 border-[#e3e8ee] flex flex-col items-center overflow-hidden"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            minHeight: "560px",
          }}
        >
          <img
            src="/CUADRO.png"
            alt="Fondo Hero"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ minHeight: "560px", objectPosition: "center" }}
            draggable={false}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "rgba(0,34,70,0.64)",
              minHeight: "560px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-20 flex flex-col items-center w-full">
            <img
              src="logosf.png"
              alt="Tarján Logo"
              className="mx-auto mb-8"
              style={{
                maxWidth: "550px",
                width: "100%",
                height: "auto",
                filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.10))",
                borderRadius: "14px",
              }}
            />
            <div className="max-w-2xl mx-auto">
              <p
                className="text-2xl md:text-3xl font-light mb-10"
                style={{
                  letterSpacing: ".01em",
                  fontFamily: "'Libre Baskerville', serif",
                }}
              >
                Experiencia y excelencia en el mercado inmobiliario argentino.
              </p>
              <p className="mb-10 text-lg text-[#e0e9f3]">
                ¿Tasación y esperar resultados? En Tarján Brokers Inmobiliarios
                no sucede. Trabajamos proactivamente en todos los aspectos
                necesarios para concretar la venta, desde la tasación hasta el
                día de la escrituración.
              </p>
              <a
                href="https://wa.me/5491151136164?text=Hola%20Tarj%C3%A1n%20Brokers,%20quiero%20m%C3%A1s%20info."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#003366] border border-[#003366] font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-[#e3e8ee] hover:text-[#25496a] transition text-lg"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Contactar ahora
              </a>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="max-w-5xl mx-auto px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#003366] mb-6">
                Somos Tarján Brokers Inmobiliarios
              </h2>
              <p className="text-lg text-[#33485c] mb-6">
                Con presencia continua en el mercado desde 2012, somos una firma
                inmobiliaria de sólida trayectoria y crecimiento sostenido. Nos
                especializamos en brindar un servicio integral para operaciones
                de compra, venta y gestión de activos urbanos y rurales.
              </p>
              <div className="bg-[#e6eef7] rounded-lg px-5 py-4 mb-4 border-l-4 border-[#003366] text-[#003366] shadow-sm">
                <span className="font-bold">Atención diferencial:</span> Recibís
                un informe semanal del desempeño de tu propiedad en los portales
                y de todas las acciones realizadas para potenciar su
                comercialización.
              </div>
            </div>
            <div
              className="rounded-2xl shadow-xl overflow-hidden bg-[#003366] flex items-center justify-center"
              style={{ height: "256px" }}
            >
              <img
                src="/logoazuloscuro.png"
                alt="Logo Tarján Brokers"
                className="object-contain w-full h-full"
                style={{ background: "#003366" }}
              />
            </div>
          </div>
        </section>

        {/* Diferenciales */}
        <section id="diferenciales" className="bg-[#e3e8ee] py-24">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold text-[#003366] mb-10">
              ¿Por qué elegirnos?
            </h2>
            <div className="grid md:grid-cols-2 gap-10 text-[#1a2838] text-left">
              <div className="flex flex-col gap-7">
                <div>
                  <span className="font-bold text-lg text-[#003366]">
                    Muestreo diferencial
                  </span>
                  <p>
                    Recibimos al comprador con información clara y materiales de
                    apoyo, café y golosinas, generando un vínculo inmediato con
                    la propiedad.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-lg text-[#003366]">
                    Recorrido virtual
                  </span>
                  <p>
                    Experiencias inmersivas accesibles desde cualquier
                    dispositivo.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-lg text-[#003366]">
                    Amoblamiento virtual
                  </span>
                  <p>
                    Mostramos el potencial de cada propiedad con diseño digital.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <div>
                  <span className="font-bold text-lg text-[#003366]">
                    Contenido audiovisual con dron
                  </span>
                  <p>
                    Videos e imágenes aéreas de alto impacto para destacar
                    ubicación y entorno.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-lg text-[#003366]">
                    Planos detallados
                  </span>
                  <p>
                    Planos precisos y visuales claros para facilitar la decisión
                    de compra.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-lg text-[#003366]">
                    Máxima exposición
                  </span>
                  <p>
                    Publicamos en los principales portales para alcanzar al
                    público más calificado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="max-w-2xl mx-auto px-8 py-24">
          <h2 className="text-3xl font-extrabold text-[#003366] mb-8">
            Contacto directo
          </h2>
          <p className="text-lg text-[#33485c] mb-4">
            Escribinos a{" "}
            <a
              href="mailto:tarjanbrokers@gmail.com"
              className="underline font-bold hover:text-[#003366]"
            >
              tarjanbrokers@gmail.com
            </a>{" "}
            o por{" "}
            <a
              href="https://wa.me/5491151136164?text=Hola%20Tarján%20Brokers,%20quiero%20más%20info."
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-[#003366]"
            >
              WhatsApp
            </a>
            .
          </p>
          <form ref={form} onSubmit={sendEmail} className="space-y-6 mt-8">
            <input
              type="text"
              name="name"
              placeholder="Nombre y apellido"
              required
              className="w-full rounded px-4 py-3 border border-[#003366] text-[#003366] font-semibold bg-white focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
              className="w-full rounded px-4 py-3 border border-[#003366] text-[#003366] font-semibold bg-white focus:outline-none"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Tu consulta"
              required
              className="w-full rounded px-4 py-3 border border-[#003366] text-[#003366] font-semibold bg-white focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-[#003366] text-white font-bold px-7 py-3 rounded shadow hover:bg-[#225599] transition w-full"
              disabled={sending}
            >
              {sending ? "Enviando..." : "Enviar mensaje"}
            </button>
            {sent && (
              <div className="text-green-700 text-center font-semibold mt-2">
                ¡Mensaje enviado con éxito!
              </div>
            )}
          </form>
        </section>
      </main>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5491151136164?text=Hola%20Tarján%20Brokers,%20quiero%20más%20info."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Tarján Brokers"
        className="fixed bottom-6 right-6 z-50"
        style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,.18))" }}
      >
        <img
          src="/images.png"
          alt="WhatsApp"
          className="block transition-transform hover:scale-110 active:scale-95"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "contain",
            background: "transparent",
          }}
          draggable={false}
        />
      </a>

      {/* Footer */}
      <footer className="bg-[#003366] text-white text-center py-7 text-base tracking-wider">
        Profesionalismo · Experiencia · Transparencia
        <div className="text-xs mt-2 opacity-70">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
