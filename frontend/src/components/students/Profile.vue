<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-red-100">
    <div class="w-[420px] p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Thông tin người dùng</h2>
      <div class="space-y-4">
        <p><strong>Tên đăng nhập:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button @click="logout" class="w-full py-3.5 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-red-500 to-orange-500">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'admin',
        email: 'admin@example.com'
      }
    }
  },
  methods: {
    logout() {
      // Logic to handle logout
      console.log('Đăng xuất thành công!');
    }
  }
}
</script>

<style scoped>
/* Custom styles for Profile component */
</style>
