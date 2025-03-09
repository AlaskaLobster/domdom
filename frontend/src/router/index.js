import { createRouter, createWebHistory } from 'vue-router';

import TeacherDashboard from '../components/dashboard/TeacherDashboard.vue';
import Login from '../components/auth/Login.vue';
import StudentManagement from '../components/dashboard/StudentManagement.vue';
import ClassManagement from '../components/dashboard/ClassManagement.vue';
import SubjectManagement from '../components/dashboard/SubjectManagement.vue';
import GradeManagement from '../components/dashboard/GradeManagement.vue';
import Notification from '../components/dashboard/Notification.vue';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/teacher-dashboard',
      name: 'TeacherDashboard',
      component: TeacherDashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/student-management',
      name: 'StudentManagement',
      component: StudentManagement
    },
    {
      path: '/class-management',
      name: 'ClassManagement',
      component: ClassManagement
    },
    {
      path: '/subject-management',
      name: 'SubjectManagement',
      component: SubjectManagement
    },
    {
      path: '/grade-management',
      name: 'GradeManagement',
      component: GradeManagement
    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notification
    },


  ]
});

export default router;
