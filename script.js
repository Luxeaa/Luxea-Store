// Fungsi untuk format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

// Product Data
const products = [
    {
        id: 1,
        name: "iPhone XR",
        price: 3400000,
        image: "ipxr.jpeg",
        description: "iBox, 128gb, White, Face id & True Tone ON, Kotak + Charge.",
        sold: true // Ditandai sebagai terjual
    },
    {
        id: 2,
        name: "iPhone X",
        price: 3000000,
        image: "ipx.jpeg",
        description: "Inter All Operator, 64gb, White, Face id & True Tone ON, Kotak.",
        sold: true
    },
    {
        id: 3,
        name: "iPhone XS MAX",
        price: 4500000,
        image: "ipxsmax.jpeg",
        description: "iBox, 256gb, Gold, Face id & True Tone ON, Kotak.",
        sold: false
    },
    {
        id: 4,
        name: "iPhone 11",
        price: 5500000,
        image: "ip11-1.jpeg",
        description: "iBox, 128gb, Black, Face id ON, True Tone OFF, Kotak + Charge.",
        sold: true
    }
];

// Cart State
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});

// Display Products
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>${formatRupiah(product.price)}</strong></p>
                    
                    ${product.sold ? 
                        '<span class="badge bg-danger w-100">SOLD</span>' : 
                        `<button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Gass!</button>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Nomor WhatsApp Admin (ganti dengan nomor asli)
const adminPhoneNumber = "62895385976369"; 

// Add to Cart (direct to WhatsApp)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product.sold) {
        alert('Produk ini sudah terjual!');
        return;
    }

    // Format pesan WhatsApp
    const message = `Halo Admin, saya tertarik dengan produk berikut: \n\n` +
                    `📌 *${product.name}*\n` +
                    `💰 *${formatRupiah(product.price)}*\n\n` +
                    `Deskripsi: ${product.description}\n\n` +
                    `Apakah masih tersedia?\n\n` +
                    `Saya akan mengirimkan gambar produknya setelah ini.`; 

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect ke WhatsApp
    window.location.href = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
}



