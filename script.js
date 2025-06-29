// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 登录/注册模态框逻辑 ---
    const loginRegisterModal = document.getElementById('loginRegisterModal');
    const openLoginRegisterModalBtn = document.getElementById('openLoginRegisterModal'); // Header button
    const closeLoginRegisterModalBtn = document.getElementById('closeLoginRegisterModal');
    const showLoginBtn = document.getElementById('showLogin'); // Modal internal switch button
    const showRegisterBtn = document.getElementById('showRegister'); // Modal internal switch button
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Sidebar buttons
    const sidebarRegisterBtn = document.getElementById('sidebarRegisterBtn');
    const sidebarLoginBtn = document.getElementById('sidebarLoginBtn');

    // Helper functions to show specific forms within the modal
    function showLoginForm() {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        showLoginBtn.classList.add('bg-gray-100');
        showRegisterBtn.classList.remove('bg-gray-100');
    }

    function showRegisterForm() {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        showRegisterBtn.classList.add('bg-gray-100');
        showLoginBtn.classList.remove('bg-gray-100');
    }

    // Function to open the login/register modal
    function openLoginRegisterModal() {
        loginRegisterModal.style.display = 'flex';
    }

    // Event listener for the header's "登录/注册" button
    if (openLoginRegisterModalBtn) {
        openLoginRegisterModalBtn.addEventListener('click', () => {
            openLoginRegisterModal();
            showLoginForm(); // Default to login when opening from header
        });
    }

    // Event listener for the sidebar's "注册豆瓣" button
    if (sidebarRegisterBtn) {
        sidebarRegisterBtn.addEventListener('click', () => {
            openLoginRegisterModal();
            showRegisterForm(); // Show register form when clicked
        });
    }

    // Event listener for the sidebar's "登录" button
    if (sidebarLoginBtn) {
        sidebarLoginBtn.addEventListener('click', () => {
            openLoginRegisterModal();
            showLoginForm(); // Show login form when clicked
        });
    }

    // Function to close the login/register modal
    if (closeLoginRegisterModalBtn) {
        closeLoginRegisterModalBtn.addEventListener('click', () => {
            loginRegisterModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the content
    if (loginRegisterModal) {
        loginRegisterModal.addEventListener('click', (event) => {
            if (event.target === loginRegisterModal) {
                loginRegisterModal.style.display = 'none';
            }
        });
    }

    // Switch to Login form (internal modal button)
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', showLoginForm);
    }

    // Switch to Register form (internal modal button)
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', showRegisterForm);
    }

    // Handle Login Form submission (placeholder for actual login logic)
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            console.log('Login attempt:', { email, password });
            // In a real application, you would send this data to a server for authentication.
            // For this experiment, we'll just log it and close the modal.
            showMessageBox('登录成功！(此为模拟登录)');
            loginRegisterModal.style.display = 'none';
        });
    }

    // Handle Register Form submission (placeholder for actual registration logic)
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            console.log('Register attempt:', { email, password });
            // In a real application, you would send this data to a server for registration.
            // For this experiment, we'll just log it and close the modal.
            showMessageBox('注册成功！(此为模拟注册)');
            loginRegisterModal.style.display = 'none';
        });
    }

    // --- 购物车模态框逻辑 ---
    const shoppingCartModal = document.getElementById('shoppingCartModal');
    const cartButton = document.createElement('button'); // Dynamically created cart button
    cartButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m0 0L1 1m6 12a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
    `;
    cartButton.className = 'text-gray-600 hover:text-douban-text-green transition-colors duration-200 ml-4';
    const headerRightSection = document.querySelector('header .flex.items-center.space-x-4');
    if (headerRightSection) {
        headerRightSection.appendChild(cartButton);
    } else {
        console.error("Could not find the header's right section to append the cart button.");
    }

    const closeShoppingCartModalBtn = document.getElementById('closeShoppingCartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');

    // Dummy cart data (in a real app, this would come from a backend or local storage)
    let cart = [
        { id: 1, name: '豆瓣笔记本', price: 39.00, quantity: 1, imageUrl: 'img/doubanjingxuan.jpg' },
        { id: 2, name: '豆瓣咖啡杯', price: 68.00, quantity: 2, imageUrl: 'img/doubanjingxuan2.jpg' },
        { id: 3, name: '文艺帆布包', price: 55.50, quantity: 3, imageUrl: 'img/doubanjingxuan4.jpg' }
    ];

    // Function to render cart items
    function renderCart() {
        if (!cartItemsContainer || !cartTotalSpan) return; // Ensure elements exist

        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">购物车是空的</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex items-center border-b pb-3 last:border-b-0 last:pb-0';
                itemElement.innerHTML = `
                    <img src="${item.imageUrl}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/d0d0d0/333333?text=Product';" alt="${item.name} Image" class="w-20 h-20 object-cover rounded-md mr-4">
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">${item.name}</h3>
                        <p class="text-gray-600 text-sm">单价: ¥<span class="item-price">${item.price.toFixed(2)}</span></p>
                        <div class="flex items-center mt-1">
                            <button class="quantity-minus bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300" data-id="${item.id}">-</button>
                            <span class="item-quantity text-gray-800 mx-2">${item.quantity}</span>
                            <button class="quantity-plus bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300" data-id="${item.id}">+</button>
                            <button class="remove-item text-red-500 ml-auto text-sm hover:underline" data-id="${item.id}">删除</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }

        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Event listeners for cart quantity and remove buttons (delegation)
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const itemId = parseInt(target.dataset.id);

            if (target.classList.contains('quantity-plus')) {
                const item = cart.find(i => i.id === itemId);
                if (item) {
                    item.quantity++;
                    renderCart();
                }
            } else if (target.classList.contains('quantity-minus')) {
                const item = cart.find(i => i.id === itemId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    renderCart();
                }
            } else if (target.classList.contains('remove-item')) {
                cart = cart.filter(i => i.id !== itemId);
                renderCart();
            }
        });
    }

    // Open shopping cart modal
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            shoppingCartModal.style.display = 'flex';
            renderCart(); // Render cart items when opening
        });
    }

    // Close shopping cart modal
    if (closeShoppingCartModalBtn) {
        closeShoppingCartModalBtn.addEventListener('click', () => {
            shoppingCartModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the content
    if (shoppingCartModal) {
        shoppingCartModal.addEventListener('click', (event) => {
            if (event.target === shoppingCartModal) {
                shoppingCartModal.style.display = 'none';
            }
        });
    }

    // Handle checkout button (placeholder for actual checkout logic)
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                showMessageBox(`即将结算，总金额：¥${cartTotalSpan.textContent} (此为模拟结算)`);
                shoppingCartModal.style.display = 'none';
                cart = []; // Clear cart after checkout
                renderCart();
            } else {
                showMessageBox('购物车是空的，请先添加商品！');
            }
        });
    }

    // Function to create and show a custom message box
    function showMessageBox(message) {
        const existingMessageBox = document.getElementById('messageBoxOverlay');
        if (existingMessageBox) {
            document.body.removeChild(existingMessageBox);
        }

        const messageBoxOverlay = document.createElement('div');
        messageBoxOverlay.className = 'modal-overlay';
        messageBoxOverlay.id = 'messageBoxOverlay';
        document.body.appendChild(messageBoxOverlay);

        const messageBoxContent = document.createElement('div');
        messageBoxContent.className = 'modal-content max-w-sm text-center';
        messageBoxContent.innerHTML = `
            <span class="modal-close-button" id="closeMessageBox">×</span>
            <p class="text-lg font-semibold mb-4">${message}</p>
            <button id="confirmMessageBox" class="douban-green text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-200 font-semibold">确定</button>
        `;
        messageBoxOverlay.appendChild(messageBoxContent);

        messageBoxOverlay.style.display = 'flex';

        document.getElementById('closeMessageBox').addEventListener('click', () => {
            document.body.removeChild(messageBoxOverlay);
        });

        document.getElementById('confirmMessageBox').addEventListener('click', () => {
            document.body.removeChild(messageBoxOverlay);
        });

        messageBoxOverlay.addEventListener('click', (event) => {
            if (event.target === messageBoxOverlay) {
                document.body.removeChild(messageBoxOverlay);
            }
        });
    }

    // --- 滚动跳转逻辑 ---
    // Function to handle smooth scrolling to a target element with header offset
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const mainHeader = document.getElementById('main-header');
            const secondaryNav = document.getElementById('secondary-nav');

            // Calculate offset based on active sticky headers
            let headerOffset = 0;
            if (mainHeader) {
                headerOffset += mainHeader.offsetHeight;
            }
            // If the secondary nav is sticky AND currently visible (i.e., we are scrolling within the main content)
            // we should also account for its height.
            if (secondaryNav && window.getComputedStyle(secondaryNav).position === 'sticky') {
                headerOffset += secondaryNav.offsetHeight;
            }

            // Get the element's position relative to the document
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            // Calculate the final scroll position with offset and a little extra padding
            const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little more space

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // --- 顶部导航链接 (读书、电影、音乐等) ---
    const topNavLinks = document.querySelectorAll('.top-nav-link');
    topNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetId = event.target.dataset.target;

            // Remove active state from all top nav links
            topNavLinks.forEach(tLink => tLink.classList.remove('active-tab'));
            // Add active state to the clicked top nav link (optional styling, if desired)
            event.target.classList.add('active-tab');

            smoothScrollTo(targetId);
        });
    });

    // --- 页面内容切换导航 (首页、精选内容等) ---
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetId = event.target.dataset.target;

            // Remove active class from all tab links (secondary nav)
            tabLinks.forEach(tLink => {
                tLink.classList.remove('active-tab');
            });
            // Add active class to the clicked tab link (secondary nav)
            event.target.classList.add('active-tab');

            smoothScrollTo(targetId);
        });
    });

    // Set initial active tab on page load (e.g., "首页")
    // If the page loads with a hash in the URL, scroll to that section
    const initialHash = window.location.hash.substring(1); // Remove '#'
    if (initialHash && document.getElementById(initialHash)) {
        // Find the corresponding tab link and activate it
        const correspondingTabLink = document.querySelector(`.tab-link[data-target="${initialHash}"]`);
        if (correspondingTabLink) {
            tabLinks.forEach(tLink => tLink.classList.remove('active-tab'));
            correspondingTabLink.classList.add('active-tab');
        }
        // Also activate top nav link if it matches a content section (e.g., #movie-content matches "电影")
        const correspondingTopNavLink = document.querySelector(`.top-nav-link[data-target="${initialHash}"]`);
        if (correspondingTopNavLink) {
             topNavLinks.forEach(tLink => tLink.classList.remove('active-tab')); // Ensure no active state from previous rendering
             correspondingTopNavLink.classList.add('active-tab');
        }


        smoothScrollTo(initialHash);
    } else {
        // Default to home if no valid hash
        const homeTabLink = document.querySelector('.tab-link[data-target="home-content"]');
        if (homeTabLink) {
            homeTabLink.classList.add('active-tab');
        }
        smoothScrollTo('home-content');
    }

    // --- "选座购票" 按钮功能实现 ---
    const purchaseButtons = document.querySelectorAll('.purchase-button');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const movieTitle = event.target.dataset.movieTitle;
            if (movieTitle) {
                showMessageBox(`已为您购买《${movieTitle}》的电影票！`);
            } else {
                showMessageBox('购买失败：未能获取电影信息。');
            }
        });
    });

    // Initial render of the cart (optional, if you want it to show on page load)
    renderCart();
});
