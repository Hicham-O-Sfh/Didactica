(function ($) {
  "use strict";

  // Coordonnées de contact — source unique pour tout le JavaScript.
  // Le numéro est au format international sans « + » ni séparateur : c'est la
  // forme attendue par wa.me. Il était jusqu'ici écrit trois fois, dont une
  // avec le « + » et deux sans.
  // Le HTML garde ses propres copies en dur ; les rassembler ici aussi
  // suppose le fichier de configuration prévu par ARCH-01.
  const CONTACT = {
    whatsapp: "212666201740",
  };

  // Ouvre WhatsApp avec un message pré-rempli, dans un nouvel onglet.
  // Seul endroit du fichier qui construit une URL wa.me : FORM-01, qui prévoit
  // de remplacer window.open() par un vrai lien <a>, n'aura que cette fonction
  // à reprendre.
  function ouvrirWhatsApp(message) {
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  // multi level dropdown menu
  $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
    if (!$(this).next().hasClass("show")) {
      $(this)
        .parents(".dropdown-menu")
        .first()
        .find(".show")
        .removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass("show");

    $(this)
      .parents("li.nav-item.dropdown.show")
      .on("hidden.bs.dropdown", function (e) {
        $(".dropdown-submenu .show").removeClass("show");
      });
    return false;
  });

  // navbar Search
  $(".trigger-sign-in-form-btn").on("click", function () {
    $("#message").val("");
    $("body").addClass("search-active");
  });

  $(".choose-pack-btn").click(function () {
    const pack = $(this).data("pack");
    $("#message").val("Pack: " + pack);
    $("body").addClass("search-active");
  });

  $(".close-search").on("click", function () {
    $("body").removeClass("search-active");
  });

  // formulaire d'inscription complet
  $("#send-whatsapp-form").click(function () {
    if (!this.closest("form").reportValidity()) {
      return;
    }
    const nomComplet = $("#nom-complet").val();
    const dateDeNaissance = $("#date-de-naissance").val();
    const cin = $("#cin").val();
    const specialite = $("#specialite").val() ?? "";
    const objectif = $("#objectif").val();
    const niveau = $('input[name="niveau"]:checked').val();
    const message = $("#message").val();

    ouvrirWhatsApp(
      `*_Formulaire d'inscription._*\n\n*Nom complet:* ${nomComplet}\n*Date de naissance:* ${dateDeNaissance}\n*CIN:* ${cin}\n*Spécialité:* ${specialite}\n*Objectif:* ${objectif}\n*Niveau de langue souhaité:* ${niveau}\n\n${message}`,
    );
  });

  // wow init
  new WOW().init();

  // hero slider
  $(".hero-slider").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    margin: 0,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    items: 1,
    navText: [
      "<i class='far fa-long-arrow-left'></i>",
      "<i class='far fa-long-arrow-right'></i>",
    ],

    onInitialized: function (event) {
      var $firstAnimatingElements = $(".owl-item")
        .eq(event.item.index)
        .find("[data-animation]");
      doAnimations($firstAnimatingElements);
    },

    onChanged: function (event) {
      var $firstAnimatingElements = $(".owl-item")
        .eq(event.item.index)
        .find("[data-animation]");
      doAnimations($firstAnimatingElements);
    },
  });

  //hero slider do animations
  function doAnimations(elements) {
    var animationEndEvents =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data("delay");
      var $animationDuration = $this.data("duration");
      var $animationType = "animated " + $this.data("animation");
      $this.css({
        "animation-delay": $animationDelay,
        "-webkit-animation-delay": $animationDelay,
        "animation-duration": $animationDuration,
        "-webkit-animation-duration": $animationDuration,
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    });
  }

  // testimonial-slider
  $(".testimonial-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  // event-slider
  $(".event-slider").owlCarousel({
    loop: true,
    margin: 25,
    nav: true,
    dots: true,
    autoplay: false,
    navText: [
      "<i class='far fa-angle-left'></i>",
      "<i class='far fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // department-slider
  $(".department-slider").owlCarousel({
    loop: true,
    margin: 25,
    nav: true,
    dots: true,
    autoplay: false,
    navText: [
      "<i class='far fa-angle-left'></i>",
      "<i class='far fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  // partner-slider
  $(".partner-slider").owlCarousel({
    loop: true,
    margin: 70,
    nav: false,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  // preloader
  $(window).on("load", function () {
    $(".preloader").fadeOut("slow");
  });

  // scroll to top
  $(window).on("scroll", function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      $("#scroll-top").addClass("active");
    } else {
      $("#scroll-top").removeClass("active");
    }
  });

  $("#scroll-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1500);
    return false;
  });

  // navbar fixed top
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("fixed-top");
    } else {
      $(".navbar").removeClass("fixed-top");
    }
  });

  // copywrite date
  let date = new Date().getFullYear();
  $("#date").html(date);

  // demande de rappel
  $("#whatsapp-button").click(function () {
    if (!$("#nomComplet").get(0).reportValidity()) {
      return;
    }
    const nomComplet = $("#nomComplet").val();
    const numPhone = $("#numPhone").val();
    const message = $("#quick-message").val();

    ouvrirWhatsApp(
      `Bonjour, je suis ${nomComplet}.\nVoici mon numéro de téléphone pour m'appeler concernant ma demande/inscription: ${numPhone} \n\n${message}`,
    );
  });

  // message libre depuis le pied de page
  $("#send-footer-whatsapp-message").click(function () {
    if (!$("#whatsapp-message").get(0).reportValidity()) {
      return;
    }
    ouvrirWhatsApp($("#whatsapp-message").val());
  });

  $("#other-questions-link").click(function (e) {
    e.preventDefault();
    $("#send-footer-whatsapp-message")
      .get(0)
      .scrollIntoView({ behavior: "smooth", block: "start" });
    $("#whatsapp-message").focus();
  });
})(jQuery);
