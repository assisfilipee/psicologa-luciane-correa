/* =========================================================
   LUCIANE CORRÊA
   PSICÓLOGA E HIPNOTERAPEUTA

   ARQUIVO: animation.js
   Animações e microinterações
========================================================= */


document.documentElement.classList.add("js-animations");


/* =========================================================
   ACESSIBILIDADE
   RESPEITA PREFERS-REDUCED-MOTION
========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   HEADER NO SCROLL
========================================================= */

const siteHeader =
  document.querySelector("#header");


function updateHeaderState() {

  if (!siteHeader) return;


  if (window.scrollY > 40) {

    siteHeader.classList.add(
      "header--scrolled"
    );

  } else {

    siteHeader.classList.remove(
      "header--scrolled"
    );

  }

}


updateHeaderState();


window.addEventListener(
  "scroll",
  updateHeaderState,
  {
    passive: true
  }
);


/* =========================================================
   SEM ANIMAÇÃO QUANDO REDUÇÃO DE MOVIMENTO ESTIVER ATIVA
========================================================= */

if (prefersReducedMotion) {

  document
    .querySelectorAll(
      "[data-reveal], [data-reveal-line], [data-hero-image]"
    )
    .forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

}


/* =========================================================
   REVEAL GERAL
========================================================= */

if (!prefersReducedMotion) {

  const revealElements =
    document.querySelectorAll(
      "[data-reveal]"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "is-visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.14,

        rootMargin:
          "0px 0px -8% 0px"
      }
    );


  revealElements.forEach(
    (element, index) => {

      /*
        Pequeno delay natural.
        Mantemos limitado para não deixar
        a página lenta.
      */

      const delay =
        Math.min(
          (index % 4) * 70,
          210
        );


      element.style.setProperty(
        "--reveal-delay",
        `${delay}ms`
      );


      revealObserver.observe(
        element
      );

    }
  );

}


/* =========================================================
   REVEAL DE LINHAS
========================================================= */

if (!prefersReducedMotion) {

  const revealLines =
    document.querySelectorAll(
      "[data-reveal-line]"
    );


  const lineObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          const element =
            entry.target;


          const parent =
            element.parentElement;


          if (parent) {

            const siblings =
              [
                ...parent.querySelectorAll(
                  "[data-reveal-line]"
                )
              ];


            const index =
              siblings.indexOf(
                element
              );


            element.style.setProperty(
              "--line-delay",
              `${index * 95}ms`
            );

          }


          element.classList.add(
            "is-visible"
          );


          observer.unobserve(
            element
          );

        });

      },
      {
        threshold: 0.15,

        rootMargin:
          "0px 0px -6% 0px"
      }
    );


  revealLines.forEach(
    (line) => {

      lineObserver.observe(
        line
      );

    }
  );

}


/* =========================================================
   HERO
   ENTRADA INICIAL COORDENADA
========================================================= */

const hero =
  document.querySelector(".hero");

const heroImage =
  document.querySelector(
    "[data-hero-image]"
  );


if (
  hero &&
  heroImage &&
  !prefersReducedMotion
) {

  window.requestAnimationFrame(
    () => {

      window.setTimeout(
        () => {

          hero.classList.add(
            "hero--loaded"
          );


          heroImage.classList.add(
            "is-visible"
          );

        },
        120
      );

    }
  );

}


/* =========================================================
   HERO
   PARALLAX MUITO SUTIL COM O MOUSE
========================================================= */

const heroVisual =
  document.querySelector(
    ".hero__visual"
  );

const heroPhoto =
  document.querySelector(
    ".hero__image"
  );


if (
  heroVisual &&
  heroPhoto &&
  !prefersReducedMotion &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  heroVisual.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        heroVisual.getBoundingClientRect();


      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const moveX =
        ((x - centerX) / centerX) * 4;

      const moveY =
        ((y - centerY) / centerY) * 3;


      heroPhoto.style.transform =
        `
          translate3d(
            ${moveX}px,
            ${moveY}px,
            0
          )
          scale(1.025)
        `;

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      heroPhoto.style.transform =
        `
          translate3d(0, 0, 0)
          scale(1.015)
        `;

    }
  );

}


