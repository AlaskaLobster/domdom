<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>HỆ THỐNG QUẢN LÝ</h2>
      </div>
      
      <div class="sidebar-menu">
        <div class="menu-item" @click="activeMenu = 'dashboard'">
          <i class="fas fa-tachometer-alt"></i>
          <span>Tổng quan</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'teachers'">
          <i class="fas fa-chalkboard-teacher"></i>
          <span>Quản lý giáo viên</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'students'">
          <i class="fas fa-user-graduate"></i>
          <span>Quản lý học sinh</span>
        </div>
        
        <div class="menu-item" @click="toggleSemesterSubmenu">
          <i class="fas fa-calendar-alt"></i>
          <span>Học kỳ</span>
        </div>
        
        <div class="submenu" v-if="isSemesterSubmenuOpen">
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
          <span>Thông báo hệ thống</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'grades'">
          <i class="fas fa-chart-line"></i>
          <span>Quản lý điểm</span>
        </div>
        
        <div class="menu-item" @click="activeMenu = 'conduct'">
          <i class="fas fa-clipboard-check"></i>
          <span>Hạnh kiểm</span>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <div class="menu-item">
          <i class="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="main-content">
      <div class="header">
        <div class="user-info">
          <img src="" alt="Admin avatar" class="avatar">
          <div class="user-details">
            <span class="user-name">Admin</span>
            <span class="user-role">Quản trị viên</span>
          </div>
        </div>
      </div>
      
      <div class="content-area">
        <div v-if="activeMenu === 'dashboard'" class="dashboard-view">
          <h1>Tổng quan hệ thống</h1>
          <div>
            <h2>Danh sách giáo viên</h2>
            <ul>
              <li v-for="teacher in teachers" :key="teacher.id">{{ teacher.name }}</li>
            </ul>
            <h2>Danh sách học sinh</h2>
            <ul>
              <li v-for="student in students" :key="student.id">{{ student.name }}</li>
            </ul>
            <h2>Danh sách lớp học</h2>
            <ul>
              <li v-for="classItem in classes" :key="classItem.id">{{ classItem.name }}</li>

            </ul>
            <h2>Danh sách bài tập</h2>
            <ul>
              <li v-for="homework in homework" :key="homework.id">{{ homework.content }}</li>
            </ul>
          </div>

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
        
        <div v-if="activeMenu === 'teachers'" class="teachers-view">
          <h1>Quản lý giáo viên</h1>
        </div>
        
        <div v-if="activeMenu === 'students'" class="students-view">
          <h1>Quản lý học sinh</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      isSemesterSubmenuOpen: false,
      activeMenu: 'dashboard',
      teachers: [],
      students: [],
      classes: [],
      homework: [],
      announcements: [],
      grades: [],
    };
  },
  methods: {
    toggleSemesterSubmenu() {
      this.isSemesterSubmenuOpen = !this.isSemesterSubmenuOpen;
    },
    fetchTeachers() {
      axios.get('http://localhost:5000/api/giaovien').then(response => {
        this.teachers = response.data;
      }).catch(error => {
        console.error('Error fetching teachers:', error);
      });
    },
    fetchStudents() {
      axios.get('http://localhost:5000/api/hocsinh').then(response => {
        this.students = response.data;
      }).catch(error => {
        console.error('Error fetching students:', error);
      });
    },
    fetchClasses() {
      axios.get('http://localhost:5000/api/lop').then(response => {
        this.classes = response.data;
      }).catch(error => {
        console.error('Error fetching classes:', error);
      });
    },
    fetchHomework() {
      axios.get('http://localhost:5000/api/homework').then(response => {
        this.homework = response.data;
      }).catch(error => {
        console.error('Error fetching homework:', error);
      });
    },
  },
  mounted() {
    this.fetchTeachers();
    this.fetchStudents();
    this.fetchClasses();
    this.fetchHomework();
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  position: relative;
}

/* Sidebar styles */
.sidebar {
  position: fixed;         
  left: 0;                 
  top: 0;
  bottom: 0;
  width: 270px;
  background: #3a2c50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  z-index: 10;  
  justify-content: center;          
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  font-size: 20px; 
  letter-spacing: 2px; 
}

.sidebar-menu {
  flex-grow: 1;
  overflow-y: auto;
}

.menu-item {
  font-size: 18px;
  letter-spacing: 1px;
  padding: 20px 25px;
}

.menu-item:hover {
  background: #34495e;
}

.menu-item i {
  font-size: 22px; 
  margin-right: 20px; 
}

.sidebar-footer {
  font-size: 18px;
  letter-spacing: 1px;
  padding: 20px 25px;
}

/* Main content styles */
.main-content {
  margin-left: 270px;      
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

.content-area {
  padding: 20px;
  margin-left: 20px; /* Added margin to create space from the sidebar */
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
</style>
