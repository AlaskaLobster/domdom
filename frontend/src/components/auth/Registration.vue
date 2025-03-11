<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-red-100">
    <div class="w-[420px] p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Đăng ký tài khoản</h2>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <input type="text" v-model.trim="formData.username" placeholder="Tên đăng nhập" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl" />
        </div>
        <div>
          <input type="email" v-model.trim="formData.email" placeholder="Email" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl" />
        </div>
        <div>
          <input type="password" v-model.trim="formData.password" placeholder="Mật khẩu" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl" />
        </div>
        <button type="submit" class="w-full py-3.5 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      // Logic to handle registration
      console.log('Đăng ký với dữ liệu:', this.formData);
    }
  }
}
</script>

<style scoped>
/* Custom styles for Registration component */
</style>
