import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchStudents = () => {
    return axios.get(`${API_URL}/hocsinh`);
};

export const fetchHomeworks = () => {
    return axios.get(`${API_URL}/homework`);
};

export const fetchTeachers = () => {
    return axios.get(`${API_URL}/giaovien`);
}; 

export const fetchGrades = () => {

    return axios.get(`${API_URL}/grades`);
};

export const fetchNotifications = () => {
    return axios.get(`${API_URL}/notifications`);
};
