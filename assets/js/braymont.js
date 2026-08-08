document.addEventListener("DOMContentLoaded", () => {

	/* ==================================================
	   MOBILE SPLASH ONLY
	   Desktop: no splash
	   Mobile <= 820px:
	   0-1s swipe in
	   1-2s hold
	   2-2.7s logo fade
	   2.75-3.7s swipe out
	================================================== */

	const splash =
		document.getElementById("braymont-splash");

	const mobileMedia =
		window.matchMedia("(max-width: 820px)");

	const runMobileSplash = () => {

		if (!splash) {
			return;
		}

		/* Desktop = remove splash immediately */

		if (!mobileMedia.matches) {

			splash.remove();

			return;
		}


		/* Show splash logo */

		window.setTimeout(() => {

			if (
				!document.body.contains(splash)
			) {
				return;
			}

			splash.classList.add(
				"show-logo"
			);

		}, 2000);


		/* Swipe splash out */

		window.setTimeout(() => {

			if (
				!document.body.contains(splash)
			) {
				return;
			}

			splash.classList.add(
				"splash-exit"
			);

		}, 2750);


		/* Remove splash */

		window.setTimeout(() => {

			if (
				!document.body.contains(splash)
			) {
				return;
			}

			splash.remove();

		}, 3800);

	};

	runMobileSplash();


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


	const closeMobileMenu = () => {

		document.body
			.classList
			.remove(
				"menu-open"
			);

		if (menuToggle) {

			menuToggle.setAttribute(
				"aria-expanded",
				"false"
			);

		}

	};


	if (
		menuToggle &&
		nav
	) {

		menuToggle.addEventListener(
			"click",
			() => {

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
			.map((link) => {

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

				return target
					? {
						link,
						target
					}
					: null;

			})
			.filter(Boolean);


	/* ==================================================
	   ACTIVE NAVIGATION
	================================================== */

	const setActiveLink =
		(currentSection) => {

			sections.forEach(
				(section) => {

					section.link
						.classList
						.toggle(
							"active",
							section ===
								currentSection
						);

				}
			);

		};


	/* ==================================================
	   UPDATE ACTIVE LINK WHILE SCROLLING
	================================================== */

	const updateActiveNavigation =
		() => {

			if (
				!sections.length
			) {
				return;
			}

			/*
				This point determines which
				section is considered active.
			*/

			const referencePoint =
				window.scrollY + 240;

			let currentSection =
				sections[0];


			sections.forEach(
				(section) => {

					const sectionTop =
						section.target
							.offsetTop;

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

		};


	updateActiveNavigation();


	window.addEventListener(
		"scroll",
		updateActiveNavigation,
		{
			passive: true
		}
	);


	/* ==================================================
	   NAV CLICK
	   Immediately activate clicked category
	================================================== */

	sections.forEach(
		(section) => {

			section.link.addEventListener(
				"click",
				(event) => {

					event.preventDefault();


					/*
						Make clicked navigation
						category active immediately.
					*/

					setActiveLink(
						section
					);


					/*
						Close mobile menu.
					*/

					closeMobileMenu();


					/*
						Smooth scroll to section.
					*/

					section.target.scrollIntoView({
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
	   Buttons such as Request Quote, View Services, etc.
	================================================== */

	document
		.querySelectorAll(
			'a[href^="#"]:not(.nav-link)'
		)
		.forEach(
			(link) => {

				link.addEventListener(
					"click",
					(event) => {

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
		(event) => {

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
	   RESET MOBILE MENU WHEN RESIZING TO DESKTOP
	================================================== */

	const handleResponsiveChange =
		(event) => {

			/*
				When browser becomes desktop.
			*/

			if (
				!event.matches
			) {

				closeMobileMenu();


				if (
					splash &&
					document.body.contains(
						splash
					)
				) {

					splash.remove();

				}

			}

		};


	if (
		typeof mobileMedia
			.addEventListener ===
		"function"
	) {

		mobileMedia.addEventListener(
			"change",
			handleResponsiveChange
		);

	} else if (
		typeof mobileMedia
			.addListener ===
		"function"
	) {

		mobileMedia.addListener(
			handleResponsiveChange
		);

	}

});