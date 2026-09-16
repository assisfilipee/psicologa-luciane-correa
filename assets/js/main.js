/* =========================================================
   LUCIANE CORRÊA
   PSICÓLOGA E HIPNOTERAPEUTA

   ARQUIVO: main.js
   Interações gerais
========================================================= */


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   ABORDAGENS
========================================================= */

const approachTabs =
  document.querySelectorAll("[data-approach-tab]");

const approachPanels =
  document.querySelectorAll("[data-approach-panel]");


if (approachTabs.length && approachPanels.length) {

  approachTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      const target =
        tab.dataset.approachTab;


      /* REMOVE ESTADO ATIVO DOS BOTÕES */

      approachTabs.forEach((item) => {

        item.classList.remove("is-active");

        item.setAttribute(
          "aria-selected",
          "false"
        );

      });


      /* ESCONDE TODOS OS PAINÉIS */

      approachPanels.forEach((panel) => {

        panel.classList.remove("is-active");

        panel.hidden = true;

      });


      /* ATIVA O BOTÃO */

      tab.classList.add("is-active");

      tab.setAttribute(
        "aria-selected",
        "true"
      );


      /* EXIBE O PAINEL CORRESPONDENTE */

      const targetPanel =
        document.querySelector(
          `[data-approach-panel="${target}"]`
        );


      if (targetPanel) {

        targetPanel.hidden = false;

        /*
          Força o navegador a reconhecer novamente
          a animação quando trocamos o conteúdo.
        */

        void targetPanel.offsetWidth;

        targetPanel.classList.add("is-active");

      }

    });

  });

}














/* =========================================================
   PROCESSO TERAPÊUTICO
========================================================= */

const processSteps =
  document.querySelectorAll("[data-process-step]");

const processPanels =
  document.querySelectorAll("[data-process-panel]");

const processProgress =
  document.querySelector("[data-process-progress]");


function activateProcessStep(stepNumber) {

  const currentStep =
    Number(stepNumber);


  /* REMOVE ESTADOS ATIVOS */

  processSteps.forEach((step) => {

    step.classList.remove("is-active");

    step.setAttribute(
      "aria-selected",
      "false"
    );

  });


  processPanels.forEach((panel) => {

    panel.classList.remove("is-active");

    panel.hidden = true;

  });


  /* ATIVA ETAPA */

  const activeStep =
    document.querySelector(
      `[data-process-step="${currentStep}"]`
    );


  const activePanel =
    document.querySelector(
      `[data-process-panel="${currentStep}"]`
    );


  if (activeStep) {

    activeStep.classList.add("is-active");

    activeStep.setAttribute(
      "aria-selected",
      "true"
    );

  }


  if (activePanel) {

    activePanel.hidden = false;

    void activePanel.offsetWidth;

    activePanel.classList.add("is-active");

  }


  /* ATUALIZA LINHA */

  if (processProgress) {

    const progressValues = {
      1: "0%",
      2: "33.33%",
      3: "66.66%",
      4: "100%"
    };

    processProgress.style.width =
      progressValues[currentStep];

  }

}


if (processSteps.length && processPanels.length) {

  processSteps.forEach((step) => {

    /* CLICK */

    step.addEventListener("click", () => {

      activateProcessStep(
        step.dataset.processStep
      );

    });


    /* HOVER */

    step.addEventListener("mouseenter", () => {

      activateProcessStep(
        step.dataset.processStep
      );

    });

  });

}














/* =========================================================
   CONSULTÓRIO
   MICRO PARALLAX DA IMAGEM
========================================================= */

const officeVisual =
  document.querySelector("[data-office-visual]");

const officeImage =
  document.querySelector("[data-office-image]");


if (officeVisual && officeImage) {

  officeVisual.addEventListener(
    "mousemove",
    (event) => {

      const bounds =
        officeVisual.getBoundingClientRect();


      const mouseX =
        event.clientX - bounds.left;

      const mouseY =
        event.clientY - bounds.top;


      const centerX =
        bounds.width / 2;

      const centerY =
        bounds.height / 2;


      const moveX =
        ((mouseX - centerX) / centerX) * 5;

      const moveY =
        ((mouseY - centerY) / centerY) * 4;


      officeImage.style.transform =
        `
          translate3d(
            ${moveX}px,
            ${moveY}px,
            0
          )
          scale(1.04)
        `;

    }
  );


  officeVisual.addEventListener(
    "mouseleave",
    () => {

      officeImage.style.transform =
        `
          translate3d(0, 0, 0)
          scale(1.025)
        `;

    }
  );

}













