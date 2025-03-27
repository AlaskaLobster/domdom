<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left column with illustration -->
      <div class="illustration-column">
        <div class="logo-container">
          <svg class="logo-svg" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="40" font-family="Montserrat, Arial" font-weight="bold" font-size="28" fill="#FFFFFF">Trung Tâm</text>
            <text x="190" y="40" font-family="Montserrat, Arial" font-weight="bold" font-size="26" fill="#ff5722">The Sun</text>
          </svg>
        </div>
        <div class="illustration">
          <img src="https://static.k12online.vn/Core/Home/images/Login/LoginType8/ar_071bd.png" alt="Online learning illustration" />
        </div>
        <div class="illustration-text">
          <h3>Nền tảng học tập trực tuyến</h3>
          <p>Kết nối tri thức - Nâng tầm tương lai</p>
        </div>
      </div>
      
      <!-- Right column with login form -->
      <div class="login-column">
        <div class="login-box">
          <h2 class="login-title">Đăng nhập</h2>
          <p class="login-subtitle">Chào mừng quay trở lại!</p>
          
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">
                <span class="label-text">Tài khoản</span>
                <span class="required">*</span>
              </label>
              <div class="input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input 
                  type="text" 
                  id="username" 
                  v-model="username" 
                  class="form-control"
                  placeholder="Nhập mã học sinh"
                  required
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">
                <span class="label-text">Mật khẩu</span>
                <span class="required">*</span>
              </label>
              <div class="input-with-icon">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  class="form-control"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button 
                  type="button" 
                  class="toggle-password" 
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="form-row">
              <div class="remember-password">
                <input type="checkbox" id="remember" v-model="rememberPassword" />
                <label for="remember">Ghi nhớ mật khẩu</label>
              </div>
              
              <div class="forgot-password">
                <a href="#" @click.prevent="forgotPassword">Quên mật khẩu?</a>
              </div>
            </div>
            
            <button type="submit" class="login-button">
              <span>Đăng nhập</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </form>
          
          <div class="login-footer">
            <p>Chưa có tài khoản? <a href="#" class="register-link">Liên hệ nhà trường</a></p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="footer">
      <p>© Copyright Trung Tâm Đào Tạo The Sun {{ new Date().getFullYear() }} - Phần mềm học thi trực tuyến</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      rememberPassword: false
    }
  },
  methods: {
    async handleLogin() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      console.log('Login data:', loginData);
      console.log('Attempting to log in...');

      try {
        const response = await axios.post('http://localhost:5000/login', loginData); // Updated to use the correct endpoint

        const role = response.data.role; // Assuming the response contains the user role
        localStorage.setItem('userRole', role);
        if (role === 'admin') {
          this.$router.push('/admin-dashboard');
        } else if (role === 'teacher') {
          this.$router.push('/teacher-dashboard');
        } else if (role === 'student') {
          this.$router.push('/student-dashboard');
        }
      } catch (error) {
        console.error('Đăng nhập không thành công: Invalid credentials');
        alert('Tài khoản hoặc mật khẩu không chính xác!');
      }
    },
    forgotPassword() {
      console.log('Forgot password clicked');
      alert('Vui lòng liên hệ với giáo viên hoặc quản trị viên để lấy lại mật khẩu.');
    }
  }
}
</script>

<style src="./Login.css"></style>
