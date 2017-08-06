/*global window */
(function () {
    "use strict";

    function scrollToElement(element) {
        window.scrollTo(0, element.offsetTop - 30);
    }

    $(document).on("click", "a[href^='#L']", function (event) {
        event.preventDefault();
        scrollToElement(event.target);
    });

    $(document).observe("dom:loaded", function () {
        var hash = window.location.hash.substring(1),
            targetLine;
        if (hash.length !== 0) {
            targetLine = document.getElementById(hash);
            if (targetLine) {
                window.setTimeout(function () {
                    scrollToElement(targetLine);
                }, 200);
            }
        }
    });
}());
