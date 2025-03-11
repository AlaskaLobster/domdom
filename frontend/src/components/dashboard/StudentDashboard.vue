<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'collapsed': sidebarCollapsed }]">
      <div class="sidebar-header">
        <h3 v-if="!sidebarCollapsed">Học Sinh Dashboard</h3>
        <button class="toggle-btn" @click="toggleSidebar">
          <i :class="sidebarCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'"></i>
        </button>
      </div>
      
      <div class="sidebar-menu">
        <router-link to="/scores" class="menu-item" title="Điểm & Hạnh Kiểm">
          <i class="fas fa-chart-bar"></i>
          <span v-if="!sidebarCollapsed">Điểm & Hạnh Kiểm</span>
        </router-link>
        
        <router-link to="/notifications" class="menu-item" title="Thông Báo">
          <i class="fas fa-bell"></i>
          <span v-if="!sidebarCollapsed">Thông Báo Hằng Ngày</span>
          <span v-if="!sidebarCollapsed && unreadNotifications > 0" class="badge">{{ unreadNotifications }}</span>
        </router-link>
        
        <router-link to="/info" class="menu-item" title="Thông Tin">
          <i class="fas fa-info-circle"></i>
          <span v-if="!sidebarCollapsed">Thông Tin</span>
        </router-link>
        
        <router-link to="/homework" class="menu-item" title="Bài Tập Về Nhà">
          <i class="fas fa-book"></i>
          <span v-if="!sidebarCollapsed">Bài Tập Về Nhà</span>
          <span v-if="!sidebarCollapsed && pendingHomework > 0" class="badge warning">{{ pendingHomework }}</span>
        </router-link>
      </div>
      
      <div class="sidebar-footer" v-if="!sidebarCollapsed">
        <div class="user-info">
          <img :src="studentAvatar" alt="Student Avatar" class="avatar">
          <div class="user-details">
            <p class="user-name">{{ studentName }}</p>
            <p class="user-class">{{ studentClass }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div :class="['main-content', { 'expanded': sidebarCollapsed }]">
      <div class="top-bar">
        <div class="search-container">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Tìm kiếm..." v-model="searchQuery">
        </div>
        
        <div class="user-controls">
          <button class="notification-btn">
            <i class="fas fa-bell"></i>
            <span class="badge" v-if="unreadNotifications > 0">{{ unreadNotifications }}</span>
          </button>
          
          <div class="user-dropdown">
            <img :src="studentAvatar" alt="Student Avatar" class="avatar small">
            <span>{{ studentName }}</span>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      
      <div class="content-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentDashboard',
  data() {
    return {
      sidebarCollapsed: false,
      searchQuery: '',
      unreadNotifications: 5,
      pendingHomework: 3,
      studentName: 'Nguyễn Văn A',
      studentClass: 'Lớp 10A1',
      studentAvatar: '/images/student-avatar.jpg'
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #3a3a3a;
  color: #fff;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #4a4a4a;
}

.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.sidebar-menu {
  padding: 15px 0;
  flex-grow: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #4a4a4a;
}

.menu-item i {
  font-size: 18px;
  min-width: 30px;
}

.menu-item .badge {
  margin-left: auto;
  background-color: #e74c3c;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.menu-item .badge.warning {
  background-color: #f39c12;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid #4a4a4a;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.avatar.small {
  width: 30px;
  height: 30px;
}

.user-details {
  overflow: hidden;
}

.user-name {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-class {
  margin: 0;
  font-size: 12px;
  color: #ccc;
}

.main-content {
  flex: 1;
  transition: all 0.3s ease;
}

.main-content.expanded {
  margin-left: -190px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-container {
  position: relative;
  width: 300px;
}

.search-container i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.search-container input {
  width: 100%;
  padding: 8px 10px 8px 35px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.user-controls {
  display: flex;
  align-items: center;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 20px;
}

.notification-btn .badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e74c3c;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-dropdown span {
  margin: 0 10px;
}

.content-area {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
}
</style>
