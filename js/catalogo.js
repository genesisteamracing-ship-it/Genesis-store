/* =========================================================
   GÊNESIS STORE — CATÁLOGO & CARRINHO DE ORÇAMENTO
   ========================================================= */

const WHATSAPP_NUMBER = "5583999002723";

/**
 * Catálogo de produtos oficiais com dados e opções
 */
const PRODUCTS_DATA = [
  {
    id: "camisa-genesis-oficial",
    name: "Camisa Oficial Gênesis Racing 2025",
    category: "camisa",
    priceOld: 89.90,
    priceCurrent: 69.90,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
    optionLabel: "Tamanho",
    options: ["P", "M", "G", "GG"]
  },
  {
    id: "camisa-genesis-preta",
    name: "Camisa Dry Fit Preta Gênesis Pitstop",
    category: "camisa",
    priceOld: 99.90,
    priceCurrent: 79.90,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80",
    optionLabel: "Tamanho",
    options: ["P", "M", "G", "GG"]
  },
  {
    id: "chaveiro-genesis-individual",
    name: "Chaveiro Oficial Gênesis Racing",
    category: "chaveiro",
    priceOld: 5.00,
    priceCurrent: 3.50,
    image: "genesis-assets/chaveiros-recortados.png",
    optionLabel: "Cor",
    options: ["Azul", "Amarelo", "Dourado", "Roxo", "Vermelho"]
  },
  {
    id: "combo-3-chaveiros",
    name: "Combo com 3 Chaveiros Gênesis",
    category: "chaveiro",
    priceOld: 15.00,
    priceCurrent: 10.00,
    image: "genesis-assets/chaveiros-recortados.png",
    optionLabel: "Cores Principais",
    options: ["Sortidos", "Trio Azul/Amarelo/Dourado", "Trio Roxo/Vermelho/Azul"]
  },
  {
    id: "colecao-chaveiros-completa",
    name: "Coleção Completa Chaveiros (5 cores)",
    category: "chaveiro",
    priceOld: 25.00,
    priceCurrent: 15.00,
    image: "genesis-assets/chaveiros-recortados.png",
    optionLabel: "Kit",
    options: ["1 de cada cor (Azul, Amarelo, Dourado, Roxo, Vermelho)"]
  },
  {
    id: "kit-bottoms-genesis",
    name: "Kit de Bottons Colecionáveis Gênesis (4 un)",
    category: "bottoms",
    priceOld: 24.90,
    priceCurrent: 16.90,
    image: "genesis-assets/logo-circular.png",
    optionLabel: "Acabamento",
    options: ["Brilhante", "Fosco Premium"]
  },
  {
    id: "bottom-individual-logo",
    name: "Bottom Pin Emblema Gênesis Racing",
    category: "bottoms",
    priceOld: 8.00,
    priceCurrent: 5.00,
    image: "genesis-assets/logo-simbolo.png",
    optionLabel: "Modelo",
    options: ["Símbolo Oficial", "Logo Redondo"]
  }
];

// Gerenciador do Carrinho
class CartService {
  constructor() {
    this.storageKey = "genesis_cart_items";
    this.items = this.loadItems();
    this.listeners = [];
  }

  loadItems() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveItems() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.error("Erro ao salvar no localStorage", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.items));
  }

  addItem(product, variant = "Padrão") {
    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.variant === variant
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.priceCurrent,
        image: product.image,
        variant,
        quantity: 1
      });
    }
    this.saveItems();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.saveItems();
  }

  updateQuantity(index, delta) {
    if (!this.items[index]) return;
    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.removeItem(index);
    } else {
      this.saveItems();
    }
  }

  clear() {
    this.items = [];
    this.saveItems();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Instância global do carrinho
const cart = new CartService();

/**
 * Renderização dos produtos na grade com filtro
 */
function renderProducts(categoryFilter = "all") {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  const filtered = categoryFilter === "all"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === categoryFilter);

  container.innerHTML = filtered.map(product => `
    <article class="product-card" data-category="${product.category}">
      <div class="product-img-wrap">
        <span class="product-category-tag">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-prices">
          <span class="price-old">R$ ${product.priceOld.toFixed(2).replace(".", ",")}</span>
          <span class="price-current">R$ ${product.priceCurrent.toFixed(2).replace(".", ",")}</span>
        </div>
        ${product.options && product.options.length ? `
          <div class="product-options">
            <label for="select-${product.id}">${product.optionLabel}:</label>
            <select id="select-${product.id}">
              ${product.options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
            </select>
          </div>
        ` : ""}
        <button class="btn-buy" type="button" onclick="handleAddToCart('${product.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          COMPRAR
        </button>
      </div>
    </article>
  `).join("");
}

// Adição de produto via botão
window.handleAddToCart = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const selectEl = document.getElementById(`select-${productId}`);
  const variant = selectEl ? selectEl.value : "Padrão";

  cart.addItem(product, variant);
  openCartDrawer();
};

