import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hocsinh'; // Replace with your actual API URL

export const sendHomeworkNotification = (studentId, notificationContent) => {
    return axios.post(`${API_URL}/notifications`, { MaHocSinh: studentId, notificationContent });
};

// New fetchHomework function
export const fetchHomework = () => {
    return axios.get('http://localhost:5000/api/homework')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching homework:', error);
            throw error;
        });
};
