// Movimiento editorial reutilizable. Se activa con atributos en el HTML:
//   data-lines           → el texto aparece línea a línea al entrar en pantalla
//   data-parallax="0.15" → la imagen se desplaza más despacio que el scroll (fracción de su alto)
//   data-cursor-list     → la foto de cada elemento sigue al cursor (solo con ratón)
//   data-hscroll         → galería horizontal anclada al scroll (solo escritorio)
//   data-reveal-box      → la caja sube y aparece al entrar en pantalla
//   data-zoom            → la imagen se acerca suavemente con el scroll
// Con prefers-reduced-motion no se anima nada: todo queda visible y quieto.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

function lineas() {
  document.querySelectorAll<HTMLElement>('[data-lines]').forEach((el) => {
    if (reducido) return;
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true, // recalcula las líneas si cambia el ancho o cargan las fuentes
      onSplit: (s) =>
        gsap.from(s.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    });
  });
}

function parallax() {
  if (reducido) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const f = parseFloat(el.dataset.parallax || '0.12');
    gsap.fromTo(
      el,
      { yPercent: -f * 100 },
      {
        yPercent: f * 100,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

function cursor() {
  if (!matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-cursor-list]').forEach((lista) => {
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, activo = false;
    const paso = () => {
      // Suavizado: la foto persigue al cursor con algo de retraso
      cx += (x - cx) * (reducido ? 1 : 0.18);
      cy += (y - cy) * (reducido ? 1 : 0.18);
      lista.style.setProperty('--cx', `${cx}px`);
      lista.style.setProperty('--cy', `${cy}px`);
      if (activo) requestAnimationFrame(paso);
    };
    lista.addEventListener('pointerenter', (e) => { x = cx = e.clientX; y = cy = e.clientY; activo = true; paso(); });
    lista.addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; });
    lista.addEventListener('pointerleave', () => { activo = false; });
  });
}

function scrollHorizontal() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((sec) => {
      const pista = sec.querySelector<HTMLElement>('[data-hscroll-track]')!;
      sec.classList.add('is-hscroll');
      const distancia = () => pista.scrollWidth - innerWidth;
      gsap.to(pista, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: { trigger: sec, pin: true, scrub: 0.6, end: () => `+=${distancia()}`, invalidateOnRefresh: true },
      });
    });
    return () => document.querySelectorAll('[data-hscroll]').forEach((s) => s.classList.remove('is-hscroll'));
  });
}

function cajas() {
  if (reducido) return;
  document.querySelectorAll<HTMLElement>('[data-reveal-box]').forEach((el) =>
    gsap.from(el, { yPercent: 25, opacity: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: true } }),
  );
  document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) =>
    gsap.fromTo(el, { scale: 1.75 }, { scale: 1.35, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }),
  );
}

cursor();
document.fonts.ready.then(() => {
  scrollHorizontal(); // primero: el anclaje cambia la altura de la página
  lineas();
  parallax();
  cajas();
  ScrollTrigger.refresh();
});
