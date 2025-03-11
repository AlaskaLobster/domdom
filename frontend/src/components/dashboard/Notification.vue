<template>
    <div class="notification-container">
      <div class="notification-header">
        <h2>Thông Báo</h2>
        <span class="badge">{{ notifications.length }}</span>
      </div>
      
      <transition-group name="notification-list" tag="ul" class="notification-list">
        <li v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="notification-content">
            <div class="notification-icon">
              <i class="notification-bell"></i>
            </div>
            <div class="notification-message">{{ notification.message }}</div>
          </div>
          <button class="notification-delete" @click="removeNotification(notification.id)" aria-label="Xóa thông báo">
            <span>×</span>
          </button>
        </li>
      </transition-group>
      
      <div v-if="notifications.length === 0" class="notification-empty">
        <div class="empty-icon">📭</div>
        <p>Không có thông báo mới</p>
      </div>
      
      <div class="notification-footer">
        <button class="notification-button" @click="showAddForm = !showAddForm">
          {{ showAddForm ? 'Hủy' : 'Thêm Thông Báo' }}
        </button>
      </div>
      
      <transition name="form-fade">
        <div v-if="showAddForm" class="notification-form">
          <input 
            v-model="newNotification" 
            class="notification-input" 
            placeholder="Nhập thông báo mới..."
            @keyup.enter="addNotification"
            ref="notificationInput"
          />
          <button class="notification-submit" @click="addNotification">Thêm</button>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Notification',
    data() {
      return {
        notifications: [
          { id: 1, message: 'Bài tập mới đã được giao.' },
          { id: 2, message: 'Cuộc họp phụ huynh sắp diễn ra.' },
          { id: 3, message: 'Lịch thi học kỳ đã được cập nhật.' }
        ],
        newNotification: '',
        showAddForm: false,
        nextId: 4
      };
    },
    methods: {
      addNotification() {
        if (this.newNotification.trim()) {
          this.notifications.push({
            id: this.nextId++,
            message: this.newNotification.trim()
          });
          this.newNotification = '';
          // Giữ form mở để người dùng có thể thêm nhiều thông báo
        }
      },
      removeNotification(id) {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
      }
    },
    watch: {
      showAddForm(val) {
        if (val) {
          // Khi form mở, focus vào input
          this.$nextTick(() => {
            this.$refs.notificationInput.focus();
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .notification-container {
    max-width: 500px;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }
  
  .notification-header {
    background: linear-gradient(135deg, #6366f1, #4338ca);
    color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .notification-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  
  .badge {
    background-color: white;
    color: #4338ca;
    font-size: 14px;
    font-weight: bold;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .notification-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 320px;
    overflow-y: auto;
  }
  
  .notification-item {
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s;
  }
  
  .notification-item:last-child {
    border-bottom: none;
  }
  
  .notification-item:hover {
    background-color: #f8f8f8;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    min-width: 0; /* Ngăn chặn overflow trong flexbox */
  }
  
  .notification-icon {
    width: 36px;
    height: 36px;
    background-color: rgba(99, 102, 241, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .notification-bell {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid #6366f1;
    position: relative;
  }
  
  .notification-bell:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #6366f1;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .notification-message {
    font-size: 15px;
    color: #333;
    line-height: 1.4;
    word-break: break-word;
    padding-right: 8px;
  }
  
  .notification-delete {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: #f0f0f0;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
    margin-left: 8px;
  }
  
  .notification-delete:hover {
    background-color: #ff4d4f;
    color: white;
  }
  
  .notification-empty {
    padding: 32px 24px;
    text-align: center;
    color: #999;
  }
  
  .empty-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }
  
  .notification-footer {
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    background-color: #f9f9f9;
    border-top: 1px solid #f0f0f0;
  }
  
  .notification-button {
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .notification-button:hover {
    background-color: #4338ca;
  }
  
  .notification-form {
    padding: 16px 24px;
    display: flex;
    gap: 12px;
    border-top: 1px solid #f0f0f0;
    background-color: #f9f9f9;
  }
  
  .notification-input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .notification-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  .notification-submit {
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .notification-submit:hover {
    background-color: #4338ca;
  }
  
  .notification-list-enter-active, .notification-list-leave-active {
    transition: all 0.5s;
  }
  
  .notification-list-enter-from, .notification-list-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .notification-list-move {
    transition: transform 0.5s;
  }
  
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 0.3s;
  }
  
  .form-fade-enter-from, .form-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  
  /* Responsive adjustments */
  @media (max-width: 550px) {
    .notification-container {
      margin: 10px;
      width: calc(100% - 20px);
    }
    
    .notification-content {
      gap: 12px;
    }
    
    .notification-icon {
      width: 32px;
      height: 32px;
    }
    
    .notification-message {
      font-size: 14px;
    }
    
    .notification-form {
      padding: 12px 16px;
    }
  }
  </style>