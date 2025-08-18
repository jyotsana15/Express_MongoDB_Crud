// Global variables
let items = [];
let editingItemId = null;

// DOM elements
const itemForm = document.getElementById('itemForm');
const itemsTableBody = document.getElementById('itemsTableBody');
const alertContainer = document.getElementById('alertContainer');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
    setupFormListener();
});

function setupFormListener() {
    itemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
}

// CRUD Operations
async function loadItems() {
    try {
        const response = await fetch('/api/items');
        const result = await response.json();
        
        if (result.success) {
            items = result.data;
            displayItems();
            showAlert('Items loaded successfully!', 'success');
        } else {
            showAlert('Failed to load items', 'danger');
        }
    } catch (error) {
        console.error('Error loading items:', error);
        showAlert('Error loading items', 'danger');
    }
}

async function createItem(itemData) {
    try {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Item created successfully!', 'success');
            loadItems();
            resetForm();
        } else {
            showAlert(`Failed to create item: ${result.error}`, 'danger');
        }
    } catch (error) {
        console.error('Error creating item:', error);
        showAlert('Error creating item', 'danger');
    }
}

async function updateItem(id, itemData) {
    try {
        const response = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Item updated successfully!', 'success');
            loadItems();
            resetForm();
        } else {
            showAlert(`Failed to update item: ${result.error}`, 'danger');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        showAlert('Error updating item', 'danger');
    }
}

async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/items/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Item deleted successfully!', 'success');
            loadItems();
        } else {
            showAlert(`Failed to delete item: ${result.error}`, 'danger');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        showAlert('Error deleting item', 'danger');
    }
}

// Form handling
function handleFormSubmit() {
    const formData = getFormData();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
        showAlert('Please fill in all required fields', 'warning');
        return;
    }
    
    if (editingItemId) {
        updateItem(editingItemId, formData);
    } else {
        createItem(formData);
    }
}

function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        description: document.getElementById('description').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        inStock: document.getElementById('inStock').checked
    };
}

function editItem(id) {
    const item = items.find(item => item._id === id);
    if (item) {
        editingItemId = id;
        populateForm(item);
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-edit me-2"></i>Update Item';
        document.getElementById('submitBtn').className = 'btn btn-warning';
        
        // Scroll to form
        document.getElementById('itemForm').scrollIntoView({ behavior: 'smooth' });
    }
}

function populateForm(item) {
    document.getElementById('itemId').value = item._id;
    document.getElementById('name').value = item.name;
    document.getElementById('description').value = item.description;
    document.getElementById('price').value = item.price;
    document.getElementById('category').value = item.category;
    document.getElementById('inStock').checked = item.inStock;
}

function resetForm() {
    editingItemId = null;
    itemForm.reset();
    document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save me-2"></i>Save Item';
    document.getElementById('submitBtn').className = 'btn btn-success';
}

// Display functions
function displayItems() {
    if (items.length === 0) {
        itemsTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No items found</td></tr>';
        return;
    }
    
    itemsTableBody.innerHTML = items.map(item => `
        <tr>
            <td>
                <strong>${item.name}</strong>
                <br><small class="text-muted">${item.description}</small>
            </td>
            <td><span class="badge bg-secondary">${item.category}</span></td>
            <td><strong>$${item.price.toFixed(2)}</strong></td>
            <td>
                <span class="badge ${item.inStock ? 'bg-success' : 'bg-danger'}">
                    ${item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editItem('${item._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteItem('${item._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Utility functions
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// View item details (optional enhancement)
function viewItem(id) {
    const item = items.find(item => item._id === id);
    if (item) {
        const details = `
Name: ${item.name}
Description: ${item.description}
Price: $${item.price}
Category: ${item.category}
In Stock: ${item.inStock ? 'Yes' : 'No'}
Created: ${new Date(item.createdAt).toLocaleDateString()}
Updated: ${new Date(item.updatedAt).toLocaleDateString()}
        `;
        alert(details);
    }
}
