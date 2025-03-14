(function ($) {
  "use strict";

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

  // data-background
  $(document).on("ready", function () {
    $("[data-background]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-background") + ")"
      );
    });
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

  $("#send-whatsapp-form").click(function () {
    const form = this.closest("form");
    if (form.reportValidity()) {
      // Get form values
      const nomComplet = $("#nom-complet").val();
      const dateDeNaissance = $("#date-de-naissance").val();
      const cin = $("#cin").val();
      const specialite = $("#specialite").val() ?? "";
      const objectif = $("#objectif").val();
      const niveau = $('input[name="niveau"]:checked').val();
      const message = $("#message").val();

      // Construct the WhatsApp message
      const whatsappMessage = `*_Formulaire d'inscription._*\n\n*Nom complet:* ${nomComplet}\n*Date de naissance:* ${dateDeNaissance}\n*CIN:* ${cin}\n*Spécialité:* ${specialite}\n*Objectif:* ${objectif}\n*Niveau de langue souhaité:* ${niveau}\n\n${message}`;

      // Encode the message
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // WhatsApp number
      const whatsappNumber = "+212671721510";

      // Construct the WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp URL
      window.open(whatsappURL, "_blank");
    }
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

  // WhatsApp Buttons
  $("#whatsapp-button").click(function () {
    if (!$("#nomComplet").get(0).reportValidity()) {
      return;
    }
    const nomComplet = $("#nomComplet").val();
    const numPhone = $("#numPhone").val();
    const message = $("#quick-message").val();
    const messageWhatsApp = `Bonjour, je suis ${nomComplet}.\nVoici mon numéro de téléphone pour m'appeler concernant ma demande/inscription: ${numPhone} \n\n${message}`;
    const encodedMessage = encodeURIComponent(messageWhatsApp);
    const whatsappURL = "https://wa.me/212671721510";
    window.open(`${whatsappURL}?text=${encodedMessage}`, "_blank");
  });

  $("#send-footer-whatsapp-message").click(function () {
    if (!$("#whatsapp-message").get(0).reportValidity()) {
      return;
    }
    const messageWhatsApp = $("#whatsapp-message").val();
    const encodedMessage = encodeURIComponent(messageWhatsApp);
    const whatsappURL = "https://wa.me/212671721510";
    window.open(`${whatsappURL}?text=${encodedMessage}`, "_blank");
  });

  $("#other-questions-link").click(function (e) {
    e.preventDefault();
    $("#send-footer-whatsapp-message")
      .get(0)
      .scrollIntoView({ behavior: "smooth", block: "start" });
    $("#whatsapp-message").focus();
  });
})(jQuery);
