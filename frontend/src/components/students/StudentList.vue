<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-4">Danh sách học sinh</h1>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điểm</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="student in students" :key="student.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ student.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ student.class }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ student.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { id: 1, name: "Nguyễn Văn A", class: "Lớp 10A", score: 8.5 },
        { id: 2, name: "Trần Thị B", class: "Lớp 10B", score: 7.2 },
        { id: 3, name: "Lê Minh C", class: "Lớp 10C", score: 9.0 },
        { id: 4, name: "Phạm Thi D", class: "Lớp 11A", score: 6.8 },
        { id: 5, name: "Đỗ Quang E", class: "Lớp 11B", score: 7.9 }
      ]
    }
  }
}
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
