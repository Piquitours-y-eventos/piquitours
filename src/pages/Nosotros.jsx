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

export default function Nosotros() {
  // Animación al aparecer y scroll suave (opcional: puedes migrar a React, pero aquí lo omitimos para mantener fidelidad y simplicidad)
  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Presentación">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay muted playsInline loop preload="metadata" poster="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop">
            <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-island-3654/1080p.mp4" type="video/mp4" />
            <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-island-3654/720p.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-glow"></div>
        </div>

        <div className="container hero-content">
          <span className="kicker"><BadgeCheck size={18} aria-hidden="true" /> Calidad de clase mundial — desde El Espinal, Tolima</span>
          <h1>Diseñamos tours que <em style={{fontStyle:"normal", background:"var(--nosotros-grad-1)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"}}>se venden solos</em>.</h1>
          <p>Somos una casa de experiencias: logística impecable, servicio obsesivo por el detalle y un toque premium. Llevamos la calidez tolimense a un estándar internacional.</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#valores"><Compass size={18} aria-hidden="true" /> Por qué elegirnos</a>
            <a className="btn btn-ghost" href="#historia"><PlayCircle size={18} aria-hidden="true" /> Conoce nuestra historia</a>
          </div>

          <div className="trust" role="list" aria-label="Confianza">
            <div className="card" role="listitem"><Star size={18} aria-hidden="true" /> <div><strong>4.9/5</strong><br/><small>Promedio de satisfacción</small></div></div>
            <div className="card" role="listitem"><ShieldCheck size={18} aria-hidden="true" /> <div><strong>Operador legal</strong><br/><small>RNT vigente</small></div></div>
            <div className="card" role="listitem"><Clock size={18} aria-hidden="true" /> <div><strong>24/7</strong><br/><small>Acompañamiento en ruta</small></div></div>
            <div className="card" role="listitem"><Route size={18} aria-hidden="true" /> <div><strong>+120</strong><br/><small>Rutas diseñadas</small></div></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: MISIÓN Y VISIÓN */}
      <section id="mision-vision">
        <div className="container">
          <div className="section-head">
            <h2>Nuestra Esencia</h2>
            <p>Construimos el futuro del turismo desde el corazón de Tolima, con una visión audaz y una misión que nos impulsa cada día.</p>
          </div>
          <div className="grid-2">
            <article className="card" style={{background:'var(--nosotros-glass)', border:'1px solid #ffffff14', borderRadius:'24px', padding:'28px', boxShadow:'var(--nosotros-shadow)', position:'relative', overflow:'hidden'}}>
              <div className="pill"><Target size={18} /> Misión</div>
              <h3>Transformar viajes en historias</h3>
              <p className="muted">Creamos experiencias que trascienden el destino, conectando personas con la cultura, la naturaleza y la emoción, con un servicio impecable que hace que cada momento cuente.</p>
            </article>
            <article className="card" style={{background:'var(--nosotros-glass)', border:'1px solid #ffffff14', borderRadius:'24px', padding:'28px', boxShadow:'var(--nosotros-shadow)', position:'relative', overflow:'hidden'}}>
              <div className="pill"><Eye size={18} /> Visión</div>
              <h3>Ser el estándar del turismo premium</h3>
              <p className="muted">Aspiramos a redefinir el turismo en Colombia, llevando la calidez tolimense y la excelencia operativa a cada rincón del país y más allá, con historias que inspiran.</p>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: QUIÉNES SOMOS */}
      <section id="quienes-somos">
        <div className="container grid-2" style={{alignItems:"center"}}>
          <div>
            <div className="section-head">
              <h2>Quiénes somos</h2>
            </div>
            <p className="muted">Piquitours y Eventos nació para elevar el turismo local con una visión clara: crear recuerdos que la gente quiera contar. Desde El Espinal conectamos Colombia con experiencias diseñadas con precisión, seguridad y estilo.</p>
            <div className="divider"></div>
            <div className="metrics">
              <div className="metric"><div className="num">+10.000</div><small>Viajeros felices</small></div>
              <div className="metric"><div className="num">98%</div><small>Rutas a tiempo</small></div>
              <div className="metric"><div className="num">+80</div><small>Aliados confiables</small></div>
              <div className="metric"><div className="num">-35%</div><small>Incidencias vs. promedio</small></div>
            </div>
          </div>
          <figure style={{position:"relative"}}>
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" alt="Grupo disfrutando de un tour al atardecer" style={{borderRadius:"24px", boxShadow:"var(--nosotros-shadow)"}} />
            <figcaption className="muted" style={{marginTop:"10px"}}>Diseño, logística y hospitalidad — todo en un solo equipo.</figcaption>
          </figure>
        </div>
      </section>

      {/* SECCIÓN: VALORES */}
      <section id="valores">
        <div className="container">
          <div className="section-head">
            <h2>Nuestros valores</h2>
            <p>La estética importa, pero la ética más. Esta es la base que sostiene cada ruta.</p>
          </div>
          <div className="values">
            <article className="card">
              <div className="pill"><Target size={18} /> Precisión</div>
              <h3>Planificación quirúrgica</h3>
              <p>Itinerarios realistas, buffers de seguridad y protocolos que minimizan imprevistos.</p>
            </article>
            <article className="card">
              <div className="pill"><Heart size={18} /> Cuidado</div>
              <h3>Servicio que se siente</h3>
              <p>Hablamos claro, escuchamos más y resolvemos antes de que preguntes.</p>
            </article>
            <article className="card">
              <div className="pill"><Shield size={18} /> Seguridad</div>
              <h3>Primero lo importante</h3>
              <p>Operación certificada, guías avalados y aliados verificables en cada destino.</p>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: HISTORIA / TIMELINE */}
      <section id="historia">
        <div className="container">
          <div className="section-head">
            <h2>Nuestra historia</h2>
            <p>Del Espinal al país: pasos concretos, resultados medibles.</p>
          </div>
          <div className="timeline">
            <div className="tl-item">
              <span className="tl-year">2019</span>
              <div className="tl-body"><span className="tl-bullet" aria-hidden="true"></span>
                <strong>Nacemos como operador local.</strong>
                <p>Primeras rutas municipales y alianzas con guías certificados de Tolima.</p>
              </div>
            </div>
            <div className="tl-item">
              <span className="tl-year">2021</span>
              <div className="tl-body"><span className="tl-bullet" aria-hidden="true"></span>
                <strong>Escalamos a tours nacionales.</strong>
                <p>Implementamos un estándar de servicio premium con acompañamiento 24/7.</p>
              </div>
            </div>
            <div className="tl-item">
              <span className="tl-year">2023</span>
              <div className="tl-body"><span className="tl-bullet" aria-hidden="true"></span>
                <strong>+10.000 viajeros.</strong>
                <p>Reconocidos por puntualidad y satisfacción del cliente.</p>
              </div>
            </div>
            <div className="tl-item">
              <span className="tl-year">2025</span>
              <div className="tl-body"><span className="tl-bullet" aria-hidden="true"></span>
                <strong>Expansión de experiencias temáticas.</strong>
                <p>Gastronomía, naturaleza y cultura con curaduría propia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: VIDEO */}
      <section className="video-section" aria-label="Nuestra experiencia en acción">
        <div className="container">
          <div className="section-head">
            <h2>Vive la experiencia Piquitours</h2>
            <p>Descubre cómo transformamos cada viaje en una historia inolvidable.</p>
          </div>
          <figure>
            <video controls preload="metadata" poster="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1200&auto=format&fit=crop">
              <source src="https://cdn.coverr.co/videos/coverr-tropical-beach-1562/1080p.mp4" type="video/mp4" />
              <source src="https://cdn.coverr.co/videos/coverr-tropical-beach-1562/720p.mp4" type="video/mp4" />
            </video>
            <figcaption className="muted">Un vistazo a nuestras rutas: cultura, naturaleza y momentos que perduran.</figcaption>
          </figure>
        </div>
      </section>

      {/* SECCIÓN: EQUIPO */}
      <section id="equipo" aria-label="Nuestro equipo">
        <div className="container">
          <div className="section-head">
            <h2>Gente real, resultados reales</h2>
            <p>Un equipo pequeño y obsesivo: diseñadores de experiencias, logística y hospitalidad.</p>
          </div>
          <div className="team">
            <article className="member">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="info">
                <strong>Valeria Ortiz</strong>
                <div className="role">Directora de Operaciones</div>
              </div>
            </article>
            <article className="member">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="info">
                <strong>Samuel Rojas</strong>
                <div className="role">Experiencias y Curaduría</div>
              </div>
            </article>
            <article className="member">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="info">
                <strong>Juliana Pérez</strong>
                <div className="role">Relación con Aliados</div>
              </div>
            </article>
            <article className="member">
              <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop" alt="Foto de persona del equipo" />
              <div className="info">
                <strong>Camilo Díaz</strong>
                <div className="role">Guía Líder</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN: DIFERENCIA */}
      <section id="como-lo-hacemos">
        <div className="container">
          <div className="section-head">
            <h2>Lo que nos hace únicos</h2>
            <p>Una experiencia diseñada con intención, desde la planificación hasta el último detalle.</p>
          </div>
          <div className="difference">
            <article className="card">
              <div className="pill"><Wand2 size={18} /> UX en ruta</div>
              <h3>Experiencia sin fricciones</h3>
              <p>Diseñamos cada viaje como un producto: interfaces claras, señales intuitivas y una ejecución que elimina cualquier obstáculo para que solo disfrutes.</p>
            </article>
            <article className="card">
              <div className="pill"><Map size={18} /> Curaduría propia</div>
              <h3>Historias que conectan</h3>
              <p>No ofrecemos destinos genéricos; cada ruta es una narrativa única, tejida con cuidado para que vivas momentos que resuenan.</p>
            </article>
            <article className="card">
              <div className="pill"><BadgeCheck size={18} /> Operación sólida</div>
              <h3>Calidad sin compromisos</h3>
              <p>Protocolos rigurosos, checklists detallados y métricas claras aseguran que cada experiencia cumpla con nuestro estándar de excelencia.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section aria-label="Contáctanos">
        <div className="container cta">
          <div className="section-head" style={{alignItems:"center"}}>
            <h2>¿Listo para elevar tu próximo viaje?</h2>
            <a className="btn btn-primary" href="https://wa.me/573001112233" target="_blank" rel="noopener"><Send size={18} /> Hablar por WhatsApp</a>
          </div>
          <p className="muted">Cuéntanos cuándo, cuántos viajan y qué ritmo quieres. Nosotros hacemos el resto.</p>
        </div>
      </section>

      <footer>
        <div className="container foot">
          <div className="brand" aria-label="Marca">
            <span className="brand-logo" aria-hidden="true"></span>
            <div>
              <strong>Piquitours y Eventos</strong><br/>
              <small className="muted">El Espinal, Tolima — Colombia</small>
            </div>
          </div>
          <div className="muted">© {new Date().getFullYear()} Piquitours y Eventos. Todos los derechos reservados.</div>
          <div className="nav-actions">
            <a className="pill" href="mailto:hola@piquitours.com"><Mail size={18} /> Email</a>
            <a className="pill" href="https://instagram.com" target="_blank" rel="noopener"><Instagram size={18} /> Instagram</a>
            <a className="pill" href="https://facebook.com" target="_blank" rel="noopener"><Facebook size={18} /> Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}
