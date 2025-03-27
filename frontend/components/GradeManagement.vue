<template>
  <div class="grade-management">
    <h2>Quản lý điểm số</h2>
    <table>
      <thead>
        <tr>
          <th>Tên học sinh</th>
          <th>Môn học</th>
          <th>Điểm</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grade, index) in grades" :key="index">
          <td>{{ grade.studentName }}</td>
          <td>{{ grade.subject }}</td>
          <td>
            <input type="number" v-model="grade.score" />
          </td>
          <td>
            <button @click="saveGrade(grade)">Lưu</button>
            <button @click="deleteGrade(index)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addGrade">Thêm điểm số</button>
  </div>
</template>

<script>
const API_URL = 'http://localhost:5000/api/diemtrungbinh';

export default {
  name: 'GradeManagement',
  data() {
    return {
      grades: []
    };
  },
  async created() {
    await this.fetchGrades(); // Gọi phương thức fetchGrades để lấy dữ liệu
  },
  methods: {
    async fetchGrades() {
      try {
        const response = await fetch(API_URL); // Gọi API điểm trung bình
        const data = await response.json();
        this.grades = data.data; // Cập nhật grades từ phản hồi API
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    },
    addGrade() {
      // Logic to add a new grade
      console.log('Thêm điểm số mới');
    },
    async saveGrade(grade) {
      try {
        // Gọi API để lưu điểm số
        console.log('Điểm số đã được lưu:', grade);
      } catch (error) {
        console.error('Error saving grade:', error);
      }
    },
    deleteGrade(index) {
      this.grades.splice(index, 1);
      console.log('Điểm số đã được xóa');
    }
  }
};
</script>

<style scoped>
.grade-management {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
button {
  margin: 5px;
  padding: 6px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #1976D2;
}
</style>
