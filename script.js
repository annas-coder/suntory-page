// Product data
const products = [
    {
        id: 1,
        name: "ORA REG ORANGE PET",
        details: "60X4X1.5L ALDI",
        code: "3124480195210",
        highlighted: false
    },
    {
        id: 2,
        name: "ORA REG ORANGE PET",
        details: "120X4X1.5L",
        code: "3124480195210",
        highlighted: true // This product is highlighted
    },
    {
        id: 3,
        name: "ORA REG ORANGE PET",
        details: "60X4X1.5L ALDI",
        code: "3124480195210",
        highlighted: false
    }
];

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const clearIcon = document.querySelector('.clear-icon');
    const resultsHeader = document.querySelector('.results-header');
    
    // Clear search functionality
    clearIcon.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
    });
    
    // Search input functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterProducts(searchTerm);
    });
    
    // Filter products based on search term
    function filterProducts(searchTerm) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.details.toLowerCase().includes(searchTerm) ||
            product.code.includes(searchTerm)
        );
        
        updateResultsHeader(filteredProducts.length);
        // In a real application, you would re-render the cards here
        // For this static version, we'll keep the original cards
    }
    
    // Update results header with count
    function updateResultsHeader(count) {
        resultsHeader.textContent = `Search Result (${count})`;
    }
    
    // Initialize with all products
    updateResultsHeader(products.length);
});

// Create product card element
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-auto';
    
    const highlightedClass = product.highlighted ? 'highlighted' : '';
    const blueTextClass = product.highlighted ? 'blue-text' : ''; // Apply blue-text if highlighted
    
    col.innerHTML = `
        <div class="card product-card h-100 ${highlightedClass}">
            <div class="card-body p-0">
                <div class="product-image">
                    <div class="orangina-logo"></div>
                </div>
                <div class="product-info p-3">
                    <h5 class="card-title product-name ${blueTextClass}">${product.name}</h5>
                    <p class="card-text product-details">${product.details}</p>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const productName = this.querySelector('.product-name');
            if (!productName.classList.contains('blue-text')) {
                productName.style.color = '#87ceeb';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const productName = this.querySelector('.product-name');
            if (!productName.classList.contains('blue-text')) {
                productName.style.color = '#333';
            }
        });
    });
});
