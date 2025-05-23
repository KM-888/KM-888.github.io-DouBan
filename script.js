// script.js

document.addEventListener('DOMContentLoaded', () => {
   // --- 登录/注册模态框逻辑 ---
   const loginRegisterModal = document.getElementById('loginRegisterModal');
   const openLoginRegisterModalBtn = document.getElementById('openLoginRegisterModal');
   const closeLoginRegisterModalBtn = document.getElementById('closeLoginRegisterModal');
   const showLoginBtn = document.getElementById('showLogin');
   const showRegisterBtn = document.getElementById('showRegister');
   const loginForm = document.getElementById('loginForm');
   const registerForm = document.getElementById('registerForm');

   // Function to open the login/register modal
   if (openLoginRegisterModalBtn) {
       openLoginRegisterModalBtn.addEventListener('click', () => {
           loginRegisterModal.style.display = 'flex';
       });
   }

   // Function to close the login/register modal
   if (closeLoginRegisterModalBtn) {
       closeLoginRegisterModalBtn.addEventListener('click', ()  => {
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

   // Switch to Login form
   if (showLoginBtn) {
       showLoginBtn.addEventListener('click', () => {
           loginForm.classList.remove('hidden');
           registerForm.classList.add('hidden');
           showLoginBtn.classList.add('bg-gray-100');
           showRegisterBtn.classList.remove('bg-gray-100');
       });
   }

   // Switch to Register form
   if (showRegisterBtn) {
       showRegisterBtn.addEventListener('click', () => {
           registerForm.classList.remove('hidden');
           loginForm.classList.add('hidden');
           showRegisterBtn.classList.add('bg-gray-100');
           showLoginBtn.classList.remove('bg-gray-100');
       });
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
           alert('登录成功！(此为模拟登录)'); // Using alert for simplicity as per instructions, but generally prefer custom modals.
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
           alert('注册成功！(此为模拟注册)'); // Using alert for simplicity as per instructions, but generally prefer custom modals.
           loginRegisterModal.style.display = 'none';
       });
   }

   // --- 购物车模态框逻辑 ---
   const shoppingCartModal = document.getElementById('shoppingCartModal');
   // Assuming there's a button to open the cart, let's add one to the header for demonstration
   const cartButton = document.createElement('button');
   cartButton.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m0 0L1 1m6 12a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
       </svg>
   `;
   cartButton.className = 'text-gray-600 hover:text-douban-text-green transition-colors duration-200 ml-4';
   document.querySelector('header .flex.items-center.space-x-4').appendChild(cartButton); // Append to header's right section

   const closeShoppingCartModalBtn = document.getElementById('closeShoppingCartModal');
   const cartItemsContainer = document.getElementById('cartItems');
   const cartTotalSpan = document.getElementById('cartTotal');
   const checkoutButton = document.getElementById('checkoutButton');

   // Dummy cart data (in a real app, this would come from a backend or local storage)
   let cart = [
       { id: 1, name: '示例商品 A', price: 50.00, quantity: 1, imageUrl: 'https://placehold.co/80x80/d0d0d0/333333?text=ProductA' },
       { id: 2, name: '示例商品 B', price: 120.00, quantity: 2, imageUrl: 'https://placehold.co/80x80/d0d0d0/333333?text=ProductB' },
       { id: 3, name: '示例商品 C', price: 25.50, quantity: 3, imageUrl: 'https://placehold.co/80x80/d0d0d0/333333?text=ProductC' }
   ];

   // Function to render cart items
   function renderCart() {
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
               alert(`即将结算，总金额：¥${cartTotalSpan.textContent} (此为模拟结算)`); // Using alert for simplicity
               shoppingCartModal.style.display = 'none';
               cart = []; // Clear cart after checkout
               renderCart();
           } else {
               alert('购物车是空的，请先添加商品！'); // Using alert for simplicity
           }
       });
   }

   // Initial render of the cart (optional, if you want it to show on page load)
   // renderCart();
});
