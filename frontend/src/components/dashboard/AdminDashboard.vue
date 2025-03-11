<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!isSidebarCollapsed">HỆ THỐNG QUẢN LÝ</h2>
        <button class="toggle-btn" @click="toggleSidebar">
          <i class="fas" :class="isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
        </button>
      </div>
      
      <div class="sidebar-menu">
        <div class="menu-item" @click="activeMenu = 'dashboard'">
          <i class="fas fa-tachometer-alt"></i>
          <span v-if="!isSidebarCollapsed">Tổng quan</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'teachers'">
          <i class="fas fa-chalkboard-teacher"></i>
          <span v-if="!isSidebarCollapsed">Quản lý giáo viên</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'students'">
          <i class="fas fa-user-graduate"></i>
          <span v-if="!isSidebarCollapsed">Quản lý học sinh</span>
        </div>
        
        <div class="menu-item" @click="toggleSemesterSubmenu">
          <i class="fas fa-calendar-alt"></i>
          <span v-if="!isSidebarCollapsed">Học kỳ</span>
          <i v-if="!isSidebarCollapsed" class="fas" :class="isSemesterSubmenuOpen ? 'fa-angle-down' : 'fa-angle-right'"></i>
        </div>
        
        <div class="submenu" v-if="isSemesterSubmenuOpen && !isSidebarCollapsed">
          <div class="menu-subitem" @click="activeMenu = 'semester1'">
            <i class="fas fa-angle-right"></i>
            <span>Học kỳ 1</span>
          </div>
          <div class="menu-subitem" @click="activeMenu = 'semester2'">
            <i class="fas fa-angle-right"></i>
            <span>Học kỳ 2</span>
          </div>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'announcements'">
          <i class="fas fa-bullhorn"></i>
          <span v-if="!isSidebarCollapsed">Thông báo hệ thống</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'grades'">
          <i class="fas fa-chart-line"></i>
          <span v-if="!isSidebarCollapsed">Quản lý điểm</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'conduct'">
          <i class="fas fa-clipboard-check"></i>
          <span v-if="!isSidebarCollapsed">Hạnh kiểm</span>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <div class="menu-item">
          <i class="fas fa-sign-out-alt"></i>
          <span v-if="!isSidebarCollapsed">Đăng xuất</span>
        </div>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="main-content">
      <div class="header">
        <div class="user-info">
          <img src="" alt="Admin avatar" class="avatar">
          <div v-if="!isSidebarCollapsed" class="user-details">
            <span class="user-name">Admin</span>
            <span class="user-role">Quản trị viên</span>
          </div>
        </div>
      </div>
      
      <div class="content-area">
        <!-- Dashboard view -->
        <div v-if="activeMenu === 'dashboard'" class="dashboard-view">
          <h1>Tổng quan hệ thống</h1>
          <div class="stats-container">
            <div class="stat-card">
              <i class="fas fa-chalkboard-teacher"></i>
              <div class="stat-info">
                <span class="stat-title">Tổng giáo viên</span>
                <span class="stat-value">48</span>
              </div>
            </div>
            
            <div class="stat-card">
              <i class="fas fa-user-graduate"></i>
              <div class="stat-info">
                <span class="stat-title">Tổng học sinh</span>
                <span class="stat-value">1,245</span>
              </div>
            </div>
            
            <div class="stat-card">
              <i class="fas fa-school"></i>
              <div class="stat-info">
                <span class="stat-title">Tổng lớp học</span>
                <span class="stat-value">36</span>
              </div>
            </div>
            
            <div class="stat-card">
              <i class="fas fa-bullhorn"></i>
              <div class="stat-info">
                <span class="stat-title">Thông báo mới</span>
                <span class="stat-value">5</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Other views would be implemented similarly -->
        <div v-if="activeMenu === 'teachers'" class="teachers-view">
          <h1>Quản lý giáo viên</h1>
          <!-- Content for teacher management -->
        </div>
        
        <div v-if="activeMenu === 'students'" class="students-view">
          <h1>Quản lý học sinh</h1>
          <!-- Content for student management -->
        </div>
        
        <!-- More views for other menu items -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      isSidebarCollapsed: false,
      isSemesterSubmenuOpen: false,
      activeMenu: 'dashboard'
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      // Close submenu when sidebar is collapsed
      if (this.isSidebarCollapsed) {
        this.isSemesterSubmenuOpen = false;
      }
    },
    toggleSemesterSubmenu() {
      this.isSemesterSubmenuOpen = !this.isSemesterSubmenuOpen;
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  background: #2c3e50;
  color: #ecf0f1;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
}

.toggle-btn {
  background: none;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  padding: 5px;
}

.sidebar-menu {
  flex-grow: 1;
  overflow-y: auto;
}

.menu-item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-item:hover {
  background: #34495e;
}

.menu-item i {
  margin-right: 15px;
  width: 20px;
  text-align: center;
}

.menu-subitem {
  padding: 10px 20px 10px 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-subitem:hover {
  background: #34495e;
}

.menu-subitem i {
  margin-right: 10px;
  width: 15px;
  text-align: center;
  font-size: 12px;
}

.sidebar-footer {
  border-top: 1px solid #34495e;
}

/* Main content styles */
.main-content {
  flex-grow: 1;
  background: #f5f7fa;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  justify-content: flex-end;
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
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.user-role {
  font-size: 12px;
  color: #7f8c8d;
}

.content-area {
  padding: 20px;
  flex-grow: 1;
}

/* Dashboard specific styles */
.dashboard-view h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
}

.stat-card i {
  font-size: 30px;
  margin-right: 20px;
  color: #3498db;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-title {
  font-size: 14px;
  color: #7f8c8d;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    height: 100%;
    z-index: 999;
  }
  
  .sidebar:not(.collapsed) {
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  }
}
</style>
