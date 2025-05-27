$(document).ready(function() {
  'use strict';

  var html = $('html'),
    menuOpenIcon = $(".nav__icon-menu"),
    menuCloseIcon = $(".nav__icon-close"),
    menuList = $(".main-nav"),
    searchOpenIcon = $(".nav__icon-search"),
    searchCloseIcon = $(".search__close"),
    searchBox = $(".search"),
    toggleTheme = $(".toggle-theme"),
    searchInput = $(".search__text");

  /* ==================================
  // Set Dark Mode as Default
  ================================== */
  if (localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme")) {
    html.addClass('dark-mode');
    document.documentElement.setAttribute("dark", "");
    localStorage.setItem("theme", "dark"); // Ensure it's saved as "dark"
  } else {
    html.removeClass('dark-mode');
    document.documentElement.removeAttribute("dark");
  }

  /* ==================================
  // Menu + Search + Theme Switcher
  ================================== */
  menuOpenIcon.click(function() {
    menuOpen();
  })

  menuCloseIcon.click(function () {
    menuClose();
  })

  searchOpenIcon.click(function () {
    searchOpen();
  });

  searchCloseIcon.click(function () {
    searchClose();
  });

  toggleTheme.click(function () {
    darkMode()
  });

  function menuOpen() {
    menuList.addClass("is-open");
  }

  function menuClose() {
    menuList.removeClass("is-open");
  }

  function searchOpen() {
    searchBox.addClass("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 150);
  }

  function searchClose() {
    searchBox.removeClass("is-visible");
  }

  $('.search, .search__box').on('click keyup', function(event) {
    if (event.target == this || event.keyCode == 27) {
      $('.search').removeClass('is-visible');
    }
  });

  function darkMode() {
    if (html.hasClass('dark-mode')) {
      html.removeClass('dark-mode');
      localStorage.setItem("theme", "light");
      document.documentElement.removeAttribute("dark");
    } else {
      html.addClass('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  }


  /* ========================
  // Simple Jekyll Search
  ======================== */
  SimpleJekyllSearch({
    searchInput: document.getElementById("js-search-input"),
    resultsContainer: document.getElementById("js-results-container"),
    json: "/search.json",
    searchResultTemplate: '{article}',
    noResultsText: '<h3 class="no-results">No results found</h3>'
  });


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post__content, .page__content").fitVids({
    customSelector: ['iframe[src*="ted.com"]', 'iframe[src*="facebook.com"]']
  });


  /* =======================
  // Zoom Image
  ======================= */
  $(".page img, .post img").attr("data-action", "zoom");
  $(".page a img, .post a img").removeAttr("data-action", "zoom");
  
  // Custom zoom that keeps original image in grid
  $('[data-action="zoom"]').on('click', function(e) {
    e.preventDefault();
    var $originalImg = $(this);
    
    // Don't zoom if already zoomed
    if ($('.zoom-overlay-custom').length > 0) return;
    
    // Create overlay
    var $overlay = $('<div class="zoom-overlay-custom"></div>');
    
    // Create zoomed image (duplicate)
    var $zoomedImg = $originalImg.clone();
    $zoomedImg.removeClass().addClass('zoom-img-custom');
    
    // Add to overlay
    $overlay.append($zoomedImg);
    $('body').append($overlay);
    
    // Trigger animation
    setTimeout(function() {
      $overlay.addClass('active');
    }, 10);
    
    // Close on click
    $overlay.on('click', function() {
      $overlay.removeClass('active');
      setTimeout(function() {
        $overlay.remove();
      }, 200);
    });
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function() {
    $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > $(window).height()) {
      $(".top").addClass("is-active");
    } else {
      $(".top").removeClass("is-active");
    }
  });

});