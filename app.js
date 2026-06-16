// 1. Mock Database Catalog
const inventoryDatabase = [
    { id: 1, name: "MacBook Pro M3", category: "Electronics", price: 1999.00, stock: 14 },
    { id: 2, name: "Mechanical Gaming Keyboard", category: "Accessories", price: 85.50, stock: 45 },
    { id: 3, name: "UltraWide 34\" Curved Monitor", category: "Electronics", price: 449.99, stock: 8 },
    { id: 4, name: "Ergonomic Office Chair", category: "Furniture", price: 249.00, stock: 22 },
    { id: 5, name: "Anker USB-C Multi-Hub", category: "Accessories", price: 39.99, stock: 120 },
    { id: 6, name: "Standing Desk Frame", category: "Furniture", price: 320.00, stock: 11 },
    { id: 7, name: "Sony WH-1000XM5 Headphones", category: "Electronics", price: 398.00, stock: 30 }
];

// 2. Extract Target Select DOM Handlers 
const sortBySelect = document.getElementById('sortBy');
const sortOrderSelect = document.getElementById('sortOrder');
const inventoryBody = document.getElementById('inventoryBody');

// 3. Layout Rendering Component Function
function displayInventory(items) {
    inventoryBody.innerHTML = "";

    items.forEach(product => {
        const rowHTML = `
            <tr>
                <td><strong>${product.name}</strong></td>
                <td><span class="badge">${product.category}</span></td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock} units</td>
            </tr>
        `;
        inventoryBody.insertAdjacentHTML('beforeend', rowHTML);
    });
}

// 4. API Core Processing Layer: Custom Sort Evaluation Callback Logic
function processDataSort() {
    const selectedField = sortBySelect.value;
    const selectedOrder = sortOrderSelect.value;

    // Create a shallow copy of the data array to protect integrity of the core source database 
    const sortedData = [...inventoryDatabase];

    sortedData.sort((itemA, itemB) => {
        let valA = itemA[selectedField];
        let valB = itemB[selectedField];

        // String checking normalization conversion logic
        if (typeof valA === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        // Comparison Sorting Engine
        if (valA < valB) {
            return selectedOrder === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return selectedOrder === 'asc' ? 1 : -1;
        }
        return 0; // Items match perfectly equal weight metrics parameters
    });

    // Send array package layout structure output downstream to engine components
    displayInventory(sortedData);
}

// 5. Connect Operational Interactivity Listeners 
sortBySelect.addEventListener('change', processDataSort);
sortOrderSelect.addEventListener('change', processDataSort);

// Run initial payload compilation execution when web document registers complete initialization 
document.addEventListener('DOMContentLoaded', () => {
    processDataSort();
});