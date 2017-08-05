(function() {
  scrollOnLoad();

  function scrollOnLoad() {
    var href = window.location.href;
    if (href.includes("?line=")) {
      waitForLineAndScroll(); 
    }
  }

  function waitForLineAndScroll() {
    // Loop till the page is fully created, look for 'L1' since
    // there should always be at least one line.
    var firstLine = document.getElementById("L1")
    if (firstLine) {
      var href = window.location.href;
      var hash = href.substring(href.indexOf("?line=") + 6);
      var targetLine = document.getElementById(hash)
      if (targetLine) {
        scrollToElement(targetLine);
      }
    } else {
      window.setTimeout(function() {
        waitForLineAndScroll();
      }, 50);
    }
  }

  $(document).on('click', 'a[href^="?line="]', function(event) {
    event.preventDefault();
    scrollToElement(event.target);
  });

  function scrollToElement(element) {
    window.scrollTo(0, element.offsetTop - 30);
  }
}());
