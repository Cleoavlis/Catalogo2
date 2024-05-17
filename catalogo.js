document.addEventListener("DOMContentLoaded", function() {
    const catalog = document.getElementById("catalog");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Mock Data (substitua por dados reais)
    const items = [
        { id: 1, name: "Conjunto Floral", price: 19.99, image: "produto1.jpg" },
        { id: 2, name: "Conjunto paty red", price: 29.99, image: "produto2.jpg" },
        { id: 3, name: "Vestido Floral PT", price: 29.99, image: "produto3.jpg" },
        { id: 4, name: "Conjunto Paty vinho", price: 29.99, image: "produto4.jpg" },
        { id: 5, name: "Conjunto Floral", price: 19.99, image: "produto5.jpg" },
        { id: 6, name: "Conjunto paty red", price: 29.99, image: "product2.jpg" },
        { id: 7, name: "Vestido Floral PT", price: 29.99, image: "product3.jpg" },
        { id: 8, name: "Conjunto Paty vinho", price: 29.99, image: "product4.jpg" },
        { id: 9, name: "Conjunto Floral", price: 19.99, image: "product1.jpg" },
        { id: 10, name: "Conjunto paty red", price: 29.99, image: "product2.jpg" },
        { id: 11, name: "Vestido Floral PT", price: 29.99, image: "product3.jpg" },
        { id: 12, name: "Conjunto Paty vinho", price: 29.99, image: "product4.jpg" },
    ];

    // Adicionar itens ao catálogo
    items.forEach(item => {
        const newItem = document.createElement("div");
        newItem.classList.add("catalog-item");
        newItem.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}">
            <p>R$ ${item.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${item.id}">Adicionar</button>
        `;
        catalog.appendChild(newItem);
    });

    // Adicionar evento de clique para adicionar itens ao carrinho
    catalog.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-cart")) {
            const itemId = parseInt(event.target.getAttribute("data-id"));
            const selectedItem = items.find(item => item.id === itemId);
            if (selectedItem) {
                const newItem = document.createElement("li");
                newItem.classList.add("cart-item"); // Adiciona a classe para estilização
                newItem.innerHTML = `
                    <span class="item-name">${selectedItem.name}</span> - R$<span class="item-price">${selectedItem.price.toFixed(2)}</span>
                    <button class="remove-from-cart">Remover</button>
                `;
                cartItems.appendChild(newItem);
                updateTotal();
            }
        }
    });

    // Adicionar evento de clique para remover itens do carrinho
    cartItems.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-from-cart")) {
            event.target.parentElement.remove(); // Remove o item do carrinho
            updateTotal(); // Atualiza o total do carrinho
        }
    });

    // Atualizar o total do carrinho
    function updateTotal() {
        let total = 0;
        cartItems.querySelectorAll("li").forEach(item => {
            const itemPrice = parseFloat(item.querySelector(".item-price").textContent);
            total += itemPrice;
        });
        cartTotal.textContent = total.toFixed(2);

        // Mostrar mensagem se nenhum produto estiver no carrinho
        if (cartItems.children.length === 0) {
            cartTotal.style.color = "red";
            cartTotal.textContent = "Nenhum produto adicionado";
        } else {
            cartTotal.style.color = "initial";
        }
    }

    // Enviar pedido via WhatsApp
    document.getElementById("send-order").addEventListener("click", function() {
        // Verificar se há produtos no carrinho
        if (cartItems.children.length === 0) {
            alert("Nenhum produto adicionado ao carrinho.");
            return; // Aborta o envio do pedido
        }

        let message = "Segue o meu pedido:\n";
        cartItems.querySelectorAll("li").forEach(item => {
            const itemName = item.querySelector(".item-name").textContent;
            const itemPrice = item.querySelector(".item-price").textContent;
            message += `${itemName} - R$${itemPrice}\n`;
        });
        message += `Total: R$${cartTotal.textContent}\n`;
    
        // Substitua "seu-número-do-whatsapp" pelo seu número de telefone, incluindo o código do país
        let whatsappLink = `https://wa.me/5561984254534?text=${encodeURIComponent(message)}`;
    
        window.open(whatsappLink);
    
        // Limpar o carrinho
        cartItems.innerHTML = ""; // Isso limpará todos os itens do carrinho
        updateTotal(); // Atualiza o total para zero após limpar o carrinho
    });
});
