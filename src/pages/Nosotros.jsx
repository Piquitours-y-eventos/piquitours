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
      {/* HERO */}
      <section className="pt-hero" aria-label="Presentación">
        <div className="pt-hero-media" aria-hidden="true">
          <img src="/portada_imagen_2919.jpg" alt="Paisaje Colombia - PiquiTours" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="pt-container pt-hero-content">
          <span className="pt-kicker"><BadgeCheck aria-hidden="true" /> Calidad de clase mundial — desde El Espinal, Tolima</span>
          <h1>Diseñamos tours que <em className="gradient-text">se venden solos</em>.</h1>
          <p style={{ color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Somos una casa de experiencias: logística impecable, servicio obsesivo por el detalle y un toque premium. Llevamos la calidez tolimense a un estándar internacional.</p>
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
            <article className="pt-card">
              <div className="pt-pill"><Target aria-hidden="true" /> Misión</div>
              <h3>Transformar viajes en historias</h3>
              <p className="pt-muted">Creamos experiencias que trascienden el destino, conectando personas con la cultura, la naturaleza y la emoción, con un servicio impecable que hace que cada momento cuente.</p>
            </article>
            <article className="pt-card">
              <div className="pt-pill"><Eye aria-hidden="true" /> Visión</div>
              <h3>Ser el estándar del turismo premium</h3>
              <p className="pt-muted">Aspiramos a redefinir el turismo en Colombia, llevando la calidez tolimense y la excelencia operativa a cada rincón del país y más allá, con historias que inspiran.</p>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: QUIÉNES SOMOS */}
      <section id="pt-quienes-somos">
        <div className="pt-container pt-grid-2">
          <div>
            <div className="pt-section-head">
              <h2>Quiénes somos</h2>
            </div>
            <p className="pt-muted">Piquitours y Eventos nació para elevar el turismo local con una visión clara: crear recuerdos que la gente quiera contar. Desde El Espinal conectamos Colombia con experiencias diseñadas con precisión, seguridad y estilo.</p>
            <div className="pt-divider"></div>
            <div className="pt-metrics">
              <div className="pt-metric"><div className="pt-num">+5,000</div><small>Viajeros felices</small></div>
              <div className="pt-metric"><div className="pt-num">98%</div><small>Rutas a tiempo</small></div>
              <div className="pt-metric"><div className="pt-num">+12</div><small>Aliados confiables</small></div>
              <div className="pt-metric"><div className="pt-num">-35%</div><small>Incidencias vs. promedio</small></div>
            </div>
          </div>
          <figure className="pt-quienes-figure">
            <img loading="lazy" src="/portada_google.jpeg" alt="Grupo disfrutando de un tour al atardecer" />
            <figcaption className="pt-muted">Diseño, logística y hospitalidad — todo en un solo equipo.</figcaption>
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
            <img loading="lazy" src="/portada_imagen_2919.jpg" alt="Experiencia PiquiTours" style={{ width: '100%', borderRadius: '8px' }} />
            <figcaption className="pt-muted">Un vistazo a nuestras rutas: cultura, naturaleza y momentos que perduran.</figcaption>
          </figure>
        </div>
      </section>

      {/* SECCIÓN: EQUIPO */}
      {/* <section id="pt-equipo" aria-label="Nuestro equipo">
        <div className="pt-container">
          <div className="pt-section-head">
            <h2>Gente real, resultados reales</h2>
            <p>Un equipo pequeño y obsesivo: diseñadores de experiencias, logística y hospitalidad.</p>
          </div>
          <div className="pt-team">
            <article className="pt-member">
              <img loading="lazy" src="/portada_imagen_2919.jpg" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Valeria Ortiz</strong>
                <div className="pt-role">Directora de Operaciones</div>
              </div>
            </article>
            <article className="pt-member">
              <img loading="lazy" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Samuel Rojas</strong>
                <div className="pt-role">Experiencias y Curaduría</div>
              </div>
            </article>
            <article className="pt-member">
              <img loading="lazy" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Juliana Pérez</strong>
                <div className="pt-role">Relación con Aliados</div>
              </div>
            </article>
            <article className="pt-member">
              <img loading="lazy" src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="pt-info">
                <strong>Camilo Díaz</strong>
                <div className="pt-role">Guía Líder</div>
              </div>
            </article>
          </div>
        </div>
      </section> */}

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
          <div className="pt-section-head center">
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