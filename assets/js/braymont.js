document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       BRAYMONT MOBILE SPLASH
       Timing matched to reference website

       0.00s  White screen
       0.04s  Blue swipe starts
       0.74s  Blue swipe finishes
       0.90s  Logo fade in starts
       1.32s  Logo fully visible
       3.32s  Logo fade out starts
       3.51s  Logo gone
       3.51s  Blue swipe out starts
       4.17s  Blue swipe out finishes
       4.25s  Splash removed
    ================================================== */

    const splash =
        document.getElementById("braymont-splash");

    const isMobile =
        window.innerWidth <= 820;


    if (splash) {

        if (!isMobile) {

            splash.remove();

        } else {

            /* Reset splash state */

            splash.classList.remove(
                "show-logo",
                "hide-logo",
                "splash-exit"
            );


            /* Make sure splash is visible */

            splash.style.display = "flex";


            /* Force browser to restart animations */

            splash.style.animation = "none";

            void splash.offsetWidth;

            splash.style.animation = "";


            /* ==================================================
               LOGO FADE IN
               Starts at 0.90s
            ================================================== */

            window.setTimeout(
                function () {

                    if (
                        !document.body.contains(
                            splash
                        )
                    ) {

                        return;

                    }


                    splash.classList.add(
                        "show-logo"
                    );

                },
                900
            );


            /* ==================================================
               LOGO FADE OUT
               Starts at 3.32s
            ================================================== */

            window.setTimeout(
                function () {

                    if (
                        !document.body.contains(
                            splash
                        )
                    ) {

                        return;

                    }


                    splash.classList.add(
                        "hide-logo"
                    );

                },
                3320
            );


            /* ==================================================
               BLUE SWIPE OUT
               Starts after logo has faded away
            ================================================== */

            window.setTimeout(
                function () {

                    if (
                        !document.body.contains(
                            splash
                        )
                    ) {

                        return;

                    }


                    splash.classList.add(
                        "splash-exit"
                    );

                },
                3510
            );


            /* ==================================================
               REMOVE SPLASH
            ================================================== */

            window.setTimeout(
                function () {

                    if (
                        !document.body.contains(
                            splash
                        )
                    ) {

                        return;

                    }


                    splash.remove();

                },
                4250
            );

        }

    }



    /* ==================================================
       MOBILE NAVIGATION
    ================================================== */

    const menuToggle =
        document.querySelector(
            ".mobile-menu-toggle"
        );


    const nav =
        document.getElementById(
            "main-nav"
        );


    function closeMobileMenu() {

        document.body.classList.remove(
            "menu-open"
        );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    if (
        menuToggle &&
        nav
    ) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    document.body
                        .classList
                        .toggle(
                            "menu-open"
                        );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }



    /* ==================================================
       NAVIGATION LINKS
    ================================================== */

    const navLinks =
        Array.from(
            document.querySelectorAll(
                ".nav-link[href^='#']"
            )
        );


    const sections =
        navLinks
            .map(
                function (link) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return null;

                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        return null;

                    }


                    return {
                        link: link,
                        target: target
                    };

                }
            )
            .filter(Boolean);



    /* ==================================================
       ACTIVE NAVIGATION
    ================================================== */

    function setActiveLink(
        currentSection
    ) {

        sections.forEach(
            function (section) {

                section.link
                    .classList
                    .toggle(
                        "active",
                        section ===
                            currentSection
                    );

            }
        );

    }



    /* ==================================================
       UPDATE ACTIVE LINK ON SCROLL
    ================================================== */

    function updateActiveNavigation() {

        if (
            sections.length === 0
        ) {

            return;

        }


        const referencePoint =
            window.scrollY + 240;


        let currentSection =
            sections[0];


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.target.offsetTop;


                if (
                    sectionTop <=
                    referencePoint
                ) {

                    currentSection =
                        section;

                }

            }
        );


        setActiveLink(
            currentSection
        );

    }


    updateActiveNavigation();


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );



    /* ==================================================
       NAVIGATION CLICK
    ================================================== */

    sections.forEach(
        function (section) {

            section.link
                .addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        setActiveLink(
                            section
                        );


                        closeMobileMenu();


                        section.target
                            .scrollIntoView({
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            });

                    }
                );

        }
    );



    /* ==================================================
       OTHER INTERNAL LINKS
    ================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]:not(.nav-link)'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                href
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        closeMobileMenu();


                        target.scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "start"
                        });

                    }
                );

            }
        );



    /* ==================================================
       ESC CLOSES MOBILE MENU
    ================================================== */

    window.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                    "Escape" &&
                document.body
                    .classList
                    .contains(
                        "menu-open"
                    )
            ) {

                closeMobileMenu();

            }

        }
    );



    /* ==================================================
       RESIZE
    ================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >
                820
            ) {

                closeMobileMenu();

            }

        }
    );

});