/**
 * Drawer do Carrinho
 */
function openCartDrawer() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

function updateCartUI() {
  const badge = document.getElementById("cartBadge");
  const count = cart.getCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }

  const itemsContainer = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("cartEmptyState");
  const footer = document.getElementById("cartDrawerFooter");
  const totalEl = document.getElementById("cartTotalPrice");

  if (!itemsContainer || !emptyState || !footer || !totalEl) return;

  if (cart.items.length === 0) {
    emptyState.style.display = "block";
    itemsContainer.innerHTML = "";
    footer.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  footer.style.display = "block";
  totalEl.textContent = cart.getTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  itemsContainer.innerHTML = cart.items.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-variant">Opção: <strong>${item.variant}</strong></div>
        <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="cart.updateQuantity(${idx}, -1)" title="Diminuir">-</button>
        <span class="cart-qty-val">${item.quantity}</span>
        <button class="cart-qty-btn" onclick="cart.updateQuantity(${idx}, 1)" title="Aumentar">+</button>
        <button class="cart-remove-btn" onclick="cart.removeItem(${idx})" title="Remover item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join("");
}

/**
 * Envio do Orçamento para o WhatsApp
 */
function handleSendWhatsAppOrder() {
  if (cart.items.length === 0) {
    alert("Adicione ao menos um produto no carrinho antes de enviar.");
    return;
  }

  const nameInput = document.getElementById("cartCustomerName");
  const cityInput = document.getElementById("cartCustomerCity");
  const notesInput = document.getElementById("cartCustomerNotes");

  const name = nameInput?.value.trim() || "";
  const city = cityInput?.value.trim() || "";
  const notes = notesInput?.value.trim() || "";

  if (!name) {
    alert("Por favor, informe seu nome.");
    nameInput?.focus();
    return;
  }

  if (!city) {
    alert("Por favor, informe sua cidade/UF para combinarmos a entrega.");
    cityInput?.focus();
    return;
  }

  const itemsListText = cart.items.map((item, index) => {
    return `${index + 1}. *${item.name}*\n   - Opção: ${item.variant}\n   - Quantidade: ${item.quantity}\n   - Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`;
  }).join("\n\n");

  const totalText = cart.getTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const message = [
    "🏁 *NOVO ORÇAMENTO — GÊNESIS STORE* 🏁",
    "",
    "Olá equipe Gênesis Racing! Montei meu carrinho no catálogo e gostaria de solicitar esse orçamento:",
    "",
    "📋 *ITENS DO PEDIDO:*",
    itemsListText,
    "",
    `💰 *VALOR ESTIMADO:* ${totalText}`,
    "",
    "👤 *DADOS PARA COMBINAR A ENTREGA:*",
    `- Nome: ${name}`,
    `- Cidade/UF: ${city}`,
    notes ? `- Observações: ${notes}` : "",
    "",
    "Gostaria de confirmar a disponibilidade dos modelos e combinar os prazos de entrega e pagamento. Obrigado!"
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

// Inicialização de eventos e filtros
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  cart.subscribe(updateCartUI);
  updateCartUI();

  // Filtros de Categoria
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter") || "all";
      renderProducts(category);
    });
  });

  // Botões do Carrinho
  document.getElementById("openCartBtn")?.addEventListener("click", openCartDrawer);
  document.getElementById("closeCartBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);
  document.getElementById("sendWhatsAppBtn")?.addEventListener("click", handleSendWhatsAppOrder);

  // Menu Mobile
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "FECHAR" : "MENU";
    });
  }
});
