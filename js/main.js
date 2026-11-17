/* =========================================================
   GÊNESIS STORE — JAVASCRIPT PRINCIPAL
   ========================================================= */

// Configuração de contato via WhatsApp (DDI + DDD + número)
const WHATSAPP_NUMBER = "5583999002723";

/**
 * Gera o link para a API do WhatsApp com mensagem codificada.
 * @param {string} message
 * @returns {string}
 */
function whatsappLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

// Inicialização e vinculação de elementos do DOM
document.addEventListener("DOMContentLoaded", () => {
  // 1. Botão flutuante do WhatsApp
  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) {
    whatsappFloat.href = whatsappLink("Olá! Conheci a Gênesis Store e gostaria de saber mais sobre os produtos.");
  }

  // 2. Cálculo de preços e seleção de produtos
  const totalPrice = document.getElementById("totalPrice");
  const colorOptions = [...document.querySelectorAll(".color-check")].map(checkbox => ({
    checkbox,
    quantity: document.getElementById(checkbox.id.replace("color-", "quantity-"))
  }));

  function packagePriceFor(quantity) {
    const costs = Array(quantity + 1).fill(Infinity);
    costs[0] = 0;
    for (let count = 1; count <= quantity; count++) {
      costs[count] = costs[count - 1] + 3.5;
      if (count >= 3) costs[count] = Math.min(costs[count], costs[count - 3] + 10);
    }
    return costs[quantity];
  }

  function selectedColors() {
    return colorOptions
      .filter(option => option.checkbox && option.checkbox.checked && Number(option.quantity.value) >= 1)
      .map(option => ({ name: option.checkbox.value, quantity: Math.floor(Number(option.quantity.value)) }));
  }

  function priceForOrder(items) {
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
    let price = packagePriceFor(quantity);
    if (items.length === 5 && quantity >= 5) {
      price = Math.min(price, 15 + packagePriceFor(quantity - 5));
    }
    return price;
  }

  function updatePrice() {
    if (!totalPrice) return;
    const items = selectedColors();
    const price = priceForOrder(items);
    totalPrice.textContent = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  colorOptions.forEach(option => {
    if (!option.checkbox || !option.quantity) return;

    option.checkbox.addEventListener("change", () => {
      option.quantity.disabled = !option.checkbox.checked;
      if (option.checkbox.checked && Number(option.quantity.value) < 1) {
        option.quantity.value = 1;
      }
      updatePrice();
    });

    option.quantity.addEventListener("input", () => {
      option.checkbox.checked = Number(option.quantity.value) >= 1;
      updatePrice();
    });
  });

  updatePrice();

  // 3. Validação do formulário de pedido e envio para o WhatsApp
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", function(event) {
      event.preventDefault();
      if (!this.reportValidity()) return;

      const items = selectedColors();
      if (!items.length) {
        alert("Selecione ao menos uma cor e a quantidade desejada para continuar.");
        return;
      }

      const name = document.getElementById("customerName")?.value.trim() || "";
      const phone = document.getElementById("customerPhone")?.value.trim() || "";
      const location = document.getElementById("deliveryLocation")?.value.trim() || "";
      const notes = document.getElementById("orderNotes")?.value.trim() || "";
      const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const price = priceForOrder(items);
      const productSummary = items.map(item => item.name + " x " + item.quantity).join(", ");

      const message = [
        "Olá! Quero fazer um pedido na Gênesis Store.",
        "",
        "Nome: " + name,
        "Meu WhatsApp: " + phone,
        "Cores e quantidades: " + productSummary,
        "Quantidade total: " + quantity,
        "Valor dos produtos: " + price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        "Cidade/UF: " + location,
        "Observações: " + (notes || "Nenhuma"),
        "",
        "Por favor, confirmem a disponibilidade, o valor da entrega e as orientações para pagamento."
      ].join("\n");

      window.open(whatsappLink(message), "_blank", "noopener");
    });
  }

  // 4. Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "FECHAR" : "MENU";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "MENU";
      });
    });
  }

  // 5. Acordeão do FAQ
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // 6. Efeito de scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // 7. CTA mobile ao rolar a página
  const mobileCta = document.getElementById("mobileCta");
  if (mobileCta) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 520) {
        mobileCta.classList.add("show");
      } else {
        mobileCta.classList.remove("show");
      }
    }, { passive: true });
  }

  // 8. Atualização do ano no footer
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
