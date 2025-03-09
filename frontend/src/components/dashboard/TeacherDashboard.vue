<template>
  <div class="teacher-dashboard">
    <!-- Navigation Toggle Button -->
    <button @click="toggleSidebar" class="nav-toggle">
      <span class="hamburger-icon">☰</span>
    </button>

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
              <span class="menu-icon">{{ getMenuIcon(item.title) }}</span>
              <span class="menu-title">{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn">
          <span class="logout-icon">➜</span>
          Đăng Xuất
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <header class="main-header">
        <h1>Giáo Viên</h1>
        <div class="user-profile">
          <img src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-1/474410354_1278741726763612_596614283419239916_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHqhy8Av9kXgnTtVJNVDM9JhaLiHKhz73WFouIcqHPvdUdkzNVkhmF8XJa1eQ6n0hiIJEy5CGeC-V-vsoguycKM&_nc_ohc=_lJ-QM2Y__QQ7kNvgHub3Jz&_nc_oc=AdjDNbeWkcrZte4WjfELdigPEIZWiunLGJA_0DUppp6g7f-SnHo90qyEJ1KOc1nqjhM&_nc_zt=24&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=ASi0DtD_kvKwobFh7olhxQa&oh=00_AYANExD_qXfDRgDcZHe5xDNXf7pH89ZKE6_QHSEFNg31cw&oe=67CCD0C9" alt="User Avatar" class="avatar">
          <span class="username">Thầy Khoa</span>
        </div>
      </header>

      <!-- Statistics Section -->
      <section class="dashboard-stats">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Tổng Học Sinh</h3>
            <div class="stat-value">{{ totalStudents }}</div>
          </div>
          <div class="stat-card">
            <h3>Điểm Trung Bình</h3>
            <div class="stat-value">{{ averageScore }}</div>
          </div>
          <div class="stat-card">
            <h3>Học Sinh Giỏi</h3>
            <div class="stat-value">{{ excellentStudents }}</div>
          </div>
        </div>
      </section>

      <!-- Quick Notifications -->
      <section class="notifications">
        <h2>Thông Báo Mới</h2>
        <div class="notification-list">
          <div class="notification-item">
            <span class="notification-icon">🏥</span>
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
      totalStudents: 2,
      averageScore: 0.00,
      excellentStudents: 0,
      menuItems: [
        { title: 'Giáo Viên', link: '/teacher-info', icon: '👤' },
        { title: 'Dashboard', link: '/teacher-dashboard', icon: '📊' },
        { title: 'Quản Lý Học Sinh', link: '/student-management', icon: '👥' },
        { title: 'Quản Lý Lớp Học', link: '/class-management', icon: '🏫' },
        { title: 'Quản Lý Môn Học', link: '/subject-management', icon: '📚' },
        { title: 'Quản Lý Điểm', link: '/grade-management', icon: '📝' },
        { title: 'Thông Báo', link: '/notification', icon: '🔔' }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    navigateTo(route) {
      this.currentRoute = route;
      // Implement actual navigation logic
    },
    getMenuIcon(title) {
      const item = this.menuItems.find(item => item.title === title);
      return item ? item.icon : '➡️';
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
}

.nav-toggle {
  position: fixed;
  top: 1px;
  left: 200px;
  z-index: 1000;
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar {
  width: 250px;
  background-color: #333;
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
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #2196F3;
}

.sidebar-logo .logo {
  width: 50px;
  margin-right: 10px;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  padding: 15px 20px;
  transition: background-color 0.3s;
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
}

.menu-icon {
  margin-right: 10px;
}

.main-content {
  flex-grow: 1;
  margin-left: 0;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.dashboard-stats {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #2196F3;
}

.notifications {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}

.notification-icon {
  margin-right: 10px;
  font-size: 20px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }

  .main-content {
    margin-left: 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>