let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCountUI() {
  const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
  });
}

// 初始化更新購物車數量
updateCartCountUI();

const statusMessage = document.querySelector("[data-status-message]");

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-to-cart]");

  if (!button) return;

  const itemName = button.dataset.addToCart;
  const itemPrice = parseInt(button.dataset.price, 10) || 0;
  
  // 嘗試取得店家名稱
  let shopName = "美味餐點";
  const section = button.closest(".menu-list");
  if (section && section.previousElementSibling && section.previousElementSibling.classList.contains("shop-title")) {
    shopName = section.previousElementSibling.textContent;
  } else {
    const titleEl = document.querySelector("[data-shop-name]");
    if (titleEl && titleEl.textContent !== "全部餐廳" && titleEl.textContent !== "菜單") {
      shopName = titleEl.textContent;
    }
  }

  // 更新購物車資料
  const existingItem = cartItems.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cartItems.push({ name: itemName, price: itemPrice, qty: 1, shop: shopName });
  }

  // 儲存至 localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCountUI();

  // 顯示提示
  if (statusMessage) {
    statusMessage.textContent = `已加入「${itemName}」`;
  }
});
