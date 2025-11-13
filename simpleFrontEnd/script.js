const API_BASE_URL = 'http://localhost:8080/api';

// Load users when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    // Handle form submission
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addUser();
    });
});

// Feature 1: Add new user via POST request
async function addUser() {
    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    
    const messageDiv = document.getElementById('message');
    
    if (!name || !age) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age })
        });
        
        if (response.ok) {
            const newUser = await response.json();
            showMessage(`User "${newUser.name}" added successfully!`, 'success');
            
            // Clear form
            document.getElementById('userForm').reset();
            
            // Reload users table
            loadUsers();
        } else {
            throw new Error('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        showMessage('Error adding user. Please make sure the backend is running.', 'error');
    }
}

// Feature 2: Load and display users in table via GET request
async function loadUsers() {
    const tableBody = document.getElementById('usersTableBody');
    
    // Show loading state
    tableBody.innerHTML = '<tr><td colspan="3" class="loading">Loading users...</td></tr>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        
        const users = await response.json();
        
        // Clear table body
        tableBody.innerHTML = '';
        
        if (users.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" class="no-data">No users found. Add a user to get started!</td></tr>';
            return;
        }
        // Populate table with users
        users.forEach(user => {
            const row = document.createElement('tr');
            if( user.name != null){
                row.innerHTML = `
                    <td>${escapeHtml(user.name)}</td>
                    <td>${user.age}</td>
                `;
                tableBody.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error loading users:', error);
        tableBody.innerHTML = '<tr><td colspan="3" class="no-data">Error loading users. Please make sure the backend is running on port 8080.</td></tr>';
    }
}

// Show message to user
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
