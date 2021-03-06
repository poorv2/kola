IntersectionObserver && document.addEventListener("DOMContentLoaded", function(d) {
    function h(a) {
        return new Promise(function(c, e) {
            var b = new Image;
            b.src = a;
            b.onload = c;
            b.onerror = e
        })
    }

    function k(a) {
        var c = a.dataset.src,
            e = a.dataset.alt;
        a.src || -1 !== a.src.search(c) || h(c).then(function() {
            var b = a.closest(".lazy-waiting");
            b && b.classList.remove("lazy-waiting");
            a.classList.remove("lazy-placeholder");
            a.src = c;
            a.alt = e;
            document.dispatchEvent(new CustomEvent("lazyload"))
        })
    }
    d = document.querySelectorAll("img");
    d.forEach(function(a) {
        a.closest(".mbr-gallery") && a.closest(".mbr-gallery").classList.add("lazy-waiting");
        a.setAttribute("data-alt", a.getAttribute("alt"));
        a.setAttribute("data-src", a.getAttribute("src"));
        a.classList.add("lazy-placeholder");
        a.removeAttribute("src");
        a.setAttribute("alt", "")
    });
    document.querySelectorAll("div, section").forEach(function(a) {
        -1 !== getComputedStyle(a).backgroundImage.search(/\.jpg|\.jpeg|\.png/) && a.classList.add("lazy-placeholder")
    });
    var f = document.querySelectorAll("iframe");
    f.forEach(function(a) {
        a.src && (a.setAttribute("data-src", a.getAttribute("src")), a.classList.add("lazy-placeholder"), a.removeAttribute("src"))
    });
    var g = new IntersectionObserver(function(a, c) {
        a.forEach(function(a) {
            if (0 < a.intersectionRatio)
                if ("IMG" === a.target.tagName) k(a.target);
                else if ("DIV" === a.target.tagName || "SECTION" === a.target.tagName) a = a.target, -1 !== a.className.search("lazy-placeholder") && a.classList.remove("lazy-placeholder");
            else if ("IFRAME" === a.target.tagName) {
                a = a.target;
                var b = a.dataset.src;
                b && a.src !== b && (a.classList.remove("lazy-placeholder"), a.src = b)
            }
        })
    }, {
        rootMargin: "0px",
        threshold: .1
    });
    d = document.querySelectorAll("img[data-src]");
    f = document.querySelectorAll("iframe[data-src]");
    document.querySelectorAll("div, section").forEach(function(a) {
        -1 !== a.className.search("lazy-placeholder") && g.observe(a)
    });
    f.forEach(function(a) {
        g.observe(a)
    });
    d.forEach(function(a) {
        g.observe(a)
    })
});