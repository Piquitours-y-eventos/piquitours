import React, { useEffect } from 'react';
import {
  BadgeCheck,
  Compass,
  PlayCircle,
  Star,
  ShieldCheck,
  Clock,
  Route,
  Target,
  Eye,
  Heart,
  Shield,
  Wand2,
  Map,
  Send,
  Mail,
  Instagram,
  Facebook
} from 'lucide-react';
import './styles/Nosotros.css';

function NosotrosPage() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const href = e.target.getAttribute('href');
        if (href.length > 1) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    document.addEventListener('click', handleSmoothScroll);

    // Animation on appear
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 600, easing: 'cubic-bezier(.21,1,.21,1)', fill: 'forwards' }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('section .pt-container > *').forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root{
          /* Paleta: dorado–naranja–rojo (con soporte a modo oscuro) */
          --gold:#D4AF37;
          --amber:#FFB000;
          --orange:#FF6A00;
          --red:#FF2D55;
          --bg-0:#0b0b0c;    /* fondo principal */
          --bg-1:#121214;    /* superficies */
          --text-0:#f8fafc;  /* texto alto contraste */
          --text-1:#cbd5e1;  /* texto secundario */
          --muted:#2a2a2e;   /* bordes sutiles */
          --glass:rgba(255,255,255,.06);
          --blur:12px;
          --radius:20px;
          --shadow: 0 8px 30px rgba(0,0,0,.45);
          --grad-1: linear-gradient(135deg, var(--gold), var(--amber), var(--orange), var(--red));
          --grad-soft: linear-gradient(180deg, rgba(255,186,0,.18), rgba(255,42,85,.12));
        }
        *{box-sizing:border-box}
        html,body{margin:0; padding:0; background:var(--bg-0); color:var(--text-0); font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; letter-spacing:.01em}
        img,video{max-width:100%; display:block}
        a{color:inherit; text-decoration:none}
        .pt-container{width:min(1200px, 92vw); margin-inline:auto}
        .pt-btn{display:inline-flex; align-items:center; gap:.6rem; padding:.9rem 1.2rem; border-radius:999px; border:1px solid transparent; font-weight:600; transition:.25s ease; box-shadow:var(--shadow)}
        .pt-btn-primary{background:var(--grad-1); background-size:200% 200%; color:#0b0b0c;}
        .pt-btn-primary:hover{transform:translateY(-2px); filter:saturate(1.1);}
        .pt-btn-ghost{background:rgba(255,255,255,.06); border-color:#ffffff22}
        .pt-btn-ghost:hover{background:rgba(255,255,255,.1); transform:translateY(-2px)}

        /* HERO */
        .pt-hero{position:relative; isolation:isolate}
        .pt-hero-media{position:absolute; inset:0; z-index:-1; overflow:hidden; border-radius:0 0 40px 40px}
        .pt-hero video{width:100%; height:100%; object-fit:cover; filter:contrast(1.05) saturate(1.05) brightness(.9)}
        .pt-hero-overlay{position:absolute; inset:0; background:radial-gradient(80% 60% at 50% 10%, rgba(0,0,0,.1), rgba(0,0,0,.7) 70%), linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.85));}
        .pt-hero-glow{position:absolute; inset:0; background:radial-gradient(80% 50% at 70% 20%, rgba(255,105,0,.25), transparent 40%), radial-gradient(80% 50% at 30% 80%, rgba(212,175,55,.18), transparent 40%); mix-blend:screen;}
        .pt-hero-content{padding:14vh 0 18vh; text-align:center}
        .pt-kicker{display:inline-flex; align-items:center; gap:.6rem; padding:.35rem .7rem; border-radius:999px; font-size:.85rem; background:rgba(255,255,255,.06); border:1px solid #ffffff22}
        .pt-hero h1{font-size:clamp(2.2rem, 5vw, 4.6rem); margin:.8rem 0; line-height:1.08; letter-spacing:-.02em}
        .pt-hero p{max-width:850px; margin:0 auto 1.2rem; color:var(--text-1); font-size:clamp(1.02rem, 1.6vw, 1.2rem)}
        .pt-hero-ctas{display:flex; justify-content:center; gap:.8rem; flex-wrap:wrap; margin-top:1.2rem}

        /* Badges de confianza */
        .pt-trust{display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:34px}
        .pt-trust .pt-card{background:var(--glass); border:1px solid #ffffff18; border-radius:14px; padding:14px; display:flex; align-items:center; gap:.8rem}
        .pt-trust .pt-card small{color:var(--text-1)}

        /* Secciones base */
        section{padding:72px 0}
        .pt-section-head{display:flex; align-items:end; justify-content:space-between; gap:1rem; margin-bottom:28px}
        .pt-section-head h2{font-size:clamp(1.6rem, 3.2vw, 2.4rem); letter-spacing:-.015em}
        .pt-section-head p{max-width:720px; color:var(--text-1)}

        /* Grid de valores */
        .pt-values{display:grid; grid-template-columns:repeat(3,1fr); gap:18px}
        .pt-values .pt-card{background:var(--glass); border:1px solid #ffffff14; border-radius:var(--radius); padding:22px; backdrop-filter: blur(var(--blur)); box-shadow:var(--shadow); position:relative; overflow:hidden}
        .pt-values .pt-card::after{content:""; position:absolute; inset:auto -20% -20% -20%; height:140px; background:var(--grad-soft); filter:blur(24px)}
        .pt-values .pt-card h3{margin:.4rem 0 .2rem}
        .pt-values .pt-card p{color:var(--text-1)}

        /* Historia / Timeline */
        .pt-timeline{position:relative; padding-left:18px}
        .pt-timeline::before{content:""; position:absolute; left:6px; top:6px; bottom:6px; width:2px; background:linear-gradient(180deg, #ffffff18, transparent)}
        .pt-tl-item{display:grid; grid-template-columns:140px 1fr; gap:18px; padding:14px 0}
        .pt-tl-bullet{width:14px; height:14px; border-radius:50%; background:var(--grad-1); box-shadow:0 0 0 4px rgba(255,255,255,.05); position:absolute; left:-1px; margin-top:6px}
        .pt-tl-year{color:#e2e8f0; font-weight:700}
        .pt-tl-body{background:var(--glass); border:1px solid #ffffff14; border-radius:16px; padding:16px}
        .pt-tl-body p{color:var(--text-1); margin:.2rem 0 0}

        /* Métricas */
        .pt-metrics{display:grid; grid-template-columns:repeat(4,1fr); gap:16px}
        .pt-metric{background:var(--glass); border-radius:16px; border:1px solid #ffffff12; padding:22px; text-align:center}
        .pt-metric .pt-num{font-size:2rem; font-weight:800; background:var(--grad-1); -webkit-background-clip:text; background-clip:text; color:transparent}
        .pt-metric small{color:var(--text-1)}

        /* Equipo */
        .pt-team{display:grid; grid-template-columns:repeat(4,1fr); gap:16px}
        .pt-member{background:var(--glass); border:1px solid #ffffff14; border-radius:18px; overflow:hidden; position:relative}
        .pt-member img{aspect-ratio:1/1; object-fit:cover}
        .pt-member .pt-info{padding:14px}
        .pt-member .pt-role{color:var(--text-1); font-size:.95rem}

        /* CTA */
        .pt-cta{background:radial-gradient(1200px 400px at 50% 0%, rgba(255,105,0,.24), transparent), linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)); border:1px solid #ffffff14; border-radius:28px; padding:28px; box-shadow:var(--shadow)}

        /* Footer */
        footer{padding:30px 0 60px; color:var(--text-1)}
        .pt-foot{display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap; border-top:1px solid #ffffff14; padding-top:18px}

        /* Utilidades */
        .pt-pill{display:inline-flex; align-items:center; gap:.5rem; background:rgba(255,255,255,.08); border:1px solid #ffffff22; padding:.45rem .7rem; border-radius:999px}
        .pt-grid-2{display:grid; grid-template-columns:1.2fr .8fr; gap:20px}
        .pt-grid-3{display:grid; grid-template-columns:repeat(3,1fr); gap:18px}
        .pt-muted{color:var(--text-1)}
        .pt-divider{height:1px; background:linear-gradient(90deg, transparent, #ffffff1a, transparent); margin:28px 0}

        /* Diferencia mejorada */
        .pt-difference{display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch}
        .pt-difference .pt-card{background:var(--glass); border:1px solid #ffffff14; border-radius:24px; padding:28px; backdrop-filter:blur(var(--blur)); box-shadow:var(--shadow); position:relative; overflow:hidden; display:flex; flex-direction:column; transition:transform .3s ease}
        .pt-difference .pt-card:hover{transform:translateY(-4px)}
        .pt-difference .pt-card::after{content:""; position:absolute; inset:auto -20% -20% -20%; height:160px; background:var(--grad-soft); filter:blur(28px)}
        .pt-difference .pt-card h3{font-size:1.4rem; margin:.6rem 0 .3rem}
        .pt-difference .pt-card p{font-size:1rem; line-height:1.5; color:var(--text-1); flex-grow:1}
        .pt-difference .pt-pill{font-size:.9rem; font-weight:600}

        /* Video section */
        .pt-video-section{position:relative; text-align:center; padding:48px 0}
        .pt-video-section video{border-radius:24px; box-shadow:var(--shadow); margin:0 auto; max-width:800px}
        .pt-video-section figcaption{font-size:.95rem; color:var(--text-1); margin-top:12px; max-width:800px; margin-left:auto; margin-right:auto}

        /* Responsive */
        @media (max-width: 1024px){
          .pt-team{grid-template-columns:repeat(3,1fr)}
          .pt-values{grid-template-columns:repeat(2,1fr)}
          .pt-metrics{grid-template-columns:repeat(2,1fr)}
          .pt-trust{grid-template-columns:repeat(2,1fr)}
          .pt-tl-item{grid-template-columns:120px 1fr}
          .pt-grid-2{grid-template-columns:1fr}
          .pt-difference{grid-template-columns:repeat(2,1fr)}
          .pt-section-head{flex-direction:column; align-items:flex-start; gap:0.5rem}
          .pt-hero-media{border-radius:0 0 20px 20px}
        }
        @media (max-width: 640px){
          .pt-team{grid-template-columns:1fr}
          .pt-values{grid-template-columns:1fr}
          .pt-metrics{grid-template-columns:1fr}
          .pt-trust{grid-template-columns:1fr}
          .pt-tl-item{grid-template-columns:100px 1fr}
          .pt-hero-content{padding:11vh 0 14vh}
          .pt-difference{grid-template-columns:1fr}
          section{padding:40px 0}
          .pt-container{width:96vw}
          .pt-hero h1{font-size:clamp(1.8rem, 8vw, 3rem); line-height:1.1}
          .pt-section-head h2{font-size:clamp(1.4rem, 6vw, 2rem)}
          .pt-hero p{font-size:clamp(0.95rem, 4vw, 1.1rem)}
          .pt-btn{padding:0.7rem 1rem; font-size:0.95rem}
          .pt-trust{gap:10px; margin-top:20px}
          .pt-trust .pt-card{padding:10px; font-size:0.9rem}
          .pt-values .pt-card{padding:18px}
          .pt-metric{padding:18px}
          .pt-member .pt-info{padding:10px}
          .pt-cta{padding:20px; border-radius:20px}
          .pt-foot{gap:12px; flex-direction:column; align-items:flex-start}
          .pt-nav-actions{display:flex; flex-wrap:wrap; gap:8px}
          .pt-video-section{padding:30px 0}
          .pt-video-section video{max-width:100%}
        }
      `}</style>

      {/* HERO */}
      <section className="pt-hero" aria-label="Presentación">
        <div className="pt-hero-media" aria-hidden="true">
          <video autoPlay muted playsInline loop preload="metadata" poster="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop">
            <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-island-3654/1080p.mp4" type="video/mp4" />
            <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-island-3654/720p.mp4" type="video/mp4" />
          </video>
          <div className="pt-hero-overlay"></div>
          <div className="pt-hero-glow"></div>
        </div>

        <div className="pt-container pt-hero-content">
          <span className="pt-kicker"><BadgeCheck aria-hidden="true" /> Calidad de clase mundial — desde El Espinal, Tolima</span>
          <h1>Diseñamos tours que <em style={{ fontStyle: 'normal', background: 'var(--grad-1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>se venden solos</em>.</h1>
          <p>Somos una casa de experiencias: logística impecable, servicio obsesivo por el detalle y un toque premium. Llevamos la calidez tolimense a un estándar internacional.</p>
          <div className="pt-hero-ctas">
            <a className="pt-btn pt-btn-primary" href="#pt-valores"><Compass aria-hidden="true" /> Por qué elegirnos</a>
            <a className="pt-btn pt-btn-ghost" href="#pt-historia"><PlayCircle aria-hidden="true" /> Conoce nuestra historia</a>
          </div>

          <div className="pt-trust" role="list" aria-label="Confianza">
            <div className="pt-card" role="listitem"><Star aria-hidden="true" /> <div><strong>4.9/5</strong><br/><small>Promedio de satisfacción</small></div></div>
            <div className="pt-card" role="listitem"><ShieldCheck aria-hidden="true" /> <div><strong>Operador legal</strong><br/><small>RNT vigente</small></div></div>
            <div className="pt-card" role="listitem"><Clock aria-hidden="true" /> <div><strong>24/7</strong><br/><small>Acompañamiento en ruta</small></div></div>
            <div className="pt-card" role="listitem"><Route aria-hidden="true" /> <div><strong>+120</strong><br/><small>Rutas diseñadas</small></div></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: MISIÓN Y VISIÓN */}
      <section id="pt-mision-vision">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Nuestra Esencia</h2>
            <p>Construimos el futuro del turismo desde el corazón de Tolima, con una visión audaz y una misión que nos impulsa cada día.</p>
          </div>
          <div className="pt-grid-2">
            <article className="pt-card" style={{ background: 'var(--glass)', border: '1px solid #ffffff14', borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden' }}>
              <div className="pt-pill"><Target aria-hidden="true" /> Misión</div>
              <h3>Transformar viajes en historias</h3>
              <p className="pt-muted">Creamos experiencias que trascienden el destino, conectando personas con la cultura, la naturaleza y la emoción, con un servicio impecable que hace que cada momento cuente.</p>
            </article>
            <article className="pt-card" style={{ background: 'var(--glass)', border: '1px solid #ffffff14', borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden' }}>
              <div className="pt-pill"><Eye aria-hidden="true" /> Visión</div>
              <h3>Ser el estándar del turismo premium</h3>
              <p className="pt-muted">Aspiramos a redefinir el turismo en Colombia, llevando la calidez tolimense y la excelencia operativa a cada rincón del país y más allá, con historias que inspiran.</p>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: QUIÉNES SOMOS */}
      <section id="pt-quienes-somos">
        <div className="pt-container pt-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <div className="pt-section-head">
              <h2>Quiénes somos</h2>
            </div>
            <p className="pt-muted">Piquitours y Eventos nació para elevar el turismo local con una visión clara: crear recuerdos que la gente quiera contar. Desde El Espinal conectamos Colombia con experiencias diseñadas con precisión, seguridad y estilo.</p>
            <div className="pt-divider"></div>
            <div className="pt-metrics">
              <div className="pt-metric"><div className="pt-num">+10.000</div><small>Viajeros felices</small></div>
              <div className="pt-metric"><div className="pt-num">98%</div><small>Rutas a tiempo</small></div>
              <div className="pt-metric"><div className="pt-num">+80</div><small>Aliados confiables</small></div>
              <div className="pt-metric"><div className="pt-num">-35%</div><small>Incidencias vs. promedio</small></div>
            </div>
          </div>
          <figure style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" alt="Grupo disfrutando de un tour al atardecer" style={{ borderRadius: '24px', boxShadow: 'var(--shadow)' }} />
            <figcaption className="pt-muted" style={{ marginTop: '10px' }}>Diseño, logística y hospitalidad — todo en un solo equipo.</figcaption>
          </figure>
        </div>
      </section>

      {/* SECCIÓN: VALORES */}
      <section id="pt-valores">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Nuestros valores</h2>
            <p>La estética importa, pero la ética más. Esta es la base que sostiene cada ruta.</p>
          </div>
          <div className="pt-values">
            <article className="pt-card">
              <div className="pt-pill"><Target aria-hidden="true" /> Precisión</div>
              <h3>Planificación quirúrgica</h3>
              <p>Itinerarios realistas, buffers de seguridad y protocolos que minimizan imprevistos.</p>
            </article>
            <article className="pt-card">
              <div className="pt-pill"><Heart aria-hidden="true" /> Cuidado</div>
              <h3>Servicio que se siente</h3>
              <p>Hablamos claro, escuchamos más y resolvemos antes de que preguntes.</p>
            </article>
            <article className="pt-card">
              <div className="pt-pill"><Shield aria-hidden="true" /> Seguridad</div>
              <h3>Primero lo importante</h3>
              <p>Operación certificada, guías avalados y aliados verificables en cada destino.</p>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: HISTORIA / TIMELINE */}
      <section id="pt-historia">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Nuestra historia</h2>
            <p>Del Espinal al país: pasos concretos, resultados medibles.</p>
          </div>
          <div className="pt-timeline">
            <div className="pt-tl-item">
              <span className="pt-tl-year">2019</span>
              <div className="pt-tl-body"><span className="pt-tl-bullet" aria-hidden="true"></span>
                <strong>Nacemos como operador local.</strong>
                <p>Primeras rutas municipales y alianzas con guías certificados de Tolima.</p>
              </div>
            </div>
            <div className="pt-tl-item">
              <span className="pt-tl-year">2021</span>
              <div className="pt-tl-body"><span className="pt-tl-bullet" aria-hidden="true"></span>
                <strong>Escalamos a tours nacionales.</strong>
                <p>Implementamos un estándar de servicio premium con acompañamiento 24/7.</p>
              </div>
            </div>
            <div className="pt-tl-item">
              <span className="pt-tl-year">2023</span>
              <div className="pt-tl-body"><span className="pt-tl-bullet" aria-hidden="true"></span>
                <strong>+10.000 viajeros.</strong>
                <p>Reconocidos por puntualidad y satisfacción del cliente.</p>
              </div>
            </div>
            <div className="pt-tl-item">
              <span className="pt-tl-year">2025</span>
              <div className="pt-tl-body"><span className="pt-tl-bullet" aria-hidden="true"></span>
                <strong>Expansión de experiencias temáticas.</strong>
                <p>Gastronomía, naturaleza y cultura con curaduría propia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: VIDEO */}
      <section className="pt-video-section" aria-label="Nuestra experiencia en acción">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Vive la experiencia Piquitours</h2>
            <p>Descubre cómo transformamos cada viaje en una historia inolvidable.</p>
          </div>
          <figure>
            <video controls preload="metadata" poster="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1200&auto=format&fit=crop">
              <source src="https://cdn.coverr.co/videos/coverr-tropical-beach-1562/1080p.mp4" type="video/mp4" />
              <source src="https://cdn.coverr.co/videos/coverr-tropical-beach-1562/720p.mp4" type="video/mp4" />
            </video>
            <figcaption className="pt-muted">Un vistazo a nuestras rutas: cultura, naturaleza y momentos que perduran.</figcaption>
          </figure>
        </div>
      </section>

      {/* SECCIÓN: EQUIPO */}
      <section id="pt-equipo" aria-label="Nuestro equipo">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Gente real, resultados reales</h2>
            <p>Un equipo pequeño y obsesivo: diseñadores de experiencias, logística y hospitalidad.</p>
          </div>
          <div className="pt-team">
            <article className="pt-member">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Valeria Ortiz</strong>
                <div className="pt-role">Directora de Operaciones</div>
              </div>
            </article>
            <article className="pt-member">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Samuel Rojas</strong>
                <div className="pt-role">Experiencias y Curaduría</div>
              </div>
            </article>
            <article className="pt-member">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Juliana Pérez</strong>
                <div className="pt-role">Relación con Aliados</div>
              </div>
            </article>
            <article className="pt-member">
              <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Camilo Díaz</strong>
                <div className="pt-role">Guía Líder</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: DIFERENCIA */}
      <section id="pt-como-lo-hacemos">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Lo que nos hace únicos</h2>
            <p>Una experiencia diseñada con intención, desde la planificación hasta el último detalle.</p>
          </div>
          <div className="pt-difference">
            <article className="pt-card">
              <div className="pt-pill"><Wand2 aria-hidden="true" /> UX en ruta</div>
              <h3>Experiencia sin fricciones</h3>
              <p>Diseñamos cada viaje como un producto: interfaces claras, señales intuitivas y una ejecución que elimina cualquier obstáculo para que solo disfrutes.</p>
            </article>
            <article className="pt-card">
              <div className="pt-pill"><Map aria-hidden="true" /> Curaduría propia</div>
              <h3>Historias que conectan</h3>
              <p>No ofrecemos destinos genéricos; cada ruta es una narrativa única, tejida con cuidado para que vivas momentos que resuenan.</p>
            </article>
            <article className="pt-card">
              <div className="pt-pill"><BadgeCheck aria-hidden="true" /> Operación sólida</div>
              <h3>Calidad sin compromisos</h3>
              <p>Protocolos rigurosos, checklists detallados y métricas claras aseguran que cada experiencia cumpla con nuestro estándar de excelencia.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section aria-label="Contáctanos">
        <div className="pt-container pt-cta">
          <div className="pt-section-head" style={{ alignItems: 'center' }}>
            <h2>¿Listo para elevar tu próximo viaje?</h2>
            <a className="pt-btn pt-btn-primary" href="https://wa.me/573001112233" target="_blank" rel="noopener"><Send aria-hidden="true" /> Hablar por WhatsApp</a>
          </div>
          <p className="pt-muted">Cuéntanos cuándo, cuántos viajan y qué ritmo quieres. Nosotros hacemos el resto.</p>
        </div>
      </section>

      <footer>
        <div className="pt-container pt-foot">
          <div className="pt-brand" aria-label="Marca">
            <span className="pt-brand-logo" aria-hidden="true"></span>
            <div>
              <strong>Piquitours y Eventos</strong><br/>
              <small className="pt-muted">El Espinal, Tolima — Colombia</small>
            </div>
          </div>
          <div className="pt-muted">© {new Date().getFullYear()} Piquitours y Eventos. Todos los derechos reservados.</div>
          <div className="pt-nav-actions">
            <a className="pt-pill" href="mailto:hola@piquitours.com"><Mail aria-hidden="true" /> Email</a>
            <a className="pt-pill" href="https://instagram.com" target="_blank" rel="noopener"><Instagram aria-hidden="true" /> Instagram</a>
            <a className="pt-pill" href="https://facebook.com" target="_blank" rel="noopener"><Facebook aria-hidden="true" /> Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default NosotrosPage;