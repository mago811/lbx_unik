// Movimiento editorial reutilizable. Se activa con atributos en el HTML:
//   data-lines           → el texto aparece línea a línea al entrar en pantalla
//   data-parallax="0.15" → la imagen se desplaza más despacio que el scroll (fracción de su alto)
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

document.fonts.ready.then(() => {
  lineas();
  parallax();
});
