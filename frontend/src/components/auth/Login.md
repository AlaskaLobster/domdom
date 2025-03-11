# Login Page Component

## Template
```html
<template>
  <div class="login-page">
    <!-- Main container with two columns layout -->
    <div class="main-container">
      <!-- Left column with illustration -->
      <div class="illustration-column">
        <div class="logo-container">
          <!-- Logo sử dụng thẻ SVG -->
          <svg class="logo-svg" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="40" font-family="Arial" font-weight="bold" font-size="28" fill="#004a8f">Trung Tâm</text>
            <text x="190" y="40" font-family="Arial" font-weight="bold" font-size="28" fill="#ff5722">The Sun</text>
          </svg>
        </div>
        <div class="illustration">
          <img src="https://static.k12online.vn/Core/Home/images/Login/LoginType8/ar_071bd.png" alt="Online learning illustration" />
        </div>
      </div>
      
      <!-- Right column with login form -->
      <div class="login-column">
        <div class="login-box">
          <h2 class="login-title">Đăng nhập</h2>
          
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Tài khoản<span class="required">*</span></label>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                class="form-control"
                placeholder="Nhập mã học sinh"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password">Mật khẩu<span class="required">*</span></label>
              <div class="password-input">
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
                  <span v-if="showPassword">🔒</span>
                  <span v-else>👁️</span>
                </button>
              </div>
            </div>
            
            <div class="remember-password">
              <input type="checkbox" id="remember" v-model="rememberPassword" />
              <label for="remember">Ghi nhớ mật khẩu</label>
            </div>
            
            <button type="submit" class="login-button">Đăng nhập</button>
            
            <div class="forgot-password">
              <a href="#" @click.prevent="forgotPassword">Quên mật khẩu?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="footer">
      <p>© Copyright Trung Tâm Đào Tạo The Sun {{ new Date().getFullYear() }} - Phần mềm học thi trực tuyến</p>
    </footer>
  </div>
</template>
```

## Script
```javascript
<script>
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
    handleLogin() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('userRole', data.role);
          this.$router.push('/teacher-dashboard');
        } else {
          console.error('Đăng nhập không thành công:', data.message);
        }
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },
    forgotPassword() {
      console.log('Forgot password clicked');
    }
  }
}
</script>
```

## Styles
```css
<style scoped>
:root {
  --primary-blue: #004a8f;
  --secondary-blue: #0069c0;
  --light-blue: #e6f0ff;
  --orange: #ff5722;
  --light-gray: #f8f9fa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #004a8f;
  background-image: linear-gradient(to bottom, #004a8f, #006dc1);
}

.main-container {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-top: 50px;
  margin-bottom: 50px;
}

.illustration-column {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.logo-container {
  margin-bottom: 30px;
}

.logo-svg {
  width: 100%;
  height: auto;
  max-width: 300px;
}

.illustration {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration img {
  max-width: 100%;
  max-height: 80%;
}

.login-column {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-box {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.login-title {
  color: #004a8f;
  font-size: 24px;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 10px;
}

.login-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: #004a8f;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.required {
  color: red;
  margin-left: 3px;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #004a8f;
  outline: none;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.remember-password {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.remember-password input {
  margin-right: 8px;
}

.login-button {
  width: 100%;
  background-color: #004a8f;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #003a7a;
}

.forgot-password {
  text-align: center;
  margin-top: 20px;
}

.forgot-password a {
  color: #004a8f;
  font-size: 14px;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.footer {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 12px;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
    margin: 20px;
  }

  .illustration-column {
    padding: 20px;
  }

  .login-column {
    padding: 20px;
  }
}
</style>
