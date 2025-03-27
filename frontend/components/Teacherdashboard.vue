<template>
  <div class="teacher-dashboard">
    <!-- Navigation Toggle Button -->
    <button @click="toggleSidebar" class="nav-toggle">
      <i class="fas fa-bars"></i>
    </button>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <!-- Sidebar Navigation -->
    <aside :class="['sidebar', { 'sidebar-open': sidebarOpen }]">
      <div class="sidebar-logo">
        <img src="https://th.bing.com/th?q=Sun+School+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247" alt="School Logo" class="logo">
        <h2>Giáo Viên EDU</h2>
      </div>
      
      <nav class="sidebar-menu">
        <ul>
          <li v-for="(item, index) in menuItems" :key="index" 
              :class="{ 'active': currentRoute === item.link }">
            <a :href="item.link" @click="navigateTo(item.link)">
              <i :class="item.icon"></i>
              <span class="menu-title">{{ item.title }}</span>
            </a>
          </li>
          <li>
            <a @click="navigateTo('/assign-homework')">
              <i class="fas fa-pencil-alt"></i>
              <span class="menu-title">Giao Bài Tập</span>
            </a>
          </li>

        </ul>
      </nav>

      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          Đăng Xuất
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <header class="main-header">
        <h1>Giáo Viên</h1>
        <div class="user-profile" @click="navigateTo('/teacher-info')" role="button">
          <img src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/474410354_1278741726763612_596614283419239916_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHqhy8Av9kXgnTtVJNVDM9JhaLiHKhz73WFouIcqHPvdUdkzNVkhmF8XJa1eQ6n0hiIJEy5CGeC-V-vsoguycKM&_nc_ohc=LfDtQD_PhwEQ7kNvgHdLTMh&_nc_oc=AdmraOwit-aYZj1VkzOaVI5acMcue-2Cf727d7Qc8PMYT7giwgWGGnRSS1f8xrSxahQ&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=baZlN5B2QD_G3xfRsiZSuQ&oh=00_AYEDIDDfTY6QfK61MwoO0g3d2ww0t658-SUEELCPBi_GvQ&oe=67E0598F" alt="User Avatar" class="avatar">
          <span class="username">Thầy Khoa</span>
        </div>
      </header>

      <!-- Statistics Section -->
      <section class="dashboard-stats">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="stat-info">
              <h3>Tổng Học Sinh</h3>
              <div class="stat-value">{{ totalStudents }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-info">
              <h3>Điểm Trung Bình</h3>
              <div class="stat-value">{{ averageScore }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-medal"></i>
            </div>
            <div class="stat-info">
              <h3>Học Sinh Giỏi</h3>
              <div class="stat-value">{{ excellentStudents }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Notifications -->
      <section class="notifications">
        <h2><i class="fas fa-bell"></i> Thông Báo Mới</h2>
        <div class="notification-list">
          <div class="notification-item">
            <div class="notification-icon">
              <i class="fas fa-viruses"></i>
            </div>
            <p>Thông Báo Về Dịch "Cúm Mùa" Trở Lại</p>
          </div>
          <!-- Add more notifications as needed -->
        </div>
      </section>

      <!-- Additional Widgets or Charts can be added here -->
      <section class="dashboard-widgets">
        <StudentStatisticsChart />
      </section>
    </main>
  </div>
</template>

<script>
import StudentStatisticsChart from './StudentStatisticsChart.vue';

export default {
  name: 'TeacherDashboard',
  components: {
    StudentStatisticsChart
  },
  data() {
    return {
      sidebarOpen: false,
      currentRoute: '/teacher-dashboard',
      totalStudents: 30,
      averageScore: 8.90,
      excellentStudents: 23,
      menuItems: [
        { title: 'Giáo Viên', link: '/teacher-info', icon: 'fas fa-user-tie' },
        { title: 'Dashboard', link: '/teacher-dashboard', icon: 'fas fa-th-large' },
        { title: 'Quản Lý Học Sinh', link: '/student-management', icon: 'fas fa-users' },
        { title: 'Quản Lý Lớp Học', link: '/class-management', icon: 'fas fa-school' },
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    navigateTo(route) {
      this.currentRoute = route;
      console.log(`Navigating to: ${route}`);
      this.$router.push(route); // Uncommented to enable routing

      // this.$router.push(route);
    },
    logout() {
      // Implement logout logic
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.teacher-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Roboto', sans-serif;
}

.nav-toggle {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1000;
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.nav-toggle:hover {
  background-color: #0d8bf2;
}

.sidebar {
  width: 280px;
  background: linear-gradient(to bottom, #2c3e50, #1a252f);
  color: white;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 900;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 10px rgba(0,0,0,0.1);
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #2196F3, #1976D2);
}

.sidebar-logo .logo {
  width: 50px;
  margin-right: 10px;
  border-radius: 10px;
}

.sidebar-menu {
  flex-grow: 1;
  padding: 10px 0;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 0;
  transition: background-color 0.2s;
  margin: 5px 10px;
  border-radius: 6px;
  overflow: hidden;
}

.sidebar-menu li:hover,
.sidebar-menu li.active {
  background-color: rgba(255,255,255,0.1);
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 12px 20px;
}

.sidebar-menu i {
  font-size: 18px;
  width: 30px;
  text-align: center;
  margin-right: 10px;
}

.sidebar-menu li.active a {
  background-color: #2196F3;
  border-radius: 6px;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.logout-btn {
  display: flex;
  align-items: center;
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255,255,255,0.1);
}

.logout-btn i {
  margin-right: 10px;
}

.main-content {
  flex-grow: 1;
  margin-left: 0;
  padding: 20px;
  transition: margin-left 0.3s ease;
  padding-top: 60px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.user-profile {
  display: flex;
  align-items: center;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #2196F3;
  object-fit: cover;
}

.username {
  font-weight: 500;
}

.dashboard-stats {
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

.stat-icon {
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196F3;
  padding: 15px;
  border-radius: 12px;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 24px;
}

.stat-info {
  flex-grow: 1;
}

.stat-info h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #777;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #2196F3;
}

.notifications {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.notifications h2 {
  display: flex;
  align-items: center;
  margin-top: 0;
  color: #333;
  font-size: 18px;
}

.notifications h2 i {
  margin-right: 10px;
  color: #2196F3;
}

.notification-list {
  margin-top: 15px;
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background-color: #eef5ff;
}

.notification-icon {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 12px;
  border-radius: 10px;
  margin-right: 15px;
}

.notification-icon i {
  font-size: 18px;
}

.dashboard-widgets {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
.user-profile {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.user-profile:hover {
  background-color: #f0f7ff;
}
</style>
