tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1754cf",
                "background-light": "#f6f6f8",
                "background-dark": "#111621",
                "text-main": "#0e121b",
                "text-muted": "#4e6797",
                "teal-ral": "#00747d",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "body": ["Manrope", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
        },
    },
}

document.addEventListener('DOMContentLoaded', () => {
    // Active Link Highlighting
    const getPageName = (path) => {
        if (!path) return '';
        const name = path.split('/').pop();
        return name.replace('.html', '') || 'index';
    };

    const currentPath = window.location.pathname;
    const currentPage = getPageName(currentPath);
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = getPageName(linkHref);

        const isActive = linkPage === currentPage;

        if (isActive) {
            link.classList.add('text-white');
            link.classList.add('underline');
            link.classList.add('decoration-2');
            link.classList.add('underline-offset-4');
            link.classList.remove('hover:text-primary');
            link.classList.remove('text-white/80');
        } else {
            link.classList.remove('text-primary');
            link.classList.remove('underline');
            link.classList.remove('decoration-2');
            link.classList.add('text-white/80');
            link.classList.add('hover:text-white');
            link.classList.remove('hover:text-primary');
        }
    });

    // Scroll Effect
    const nav = document.querySelector('nav');
    // const logoContainer = document.querySelector('nav .size-8'); 
    const navContentContainer = nav.querySelector('div > div'); // The h-20 container

    if (navContentContainer) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                // Scrolled down state - More drastic
                navContentContainer.classList.remove('h-20');
                navContentContainer.classList.add('h-14');
                nav.classList.add('shadow-lg');
                nav.classList.add('bg-teal-ral/95'); // Ensure background opacity sticks
                nav.classList.remove('bg-teal-ral'); // Remove solid if we want trans, but here keep consistent
            } else {
                // Top state
                navContentContainer.classList.remove('h-14');
                navContentContainer.classList.add('h-20');
                nav.classList.remove('shadow-lg');
            }
        });
    }

    // Gallery Filtering and Dynamic Content
    const filterButtons = document.querySelectorAll('.filter-link');
    const categoryImages = document.querySelectorAll('.category-image');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // Dynamic Content Element References
    const introTodo = document.getElementById('intro-todo');
    const footerTodo = document.getElementById('footer-todo');
    const galleryHeroImage = document.getElementById('gallery-hero-image');
    const dynamicContentContainer = document.getElementById('dynamic-category-content');

    // Function to activate a filter
    const activateFilter = (categoryId) => {
        // Update filter button states
        filterButtons.forEach(btn => {
            btn.classList.remove('font-bold', 'text-[#0e121b]', 'dark:text-white', 'border-teal-ral');
            btn.classList.add('font-medium', 'text-[#4e6797]', 'dark:text-gray-400', 'border-transparent');
        });

        // Find and activate the matching filter button
        const targetFilterBtn = document.querySelector(`[data-filter="${categoryId}"]`);
        if (targetFilterBtn) {
            targetFilterBtn.classList.remove('font-medium', 'text-[#4e6797]', 'dark:text-gray-400', 'border-transparent');
            targetFilterBtn.classList.add('font-bold', 'text-[#0e121b]', 'dark:text-white', 'border-teal-ral');
        }

        // Handle Dynamic Text and Image Visibility
        if (categoryId === 'todo') {
            if (introTodo) introTodo.classList.remove('hidden');
            if (footerTodo) footerTodo.classList.remove('hidden');
            if (galleryHeroImage) galleryHeroImage.classList.remove('hidden');
            if (dynamicContentContainer) dynamicContentContainer.classList.add('hidden');
            if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
            // Show category images
            categoryImages.forEach(img => img.classList.remove('hidden'));
        } else {
            if (introTodo) introTodo.classList.add('hidden');
            if (footerTodo) footerTodo.classList.add('hidden');
            if (galleryHeroImage) galleryHeroImage.classList.add('hidden');
            if (dynamicContentContainer) dynamicContentContainer.classList.remove('hidden');
            if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
            if (loadMoreBtn) loadMoreBtn.classList.add('flex');
            // Hide category images
            categoryImages.forEach(img => img.classList.add('hidden'));

            // Hide all category content first
            const allContents = dynamicContentContainer.querySelectorAll('div[id^="content-"]');
            allContents.forEach(div => div.classList.add('hidden'));

            // Show specific content
            const targetContent = document.getElementById(`content-${categoryId}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        }
    };

    // Filter button click handlers
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-filter');
                activateFilter(categoryId);
            });
        });
    }

    // Category image click handlers
    if (categoryImages.length > 0) {
        categoryImages.forEach(image => {
            image.addEventListener('click', () => {
                const categoryId = image.getAttribute('data-filter-trigger');
                activateFilter(categoryId);
            });
        });
    }

    // Map Modal Logic
    const openMapBtn = document.getElementById('openMapBtn');
    const openMapBtn2 = document.getElementById('openMapBtn2');
    const closeMapBtn = document.getElementById('closeMapBtn');
    const mapModal = document.getElementById('mapModal');

    if (mapModal && closeMapBtn) {
        const closeModal = () => {
            mapModal.classList.add('hidden');
            mapModal.classList.remove('flex');
            document.body.style.overflow = ''; // Restore scrolling
        };

        // Open modal from first button
        if (openMapBtn) {
            openMapBtn.addEventListener('click', () => {
                mapModal.classList.remove('hidden');
                mapModal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }

        // Open modal from second button (contact section)
        if (openMapBtn2) {
            openMapBtn2.addEventListener('click', () => {
                mapModal.classList.remove('hidden');
                mapModal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }

        closeMapBtn.addEventListener('click', closeModal);

        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mapModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Scroll to "Nuestros trabajos" section
    const scrollToWorksBtn = document.getElementById('scrollToWorksBtn');
    const worksSection = document.getElementById('nuestros-trabajos');
    if (scrollToWorksBtn && worksSection) {
        scrollToWorksBtn.addEventListener('click', () => {
            worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenuBtn && closeMenuBtn && mobileMenuOverlay) {
        const toggleMenu = (show) => {
            if (show) {
                mobileMenuOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenuOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        };

        mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
        closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) toggleMenu(false);
        });
    }

    // Quote Modal Logic (Product Detail)
    const quoteModal = document.getElementById('quoteModal');
    const requestQuoteBtn = document.getElementById('requestQuoteBtn');
    const closeQuoteModal = document.getElementById('closeQuoteModal');
    const quoteForm = document.getElementById('quoteForm');
    const successToast = document.getElementById('successToast');

    if (quoteModal && requestQuoteBtn && closeQuoteModal && quoteForm) {

        const openModal = () => {
            quoteModal.classList.remove('hidden');
            quoteModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            quoteModal.classList.add('hidden');
            quoteModal.classList.remove('flex');
            document.body.style.overflow = '';
        };

        requestQuoteBtn.addEventListener('click', openModal);
        closeQuoteModal.addEventListener('click', closeModal);

        // Click outside to close
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                closeModal();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !quoteModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Handle Form Submit
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('quoteName').value;
            const phone = document.getElementById('quotePhone').value;
            const message = document.getElementById('quoteMessage').value;

            // Construct Mailto Link
            const subject = "Solicitud de Presupuesto - Modelo Aragón";
            const body = `Nombre: ${name}\nTeléfono: ${phone}\nMensaje: ${message}`;
            const mailtoLink = `mailto:sofasjaviergarcia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open Mail Client
            window.location.href = mailtoLink;

            // Close Modal & Show Toast
            closeModal();
            quoteForm.reset(); // Optional: reset form

            if (successToast) {
                successToast.classList.remove('hidden');
                successToast.classList.add('flex');

                // Hide Toast after 3 seconds
                setTimeout(() => {
                    successToast.classList.add('hidden');
                    successToast.classList.remove('flex');
                }, 3000);
            }
        });
    }
});