/* =========================================================
   FAQ
========================================================= */

const faqItems =
  document.querySelectorAll(".faq__item");


if (faqItems.length) {

  faqItems.forEach((item) => {

    const button =
      item.querySelector(".faq__question");


    if (!button) return;


    button.addEventListener("click", () => {

      const isOpen =
        item.classList.contains("is-active");


      /* FECHA TODOS */

      faqItems.forEach((faqItem) => {

        faqItem.classList.remove("is-active");

        const faqButton =
          faqItem.querySelector(".faq__question");


        if (faqButton) {

          faqButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      });


      /* ABRE O SELECIONADO */

      if (!isOpen) {

        item.classList.add("is-active");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });

}














/* =========================================================
   CONTATO
   MICRO PARALLAX DA FOTO
========================================================= */

const contactVisual =
  document.querySelector("[data-contact-visual]");

const contactImage =
  document.querySelector("[data-contact-image]");


if (contactVisual && contactImage) {

  contactVisual.addEventListener(
    "mousemove",
    (event) => {

      const bounds =
        contactVisual.getBoundingClientRect();


      const mouseX =
        event.clientX - bounds.left;

      const mouseY =
        event.clientY - bounds.top;


      const centerX =
        bounds.width / 2;

      const centerY =
        bounds.height / 2;


      const moveX =
        ((mouseX - centerX) / centerX) * 4;

      const moveY =
        ((mouseY - centerY) / centerY) * 3;


      contactImage.style.transform =
        `
          translate3d(
            ${moveX}px,
            ${moveY}px,
            0
          )
          scale(1.035)
        `;

    }
  );


  contactVisual.addEventListener(
    "mouseleave",
    () => {

      contactImage.style.transform =
        `
          translate3d(0, 0, 0)
          scale(1.015)
        `;

    }
  );

}














/* =========================================================
   WHATSAPP FLUTUANTE
========================================================= */

function initFloatingWhatsApp() {

  const whatsappBubble =
    document.querySelector("#whatsapp-bubble");

  const whatsappBubbleClose =
    document.querySelector("#whatsapp-bubble-close");


  /* SE O BALÃO NÃO EXISTIR, ENCERRA */

  if (!whatsappBubble) {
    return;
  }


  /* =======================================================
     ABRE APÓS 7 SEGUNDOS
  ======================================================== */

  const whatsappBubbleTimer =
    window.setTimeout(() => {

      whatsappBubble.classList.add(
        "is-visible"
      );

      whatsappBubble.setAttribute(
        "aria-hidden",
        "false"
      );

    }, 7000);


  /* =======================================================
     FECHAR BALÃO
  ======================================================== */

  if (whatsappBubbleClose) {

    whatsappBubbleClose.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        event.stopPropagation();


        window.clearTimeout(
          whatsappBubbleTimer
        );


        whatsappBubble.classList.remove(
          "is-visible"
        );


        whatsappBubble.setAttribute(
          "aria-hidden",
          "true"
        );

      }
    );

  }

}


/* =========================================================
   GARANTE QUE O HTML JÁ FOI CARREGADO
========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initFloatingWhatsApp
  );

} else {

  initFloatingWhatsApp();

}














/* =========================================================
   MENU RESPONSIVO
========================================================= */

function closeMobileMenu() {
  const menuButton = document.querySelector(".header__menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!menuButton || !mobileMenu) return;

  menuButton.classList.remove("is-active");
  mobileMenu.classList.remove("is-open");

  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");
}


/* =========================================================
   CLIQUES
========================================================= */

document.addEventListener("click", (event) => {

  const menuButton = event.target.closest(".header__menu");
  const mobileMenu = document.querySelector(".mobile-menu");


  /* ABRIR / FECHAR MENU */

  if (menuButton && mobileMenu) {

    const willOpen =
      !mobileMenu.classList.contains("is-open");

    menuButton.classList.toggle(
      "is-active",
      willOpen
    );

    mobileMenu.classList.toggle(
      "is-open",
      willOpen
    );

    menuButton.setAttribute(
      "aria-expanded",
      String(willOpen)
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      String(!willOpen)
    );

    document.body.classList.toggle(
      "no-scroll",
      willOpen
    );

    return;
  }


  /* FECHAR AO CLICAR EM UM LINK */

  const menuLink =
    event.target.closest(
      ".mobile-menu a"
    );

  if (menuLink) {
    closeMobileMenu();
  }

});


/* =========================================================
   FECHAR COM ESC
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  }
);


/* =========================================================
   FECHAR AO VOLTAR PARA DESKTOP
========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }

  }
);