/* =========================================================
   FAIXA DE AUTORIDADE
   CONTADORES
========================================================= */

const authoritySection =
  document.querySelector(
    ".authority"
  );


let authorityAnimated =
  false;


function animateNumber(
  element,
  start,
  end,
  duration,
  formatter
) {

  const startTime =
    performance.now();


  function update(currentTime) {

    const elapsed =
      currentTime - startTime;


    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    /*
      Easing suave.
    */

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      Math.round(
        start +
        (end - start) * eased
      );


    element.textContent =
      formatter(value);


    if (progress < 1) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}


if (
  authoritySection &&
  !prefersReducedMotion
) {

  const authorityObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (
            !entry.isIntersecting ||
            authorityAnimated
          ) {
            return;
          }


          authorityAnimated = true;


          const numbers =
            authoritySection.querySelectorAll(
              ".authority__number"
            );


          numbers.forEach(
            (number) => {

              const text =
                number.textContent.trim();


              /* +20 */

              if (text.includes("20")) {

                animateNumber(
                  number,
                  0,
                  20,
                  1200,
                  (value) => `+${value}`
                );

              }


              /* 02h */

              if (
                text.toLowerCase().includes("02h")
              ) {

                animateNumber(
                  number,
                  0,
                  2,
                  900,
                  (value) =>
                    `${String(value).padStart(2, "0")}h`
                );

              }

            }
          );


          observer.unobserve(
            authoritySection
          );

        });

      },
      {
        threshold: 0.5
      }
    );


  authorityObserver.observe(
    authoritySection
  );

}


/* =========================================================
   PRIMEIRO ENCONTRO
   ÓRBITA SUAVE
========================================================= */

const sessionSection =
  document.querySelector(
    ".first-session"
  );

const sessionOrbit =
  document.querySelector(
    ".first-session__orbit"
  );


let orbitFrame = null;

let orbitRotation = 0;

let orbitActive = false;


function animateOrbit() {

  if (!orbitActive) {
    return;
  }


  orbitRotation += 0.035;


  if (sessionOrbit) {

    sessionOrbit.style.transform =
      `
        translate(-50%, -50%)
        rotate(${orbitRotation}deg)
      `;

  }


  orbitFrame =
    requestAnimationFrame(
      animateOrbit
    );

}


if (
  sessionSection &&
  sessionOrbit &&
  !prefersReducedMotion
) {

  const orbitObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            orbitActive = true;


            if (!orbitFrame) {

              animateOrbit();

            }

          } else {

            orbitActive = false;


            if (orbitFrame) {

              cancelAnimationFrame(
                orbitFrame
              );


              orbitFrame = null;

            }

          }

        });

      },
      {
        threshold: 0.25
      }
    );


  orbitObserver.observe(
    sessionSection
  );

}


/* =========================================================
   PALAVRAS DECORATIVAS
   MOVIMENTO MUITO LEVE NO SCROLL
========================================================= */

const backgroundWords =
  document.querySelectorAll(
    `
      .welcome__word,
      .approaches__background-word,
      .first-session__background-word,
      .about__background-word,
      .process__background-word,
      .office__background-word,
      .faq__background-word,
      .contact__background-word
    `
  );


let ticking =
  false;


function updateBackgroundWords() {

  const viewportHeight =
    window.innerHeight;


  backgroundWords.forEach(
    (word) => {

      const parent =
        word.parentElement;


      if (!parent) return;


      const rect =
        parent.getBoundingClientRect();


      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) {
        return;
      }


      const center =
        rect.top +
        rect.height / 2;


      const distance =
        center -
        viewportHeight / 2;


      const movement =
        distance * -0.025;


      word.style.transform =
        `translate3d(0, ${movement}px, 0)`;

    }
  );


  ticking = false;

}


if (
  backgroundWords.length &&
  !prefersReducedMotion
) {

  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        requestAnimationFrame(
          updateBackgroundWords
        );


        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  updateBackgroundWords();

}


/* =========================================================
   LIMPEZA AO SAIR DA PÁGINA
========================================================= */

window.addEventListener(
  "pagehide",
  () => {

    if (orbitFrame) {

      cancelAnimationFrame(
        orbitFrame
      );

    }

  }
);