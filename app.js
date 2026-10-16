(function () {
  'use strict';

  function applyThemeImmediately() {
    try {
      const savedTheme = localStorage.getItem('sugarswirl_theme') || 'light';
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }

      const savedDir = localStorage.getItem('sugarswirl_direction') || 'ltr';
      document.documentElement.setAttribute('dir', savedDir);
    } catch (e) {}
  }
  applyThemeImmediately();

  function showToast(message, type = 'pink') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colorClass = type === 'pink'
      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/25'
      : type === 'amber'
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-amber-500/25'
        : 'bg-stone-900 text-white border border-stone-800 shadow-xl';

    toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-black transition-all duration-300 transform translate-y-4 opacity-0 font-fun ${colorClass}`;
    toast.innerHTML = `
      <span class="text-base">🍦</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  function toastCart(item) {
    showToast(`Added "${item}" to your dessert tray!`, 'pink');
  }

  function syncThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.className = isDark ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-stone-700';
    }
  }

  function toggleTheme(e) {
    if (e && e.preventDefault) e.preventDefault();
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('sugarswirl_theme', newTheme);
    syncThemeIcons();
    showToast(`Switched to ${newTheme.toUpperCase()} mode!`, 'amber');
    return false;
  }

  function toggleDirection(e) {
    if (e && e.preventDefault) e.preventDefault();
    const cur = document.documentElement.getAttribute('dir') || 'ltr';
    const nxt = cur === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', nxt);
    localStorage.setItem('sugarswirl_direction', nxt);

    const badge = document.getElementById('dir-toggle-text');
    if (badge) badge.textContent = nxt.toUpperCase();
    showToast(`Layout flipped to ${nxt.toUpperCase()}`, 'amber');
    return false;
  }

  function renderNavbar() {
    const mount = document.getElementById('navbar-placeholder');
    if (!mount) return;

    const curPage = window.location.pathname.split('/').pop() || 'index.html';
    const isLinkActive = (page) => {
      return (curPage === page || (curPage === '' && page === 'index.html'))
        ? 'text-rose-500 font-black'
        : 'hover:text-rose-500 transition-colors';
    };

    mount.innerHTML = `
      <header class="max-w-7xl mx-auto">
        <nav class="glass-nav rounded-full px-4 sm:px-5 py-2.5 shadow-xl border border-pink-200/80 dark:border-stone-800 flex items-center justify-between gap-3 sm:gap-4 pointer-events-auto transition-all">
          
          <a href="index.html" class="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
              <i class="fas fa-ice-cream text-base sm:text-lg"></i>
            </div>
            <div class="flex flex-col">
              <span class="font-black text-xl sm:text-2xl tracking-tight text-stone-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300 font-fun cursor-pointer">
                SugarSwirl<span class="text-rose-500 group-hover:text-amber-400 transition-colors duration-300">.</span>
              </span>
            </div>
          </a>

          <div class="hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-xs font-bold text-stone-700 dark:text-stone-300 mx-auto">
            <div class="relative group">
              <button type="button" class="flex items-center gap-1.5 py-1 ${isLinkActive('index.html')} ${isLinkActive('home-2.html')} focus:outline-none">
                <span>Home</span>
                <i class="fas fa-chevron-down text-[10px] group-hover:rotate-180 transition-transform duration-200"></i>
              </button>
              <div class="absolute ltr:left-0 rtl:right-0 mt-2 w-48 bg-white dark:bg-[#1E1715] rounded-2xl shadow-2xl border border-pink-100 dark:border-stone-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <a href="index.html" class="block px-4 py-2 hover:bg-pink-50 dark:hover:bg-stone-800/70 text-xs font-semibold ${isLinkActive('index.html')}">
                  <i class="fas fa-ice-cream mr-2 rtl:ml-2 rtl:mr-0 text-rose-500"></i> Home 1
                </a>
                <a href="home-2.html" class="block px-4 py-2 hover:bg-pink-50 dark:hover:bg-stone-800/70 text-xs font-semibold ${isLinkActive('home-2.html')}">
                  <i class="fas fa-candy-cane mr-2 rtl:ml-2 rtl:mr-0 text-amber-500"></i> Home 2
                </a>
              </div>
            </div>

            <a href="menu.html" class="${isLinkActive('menu.html')}">Menu</a>
            <a href="sundaes.html" class="${isLinkActive('sundaes.html')}">Sundaes</a>
            <a href="pricing.html" class="${isLinkActive('pricing.html')}">Pricing & Tubs</a>
            <a href="offers.html" class="${isLinkActive('offers.html')}">Offers</a>
            <a href="party-orders.html" class="${isLinkActive('party-orders.html')}">Party Orders</a>
            <a href="about.html" class="${isLinkActive('about.html')}">About Us</a>
            <a href="faq.html" class="${isLinkActive('faq.html')}">FAQ</a>
            <a href="contacts.html" class="${isLinkActive('contacts.html')}">Contacts</a>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button type="button" onclick="toggleDirection(event)" class="btn-hover w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center text-[11px] sm:text-xs font-black hover:bg-rose-100 dark:hover:bg-stone-700 transition" aria-label="Toggle Direction">
              <span id="dir-toggle-text">LTR</span>
            </button>

            <button type="button" onclick="toggleTheme(event)" class="btn-hover w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center text-xs hover:bg-amber-100 dark:hover:bg-stone-700 transition" aria-label="Toggle Dark Mode">
              <i class="fas fa-moon" id="theme-icon"></i>
            </button>

            <a href="menu.html" class="btn-hover hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md hover:shadow-rose-500/25 transition-all">
              <i class="fas fa-bag-shopping text-[11px]"></i>
              <span>Order Scoop</span>
            </a>

            <button type="button" id="mobile-toggle" aria-expanded="false" aria-label="Open Navigation Menu" class="btn-hover lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 hover:bg-rose-100 dark:hover:bg-stone-700 transition focus:outline-none">
              <i class="fas fa-bars text-xs sm:text-sm" id="mobile-icon"></i>
            </button>
          </div>

        </nav>

        <div id="mobile-menu" class="hidden mt-2.5 max-w-lg mx-auto bg-white/95 dark:bg-[#1E1715]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-pink-100 dark:border-stone-800 pointer-events-auto space-y-1.5 text-xs font-bold transition-all max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain">
          <div class="text-[10px] uppercase tracking-wider text-rose-500 font-black px-3 pt-1">Home Editions</div>
          <a href="index.html" class="drawer-link py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 flex justify-between items-center ${isLinkActive('index.html')}">
            <span>Home 1</span> <i class="fas fa-ice-cream text-rose-500"></i>
          </a>
          <a href="home-2.html" class="drawer-link py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 flex justify-between items-center ${isLinkActive('home-2.html')}">
            <span>Home 2</span> <i class="fas fa-candy-cane text-amber-500"></i>
          </a>
          
          <hr class="border-pink-100 dark:border-stone-800 my-1">
          <div class="text-[10px] uppercase tracking-wider text-amber-600 font-black px-3 pt-1">Parlour Treats & Pages</div>
          <a href="menu.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('menu.html')}">🍦 Menu </a>
          <a href="sundaes.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('sundaes.html')}">🍨 Sundaes</a>
          <a href="pricing.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('pricing.html')}">🏷️Pricing & Tubs</a>
          <a href="offers.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('offers.html')}">🎁 Offers</a>
          <a href="party-orders.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('party-orders.html')}">🎉 Party Orders</a>
          <a href="about.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('about.html')}">📖 About us</a>
          <a href="faq.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('faq.html')}">❓ FAQs</a>
          <a href="contacts.html" class="drawer-link block py-2 px-3 rounded-xl hover:bg-pink-50 dark:hover:bg-stone-800 ${isLinkActive('contacts.html')}">📍 Contacts</a>
          
          <div class="pt-3">
            <a href="menu.html" class="drawer-link block w-full py-3 text-center rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              Order Scoops Online
            </a>
          </div>
        </div>
      </header>
    `;

    const mobileBtn = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-menu');
    const mobileIcon = document.getElementById('mobile-icon');

    function closeDrawer() {
      if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
        mobileDrawer.classList.add('hidden');
        if (mobileIcon) mobileIcon.className = 'fas fa-bars text-xs sm:text-sm';
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      }
    }

    function openDrawer() {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('hidden');
        if (mobileIcon) mobileIcon.className = 'fas fa-times text-xs sm:text-sm text-rose-500';
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'true');
      }
    }

    if (mobileBtn && mobileDrawer) {
      mobileBtn.onclick = function (e) {
        e.stopPropagation();
        if (mobileDrawer.classList.contains('hidden')) {
          openDrawer();
        } else {
          closeDrawer();
        }
      };

      mobileDrawer.querySelectorAll('.drawer-link').forEach(link => {
        link.onclick = function () {
          closeDrawer();
        };
      });

      document.addEventListener('click', function (e) {
        if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
          closeDrawer();
        }
      });
    }

    syncThemeIcons();
    const dirBadge = document.getElementById('dir-toggle-text');
    if (dirBadge) {
      dirBadge.textContent = (document.documentElement.getAttribute('dir') || 'ltr').toUpperCase();
    }
  }

  function renderFooter() {
    const mount = document.getElementById('footer-placeholder');
    if (!mount) return;

    const currentYear = new Date().getFullYear();

    mount.innerHTML = `
      <footer class="bg-[#FAF3EA] dark:bg-[#120E0D] text-stone-600 dark:text-stone-400 pt-16 pb-12 border-t border-pink-200/70 dark:border-stone-800/80 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-pink-200/70 dark:border-stone-800/80">
            <div class="lg:col-span-2 space-y-4">
              <a href="index.html" class="inline-flex items-center gap-3 group cursor-pointer">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-ice-cream text-lg"></i>
                </div>
                <span class="font-black text-2xl tracking-tight text-stone-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300 font-fun">
                  SugarSwirl<span class="text-rose-500 group-hover:text-amber-400 transition-colors duration-300">.</span>
                </span>
              </a>
              <p class="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Crafting pure dessert magic since 2021. 100% natural single-farm dairy, zero artificial food dyes, and slow-churned artisan recipes for wholehearted happiness.
              </p>
              <div class="flex items-center space-x-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-9 h-9 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-pink-200/80 dark:border-stone-700 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center transition-all hover:scale-110 shadow-sm"><i class="fab fa-instagram"></i></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="w-9 h-9 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-pink-200/80 dark:border-stone-700 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center transition-all hover:scale-110 shadow-sm"><i class="fab fa-tiktok"></i></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-9 h-9 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-pink-200/80 dark:border-stone-700 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center transition-all hover:scale-110 shadow-sm"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="w-9 h-9 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-pink-200/80 dark:border-stone-700 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center transition-all hover:scale-110 shadow-sm"><i class="fab fa-x-twitter"></i></a>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="text-stone-900 dark:text-white text-xs font-black uppercase tracking-widest text-rose-500 dark:text-rose-400">Sweet Menu</h4>
              <ul class="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                <li><a href="menu.html" class="hover:text-rose-500 dark:hover:text-rose-400 transition">Signature Scoops</a></li>
                <li><a href="sundaes.html" class="hover:text-rose-500 dark:hover:text-rose-400 transition">Molten Sundaes</a></li>
                <li><a href="menu.html#shakes" class="hover:text-rose-500 dark:hover:text-rose-400 transition">Thick Freakshakes</a></li>
                <li><a href="pricing.html" class="hover:text-rose-500 dark:hover:text-rose-400 transition">Insulated Tubs</a></li>
                <li><a href="menu.html#vegan" class="hover:text-rose-500 dark:hover:text-rose-400 transition">Vegan & Sorbets</a></li>
              </ul>
            </div>

            <div class="space-y-3">
              <h4 class="text-stone-900 dark:text-white text-xs font-black uppercase tracking-widest text-rose-500 dark:text-rose-400">Quick Links</h4>
              <ul class="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                <li><a href="index.html" class="hover:text-amber-500 dark:hover:text-amber-400 transition">Home 1</a></li>
                <li><a href="home-2.html" class="hover:text-amber-500 dark:hover:text-amber-400 transition">Home 2</a></li>
                <li><a href="offers.html" class="hover:text-amber-500 dark:hover:text-amber-400 transition">Combo Offers</a></li>
                <li><a href="party-orders.html" class="hover:text-amber-500 dark:hover:text-amber-400 transition">Party & Catering</a></li>
                <li><a href="contacts.html" class="hover:text-amber-500 dark:hover:text-amber-400 transition">Find Parlour & Map</a></li>
              </ul>
            </div>

            <div class="space-y-4">
              <h4 class="text-stone-900 dark:text-white text-xs font-black uppercase tracking-widest text-rose-500 dark:text-rose-400">Parlour Hours</h4>
              <p class="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                Mon - Thu: 11:00 AM – 10:30 PM<br>
                Fri - Sun: 11:00 AM – 11:30 PM<br>
                <span class="text-amber-600 dark:text-amber-400 font-bold">Late Night Sweet Cravings Open</span>
              </p>
              <form onsubmit="handleNewsletter(event); return false;" class="space-y-2 pt-1">
                <input type="email" id="nl-email" required placeholder="dessertlover@email.com" class="w-full text-xs bg-white dark:bg-stone-900 border border-pink-200 dark:border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-rose-500 transition shadow-sm">
                <button type="submit" class="w-full text-xs font-black bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-xl transition shadow-md hover:scale-[1.02] active:scale-95">Get Free Waffle Cone Voucher</button>
              </form>
            </div>
          </div>

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© ${currentYear} SugarSwirl & Co. All rights reserved. Crafted with milk & joy.</p>
            <div class="flex items-center space-x-6">
              <a href="about.html" class="hover:underline hover:text-stone-700 dark:hover:text-stone-300">Hygiene Standards</a>
              <a href="contacts.html" class="hover:underline hover:text-stone-700 dark:hover:text-stone-300">Hosur Parlour Location</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  let menuCurrentCat = 'all';
  let menuCurrentQuery = '';

  function applyMenuFilter() {
    const cards = document.querySelectorAll('.menu-card');
    const noResults = document.getElementById('no-results');
    if (!cards.length) return;

    let visibleCount = 0;
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const cardName = (card.getAttribute('data-name') || card.innerText || '').toLowerCase();

      const matchesCat = (menuCurrentCat === 'all' || cardCat === menuCurrentCat);
      const matchesQuery = (!menuCurrentQuery || cardName.includes(menuCurrentQuery));

      if (matchesCat && matchesQuery) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }

  function initMenuPage() {
    const searchInput = document.getElementById('flavour-search');
    const clearBtn = document.getElementById('search-clear-btn');

    if (!document.querySelectorAll('.menu-card').length) return;

    if (searchInput) {
      searchInput.oninput = function () {
        menuCurrentQuery = this.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle('hidden', menuCurrentQuery === '');
        applyMenuFilter();
      };
    }

    if (clearBtn && searchInput) {
      clearBtn.onclick = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        searchInput.value = '';
        menuCurrentQuery = '';
        clearBtn.classList.add('hidden');
        applyMenuFilter();
        searchInput.focus();
      };
    }

    applyMenuFilter();
  }

  function quickFilter(keyword) {
    const searchInput = document.getElementById('flavour-search');
    const clearBtn = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.value = keyword;
      menuCurrentQuery = keyword.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.remove('hidden');
      applyMenuFilter();
      showToast(`Filtered flavour: "${keyword}"`, 'amber');
    }
  }

  let faqCurrentCat = 'all';
  let faqCurrentQuery = '';

  function applyFaqFilter() {
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('no-faq-results');
    if (!faqItems.length) return;

    let visibleCount = 0;
    faqItems.forEach(item => {
      const itemCat = item.getAttribute('data-category') || '';
      const itemText = (item.innerText + ' ' + (item.getAttribute('data-keywords') || '')).toLowerCase();

      const matchesCat = (faqCurrentCat === 'all' || itemCat === faqCurrentCat);
      const matchesQuery = (!faqCurrentQuery || itemText.includes(faqCurrentQuery));

      if (matchesCat && matchesQuery) {
        item.classList.remove('hidden');
        visibleCount++;
        if (faqCurrentQuery.length > 2) {
          item.setAttribute('open', '');
        }
      } else {
        item.classList.add('hidden');
      }
    });

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }

  function initFaqPage() {
    const searchInput = document.getElementById('faq-search');
    const clearBtn = document.getElementById('faq-clear-btn');

    if (!document.querySelectorAll('.faq-item').length) return;

    if (searchInput) {
      searchInput.oninput = function () {
        faqCurrentQuery = this.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle('hidden', faqCurrentQuery === '');
        applyFaqFilter();
      };
    }

    if (clearBtn && searchInput) {
      clearBtn.onclick = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        searchInput.value = '';
        faqCurrentQuery = '';
        clearBtn.classList.add('hidden');
        applyFaqFilter();
        searchInput.focus();
      };
    }

    applyFaqFilter();
  }

  function quickFaq(keyword) {
    const searchInput = document.getElementById('faq-search');
    const clearBtn = document.getElementById('faq-clear-btn');
    if (searchInput) {
      searchInput.value = keyword;
      faqCurrentQuery = keyword.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.remove('hidden');
      applyFaqFilter();
      showToast(`Showing FAQs matching: "${keyword}"`, 'amber');
    }
  }

  const sundaeSpotlightData = {
    volcano: {
      title: "Molten Fudge",
      desc: "Freshly baked 40°C Valrhona brownies resting under twin mountains of -12°C dark chocolate gelato, drowned in steaming bittersweet chocolate lava.",
      cardTitle: "The Obsidian Volcano",
      badge: "Freshly Poured",
      price: "$7.85",
      img: "public/belgian.avif"
    },
    berry: {
      title: "Wild Berry",
      desc: "Philadelphia cream cheese gelato layered with hand-reduced mountain blackberries, crushed spiced graham cracker crust, and sweet raspberry coulis.",
      cardTitle: "Blueberry Glass Parfait",
      badge: "Tart & Silky",
      price: "$6.90",
      img: "public/madagascar.avif"
    },
    pretzel: {
      title: "Salted Caramel",
      desc: "Butter caramel gelato, salted pretzel crunch, Dutch stroopwafel sail, and sea salt butter caramel drizzle cascading down frosted glass.",
      cardTitle: "Salted Pretzel Tower",
      badge: "Sweet & Salty",
      price: "$7.25",
      img: "public/ice-5.jpeg"
    }
  };

  function switchHeroSundae(key, btn) {
    const item = sundaeSpotlightData[key];
    if (!item) return;

    document.querySelectorAll('.hero-tab').forEach(b => {
      b.className = 'hero-tab chip-hover px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-rose-400 hover:text-rose-500 transition-all';
    });

    if (btn) {
      btn.className = 'hero-tab chip-hover active px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black bg-rose-500 text-white shadow-md shadow-rose-500/25 transition-all';
    }

    const img = document.getElementById('hero-image');
    if (img) img.style.opacity = '0';

    setTimeout(() => {
      const t = document.getElementById('hero-title');
      const d = document.getElementById('hero-desc');
      const ct = document.getElementById('hero-card-title');
      const bg = document.getElementById('hero-badge-tag');
      const btnEl = document.getElementById('hero-order-btn');

      if (t) t.textContent = item.title;
      if (d) d.textContent = item.desc;
      if (ct) ct.textContent = item.cardTitle;
      if (bg) bg.textContent = item.badge;
      if (btnEl) {
        btnEl.textContent = `Order Spotlight (${item.price})`;
        btnEl.setAttribute('onclick', `toastCart('${item.cardTitle} (${item.price})')`);
      }
      if (img) {
        img.src = item.img;
        img.style.opacity = '1';
      }
    }, 150);
  }

  function copyCode(code) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Promo Code "${code}" copied to clipboard!`, 'amber');
      }).catch(() => fallbackCopy(code));
    } else {
      fallbackCopy(code);
    }
  }

  function fallbackCopy(code) {
    const temp = document.createElement('input');
    temp.value = code;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast(`Promo Code "${code}" copied!`, 'amber');
  }

  function setupGlobalEventDelegation() {
    document.addEventListener('click', function (e) {
      
      const menuBtn = e.target.closest('.filter-btn');
      if (menuBtn) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.className = 'filter-btn btn-hover px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black transition-all bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-white hover:bg-rose-500 dark:hover:bg-rose-500 border border-stone-200 dark:border-stone-700 hover:border-transparent';
        });
        menuBtn.className = 'filter-btn btn-hover active px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black transition-all bg-rose-500 text-white shadow-md shadow-rose-500/25';
        menuCurrentCat = menuBtn.getAttribute('data-cat') || 'all';
        applyMenuFilter();
        return;
      }

      const faqBtn = e.target.closest('.faq-filter-btn');
      if (faqBtn) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.faq-filter-btn').forEach(b => {
          b.className = 'faq-filter-btn btn-hover px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black transition-all bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-white hover:bg-rose-500 dark:hover:bg-rose-500 border border-stone-200 dark:border-stone-700 hover:border-transparent';
        });
        faqBtn.className = 'faq-filter-btn btn-hover active px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black transition-all bg-rose-500 text-white shadow-md shadow-rose-500/20';
        faqCurrentCat = faqBtn.getAttribute('data-cat') || 'all';
        applyFaqFilter();
        return;
      }

      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();

        const hash = anchor.getAttribute('href');
        if (!hash || hash === '#') return;

        const targetEl = document.querySelector(hash);

        const chipContainer = anchor.closest('.flex');
        if (chipContainer) {
          const siblingChips = chipContainer.querySelectorAll('a[href^="#"]');
          if (siblingChips.length > 1) {
            siblingChips.forEach(chip => {
              chip.classList.remove(
                'bg-rose-500', 
                'text-white', 
                'shadow-md', 
                'shadow-rose-500/25', 
                'border-transparent', 
                'hover:bg-rose-600'
              );
              chip.classList.add(
                'bg-white', 
                'dark:bg-stone-800', 
                'text-stone-700', 
                'dark:text-stone-300', 
                'border', 
                'border-stone-200', 
                'dark:border-stone-700', 
                'hover:border-rose-400', 
                'hover:text-rose-500'
              );
            });

            anchor.classList.remove(
              'bg-white', 
              'dark:bg-stone-800', 
              'text-stone-700', 
              'dark:text-stone-300', 
              'border-stone-200', 
              'dark:border-stone-700',
              'hover:text-rose-500'
            );
            anchor.classList.add(
              'bg-rose-500', 
              'text-white', 
              'shadow-md', 
              'shadow-rose-500/25', 
              'border-transparent'
            );
          }
        }

        if (targetEl) {
          const navOffset = 90;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;

          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });

          targetEl.classList.add('transition-transform', 'duration-500');
          targetEl.style.transform = 'scale(1.008)';
          setTimeout(() => {
            targetEl.style.transform = 'scale(1)';
          }, 500);
        }
        return;
      }

    });
  }

  function updateDynamicFavicon(doc) {
    if (!doc) return;
    const newIcon = doc.querySelector('link[rel*="icon"]');
    if (newIcon) {
      document.querySelectorAll('link[rel*="icon"]').forEach(el => el.remove());

      const freshLink = document.createElement('link');
      freshLink.rel = 'icon';
      if (newIcon.type) freshLink.type = newIcon.type;
      freshLink.href = newIcon.href;
      document.head.appendChild(freshLink);
    }
  }

  function setupSmartNavigation() {
    document.addEventListener('click', async function (e) {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }
      if (link.target === '_blank' || link.hasAttribute('download')) {
        return;
      }

      const targetUrl = new URL(link.href, window.location.href);

      if (targetUrl.origin !== window.location.origin) {
        return;
      }

      const curPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage = targetUrl.pathname.split('/').pop() || 'index.html';

      if (curPage === targetPage && !targetUrl.hash) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (window.location.protocol !== 'file:') {
        e.preventDefault();
        try {
          const res = await fetch(targetUrl.href);
          if (!res.ok) throw new Error('Page fetch failed');
          const htmlText = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');

          const newMain = doc.querySelector('main');
          const curMain = document.querySelector('main');

          if (newMain && curMain) {
            curMain.style.opacity = '0';
            curMain.style.transition = 'opacity 0.15s ease';

            setTimeout(() => {
              curMain.innerHTML = newMain.innerHTML;
              curMain.className = newMain.className;
              curMain.style.opacity = '1';

              document.title = doc.title || document.title;
              updateDynamicFavicon(doc);

              window.history.pushState({}, '', targetUrl.href);

              renderNavbar();
              initMenuPage();
              initFaqPage();
              initBulkEstimator();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 150);
          } else {
            window.location.href = targetUrl.href;
          }
        } catch (err) {
          window.location.href = targetUrl.href;
        }
      }
    });

    window.addEventListener('popstate', async () => {
      if (window.location.protocol !== 'file:') {
        try {
          const res = await fetch(window.location.href);
          const htmlText = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');
          const newMain = doc.querySelector('main');
          const curMain = document.querySelector('main');
          if (newMain && curMain) {
            curMain.innerHTML = newMain.innerHTML;
            curMain.className = newMain.className;
            document.title = doc.title;
            updateDynamicFavicon(doc);
            renderNavbar();
            initMenuPage();
            initFaqPage();
            initBulkEstimator();
          }
        } catch (e) {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    });
  }

  function blockAccidentalFormReloads() {
    document.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      const form = e.target;
      const hostInput = form.querySelector('#party-host');
      const nameInput = form.querySelector('#contact-name');
      const emailInput = form.querySelector('#nl-email');

      if (hostInput) {
        showToast(`Thank you, ${hostInput.value.trim() || 'Guest'}! Party tub inquiry registered.`, 'amber');
        form.reset();
      } else if (nameInput) {
        const topic = form.querySelector('#contact-topic')?.value || 'General Inquiry';
        showToast(`Thank you, ${nameInput.value.trim() || 'Guest'}! Inquiry about "${topic}" registered.`, 'pink');
        form.reset();
      } else if (emailInput && emailInput.value) {
        showToast(`Sweet! 1 Free Waffle Cone voucher sent to ${emailInput.value.trim()}`, 'pink');
        form.reset();
      }
      return false;
    }, true);
  }

  const sundaeState = {
    base: { name: 'Madagascar Vanilla', price: 3.50 },
    drizzle: { name: 'Hot Fudge Lava', price: 1.00 },
    topping: { name: 'Roasted Pecans', price: 0.75 }
  };

  function setSundae(type, name, price, btn) {
    if (!sundaeState[type]) return;
    sundaeState[type] = { name, price };

    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('.sundae-btn').forEach(b => {
        b.className = 'sundae-btn p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-800 dark:text-white text-center hover:border-rose-400 transition';
      });
      btn.className = 'sundae-btn p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-stone-800 border-2 border-rose-500 text-xs font-bold text-stone-800 dark:text-white text-center shadow-sm';
    }

    const baseLabel = document.getElementById('label-base');
    const drizzleLabel = document.getElementById('label-drizzle');
    const toppingLabel = document.getElementById('label-topping');
    const totalLabel = document.getElementById('sundae-total');

    if (baseLabel) baseLabel.textContent = `Base: ${sundaeState.base.name}`;
    if (drizzleLabel) drizzleLabel.textContent = `+ Drizzle: ${sundaeState.drizzle.name}`;
    if (toppingLabel) toppingLabel.textContent = `+ Topping: ${sundaeState.topping.name}`;

    const total = sundaeState.base.price + sundaeState.drizzle.price + sundaeState.topping.price;
    if (totalLabel) totalLabel.textContent = `$${total.toFixed(2)}`;
  }

  function orderSundae(e) {
    if (e && e.preventDefault) e.preventDefault();
    const total = (sundaeState.base.price + sundaeState.drizzle.price + sundaeState.topping.price).toFixed(2);
    showToast(`Custom Sundae (${sundaeState.base.name}) ordered for $${total}!`, 'pink');
    return false;
  }

  function initBulkEstimator() {
    const slider = document.getElementById('guest-slider');
    const label = document.getElementById('slider-guest-label');
    const tubsEl = document.getElementById('stat-tubs');
    const flavoursEl = document.getElementById('stat-flavours');
    const priceEl = document.getElementById('stat-price');

    if (slider) {
      slider.addEventListener('input', function () {
        const count = parseInt(this.value, 10);
        if (label) label.textContent = `${count} Guests`;

        const tubs = Math.max(2, Math.ceil(count / 9));
        const flavours = Math.min(6, Math.max(2, Math.floor(tubs * 0.75)));
        const cost = tubs * 30;

        if (tubsEl) tubsEl.textContent = `${tubs} Tubs`;
        if (flavoursEl) flavoursEl.textContent = `${flavours} Flavours`;
        if (priceEl) priceEl.textContent = `$${cost}`;
      });
    }
  }

  function handlePartyBooking(e) {
    if (e && e.preventDefault) e.preventDefault();
    const hostInput = document.getElementById('party-host');
    const host = hostInput ? hostInput.value.trim() : 'Guest';
    showToast(`Thank you, ${host}! Party tub inquiry registered.`, 'amber');
    if (e && e.target && e.target.reset) e.target.reset();
    return false;
  }

  function handleContactSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const topicInput = document.getElementById('contact-topic');
    const name = nameInput ? nameInput.value.trim() : 'Guest';
    const topic = topicInput ? topicInput.value : 'General Inquiry';

    showToast(`Thank you, ${name}! Your inquiry about "${topic}" has been registered.`, 'pink');
    if (e && e.target && e.target.reset) e.target.reset();
    return false;
  }

  function handleNewsletter(e) {
    if (e && e.preventDefault) e.preventDefault();
    const emailInput = document.getElementById('nl-email');
    const email = emailInput ? emailInput.value.trim() : '';
    if (email) {
      showToast(`Sweet! 1 Free Waffle Cone voucher sent to ${email}`, 'pink');
      if (e && e.target && e.target.reset) e.target.reset();
    }
    return false;
  }

  window.toggleTheme = toggleTheme;
  window.toggleDirection = toggleDirection;
  window.toastCart = toastCart;
  window.setSundae = setSundae;
  window.orderSundae = orderSundae;
  window.handlePartyBooking = handlePartyBooking;
  window.handleContactSubmit = handleContactSubmit;
  window.handleNewsletter = handleNewsletter;
  window.showToast = showToast;
  window.switchHeroSundae = switchHeroSundae;
  window.quickFilter = quickFilter;
  window.quickFaq = quickFaq;
  window.copyCode = copyCode;

  document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    initMenuPage();
    initFaqPage();
    initBulkEstimator();
    setupGlobalEventDelegation();
    setupSmartNavigation();
    blockAccidentalFormReloads();
  });

})();