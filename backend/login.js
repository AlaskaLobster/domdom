const axios = require('axios');

const login = async (role) => {
    const credentials = {
        teacher: { username: 'teacher', password: 'teacher123' },
        admin: { username: 'admin', password: 'admin123' },
        student: { username: 'student', password: 'student123' }
    };

    try {
const response = await axios.post('http://localhost:5000/login', credentials[role]);

        console.log('Login successful:', response.data);
    } catch (error) {
        console.error('Error logging in:', error.response.data);
    }
};

// Replace 'teacher' with 'admin' or 'student' to test other roles
login('teacher'); // Change this to 'admin' or 'student' as needed
