<template>
  <div class="attendance">
    <h2>Điểm danh</h2>
    <table>
      <thead>
        <tr>
          <th>Tên học sinh</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>
            <input type="checkbox" v-model="student.attended" />
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="submitAttendance">Lưu điểm danh</button>
  </div>
</template>

<script>
export default {
  name: 'Attendance',
  data() {
    return {
      students: [
        { id: 1, name: 'Nguyễn Văn A', attended: false },
        { id: 2, name: 'Trần Thị B', attended: false },
        // Thêm học sinh khác ở đây
      ]
    };
  },
  methods: {
    submitAttendance() {
      // Xử lý lưu điểm danh
      console.log('Điểm danh đã được lưu:', this.students);
    }
  }
};
</script>

<style scoped>
.attendance {
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
  margin-top: 10px;
  padding: 10px 15px;
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

