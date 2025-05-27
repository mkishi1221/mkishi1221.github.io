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
  
  // Wait for DOM to be fully ready before setting up zoom
  function initializeZoom() {
    try {
      console.log('Initializing zoom functionality...');
      $(".page img, .post img").attr("data-action", "zoom");
      $(".page a img, .post a img").removeAttr("data-action", "zoom");
      console.log('Found', $('[data-action="zoom"]').length, 'zoomable images');
      
      // Robust zoom that handles gallery constraints properly
      $(document).off('click', '[data-action="zoom"]'); // Remove any existing handlers
      $(document).on('click', '[data-action="zoom"]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $originalImg = $(this);
        
        // Don't zoom if already zoomed or if image is not loaded
        if ($('.zoom-overlay-custom').length > 0 || !$originalImg[0].complete) {
          return false;
        }
        
        // Get the original image source
        var imgSrc = $originalImg.attr('src');
        if (!imgSrc) {
          console.warn('No image source found for zoom');
          return false;
        }
        
        // Create overlay with error handling
        var $overlay = $('<div class="zoom-overlay-custom"></div>');
        
        // Create a fresh image element (not cloned) to avoid inherited styles
        var $zoomedImg = $('<img class="zoom-img-custom">');
        $zoomedImg.attr('src', imgSrc);
        $zoomedImg.attr('alt', $originalImg.attr('alt') || '');
        
        // Add error handling for image loading
        $zoomedImg.on('error', function() {
          console.warn('Failed to load zoomed image:', imgSrc);
          $overlay.remove();
        });
        
        // Add to overlay
        $overlay.append($zoomedImg);
        $('body').append($overlay);
        
        // Prevent body scroll
        $('body').addClass('zoom-active');
        
        // Trigger animation after image loads with timeout fallback
        var animationTriggered = false;
        
        function triggerAnimation() {
          if (!animationTriggered) {
            animationTriggered = true;
            setTimeout(function() {
              if ($overlay.length && $overlay.parent().length) {
                $overlay.addClass('active');
              }
            }, 10);
          }
        }
        
        $zoomedImg.on('load', triggerAnimation);
        
        // Fallback for cached images or slow loading
        setTimeout(function() {
          if ($zoomedImg[0].complete || $zoomedImg[0].naturalWidth > 0) {
            triggerAnimation();
          }
        }, 100);
        
        // Close handlers with namespace to avoid conflicts
        $overlay.on('click.zoom', function(e) {
          if (e.target === this || $(e.target).hasClass('zoom-img-custom')) {
            closeZoom();
          }
        });
        
        function closeZoom() {
          $overlay.removeClass('active');
          $('body').removeClass('zoom-active');
          setTimeout(function() {
            $overlay.remove();
            $(document).off('keyup.zoom');
          }, 250);
        }
        
        // Close on escape key with namespace
        $(document).off('keyup.zoom').on('keyup.zoom', function(e) {
          if (e.keyCode === 27) {
            closeZoom();
          }
        });
        
        return false;
      });
      
    } catch (error) {
      console.warn('Error initializing zoom functionality:', error);
    }
  }
  
  // Initialize zoom when DOM is ready
  if (typeof jQuery !== 'undefined' && jQuery) {
    if (document.readyState === 'loading') {
      $(document).ready(initializeZoom);
    } else {
      initializeZoom();
    }
  } else {
    console.warn('jQuery not available, zoom functionality disabled');
  }


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