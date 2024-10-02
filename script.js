// script.js (Example)
document.addEventListener('DOMContentLoaded', () => {
    // Example: Toggle like button
    const likeButtons = document.querySelectorAll('.post-actions img');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('liked')) {
                button.src = 'images/like-icon.png'; // Set to unliked
                button.classList.remove('liked');
            } else {
                button.src = 'images/liked-icon.png'; // Set to liked
                button.classList.add('liked');
            }
        });
    });
});
// script.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform basic validation
    if (email === '' || password === '') {
        alert('Please fill out all fields');
    } else {
        alert('Login Successful');
    }
});
