document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       MOBILE SPLASH — HOMEPAGE ONLY
    ================================================== */

    const splash = document.getElementById("braymont-splash");
    const isMobile = window.innerWidth <= 820;

    if (splash) {
        if (!isMobile) {
            splash.remove();
        } else {
            splash.classList.remove("show-logo", "hide-logo", "splash-exit");
            splash.style.display = "flex";
            splash.style.animation = "none";
            void splash.offsetWidth;
            splash.style.animation = "";

            window.setTimeout(function () {
                if (document.body.contains(splash)) splash.classList.add("show-logo");
            }, 900);

            window.setTimeout(function () {
                if (document.body.contains(splash)) splash.classList.add("hide-logo");
            }, 3320);

            window.setTimeout(function () {
                if (document.body.contains(splash)) splash.classList.add("splash-exit");
            }, 3510);

            window.setTimeout(function () {
                if (document.body.contains(splash)) splash.remove();
            }, 4250);
        }
    }


    /* ==================================================
       MOBILE NAVIGATION
    ================================================== */

    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.getElementById("main-nav");

    function closeMobileMenu() {
        document.body.classList.remove("menu-open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = document.body.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }


    /* ==================================================
       SAME-PAGE HASH LINKS ONLY
       Direct service/page links are never intercepted.
    ================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            closeMobileMenu();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* ==================================================
       ACTIVE HASH NAVIGATION ON HOMEPAGE
    ================================================== */

    const hashNavLinks = Array.from(
        document.querySelectorAll('.nav-link[href^="#"]')
    );

    const sections = hashNavLinks
        .map(function (link) {
            const href = link.getAttribute("href");
            const target = href ? document.querySelector(href) : null;
            return target ? { link: link, target: target } : null;
        })
        .filter(Boolean);

    function updateActiveNavigation() {
        if (!sections.length) return;

        const referencePoint = window.scrollY + 240;
        let currentSection = sections[0];

        sections.forEach(function (section) {
            if (section.target.offsetTop <= referencePoint) currentSection = section;
        });

        sections.forEach(function (section) {
            section.link.classList.toggle("active", section === currentSection);
        });
    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* ==================================================
       ESC / RESIZE
    ================================================== */

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 820) closeMobileMenu();
    });

});
