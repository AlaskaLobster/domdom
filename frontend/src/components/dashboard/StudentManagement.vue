<template>
  <div class="student-management">
    <div class="header">
      <h1>Quản lý học sinh</h1>
      <div class="header-actions">
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm học sinh..." class="search-input">
        <button @click="openAddModal" class="add-button">Thêm học sinh</button>
      </div>
    </div>
    
    <div class="stats-container">
      <div class="stat-card">
        <h3>Tổng số học sinh</h3>
        <p class="stat-number">{{ students.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Lớp nhiều học sinh nhất</h3>
        <p class="stat-number">{{ mostPopulatedClass }}</p>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>Đang tải dữ liệu...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchStudents" class="retry-btn">Thử lại</button>
    </div>

    <div v-else class="table-container">
      <table class="student-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">Mã học sinh</th>
            <th @click="sortBy('name')">Họ tên</th>
            <th @click="sortBy('class')">Lớp</th>
            <th @click="sortBy('dob')">Ngày sinh</th>
            <th @click="sortBy('gpa')">Điểm TB</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.class }}</td>
            <td>{{ formatDate(student.dob) }}</td>
            <td>
              <span :class="getGpaClass(student.gpa)">{{ student.gpa }}</span>
            </td>
            <td class="actions">
              <button @click="openEditModal(student)" class="edit-btn">✏️</button>
              <button @click="confirmDelete(student)" class="delete-btn">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for adding/editing students -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Cập nhật học sinh' : 'Thêm học sinh mới' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div v-if="formError" class="form-error">
          {{ formError }}
        </div>
        <div class="form-group">
          <label for="studentName">Họ tên <span class="required">*</span></label>
          <input type="text" id="studentName" v-model="currentStudent.name" required>
        </div>
        <div class="form-group">
          <label for="studentClass">Lớp <span class="required">*</span></label>
          <input type="text" id="studentClass" v-model="currentStudent.class" required>
        </div>
        <div class="form-group">
          <label for="studentDob">Ngày sinh <span class="required">*</span></label>
          <input type="date" id="studentDob" v-model="currentStudent.dob" required>
        </div>
        <div class="form-group">
          <label for="studentGpa">Điểm trung bình <span class="required">*</span></label>
          <input type="number" id="studentGpa" v-model="currentStudent.gpa" min="0" max="10" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="studentAddress">Địa chỉ</label>
          <input type="text" id="studentAddress" v-model="currentStudent.address">
        </div>
        <div class="form-group">
          <label for="studentPhone">Số điện thoại</label>
          <input type="tel" id="studentPhone" v-model="currentStudent.phone">
        </div>
        <div class="modal-actions">
          <button @click="closeModal" class="cancel-btn" :disabled="saving">Hủy</button>
          <button @click="saveStudent" class="save-btn" :disabled="saving">
            {{ saving ? 'Đang lưu...' : 'Lưu' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentManagement',
  data() {
    return {
      students: [],
      searchQuery: '',
      sortKey: 'id',
      sortDir: 'asc',
      showModal: false,
      isEditing: false,
      loading: false,
      saving: false,
      error: null,
      formError: null,
      currentStudent: {
        id: null,
        name: '',
        class: '',
        dob: '',
        gpa: 0,
        address: '',
        phone: ''
      }
    };
  },
  created() {
    this.fetchStudents();
  },
  computed: {
    filteredStudents() {
      const query = this.searchQuery.toLowerCase();
      let result = this.students.filter(student => 
        student.name.toLowerCase().includes(query) ||
        student.class.toLowerCase().includes(query)
      );
      
      // Sort the results
      result.sort((a, b) => {
        let aVal = a[this.sortKey];
        let bVal = b[this.sortKey];
        
        // Handle numeric values
        if (this.sortKey === 'gpa' || this.sortKey === 'id') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }
        
        // Sort according to direction
        if (this.sortDir === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      
      return result;
    },
    mostPopulatedClass() {
      if (this.students.length === 0) return 'Chưa có dữ liệu';
      
      const classCounts = {};
      this.students.forEach(student => {
        if (!classCounts[student.class]) {
          classCounts[student.class] = 0;
        }
        classCounts[student.class]++;
      });
      
      let maxClass = '';
      let maxCount = 0;
      
      for (const className in classCounts) {
        if (classCounts[className] > maxCount) {
          maxCount = classCounts[className];
          maxClass = className;
        }
      }
      
      return maxClass ? `${maxClass} (${maxCount} học sinh)` : 'Chưa có dữ liệu';
    }
  },
  methods: {
    async fetchStudents() {
    this.loading = true;
    this.error = null;

    try {
        const response = await fetch("http://localhost:5000/api/hocsinh"); // Đổi API
        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }

        this.students = await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu học sinh:", error);
        this.error = "Không thể tải dữ liệu học sinh. Vui lòng thử lại sau.";
    } finally {
        this.loading = false;
    }
},

    sortBy(key) {
      if (this.sortKey === key) {
        // Toggle direction if same key clicked
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDir = 'asc';
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    },
    getGpaClass(gpa) {
      if (gpa >= 8) return 'gpa-high';
      if (gpa >= 6.5) return 'gpa-medium';
      return 'gpa-low';
    },
    openAddModal() {
      this.isEditing = false;
      this.formError = null;
      this.currentStudent = {
        id: null,
        name: '',
        class: '',
        dob: '',
        gpa: 0,
        address: '',
        phone: ''
      };
      this.showModal = true;
    },
    openEditModal(student) {
      this.isEditing = true;
      this.formError = null;
      this.currentStudent = { ...student };
      this.showModal = true;
    },
    closeModal() {
      if (this.saving) return;
      this.showModal = false;
    },
    validateForm() {
      if (!this.currentStudent.name.trim()) {
        this.formError = 'Vui lòng nhập họ tên học sinh';
        return false;
      }
      if (!this.currentStudent.class.trim()) {
        this.formError = 'Vui lòng nhập lớp học';
        return false;
      }
      if (!this.currentStudent.dob) {
        this.formError = 'Vui lòng chọn ngày sinh';
        return false;
      }
      if (this.currentStudent.gpa < 0 || this.currentStudent.gpa > 10) {
        this.formError = 'Điểm trung bình phải nằm trong khoảng 0-10';
        return false;
      }
      
      this.formError = null;
      return true;
    },
    async saveStudent() {
      if (!this.validateForm()) return;
      
      this.saving = true;
      this.formError = null;
      
      try {
        let url = '/api/students';
        let method = 'POST';
        
        if (this.isEditing) {
          url = `/api/students/${this.currentStudent.id}`;
          method = 'PUT';
        }
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.currentStudent),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Có lỗi xảy ra khi lưu dữ liệu');
        }
        
        // Refresh the student list after successful save
        await this.fetchStudents();
        this.closeModal();
        
        // Show success message (you could implement a toast/notification system)
        alert(this.isEditing ? 'Cập nhật học sinh thành công!' : 'Thêm học sinh mới thành công!');
      } catch (error) {
        console.error('Error saving student:', error);
        this.formError = error.message || 'Không thể lưu dữ liệu học sinh. Vui lòng thử lại.';
      } finally {
        this.saving = false;
      }
    },
    async confirmDelete(student) {
      if (!confirm(`Bạn có chắc chắn muốn xóa học sinh "${student.name}"?`)) {
        return;
      }
      
      try {
        const response = await fetch(`/api/students/${student.id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi xóa học sinh');
        }
        
        // Update local state without fetching again
        this.students = this.students.filter(s => s.id !== student.id);
        
        // Show success message
        alert('Xóa học sinh thành công!');
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Lỗi: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
.student-management {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #555;
  font-size: 16px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin: 5px 0 0;
}

.loading, .error-message {
  text-align: center;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.error-message {
  color: #dc3545;
}

.retry-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}

.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
}

.student-table th {
  background-color: #f8f9fa;
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;
}

.student-table th:hover {
  background-color: #e9ecef;
}

.student-table td {
  padding: 12px 15px;
  border-top: 1px solid #e9ecef;
}

.actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
}

.edit-btn:hover, .delete-btn:hover {
  transform: scale(1.2);
}

.gpa-high {
  background-color: #28a745;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
}

.gpa-medium {
  background-color: #ffc107;
  color: #212529;
  padding: 3px 8px;
  border-radius: 12px;
}

.gpa-low {
  background-color: #dc3545;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.form-error {
  margin: 10px 20px 0;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  font-size: 14px;
}

.form-group {
  margin: 15px 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.required {
  color: #dc3545;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px 20px;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:disabled, .save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive styles */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    margin-top: 10px;
  }
  
  .search-input {
    flex: 1;
  }
  
  .stats-container {
    flex-direction: column;
  }
  
  .actions {
    flex-direction: column;
    gap: 5px;
  }
}
</style>