<template>
  <div class="forget-password-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-4">Quên mật khẩu</h1>
      <p class="mb-4">Nhập địa chỉ email của bạn để khôi phục mật khẩu.</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Địa chỉ email:</label>
          <input type="email" id="email" v-model="email" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Gửi yêu cầu khôi phục mật khẩu</button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-gray-600">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/api/forgot-password', { email: this.email });
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      }
    }
  }
}
</script>

<style scoped>
.forget-password-page {
  max-width: 400px;
  margin: auto;
}
</style>
