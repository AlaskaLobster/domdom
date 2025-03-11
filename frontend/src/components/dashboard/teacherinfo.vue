<template>
    <div class="teacher-info-container">
      <div class="profile-section">
        <div class="profile-header">
          <h2>Thông Tin Giáo Viên</h2>
          <button class="edit-profile-btn" @click="editMode = !editMode">
            {{ editMode ? 'Hủy' : 'Chỉnh Sửa' }}
          </button>
        </div>
  
        <div class="profile-content">
          <div class="profile-avatar">
            <img :src="teacherData.avatar" alt="Teacher Avatar">
            <div v-if="editMode" class="change-avatar">
              <button class="upload-btn">Đổi ảnh</button>
            </div>
          </div>
  
          <div class="profile-details">
            <form @submit.prevent="saveChanges">
              <div class="form-group">
                <label>Họ và Tên</label>
                <input v-if="editMode" type="text" v-model="formData.name" required>
                <p v-else>{{ teacherData.name }}</p>
              </div>
              
              <div class="form-group">
                <label>Mã Giáo Viên</label>
                <p>{{ teacherData.id }}</p>
              </div>
              
              <div class="form-group">
                <label>Chuyên Môn</label>
                <input v-if="editMode" type="text" v-model="formData.subject">
                <p v-else>{{ teacherData.subject }}</p>
              </div>
              
              <div class="form-group">
                <label>Email</label>
                <input v-if="editMode" type="email" v-model="formData.email" required>
                <p v-else>{{ teacherData.email }}</p>
              </div>
              
              <div class="form-group">
                <label>Số Điện Thoại</label>
                <input v-if="editMode" type="tel" v-model="formData.phone">
                <p v-else>{{ teacherData.phone }}</p>
              </div>
              
              <div class="form-group">
                <label>Địa Chỉ</label>
                <textarea v-if="editMode" v-model="formData.address"></textarea>
                <p v-else>{{ teacherData.address }}</p>
              </div>
              
              <div v-if="editMode" class="form-actions">
                <button type="submit" class="save-btn">Lưu Thay Đổi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <div class="stats-section">
        <h2>Thống Kê Giảng Dạy</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <h3>Lớp Chủ Nhiệm</h3>
              <p>{{ teacherData.homeroom || 'Không có' }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">👨‍👩‍👦</div>
            <div class="stat-info">
              <h3>Tổng Học Sinh</h3>
              <p>{{ teacherData.totalStudents }} học sinh</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-info">
              <h3>Môn Giảng Dạy</h3>
              <p>{{ teacherData.subjects?.length || 0 }} môn</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-info">
              <h3>Số Tiết/Tuần</h3>
              <p>{{ teacherData.periodsPerWeek || 0 }} tiết</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="classes-section">
        <h2>Lớp Giảng Dạy</h2>
        <div class="classes-list">
          <div v-for="(classItem, index) in teacherData.classes" :key="index" class="class-item">
            <h3>{{ classItem.name }}</h3>
            <div class="class-details">
              <p><span>Môn học:</span> {{ classItem.subject }}</p>
              <p><span>Sĩ số:</span> {{ classItem.students }} học sinh</p>
              <p><span>Điểm TB lớp:</span> {{ classItem.averageScore.toFixed(1) }}</p>
            </div>
            <button @click="viewClassDetails(classItem.id)" class="view-class-btn">Xem Chi Tiết</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TeacherInfo',
    data() {
      return {
        editMode: false,
        formData: {
          name: '',
          subject: '',
          email: '',
          phone: '',
          address: ''
        },
        teacherData: {
          id: 'GV001',
          name: 'Nguyễn Văn A',
          subject: 'Toán học',
          email: 'teacher@school.edu.vn',
          phone: '0901234567',
          address: '123 Đường Giáo Dục, Quận 1, TP.HCM',
          avatar: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-1/474410354_1278741726763612_596614283419239916_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHqhy8Av9kXgnTtVJNVDM9JhaLiHKhz73WFouIcqHPvdUdkzNVkhmF8XJa1eQ6n0hiIJEy5CGeC-V-vsoguycKM&_nc_ohc=_lJ-QM2Y__QQ7kNvgHub3Jz&_nc_oc=AdjDNbeWkcrZte4WjfELdigPEIZWiunLGJA_0DUppp6g7f-SnHo90qyEJ1KOc1nqjhM&_nc_zt=24&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=ASi0DtD_kvKwobFh7olhxQa&oh=00_AYANExD_qXfDRgDcZHe5xDNXf7pH89ZKE6_QHSEFNg31cw&oe=67CCD0C9',
          homeroom: 'Lớp 10A1',
          totalStudents: 83,
          periodsPerWeek: 18,
          subjects: ['Toán Đại Số', 'Toán Hình Học'],
          classes: [
            { id: 'c1', name: 'Lớp 10A1', subject: 'Toán Đại Số', students: 30, averageScore: 7.8 },
            { id: 'c2', name: 'Lớp 11A2', subject: 'Toán Đại Số', students: 28, averageScore: 8.1 },
            { id: 'c3', name: 'Lớp 12A3', subject: 'Toán Hình Học', students: 25, averageScore: 7.5 }
          ]
        }
      };
    },
    created() {
      // Initialize form data with current teacher data
      this.formData = {
        name: this.teacherData.name,
        subject: this.teacherData.subject,
        email: this.teacherData.email,
        phone: this.teacherData.phone,
        address: this.teacherData.address
      };
      
      // Fetch teacher data from parent or API if needed
      this.fetchTeacherData();
    },
    methods: {
      fetchTeacherData() {
        // If connected to your dashboard, you can get data from there
        // For example, through props or Vuex store
        // This could replace the hardcoded data in teacherData
      },
      saveChanges() {
        // Update teacher data with form data
        this.teacherData.name = this.formData.name;
        this.teacherData.subject = this.formData.subject;
        this.teacherData.email = this.formData.email;
        this.teacherData.phone = this.formData.phone;
        this.teacherData.address = this.formData.address;
        
        // API call to save changes would go here
        
        // Exit edit mode
        this.editMode = false;
        
        // Update parent component if needed
        this.$emit('update:teacher', this.teacherData);
      },
      viewClassDetails(classId) {
        // Navigate to class details using router
        this.$router.push(`/teacher/class/${classId}`);
        
        // Or emit event to parent component
        this.$emit('view-class', classId);
      }
    }
  };
  </script>
  
  <style scoped>
  .teacher-info-container {
    padding: 20px;
  }
  
  .profile-section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 25px;
    overflow: hidden;
  }
  
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
  }
  
  .profile-header h2 {
    margin: 0;
    color: #333;
    font-size: 18px;
  }
  
  .edit-profile-btn {
    background-color: #2196F3;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .edit-profile-btn:hover {
    background-color: #1976D2;
  }
  
  .profile-content {
    display: flex;
    padding: 20px;
  }
  
  .profile-avatar {
    margin-right: 30px;
    text-align: center;
    position: relative;
  }
  
  .profile-avatar img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #f0f0f0;
  }
  
  .change-avatar {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
  
  .upload-btn {
    background-color: rgba(0,0,0,0.7);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
  
  .profile-details {
    flex: 1;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    color: #666;
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  .form-group p {
    margin: 0;
    padding: 8px 0;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .form-group textarea {
    height: 80px;
    resize: vertical;
  }
  
  .form-actions {
    text-align: right;
    margin-top: 20px;
  }
  
  .save-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .save-btn:hover {
    background-color: #388E3C;
  }
  
  .stats-section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 25px;
  }
  
  .stats-section h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  
  .stat-card {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .stat-icon {
    font-size: 24px;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3f2fd;
    border-radius: 50%;
    color: #2196F3;
  }
  
  .stat-info h3 {
    margin: 0 0 5px;
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
  
  .stat-info p {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  
  .classes-section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    padding: 20px;
  }
  
  .classes-section h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
  
  .classes-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .class-item {
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #eee;
    background-color: #f9f9f9;
  }
  
  .class-item h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2196F3;
    font-size: 16px;
  }
  
  .class-details p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
  
  .class-details p span {
    font-weight: 500;
    color: #333;
  }
  
  .view-class-btn {
    display: block;
    width: 100%;
    background-color: #2196F3;
    color: white;
    border: none;
    padding: 8px 0;
    border-radius: 4px;
    margin-top: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-class-btn:hover {
    background-color: #1976D2;
  }
  
  @media (max-width: 768px) {
    .profile-content {
      flex-direction: column;
    }
    
    .profile-avatar {
      margin-right: 0;
      margin-bottom: 20px;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .classes-list {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>