/* =========================================================
   GÊNESIS STORE — CATÁLOGO, PÁGINA DO PRODUTO & CARRINHO
   ========================================================= */

const WHATSAPP_NUMBER = "5583999002723";

/**
 * Catálogo oficial de produtos com especificações detalhadas
 */
const PRODUCTS_DATA = [
  {
    id: "camisa-genesis-oficial",
    name: "Camisa Oficial Gênesis Racing 2025",
    category: "camisa",
    priceOld: 89.90,
    priceCurrent: 69.90,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&auto=format&fit=crop&q=80",
    optionLabel: "Tamanho",
    options: ["P", "M", "G", "GG"],
    description: "A camisa oficial que veste os integrantes e torcedores da equipe Gênesis Racing. Desenvolvida com tecido leve, toque macio e estampa resistente de alta durabilidade.",
    features: [
      "100% Algodão penteado fio 30.1 de alto padrão",
      "Estampa em serigrafia de alta definição",
      "Costura reforçada de ombro a ombro",
      "Modelagem unissex confortável"
    ]
  },
  {
    id: "camisa-genesis-preta",
    name: "Camisa Dry Fit Preta Gênesis Pitstop",
    category: "camisa",
    priceOld: 99.90,
    priceCurrent: 79.90,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80",
    optionLabel: "Tamanho",
    options: ["P", "M", "G", "GG"],
    description: "Inspirada no ritmo acelerado dos boxes e competições. Tecido tecnológico Dry-Fit que auxilia na evaporação rápida do suor, ideal para o dia a dia e atividades intensas.",
    features: [
      "Tecido 100% Poliéster Dry Fit respirável",
      "Secagem ultra rápida e não precisa passar",
      "Detalhes refletivos com a marca Gênesis",
      "Acabamento esportivo premium"
    ]
  },
  {
    id: "chaveiro-genesis-individual",
    name: "Chaveiro Oficial Gênesis Racing",
    category: "chaveiro",
    priceOld: 5.00,
    priceCurrent: 3.50,
    image: "genesis-assets/chaveiros-recortados.webp",
    optionLabel: "Cor",
    options: ["Azul", "Amarelo", "Dourado", "Roxo", "Vermelho"],
    description: "Chaveiro colecionável com design exclusivo produzido pelos próprios integrantes da equipe. Produção minuciosa com filamento de alta resistência e argola metálica inclusa.",
    features: [
      "Modelagem e impressão 3D de precisão",
      "Argola e elo reforçados em metal antioxidante",
      "Design aerodinâmico com logotipo em relevo",
      "Cores vibrantes e acabamento polido"
    ]
  },
  {
    id: "combo-3-chaveiros",
    name: "Combo com 3 Chaveiros Gênesis",
    category: "chaveiro",
    priceOld: 15.00,
    priceCurrent: 10.00,
    image: "genesis-assets/chaveiros-recortados.webp",
    optionLabel: "Cores Principais",
    options: ["Sortidos", "Trio Azul / Amarelo / Dourado", "Trio Roxo / Vermelho / Azul"],
    description: "Pacote especial econômico! Escolha 3 unidades dos nossos chaveiros oficiais e garanta um desconto exclusivo para presentear amigos ou colecionar.",
    features: [
      "3 Chaveiros com cores à sua escolha",
      "Economia garantida no pacote",
      "Todos acompanham argola metálica individual",
      "Apoio direto aos projetos da equipe"
    ]
  },
  {
    id: "colecao-chaveiros-completa",
    name: "Coleção Completa Chaveiros (5 cores)",
    category: "chaveiro",
    priceOld: 25.00,
    priceCurrent: 15.00,
    image: "genesis-assets/chaveiros-recortados.webp",
    optionLabel: "Kit",
    options: ["1 de cada cor (Azul, Amarelo, Dourado, Roxo, Vermelho)"],
    description: "O conjunto definitivo da Gênesis Racing. Leve todas as cinco cores oficiais da coleção em uma embalagem especial. O item favorito de quem apoia a equipe.",
    features: [
      "Inclui 5 chaveiros: Azul, Amarelo, Dourado, Roxo e Vermelho",
      "Melhor custo-benefício por unidade",
      "Item oficial colecionável",
      "Acompanha adesivo exclusivo da equipe"
    ]
  },
  {
    id: "kit-bottoms-genesis",
    name: "Kit de Bottons Colecionáveis Gênesis (4 un)",
    category: "bottoms",
    priceOld: 24.90,
    priceCurrent: 16.90,
    image: "genesis-assets/logo-circular.webp",
    optionLabel: "Acabamento",
    options: ["Brilhante", "Fosco Premium"],
    description: "Kit com 4 bottons temáticos da Gênesis Racing para personalizar mochilas, jaquetas, bonés ou camisas. Impressão nítida com película protetora contra arranhões.",
    features: [
      "Alfinete de segurança resistente em aço",
      "Película protetora impermeável",
      "Diâmetro ideal de 4,5cm",
      "Impressão gráfica de alta resolução"
    ]
  },
  {
    id: "bottom-individual-logo",
    name: "Bottom Pin Emblema Gênesis Racing",
    category: "bottoms",
    priceOld: 8.00,
    priceCurrent: 5.00,
    image: "genesis-assets/logo-simbolo.webp",
    optionLabel: "Modelo",
    options: ["Símbolo Oficial", "Logo Redondo"],
    description: "Botton individual colecionável com a marca oficial da Gênesis. Perfeito para carregar a identidade da nossa equipe em qualquer lugar.",
    features: [
      "Acabamento durável e resistente a respingos",
      "Alfinete seguro que não danifica tecidos leves",
      "Design icônico da equipe",
      "Tamanho versátil para uso diário"
    ]
  }
];

