<template>
  <div class="class-management-container">
    <div class="header">
      <h1>Quản Lý Lớp Học</h1>
      <div class="header-actions">
        <input type="text" class="search-input" placeholder="Tìm kiếm lớp học..." v-model="searchQuery">
        <button class="add-class-btn" @click="openAddClassModal">+ Thêm lớp học mới</button>
      </div>
    </div>

    <div class="statistics-section">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>Tổng số lớp</h3>
          <p>{{ classes.length }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>Tổng số học sinh</h3>
          <p>{{ totalStudents }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🏫</div>
        <div class="stat-content">
          <h3>Giáo viên chủ nhiệm</h3>
          <p>{{ totalTeachers }}</p>
        </div>
      </div>
    </div>

    <div class="table-section">
      <table class="class-table">
        <thead>
          <tr>
            <th @click="sortBy('class_id')">Mã lớp</th>
            <th @click="sortBy('class_name')">Tên lớp</th>
            <th @click="sortBy('grade_level')">Khối</th>
            <th @click="sortBy('teacher_name')">Giáo viên chủ nhiệm</th>
            <th @click="sortBy('student_count')">Sĩ số</th>
            <th @click="sortBy('room')">Phòng học</th>
            <th @click="sortBy('school_year')">Năm học</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classItem in filteredClasses" :key="classItem.id">
            <td>{{ classItem.class_id }}</td>
            <td>{{ classItem.class_name }}</td>
            <td>{{ classItem.grade_level }}</td>
            <td>{{ classItem.teacher_name }}</td>
            <td>{{ classItem.student_count }}</td>
            <td>{{ classItem.room }}</td>
            <td>{{ classItem.school_year }}</td>
            <td class="action-buttons">
              <button class="view-btn" @click="viewClassDetails(classItem.id)" title="Xem chi tiết">👁️</button>
              <button class="edit-btn" @click="openEditClassModal(classItem)" title="Sửa lớp học">✏️</button>
              <button class="delete-btn" @click="confirmDeleteClass(classItem.id)" title="Xóa lớp học">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Class Modal -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Sửa thông tin lớp học' : 'Thêm lớp học mới' }}</h2>
          <button class="close-modal-btn" @click="closeModal">&times;</button>
        </div>
        
        <div class="form-group">
          <label for="className">Tên lớp</label>
          <input type="text" id="className" v-model="currentClass.class_name" required>
        </div>
        
        <div class="form-group">
          <label for="gradeLevel">Khối</label>
          <select id="gradeLevel" v-model="currentClass.grade_level" required>
            <option value="">Chọn khối lớp</option>
            <option v-for="grade in gradeOptions" :key="grade" :value="grade">{{ grade }}</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="teacherId">Giáo viên chủ nhiệm</label>
          <select id="teacherId" v-model="currentClass.teacher_id" required>
            <option value="">Chọn giáo viên</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="room">Phòng học</label>
          <input type="text" id="room" v-model="currentClass.room" required>
        </div>
        
        <div class="form-group">
          <label for="schoolYear">Năm học</label>
          <select id="schoolYear" v-model="currentClass.school_year" required>
            <option value="">Chọn năm học</option>
            <option v-for="year in schoolYears" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Hủy bỏ</button>
          <button class="save-btn" @click="saveClass">Lưu</button>
        </div>
      </div>
    </div>

    <!-- Class Details Modal -->
    <div class="modal-overlay" v-if="showDetailsModal">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2>Chi tiết lớp: {{ selectedClass.class_name }}</h2>
          <button class="close-modal-btn" @click="showDetailsModal = false">&times;</button>
        </div>
        
        <div class="class-details">
          <div class="detail-section">
            <h3>Thông tin lớp học</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <strong>Mã lớp:</strong> {{ selectedClass.class_id }}
              </div>
              <div class="detail-item">
                <strong>Tên lớp:</strong> {{ selectedClass.class_name }}
              </div>
              <div class="detail-item">
                <strong>Khối:</strong> {{ selectedClass.grade_level }}
              </div>
              <div class="detail-item">
                <strong>Phòng học:</strong> {{ selectedClass.room }}
              </div>
              <div class="detail-item">
                <strong>Năm học:</strong> {{ selectedClass.school_year }}
              </div>
              <div class="detail-item">
                <strong>Giáo viên chủ nhiệm:</strong> {{ selectedClass.teacher_name }}
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <div class="section-header">
              <h3>Danh sách học sinh ({{ classStudents.length }})</h3>
              <button class="add-student-btn" @click="openAddStudentModal">+ Thêm học sinh</button>
            </div>
            
            <div class="student-list">
              <table class="student-table">
                <thead>
                  <tr>
                    <th>Mã học sinh</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Số điện thoại</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student in classStudents" :key="student.id">
                    <td>{{ student.student_id }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ formatDate(student.birthdate) }}</td>
                    <td>{{ student.gender === 'M' ? 'Nam' : 'Nữ' }}</td>
                    <td>{{ student.phone }}</td>
                    <td class="action-buttons">
                      <button class="remove-btn" @click="removeStudentFromClass(student.id)" title="Xóa khỏi lớp">❌</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="showDetailsModal = false">Đóng</button>
          <button class="print-btn" @click="printClassDetails">In danh sách</button>
        </div>
      </div>
    </div>

    <!-- Add Student to Class Modal -->
    <div class="modal-overlay" v-if="showAddStudentModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Thêm học sinh vào lớp {{ selectedClass.class_name }}</h2>
          <button class="close-modal-btn" @click="showAddStudentModal = false">&times;</button>
        </div>
        
        <div class="form-group">
          <label for="studentSearch">Tìm kiếm học sinh</label>
          <input type="text" id="studentSearch" v-model="studentSearchQuery" placeholder="Nhập tên hoặc mã học sinh...">
        </div>
        
        <div class="student-search-results">
          <table class="student-table">
            <thead>
              <tr>
                <th>Mã học sinh</th>
                <th>Họ tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in filteredAvailableStudents" :key="student.id">
                <td>{{ student.student_id }}</td>
                <td>{{ student.name }}</td>
                <td>{{ formatDate(student.birthdate) }}</td>
                <td>{{ student.gender === 'M' ? 'Nam' : 'Nữ' }}</td>
                <td>
                  <button class="add-btn" @click="addStudentToClass(student.id)">Thêm vào lớp</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="showAddStudentModal = false">Đóng</button>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div class="modal-overlay" v-if="showDeleteConfirm">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Xác nhận xóa</h2>
          <button class="close-modal-btn" @click="showDeleteConfirm = false">&times;</button>
        </div>
        
        <p>Bạn có chắc chắn muốn xóa lớp học này không? Tất cả học sinh trong lớp sẽ không còn thuộc lớp này nữa.</p>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="showDeleteConfirm = false">Hủy bỏ</button>
          <button class="save-btn" @click="deleteClass">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassManagement',
  data() {
    return {
      classes: [],
      teachers: [],
      allStudents: [],
      classStudents: [],
      searchQuery: '',
      studentSearchQuery: '',
      sortKey: 'class_name',
      sortOrder: 'asc',
      showModal: false,
      showDetailsModal: false,
      showAddStudentModal: false,
      showDeleteConfirm: false,
      isEditing: false,
      classToDeleteId: null,
      selectedClassId: null,
      currentClass: {
        id: null,
        class_id: '',
        class_name: '',
        grade_level: '',
        teacher_id: '',
        teacher_name: '',
        room: '',
        school_year: '',
        student_count: 0
      },
      selectedClass: {},
      gradeOptions: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
      schoolYears: ['2024-2025', '2025-2026', '2026-2027', '2027-2028']
    };
  },
  computed: {
    filteredClasses() {
      let filtered = this.classes;
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(classItem => 
          classItem.class_id.toLowerCase().includes(query) ||
          classItem.class_name.toLowerCase().includes(query) ||
          classItem.grade_level.toLowerCase().includes(query) ||
          classItem.teacher_name.toLowerCase().includes(query) ||
          classItem.room.toLowerCase().includes(query)
        );
      }
      
      // Sort classes
      filtered.sort((a, b) => {
        let compareA = a[this.sortKey];
        let compareB = b[this.sortKey];
        
        // Convert to numbers for numerical comparison if needed
        if (this.sortKey === 'student_count') {
          compareA = parseInt(compareA);
          compareB = parseInt(compareB);
        } else {
          compareA = compareA.toString().toLowerCase();
          compareB = compareB.toString().toLowerCase();
        }
        
        if (compareA < compareB) return this.sortOrder === 'asc' ? -1 : 1;
        if (compareA > compareB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      
      return filtered;
    },
    
    filteredAvailableStudents() {
      // Students not already in this class
      let availableStudents = this.allStudents.filter(student => 
        !this.classStudents.some(cs => cs.id === student.id)
      );
      
      // Filter by search query
      if (this.studentSearchQuery) {
        const query = this.studentSearchQuery.toLowerCase();
        availableStudents = availableStudents.filter(student => 
          student.student_id.toLowerCase().includes(query) ||
          student.name.toLowerCase().includes(query)
        );
      }
      
      return availableStudents;
    },
    
    totalStudents() {
      return this.classes.reduce((total, classItem) => total + parseInt(classItem.student_count), 0);
    },
    
    totalTeachers() {
      // Count unique teachers
      const uniqueTeachers = new Set();
      this.classes.forEach(classItem => {
        if (classItem.teacher_id) {
          uniqueTeachers.add(classItem.teacher_id);
        }
      });
      return uniqueTeachers.size;
    }
  },
  created() {
    this.fetchClasses();
    this.fetchTeachers();
    this.fetchAllStudents();
  },
  methods: {
    async fetchClasses() {
      try {
        const response = await fetch('http://localhost:8000/api/classes');
        const data = await response.json();
        this.classes = data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu lớp học:', error);
      }
    },
    
    async fetchTeachers() {
      try {
        const response = await fetch('http://localhost:8000/api/teachers');
        const data = await response.json();
        this.teachers = data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu giáo viên:', error);
      }
    },
    
    async fetchAllStudents() {
      try {
        const response = await fetch('http://localhost:8000/api/students');
        const data = await response.json();
        this.allStudents = data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu học sinh:', error);
      }
    },
    
    async fetchClassStudents(classId) {
      try {
        const response = await fetch(`http://localhost:8000/api/classes/${classId}/students`);
        const data = await response.json();
        this.classStudents = data;
      } catch (error) {
        console.error('Lỗi khi tải danh sách học sinh của lớp:', error);
      }
    },
    
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    
    openAddClassModal() {
      this.isEditing = false;
      this.currentClass = {
        id: null,
        class_id: this.generateClassId(),
        class_name: '',
        grade_level: '',
        teacher_id: '',
        room: '',
        school_year: this.schoolYears[0],
        student_count: 0
      };
      this.showModal = true;
    },
    
    openEditClassModal(classItem) {
      this.isEditing = true;
      this.currentClass = { ...classItem };
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    confirmDeleteClass(id) {
      this.classToDeleteId = id;
      this.showDeleteConfirm = true;
    },
    
    generateClassId() {
      // Generate a class ID based on current timestamp
      const timestamp = new Date().getTime().toString().slice(-6);
      return `C${timestamp}`;
    },
    
    async saveClass() {
      try {
        // If adding a new class, ensure it has a class_id
        if (!this.isEditing && !this.currentClass.class_id) {
          this.currentClass.class_id = this.generateClassId();
        }
        
        // Get teacher name from selected teacher ID
        if (this.currentClass.teacher_id) {
          const selectedTeacher = this.teachers.find(t => t.id === this.currentClass.teacher_id);
          if (selectedTeacher) {
            this.currentClass.teacher_name = selectedTeacher.name;
          }
        }
        
        const url = this.isEditing 
          ? `http://localhost:8000/api/classes/${this.currentClass.id}` 
          : 'http://localhost:8000/api/classes';
        
        const method = this.isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentClass)
        });
        
        if (response.ok) {
          this.fetchClasses();
          this.closeModal();
        } else {
          console.error('Lỗi khi lưu lớp học:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi khi lưu lớp học:', error);
      }
    },
    
    async deleteClass() {
      try {
        const response = await fetch(`http://localhost:8000/api/classes/${this.classToDeleteId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          this.classes = this.classes.filter(classItem => classItem.id !== this.classToDeleteId);
          this.showDeleteConfirm = false;
        } else {
          console.error('Lỗi khi xóa lớp học:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi khi xóa lớp học:', error);
      }
    },
    
    async viewClassDetails(classId) {
      this.selectedClassId = classId;
      
      // Find the selected class
      this.selectedClass = this.classes.find(c => c.id === classId) || {};
      
      // Fetch students in this class
      await this.fetchClassStudents(classId);
      
      this.showDetailsModal = true;
    },
    
    openAddStudentModal() {
      this.studentSearchQuery = '';
      this.showAddStudentModal = true;
    },
    
    async addStudentToClass(studentId) {
      try {
        const response = await fetch(`http://localhost:8000/api/classes/${this.selectedClassId}/students`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ student_id: studentId })
        });
        
        if (response.ok) {
          // Refresh student list
          await this.fetchClassStudents(this.selectedClassId);
          
          // Update the student count in the selected class
          this.selectedClass.student_count = this.classStudents.length;
          
          // Update the class in the classes array
          const classIndex = this.classes.findIndex(c => c.id === this.selectedClassId);
          if (classIndex !== -1) {
            this.classes[classIndex].student_count = this.classStudents.length;
          }
        } else {
          console.error('Lỗi khi thêm học sinh vào lớp:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi khi thêm học sinh vào lớp:', error);
      }
    },
    
    async removeStudentFromClass(studentId) {
      if (confirm('Bạn có chắc chắn muốn xóa học sinh này khỏi lớp?')) {
        try {
          const response = await fetch(`http://localhost:8000/api/classes/${this.selectedClassId}/students/${studentId}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            // Remove from the current list
            this.classStudents = this.classStudents.filter(student => student.id !== studentId);
            
            // Update the student count in the selected class
            this.selectedClass.student_count = this.classStudents.length;
            
            // Update the class in the classes array
            const classIndex = this.classes.findIndex(c => c.id === this.selectedClassId);
            if (classIndex !== -1) {
              this.classes[classIndex].student_count = this.classStudents.length;
            }
          } else {
            console.error('Lỗi khi xóa học sinh khỏi lớp:', await response.text());
          }
        } catch (error) {
          console.error('Lỗi khi xóa học sinh khỏi lớp:', error);
        }
      }
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    },
    
    printClassDetails() {
      const printWindow = window.open('', '_blank');
      
      // Create print content
      let printContent = `
        <html>
        <head>
          <title>Danh sách lớp ${this.selectedClass.class_name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            .school-info { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="school-info">
            <h2>TRƯỜNG HỌC ABC</h2>
            <p>Địa chỉ: 123 Đường ABC, Quận XYZ, Thành phố ABC</p>
          </div>
          
          <h1>DANH SÁCH HỌC SINH LỚP ${this.selectedClass.class_name}</h1>
          
          <p><strong>Năm học:</strong> ${this.selectedClass.school_year}</p>
          <p><strong>Giáo viên chủ nhiệm:</strong> ${this.selectedClass.teacher_name}</p>
          <p><strong>Sĩ số:</strong> ${this.classStudents.length} học sinh</p>
          
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã học sinh</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      // Add student rows
      this.classStudents.forEach((student, index) => {
        printContent += `
          <tr>
            <td>${index + 1}</td>
            <td>${student.student_id}</td>
            <td>${student.name}</td>
            <td>${this.formatDate(student.birthdate)}</td>
            <td>${student.gender === 'M' ? 'Nam' : 'Nữ'}</td>
            <td>${student.phone}</td>
          </tr>
        `;
      });
      
      // Close the table and document
      printContent += `
            </tbody>
          </table>
          
          <div style="margin-top: 50px; text-align: right;">
            <p>Ngày ... tháng ... năm ...</p>
            <p style="margin-top: 20px;">Giáo viên chủ nhiệm</p>
            <p style="margin-top: 50px;">${this.selectedClass.teacher_name}</p>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = function() {
        printWindow.print();
      };
    }
  }
}
</script>

<style scoped>
.class-management-container {
  background-color: #f4f6f8;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 250px;
}

.add-class-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.statistics-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 15px;
  opacity: 0.7;
}

.stat-content h3 {
  margin: 0 0 10px;
  color: #333;
  font-size: 0.9rem;
}

.stat-content p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2575fc;
}

.table-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}

.class-table, .student-table {
  width: 100%;
  border-collapse: collapse;
}

.class-table th, .student-table th {
  background-color: #f4f6f8;
  padding: 12px;
  text-align: left;
  cursor: pointer;
}

.class-table td, .student-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.view-btn, .edit-btn, .delete-btn, .add-btn, .remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  font-size: 1.1rem;
}

.view-btn:hover, .edit-btn:hover, .delete-btn:hover, .add-btn:hover, .remove-btn:hover {
  transform: scale(1.2);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.modal-large {
  width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-modal-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input, 
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #2575fc;
  box-shadow: 0 0 0 2px rgba(37, 117, 252, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-btn, .cancel-btn, .print-btn, .add-student-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.save-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.print-btn {
  background-color: #2196F3;
  color: white;
}

.print-btn:hover {
  background-color: #0b7dda;
}

.add-student-btn {
  background-color: #4CAF50;
  color: white;
  font-size: 0.9rem;
  padding: 8px 15px;
}

/* Class Details Styles */
.class-details {
  margin-bottom: 20px;
}

.detail-section {
  margin-bottom: 25px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.detail-item {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.student-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 6px;
}

.student-search-results {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-top: 15px;
}

.add-btn {
  color: #4CAF50;
}

.remove-btn {
  color: #F44336;
}
</style>
