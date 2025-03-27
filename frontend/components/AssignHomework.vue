<template>
  <div class="assign-homework">
    <h2 class="title">Giao Bài Tập</h2>

    <div v-if="isLoading" class="loading-message">Đang tải danh sách học sinh...</div>

    <div v-if="errorMessage" class="error-container">
      <p>{{ errorMessage }}</p>
      <button @click="retryFetchStudents" class="retry-button">Thử lại</button>
    </div>

    <div class="card">
      <form @submit.prevent="submitHomework">
        <div class="form-group">
          <label for="student">Chọn Học Sinh:</label>
          <select v-model="selectedStudentId" id="student" class="form-control" required @change="handleStudentChange">
            <option value="" disabled selected>-- Chọn học sinh --</option>
            <option v-for="student in students" :key="student.MaHocSinh" :value="student.MaHocSinh">
              {{ student.HoTen }}
            </option>
          </select>
        </div>

        <!-- Hiển thị thông tin học sinh khi đã chọn -->
        <div v-if="selectedStudent" class="student-info-container">
          <h3 class="sub-title">Thông tin học sinh</h3>
          <table class="student-info-table">
            <thead>
              <tr>
                <th>Mã học sinh</th>
                <th>Họ tên</th>
                <th>Lớp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ selectedStudent.MaHocSinh }}</td>
                <td>{{ selectedStudent.HoTen }}</td>
                <td>{{ selectedStudent.Lop }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-group">
          <label for="subject">Môn Học:</label>
          <select v-model="selectedSubject" id="subject" class="form-control" required>
            <option value="" disabled selected>-- Chọn môn học --</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="deadline">Thời hạn nộp:</label>
          <input type="datetime-local" v-model="deadline" id="deadline" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="homework">Nội Dung Bài Tập:</label>
          <textarea v-model="homeworkContent" id="homework" class="form-control content-area" required placeholder="Nhập nội dung bài tập tại đây..."></textarea>
        </div>

        <div class="form-group">
          <label for="attachment">Tài liệu đính kèm:</label>
          <div class="attachment-container">
            <input type="file" id="attachment" @change="handleFileUpload" class="file-input">
            <label for="attachment" class="file-label">
              <i class="fas fa-paperclip"></i> Chọn tệp
            </label>
            <span v-if="attachment" class="file-name">{{ attachment.name }}</span>
          </div>
        </div>

        <div class="form-footer">
          <button type="button" @click="resetForm" class="btn btn-secondary">Hủy</button>
          <button type="submit" class="btn btn-primary">Giao Bài Tập</button>
        </div>
      </form>
    </div>

    <div v-if="showSuccessMessage" class="success-message">
      <i class="fas fa-check-circle"></i> Bài tập đã được giao thành công!
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      students: [], // Danh sách học sinh
      subjects: [
        { id: 1, name: 'Toán' },
        { id: 2, name: 'Văn' },
        { id: 3, name: 'Tiếng Anh' },
        { id: 4, name: 'Vật Lý' },
        { id: 5, name: 'Hóa Học' },
        { id: 6, name: 'Sinh Học' },
        { id: 7, name: 'Lịch Sử' },
        { id: 8, name: 'Địa Lý' }
      ],
      selectedStudentId: '',
      selectedStudent: null,
      selectedSubject: '',
      homeworkContent: '',
      deadline: '',
      attachment: null,
      showSuccessMessage: false,
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    handleStudentChange() {
      // Tìm thông tin học sinh dựa trên mã học sinh đã chọn
      if (this.selectedStudentId) {
        this.selectedStudent = this.students.find(student => student.MaHocSinh === this.selectedStudentId);
      } else {
        this.selectedStudent = null;
      }
    },

    submitHomework() {
      // Validate form
      if (!this.selectedStudentId || !this.selectedSubject || !this.homeworkContent || !this.deadline) {
        alert('Vui lòng điền đầy đủ thông tin bài tập!');
        return;
      }

      // Tạo đối tượng bài tập
      const homework = {
        studentId: this.selectedStudentId,
        studentInfo: this.selectedStudent,
        subjectId: this.selectedSubject,
        content: this.homeworkContent,
        deadline: this.deadline,
        attachment: this.attachment ? this.attachment.name : null,
        assignedDate: new Date().toISOString()
      };

      // Log bài tập (thay thế với API thực tế)
      console.log('Bài tập được giao:', homework);

      // Hiển thị thông báo thành công
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);

      // Reset form
      this.resetForm();
    },

    resetForm() {
      this.selectedStudentId = '';
      this.selectedStudent = null;
      this.selectedSubject = '';
      this.homeworkContent = '';
      this.deadline = '';
      this.attachment = null;
    },

    fetchStudents() {
      this.isLoading = true;
      this.errorMessage = '';

      // Gửi yêu cầu API để lấy danh sách học sinh
      axios.get('http://localhost:5000/api/hocsinh')
        .then(response => {
          this.students = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Lỗi khi tải danh sách học sinh:', error);
          this.isLoading = false;
          this.errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
          alert(this.errorMessage);
          this.students = [];
        });
    },

    handleFileUpload(event) {
      this.attachment = event.target.files[0];
    },

    retryFetchStudents() {
      this.fetchStudents();
    }
  },
  mounted() {
    this.fetchStudents(); // Lấy danh sách học sinh khi component được khởi tạo
  }
};
</script>
<style scoped>
@import './AssignHomework.css';


.loading-message {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error-container {
  text-align: center;
  padding: 20px;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 4px;
  margin-bottom: 20px;
}

.retry-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.retry-button:hover {
  background-color: #c82333;
}
</style>