// Gerenciador do Carrinho com Persistência
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

  addItem(product, variant = "Padrão", quantity = 1) {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.variant === variant
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.priceCurrent,
        image: product.image,
        variant,
        quantity: qty
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
 * Renderização dos produtos na grade do catálogo
 */
function renderProducts(categoryFilter = "all") {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  const filtered = categoryFilter === "all"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === categoryFilter);

  container.innerHTML = filtered.map(product => `
    <article class="product-card" data-category="${product.category}">
      <a href="produto.html?id=${product.id}" class="product-img-wrap" aria-label="Ver detalhes de ${product.name}">
        <span class="product-category-tag">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="product-info">
        <h3 class="product-title">
          <a href="produto.html?id=${product.id}" style="color: inherit; text-decoration: none;">${product.name}</a>
        </h3>
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
        <div style="display: flex; gap: 8px; margin-top: auto;">
          <a href="produto.html?id=${product.id}" class="btn-details">Detalhes</a>
          <button class="btn-buy" type="button" onclick="handleAddToCart('${product.id}')">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            COMPRAR
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Adição de produto a partir da grade
window.handleAddToCart = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const selectEl = document.getElementById(`select-${productId}`);
  const variant = selectEl ? selectEl.value : "Padrão";

  cart.addItem(product, variant, 1);
  openCartDrawer();
};

/**
 * Renderização da Página Própria do Produto (produto.html)
 */
function renderProductDetailPage() {
  const container = document.getElementById("productDetailLayout");
  if (!container) return;

  // Obtém o ID do produto da URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

  // Atualiza título da aba e breadcrumb
  document.title = `${product.name} | Gênesis Store`;
  const breadcrumbProduct = document.getElementById("breadcrumbProductName");
  if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

  const discount = (product.priceOld - product.priceCurrent).toFixed(2).replace(".", ",");

  container.innerHTML = `
    <!-- COLUNA 1: IMAGEM E SELO OFICIAL -->
    <div class="product-detail-gallery">
      <div class="product-detail-img-main">
        <span class="product-detail-badge">${product.category}</span>
        <img id="mainProductImg" src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-seal">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>Produto Oficial Gênesis Racing · Confecção e Apoio Direto à Equipe</span>
      </div>
    </div>

    <!-- COLUNA 2: DADOS, SELETORES E COMPRA -->
    <div class="product-detail-info">
      <span class="product-detail-category">Gênesis Racing / ${product.category}</span>
      <h1 class="product-detail-title">${product.name}</h1>
      
      <div class="product-detail-prices">
        <span class="product-detail-price-old">R$ ${product.priceOld.toFixed(2).replace(".", ",")}</span>
        <span class="product-detail-price-current">R$ ${product.priceCurrent.toFixed(2).replace(".", ",")}</span>
        <span class="product-detail-discount-tag">Economize R$ ${discount}</span>
      </div>

      <p class="product-detail-desc">${product.description}</p>

      ${product.options && product.options.length ? `
        <div class="product-detail-selector">
          <label for="detailVariantSelect">${product.optionLabel}:</label>
          <select id="detailVariantSelect">
            ${product.options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
          </select>
        </div>
      ` : ""}

      <div class="product-detail-quantity-wrap">
        <span>Quantidade:</span>
        <div class="detail-qty-control">
          <button class="detail-qty-btn" id="btnQtyMinus" type="button">-</button>
          <input class="detail-qty-input" id="detailQtyInput" type="number" min="1" value="1" readonly>
          <button class="detail-qty-btn" id="btnQtyPlus" type="button">+</button>
        </div>
      </div>

      <div class="product-detail-actions">
        <button class="btn-add-cart-large" id="btnAddCartDetail" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          Adicionar ao Carrinho
        </button>
        <button class="btn-whatsapp-direct" id="btnBuyWhatsappDirect" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.4 4.7Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/>
          </svg>
          Comprar Direto no WhatsApp
        </button>
      </div>

      <!-- ACORDEÃO INFORMATIVO -->
      <div class="product-info-accordion">
        <div class="accordion-item open">
          <button class="accordion-title" type="button">
            <span>Destaques & Especificações</span>
            <span>+</span>
          </button>
          <div class="accordion-content">
            <ul style="padding-left: 20px; margin: 6px 0;">
              ${product.features.map(f => `<li style="margin-bottom: 6px;">${f}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-title" type="button">
            <span>Como Funciona o Envio e Pagamento</span>
            <span>+</span>
          </button>
          <div class="accordion-content">
            <p>O pedido é confirmado diretamente com a equipe pelo WhatsApp. O pagamento é realizado via PIX e a entrega é combinada conforme a sua cidade.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Ações de Quantidade
  const qtyInput = document.getElementById("detailQtyInput");
  document.getElementById("btnQtyMinus")?.addEventListener("click", () => {
    let val = parseInt(qtyInput.value, 10) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });
  document.getElementById("btnQtyPlus")?.addEventListener("click", () => {
    let val = parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = val + 1;
  });

  // Ação Adicionar ao Carrinho
  document.getElementById("btnAddCartDetail")?.addEventListener("click", () => {
    const variantSelect = document.getElementById("detailVariantSelect");
    const variant = variantSelect ? variantSelect.value : "Padrão";
    const qty = parseInt(qtyInput.value, 10) || 1;
    cart.addItem(product, variant, qty);
    openCartDrawer();
  });

  // Ação WhatsApp Direto
  document.getElementById("btnBuyWhatsappDirect")?.addEventListener("click", () => {
    const variantSelect = document.getElementById("detailVariantSelect");
    const variant = variantSelect ? variantSelect.value : "Padrão";
    const qty = parseInt(qtyInput.value, 10) || 1;
    const subtotal = (product.priceCurrent * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const msg = [
      `Olá Gênesis Racing! Gostaria de fazer o pedido do seguinte produto:`,
      ``,
      `*${product.name}*`,
      `- Opção: ${variant}`,
      `- Quantidade: ${qty}`,
      `- Valor Estimado: ${subtotal}`,
      ``,
      `Poderiam me informar a disponibilidade e os detalhes de entrega e PIX?`
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  // Evento dos Acordeões
  document.querySelectorAll(".accordion-title").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      item?.classList.toggle("open");
    });
  });

  // Renderiza Produtos Relacionados (outros produtos)
  const relatedContainer = document.getElementById("relatedProductsGrid");
  if (relatedContainer) {
    const related = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 3);
    relatedContainer.innerHTML = related.map(p => `
      <article class="product-card" data-category="${p.category}">
        <a href="produto.html?id=${p.id}" class="product-img-wrap">
          <span class="product-category-tag">${p.category}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
        <div class="product-info">
          <h3 class="product-title">
            <a href="produto.html?id=${p.id}" style="color: inherit; text-decoration: none;">${p.name}</a>
          </h3>
          <div class="product-prices">
            <span class="price-old">R$ ${p.priceOld.toFixed(2).replace(".", ",")}</span>
            <span class="price-current">R$ ${p.priceCurrent.toFixed(2).replace(".", ",")}</span>
          </div>
          <a href="produto.html?id=${p.id}" class="btn-buy" style="text-decoration: none;">VER PRODUTO</a>
        </div>
      </article>
    `).join("");
  }
}

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
 * Envio do Orçamento Completo para o WhatsApp
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
  renderProductDetailPage();

  cart.subscribe(updateCartUI);
  updateCartUI();

  // Filtros de Categoria (caso esteja em catalogo.html)
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
