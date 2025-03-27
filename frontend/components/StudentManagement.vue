<template>
  <div class="student-management">


    <div class="header">

     <h1>Quản lý học sinh</h1>
     <div class="search-container">
  <input type="text" v-model="searchQuery" placeholder="Tìm kiếm học sinh..." class="search-input">
        <button @click="openAddModal" class="add-button">Thêm học sinh</button>
        <button @click="fetchStudents" class="refresh-button">Làm mới</button>
      </div>
    </div>

    <div class="stats-container" style="margin-left: 8px;">

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
            <th @click="sortBy('MaHocSinh')">Mã học sinh</th>
            <th @click="sortBy('HoTen')">Họ tên</th>
            <th @click="sortBy('lop')">Lớp</th>
            <th @click="sortBy('NgaySinh')">Ngày sinh</th>
            <th @click="sortBy('Điểm TB')">Điểm TB</th>
            <th @click="sortBy('DiaChi')">Địa chỉ</th>
            <th @click="sortBy('SoDienThoai')">Số điện thoại</th>
            <th @click="sortBy('Email')">Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.MaHocSinh">
            <td>{{ student.MaHocSinh }}</td>
            <td>{{ student.HoTen }}</td>
            <td>{{ student.lop }}</td>
            <td>{{ formatDate(student.NgaySinh) }}</td>
            <td>
              <span :class="getGpaClass(student['Điểm TB'])">{{ student['Điểm TB'] }}</span>
            </td>
            <td>{{ student.DiaChi }}</td>
            <td>{{ student.SoDienThoai }}</td>
            <td>{{ student.Email }}</td>
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
          <label for="studentId">Mã học sinh <span class="required">*</span></label>
          <input type="text" id="studentId" name="studentId" v-model="currentStudent.MaHocSinh" :readonly="isEditing" required>
          <small v-if="!isEditing" class="form-helper">Để trống để tự động tạo mã</small>
        </div>
        
        <div class="form-group">
          <label for="studentName">Họ tên <span class="required">*</span></label>
          <input type="text" id="studentName" name="studentName" v-model="currentStudent.HoTen" required>
        </div>
        
        <div class="form-group">
          <label for="studentClass">Lớp <span class="required">*</span></label>
          <input type="text" id="studentClass" name="studentClass" v-model="currentStudent.lop" required>
        </div>
        
        <div class="form-group">
          <label for="studentDob">Ngày sinh <span class="required">*</span></label>
          <input type="date" id="studentDob" name="studentDob" v-model="currentStudent.NgaySinh" required>
        </div>
        
        <div class="form-group">
          <label for="studentGpa">Điểm trung bình <span class="required">*</span></label>
          <input type="number" id="studentGpa" name="studentGpa" v-model="currentStudent['Điểm TB']" min="0" max="10" step="0.1" required>
        </div>
        
        <div class="form-group">
          <label for="studentAddress">Địa chỉ</label>
          <input type="text" id="studentAddress" name="studentAddress" v-model="currentStudent.DiaChi">
        </div>
        
        <div class="form-group">
          <label for="studentPhone">Số điện thoại</label>
          <input type="tel" id="studentPhone" name="studentPhone" v-model="currentStudent.SoDienThoai">
        </div>
        
        <div class="form-group">
          <label for="studentEmail">Email <span class="required">*</span></label>
          <input type="email" id="studentEmail" name="studentEmail" v-model="currentStudent.Email" required>
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
      sortKey: 'MaHocSinh',
      sortDir: 'asc',
      showModal: false,
      isEditing: false,
      loading: false,
      saving: false,
      error: null,
      formError: null,
      nextId: 1, // ID tự tăng cho học sinh mới
      currentStudent: {
        MaHocSinh: null,
        HoTen: '',
        lop: '',
        NgaySinh: '',
        'Điểm TB': 0,
        DiaChi: '',
        SoDienThoai: '',
        Email: ''
      }
    };
  },
  created() {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
      this.students = JSON.parse(savedData);
      this.updateNextId();
    } else {
      // Nếu không có, gọi API để lấy dữ liệu
      this.fetchStudents();
    }
  },
  computed: {
    filteredStudents() {
      const query = this.searchQuery.toLowerCase();
      let result = this.searchQuery ? this.students.filter(student => {
        return student.HoTen.toLowerCase().includes(query) || 
               student.lop.toLowerCase().includes(query) || 
               (student.Email && student.Email.toLowerCase().includes(query));
      }) : this.students;

      result.sort((a, b) => {
        let aVal = a[this.sortKey];
        let bVal = b[this.sortKey];
        
        if (this.sortKey === 'Điểm TB' || this.sortKey === 'MaHocSinh') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }

        return this.sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });

      return result;
    },
    mostPopulatedClass() {
      const classCounts = {};
      this.students.forEach(student => {
        if (!classCounts[student.lop]) {
          classCounts[student.lop] = 0;
        }
        classCounts[student.lop]++;
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
    updateNextId() {
      // Tìm ID lớn nhất hiện tại và cập nhật nextId
      if (this.students.length > 0) {
        this.nextId = Math.max(...this.students.map(s => parseInt(s.MaHocSinh))) + 1;
      } else {
        this.nextId = 1;
      }
    },
    async fetchStudents() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('http://localhost:5000/api/hocsinh', {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }

        if (Array.isArray(responseData.data)) {
          this.students = responseData.data;

          // Gọi API điểm trung bình và kết hợp dữ liệu
          const gpaResponse = await fetch('http://localhost:5000/api/diemtrungbinh');
          const gpaData = await gpaResponse.json();
          if (gpaResponse.ok && Array.isArray(gpaData.data)) {
              this.students.forEach(student => {
                  const gpaEntry = gpaData.data.find(gpa => gpa.MaHocSinh === student.MaHocSinh);
                  if (gpaEntry) {
                      student['Điểm TB'] = gpaEntry['Điểm TB']; // Gán điểm trung bình cho học sinh
                  }
              });
          }
          
          // Lưu vào localStorage và cập nhật nextId
          this.saveToLocalStorage();
          this.updateNextId();
        } else {
          this.students = [];
          this.error = "Dữ liệu không hợp lệ.";
        }

      } catch (error) {
        this.error = "Không thể tải dữ liệu học sinh. Vui lòng thử lại sau.";
      } finally {
        this.loading = false;
      }
    },
    saveToLocalStorage() {
      // Lưu dữ liệu vào localStorage
      localStorage.setItem('studentData', JSON.stringify(this.students));
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    },
    getGpaClass(gpa) {
      const numGpa = Number(gpa);
      if (numGpa >= 8) return 'gpa-high';
      if (numGpa >= 6.5) return 'gpa-medium';
      return 'gpa-low';
    },
    openAddModal() {
      this.isEditing = false;
      this.currentStudent = {
        MaHocSinh: '',  // Để trống để người dùng có thể nhập hoặc tự động tạo
        HoTen: '',
        lop: '',
        NgaySinh: '',
        'Điểm TB': 0,
        DiaChi: '',
        SoDienThoai: '',
        Email: ''
      };
      this.showModal = true;
    },
    openEditModal(student) {
      this.isEditing = true;
      this.currentStudent = JSON.parse(JSON.stringify(student));
      this.showModal = true;
    },
    closeModal() {
      if (this.saving) return;
      this.showModal = false;
      this.formError = null;
    },
    validateForm() {
      if (!this.currentStudent.HoTen.trim()) {
        this.formError = 'Vui lòng nhập họ tên học sinh';
        return false;
      }
      if (!this.currentStudent.lop.trim()) {
        this.formError = 'Vui lòng nhập lớp học';
        return false;
      }
      if (!this.currentStudent.NgaySinh) {
        this.formError = 'Vui lòng chọn ngày sinh';
        return false;
      }
      if (this.currentStudent['Điểm TB'] < 0 || this.currentStudent['Điểm TB'] > 10) {
        this.formError = 'Điểm trung bình phải nằm trong khoảng 0-10';
        return false;
      }
      if (!this.currentStudent.Email) {
        this.formError = 'Vui lòng nhập email học sinh';
        return false;
      }
      // Kiểm tra định dạng email đơn giản
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.currentStudent.Email)) {
        this.formError = 'Email không đúng định dạng';
        return false;
      }
      
      this.formError = null;
      return true;
    },
    saveStudent() {
      this.saving = true;
      
      if (!this.validateForm()) {
        this.saving = false;
        return;
      }

      // Nếu mã học sinh trống, sử dụng nextId
      if (!this.currentStudent.MaHocSinh && !this.isEditing) {
        this.currentStudent.MaHocSinh = this.nextId;
      }

      // Giả lập thời gian lưu
      setTimeout(() => {
        try {
          if (this.isEditing) {
            // Tìm và cập nhật học sinh
            const index = this.students.findIndex(s => s.MaHocSinh === this.currentStudent.MaHocSinh);
            if (index !== -1) {
              this.students.splice(index, 1, this.currentStudent);
            }
          } else {
            // Kiểm tra xem mã học sinh đã tồn tại chưa
            const existingStudent = this.students.find(s => s.MaHocSinh === this.currentStudent.MaHocSinh);
            if (existingStudent) {
              this.formError = 'Mã học sinh đã tồn tại. Vui lòng sử dụng mã khác.';
              this.saving = false;
              return;
            }
            
            // Thêm học sinh mới
            this.students.push({...this.currentStudent});
            
            // Chỉ tăng nextId nếu mã học sinh được tạo tự động
            if (parseInt(this.currentStudent.MaHocSinh) >= this.nextId) {
              this.nextId = parseInt(this.currentStudent.MaHocSinh) + 1;
            } else {
              this.nextId++;
            }
          }
          
          // Lưu vào localStorage
          this.saveToLocalStorage();
          
          this.closeModal();
          alert(this.isEditing ? 'Cập nhật học sinh thành công!' : 'Thêm học sinh mới thành công!');
        } catch (error) {
          this.formError = 'Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.';
        } finally {
          this.saving = false;
        }
      }, 500);
    },
    confirmDelete(student) {
      if (!confirm(`Bạn có chắc chắn muốn xóa học sinh "${student.HoTen}"?`)) {
        return;
      }
      
      try {
        // Xóa học sinh khỏi mảng
        const index = this.students.findIndex(s => s.MaHocSinh === student.MaHocSinh);
        if (index !== -1) {
          this.students.splice(index, 1);
          
          // Lưu vào localStorage
          this.saveToLocalStorage();
          
          alert('Xóa học sinh thành công!');
        }
      } catch (error) {
        alert('Lỗi: Không thể xóa học sinh');
      }
    }
  }
}
</script>

<style scoped>
/* Include your CSS here, or import it if external */
@import './StudentManagement.css';

</style>
