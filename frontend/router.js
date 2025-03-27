import { createRouter, createWebHistory } from 'vue-router';

import Teacherdashboard from './components/Teacherdashboard.vue';
import AssignHomework from './components/AssignHomework.vue';
import TeacherInfo from './components/TeacherInfo.vue';
import StudentManagement from './components/StudentManagement.vue'; // Import the StudentManagement component
import StudentDashboard from './components/StudentDashboard.vue'; // Import the StudentDashboard component
import Login from './components/Login.vue'; // Import the Login component
import AdminDashboard from './components/AdminDashboard.vue'; // Import the AdminDashboard component

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect root path to login
  },
  {
    path: '/teacher-dashboard',
    component: Teacherdashboard
  },
  {
    path: '/student-management',
    component: StudentManagement
  },
  {
    path: '/teacher-info',  
    component: TeacherInfo
  },
  {
    path: '/student-dashboard',
    component: StudentDashboard
  },
  {
    path: '/assign-homework',
    component: AssignHomework
  },

  {
    path: '/admin-dashboard',
    component: AdminDashboard // Add the Admin Dashboard route
  },
  {
    path: '/login',
    component: Login // Add the Login route
  },
  // Define routes for the application
  // Add any other necessary routes here...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
