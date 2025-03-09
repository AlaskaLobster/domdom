<template>
  <div class="grade-management-container">
    <div class="header">
      <h1>Quản Lý Điểm</h1>
      <div class="header-actions">
        <input type="text" class="search-input" placeholder="Tìm kiếm điểm theo học sinh..." v-model="searchQuery">
        <button class="add-grade-btn" @click="openAddGradeModal">+ Thêm điểm mới</button>
      </div>
    </div>

    <div class="statistics-section">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>Tổng số điểm</h3>
          <p>{{ grades.length }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-content">
          <h3>Điểm trung bình</h3>
          <p>{{ calculateAverageScore() }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>Điểm không đạt</h3>
          <p>{{ countFailingGrades() }}</p>
        </div>
      </div>
    </div>

    <div class="table-section">
      <table class="grade-table">
        <thead>
          <tr>
            <th @click="sortBy('student_id')">Mã học sinh</th>
            <th @click="sortBy('student_name')">Tên học sinh</th>
            <th @click="sortBy('subject_id')">Mã môn học</th>
            <th @click="sortBy('subject_name')">Tên môn học</th>
            <th @click="sortBy('score')">Điểm</th>
            <th>Đánh giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in filteredGrades" :key="grade.id">
            <td>{{ grade.student_id }}</td>
            <td>{{ grade.student_name }}</td>
            <td>{{ grade.subject_id }}</td>
            <td>{{ grade.subject_name }}</td>
            <td>
              <span class="score-badge" :class="getScoreClass(grade.score)">
                {{ grade.score }}
              </span>
            </td>
            <td>{{ getGradeEvaluation(grade.score) }}</td>
            <td class="action-buttons">
              <button class="edit-btn" @click="openEditGradeModal(grade)">✏️</button>
              <button class="delete-btn" @click="confirmDeleteGrade(grade.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Grade Modal -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Sửa điểm' : 'Thêm điểm mới' }}</h2>
          <button class="close-modal-btn" @click="closeModal">&times;</button>
        </div>
        
        <div class="form-group">
          <label for="studentId">Học sinh</label>
          <select id="studentId" v-model="currentGrade.student_id" required>
            <option value="">Chọn học sinh</option>
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.id }} - {{ student.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="subjectId">Môn học</label>
          <select id="subjectId" v-model="currentGrade.subject_id" required>
            <option value="">Chọn môn học</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
              {{ subject.id }} - {{ subject.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="score">Điểm số</label>
          <input type="number" id="score" v-model="currentGrade.score" min="0" max="10" step="0.1" required>
        </div>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Hủy bỏ</button>
          <button class="save-btn" @click="saveGrade">Lưu</button>
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
        
        <p>Bạn có chắc chắn muốn xóa điểm này không?</p>
        
        <div class="modal-actions">
          <button class="cancel-btn" @click="showDeleteConfirm = false">Hủy bỏ</button>
          <button class="save-btn" @click="deleteGrade">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradeManagement',
  data() {
    return {
      grades: [],
      students: [],
      subjects: [],
      searchQuery: '',
      sortKey: 'student_id',
      sortOrder: 'asc',
      showModal: false,
      showDeleteConfirm: false,
      isEditing: false,
      gradeToDeleteId: null,
      currentGrade: {
        id: null,
        student_id: '',
        subject_id: '',
        score: null
      }
    };
  },
  computed: {
    filteredGrades() {
      let filtered = this.grades;
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(grade => 
          grade.student_id.toLowerCase().includes(query) ||
          grade.student_name.toLowerCase().includes(query) ||
          grade.subject_id.toLowerCase().includes(query) ||
          grade.subject_name.toLowerCase().includes(query)
        );
      }
      
      // Sort grades
      filtered.sort((a, b) => {
        let compareA = a[this.sortKey];
        let compareB = b[this.sortKey];
        
        // Convert to numbers for numerical comparison if needed
        if (this.sortKey === 'score') {
          compareA = parseFloat(compareA);
          compareB = parseFloat(compareB);
        } else {
          compareA = compareA.toString().toLowerCase();
          compareB = compareB.toString().toLowerCase();
        }
        
        if (compareA < compareB) return this.sortOrder === 'asc' ? -1 : 1;
        if (compareA > compareB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      
      return filtered;
    }
  },
  created() {
    this.fetchGrades();
    this.fetchStudents();
    this.fetchSubjects();
  },
  methods: {
    async fetchGrades() {
      try {
        const response = await fetch('http://localhost:8000/api/grades');
        const data = await response.json();
        this.grades = data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu điểm:', error);
      }
    },
    
    async fetchStudents() {
      try {
        const response = await fetch('http://localhost:8000/api/students');
        const data = await response.json();
        this.students = data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu học sinh:', error);
      }
    },
    
    async fetchSubjects() {
      try {
        const response = await fetch('http://localhost:8000/api/subjects');
        const data = await response.json();
        this.subjects = data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu môn học:', error);
      }
    },
    
    calculateAverageScore() {
      if (!this.grades.length) return '0.0';
      const sum = this.grades.reduce((total, grade) => total + parseFloat(grade.score), 0);
      return (sum / this.grades.length).toFixed(1);
    },
    
    countFailingGrades() {
      return this.grades.filter(grade => parseFloat(grade.score) < 5).length;
    },
    
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    
    getScoreClass(score) {
      score = parseFloat(score);
      if (score >= 8) return 'score-high';
      if (score >= 5) return 'score-medium';
      return 'score-low';
    },
    
    getGradeEvaluation(score) {
      score = parseFloat(score);
      if (score >= 8) return 'Giỏi';
      if (score >= 6.5) return 'Khá';
      if (score >= 5) return 'Trung bình';
      if (score >= 3.5) return 'Yếu';
      return 'Kém';
    },
    
    openAddGradeModal() {
      this.isEditing = false;
      this.currentGrade = {
        id: null,
        student_id: '',
        subject_id: '',
        score: null
      };
      this.showModal = true;
    },
    
    openEditGradeModal(grade) {
      this.isEditing = true;
      this.currentGrade = { ...grade };
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    confirmDeleteGrade(id) {
      this.gradeToDeleteId = id;
      this.showDeleteConfirm = true;
    },
    
    async saveGrade() {
      try {
        const url = this.isEditing 
          ? `http://localhost:8000/api/grades/${this.currentGrade.id}` 
          : 'http://localhost:8000/api/grades';
        
        const method = this.isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentGrade)
        });
        
        if (response.ok) {
          this.fetchGrades();
          this.closeModal();
        } else {
          console.error('Lỗi khi lưu điểm:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi khi lưu điểm:', error);
      }
    },
    
    async deleteGrade() {
      try {
        const response = await fetch(`http://localhost:8000/api/grades/${this.gradeToDeleteId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          this.grades = this.grades.filter(grade => grade.id !== this.gradeToDeleteId);
          this.showDeleteConfirm = false;
        } else {
          console.error('Lỗi khi xóa điểm:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi khi xóa điểm:', error);
      }
    }
  }
}
</script>