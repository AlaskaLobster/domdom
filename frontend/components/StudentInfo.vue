<!-- src/components/StudentProfile.vue -->
<template>
    <div class="student-card fade-in">
      <div class="profile-header">
        <button class="edit-toggle" @click="toggleEditMode">
          <i class="fas" :class="isEditing ? 'fa-times' : 'fa-pen'"></i>
          {{ isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa' }}
        </button>
        
        <div class="profile-image-container">
          <img :src="student.image || defaultImage" alt="Ảnh học sinh" class="profile-image">
          <div class="image-actions" v-if="isEditing">
            <div class="image-upload-overlay" @click="triggerImageUpload">
              <i class="fas fa-camera">Đổi ảnh</i>
            </div>
            <div class="image-edit-overlay" @click="openImageEditor">
              <i class="fas fa-edit">Chỉnh sửa ảnh</i>
            </div>
          </div>
          <input type="file" ref="imageInput" class="hidden" @change="handleImageChange" accept="image/*">
        </div>
        
        <div class="profile-info">
          <h2>{{ student.fullName }}</h2>
          <p>Mã số: {{ student.studentId }}</p>
          <p>Lớp: {{ student.className }}</p>
        </div>
      </div>
      
      <div class="student-details">
        <div class="info-section">
          <h3>Thông tin cá nhân</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Họ và tên</label>
              <p v-if="!isEditing">{{ student.fullName }}</p>
              <input v-else type="text" v-model="student.fullName" placeholder="Họ và tên">
            </div>
            
            <div class="info-item">
              <label>Mã số học sinh</label>
              <p v-if="!isEditing">{{ student.studentId }}</p>
              <input v-else type="text" v-model="student.studentId" placeholder="Mã số học sinh">
            </div>
            
            <div class="info-item">
              <label>Lớp</label>
              <p v-if="!isEditing">{{ student.className }}</p>
              <input v-else type="text" v-model="student.className" placeholder="Lớp">
            </div>
            
            <div class="info-item">
              <label>Ngày sinh</label>
              <p v-if="!isEditing">{{ student.birthDate }}</p>
              <input v-else type="date" v-model="student.birthDate">
            </div>
          </div>
        </div>
        
        <div class="info-section">
          <h3>Thông tin liên hệ</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Địa chỉ</label>
              <p v-if="!isEditing">{{ student.address }}</p>
              <input v-else type="text" v-model="student.address" placeholder="Địa chỉ">
            </div>
            
            <div class="info-item">
              <label>Số điện thoại</label>
              <p v-if="!isEditing">{{ student.phone }}</p>
              <input v-else type="tel" v-model="student.phone" placeholder="Số điện thoại">
            </div>
            
            <div class="info-item">
              <label>Email</label>
              <p v-if="!isEditing">{{ student.email }}</p>
              <input v-else type="email" v-model="student.email" placeholder="Email">
            </div>
          </div>
        </div>
        
        <div class="info-section">
          <h3>Thông tin phụ huynh</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Họ tên cha</label>
              <p v-if="!isEditing">{{ student.fatherName }}</p>
              <input v-else type="text" v-model="student.fatherName" placeholder="Họ tên cha">
            </div>
            
            <div class="info-item">
              <label>Số điện thoại cha</label>
              <p v-if="!isEditing">{{ student.fatherPhone }}</p>
              <input v-else type="tel" v-model="student.fatherPhone" placeholder="Số điện thoại cha">
            </div>
            
            <div class="info-item">
              <label>Họ tên mẹ</label>
              <p v-if="!isEditing">{{ student.motherName }}</p>
              <input v-else type="text" v-model="student.motherName" placeholder="Họ tên mẹ">
            </div>
            
            <div class="info-item">
              <label>Số điện thoại mẹ</label>
              <p v-if="!isEditing">{{ student.motherPhone }}</p>
              <input v-else type="tel" v-model="student.motherPhone" placeholder="Số điện thoại mẹ">
            </div>
          </div>
        </div>
      </div>
      
      <div class="actions" v-if="isEditing">
        <button class="btn btn-secondary" @click="resetForm">
          <i class="fas fa-undo"></i> Đặt lại
        </button>
        <button class="btn btn-primary" @click="saveChanges">
          <i class="fas fa-save"></i> Lưu thay đổi
        </button>
      </div>
  
      <!-- Modal chỉnh sửa hình ảnh -->
      <div class="image-editor-modal" v-if="showImageEditor">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Chỉnh sửa hình ảnh</h3>
            <button class="close-button" @click="closeImageEditor">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="editor-container">
              <div class="canvas-container">
                <canvas ref="imageCanvas" @mousedown="startDraw" @mousemove="draw" @mouseup="stopDraw" @mouseleave="stopDraw"></canvas>
              </div>
              <div class="editor-controls">
                <div class="control-group">
                  <label>Công cụ</label>
                  <div class="tool-buttons">
                    <button 
                      class="tool-button" 
                      :class="{ active: currentTool === 'brush' }"
                      @click="selectTool('brush')"
                      title="Cọ vẽ"
                    >
                      <i class="fas fa-paint-brush"></i>
                    </button>
                    <button 
                      class="tool-button" 
                      :class="{ active: currentTool === 'eraser' }"
                      @click="selectTool('eraser')"
                      title="Tẩy"
                    >
                      <i class="fas fa-eraser"></i>
                    </button>
                    <button 
                      class="tool-button"
                      :class="{ active: currentTool === 'text' }"
                      @click="selectTool('text')"
                      title="Văn bản"
                    >
                      <i class="fas fa-font"></i>
                    </button>
                  </div>
                </div>
                
                <div class="control-group">
                  <label>Màu sắc</label>
                  <input type="color" v-model="drawColor">
                </div>
                
                <div class="control-group">
                  <label>Kích thước: {{ brushSize }}px</label>
                  <input type="range" v-model.number="brushSize" min="1" max="50">
                </div>
                
                <div class="control-group" v-if="currentTool === 'text'">
                  <label>Văn bản</label>
                  <input type="text" v-model="textToAdd" placeholder="Nhập văn bản...">
                  <button class="btn btn-sm" @click="addText">Thêm văn bản</button>
                </div>
  
                <div class="control-group">
                  <label>Hiệu ứng</label>
                  <div class="filter-buttons">
                    <button class="filter-button" @click="applyFilter('normal')">Thường</button>
                    <button class="filter-button" @click="applyFilter('grayscale')">Đen trắng</button>
                    <button class="filter-button" @click="applyFilter('sepia')">Sepia</button>
                    <button class="filter-button" @click="applyFilter('invert')">Âm bản</button>
                  </div>
                </div>
                
                <div class="control-group">
                  <button class="btn btn-secondary" @click="resetCanvas">
                    <i class="fas fa-undo"></i> Đặt lại
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeImageEditor">Hủy</button>
            <button class="btn btn-primary" @click="saveEditedImage">
              <i class="fas fa-save"></i> Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StudentProfile',
    data() {
      return {
        isEditing: false,
        defaultImage: "https://via.placeholder.com/150",
        originalStudent: {
          fullName: "Cao Bảo Phúc",
          studentId: "32",
          className: "10A1",
          birthDate: "2010-05-15",
          address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
          phone: "0123456789",
          email: "nguyenvana@example.com",
          fatherName: "Nguyễn Văn B",
          fatherPhone: "0987654321",
          motherName: "Lê Thị C",
          motherPhone: "0912345678",
          image: ""
        },
        student: {},
        // Biến dành cho trình chỉnh sửa hình ảnh
        showImageEditor: false,
        currentTool: 'brush',
        drawColor: '#000000',
        brushSize: 5,
        isDrawing: false,
        canvas: null,
        ctx: null,
        lastX: 0,
        lastY: 0,
        textToAdd: '',
        originalImageData: null
      }
    },
    created() {
      this.resetForm();
    },
    methods: {
      toggleEditMode() {
        if (this.isEditing && this.hasChanges()) {
          if (confirm("Bạn có muốn hủy các thay đổi không?")) {
            this.resetForm();
          } else {
            return;
          }
        }
        this.isEditing = !this.isEditing;
      },
      triggerImageUpload() {
        this.$refs.imageInput.click();
      },
      handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.student.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      hasChanges() {
        return JSON.stringify(this.student) !== JSON.stringify(this.originalStudent);
      },
      resetForm() {
        this.student = JSON.parse(JSON.stringify(this.originalStudent));
      },
      saveChanges() {
        if (confirm("Bạn có chắc muốn lưu thay đổi này?")) {
          // Trong thực tế, bạn sẽ gửi dữ liệu đến API backend ở đây
          Object.assign(this.originalStudent, this.student);
          alert("Đã lưu thông tin thành công!");
          this.isEditing = false;
        }
      },
      
      // Phương thức cho trình chỉnh sửa hình ảnh
      openImageEditor() {
        this.showImageEditor = true;
        this.$nextTick(() => {
          this.initCanvas();
        });
      },
      closeImageEditor() {
        this.showImageEditor = false;
      },
      initCanvas() {
        this.canvas = this.$refs.imageCanvas;
        this.ctx = this.canvas.getContext('2d');
        
        // Đặt kích thước canvas phù hợp với vùng hiển thị
        this.canvas.width = 500;
        this.canvas.height = 500;
        
        // Tải hình ảnh hiện tại vào canvas
        const img = new Image();
        img.onload = () => {
          // Giữ tỷ lệ khung hình
          const ratio = Math.min(
            this.canvas.width / img.width,
            this.canvas.height / img.height
          );
          
          const centerX = (this.canvas.width - img.width * ratio) / 2;
          const centerY = (this.canvas.height - img.height * ratio) / 2;
          
          // Xóa canvas
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          
          // Vẽ hình ảnh vào canvas
          this.ctx.drawImage(
            img, 
            centerX, 
            centerY, 
            img.width * ratio, 
            img.height * ratio
          );
          
          // Lưu trạng thái ban đầu của hình ảnh
          this.originalImageData = this.ctx.getImageData(
            0, 0, this.canvas.width, this.canvas.height
          );
        };
        img.src = this.student.image || this.defaultImage;
      },
      selectTool(tool) {
        this.currentTool = tool;
      },
      startDraw(e) {
        if (this.currentTool === 'text') return;
        
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
      },
      draw(e) {
        if (!this.isDrawing || this.currentTool === 'text') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = this.brushSize;
        
        if (this.currentTool === 'brush') {
          this.ctx.globalCompositeOperation = 'source-over';
          this.ctx.strokeStyle = this.drawColor;
        } else if (this.currentTool === 'eraser') {
          this.ctx.globalCompositeOperation = 'destination-out';
        }
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        this.lastX = x;
        this.lastY = y;
      },
      stopDraw() {
        this.isDrawing = false;
      },
      addText() {
        if (!this.textToAdd.trim()) return;
        
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;
        
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = this.drawColor;
        this.ctx.font = `${this.brushSize * 3}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.textToAdd, x, y);
        
        this.textToAdd = '';
      },
      applyFilter(filterType) {
        // Lưu hình ảnh hiện tại
        const currentImageData = this.ctx.getImageData(
          0, 0, this.canvas.width, this.canvas.height
        );
        
        // Áp dụng bộ lọc
        const pixels = currentImageData.data;
        
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          
          if (filterType === 'grayscale') {
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            pixels[i] = gray;
            pixels[i + 1] = gray;
            pixels[i + 2] = gray;
          } else if (filterType === 'sepia') {
            pixels[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            pixels[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            pixels[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          } else if (filterType === 'invert') {
            pixels[i] = 255 - r;
            pixels[i + 1] = 255 - g;
            pixels[i + 2] = 255 - b;
          }
        }
        
        if (filterType !== 'normal') {
          this.ctx.putImageData(currentImageData, 0, 0);
        } else {
          // Đặt lại hình ảnh ban đầu nhưng giữ lại các bản vẽ
          this.ctx.putImageData(this.originalImageData, 0, 0);
        }
      },
      resetCanvas() {
        if (confirm("Bạn có chắc muốn đặt lại hình ảnh về ban đầu không?")) {
          this.initCanvas();
        }
      },
      saveEditedImage() {
        // Lưu hình ảnh từ canvas thành dạng Base64
        const imageDataUrl = this.canvas.toDataURL('image/png');
        this.student.image = imageDataUrl;
        this.closeImageEditor();
      }
    }
  }
  </script>
  
  <style scoped>
  .student-card {
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
    margin-bottom: 2rem;
  }
  
  .profile-header {
    padding: 2rem;
    background: linear-gradient(to right, #4cc9f0, #4361ee);
    color: white;
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .edit-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: var(--transition);
  }
  
  .edit-toggle:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .edit-toggle i {
    margin-right: 0.5rem;
  }
  
  .profile-image-container {
    position: relative;
    width: 150px;
    height: 150px;
    margin-right: 2rem;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .image-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
  }
  
  .image-upload-overlay, .image-edit-overlay {
    background-color: var(--accent-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--transition);
    margin-left: 0.5rem;
  }
  
  .image-upload-overlay:hover, .image-edit-overlay:hover {
    background-color: #d81b60;
    transform: scale(1.1);
  }
  
  .image-edit-overlay {
    background-color: var(--secondary-color);
  }
  
  .image-edit-overlay:hover {
    background-color: #3a0ca3;
  }
  
  .profile-info h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  
  .profile-info p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
  
  .student-details {
    padding: 2rem;
  }
  
  .info-section {
    margin-bottom: 1.5rem;
  }
  
  .info-section h3 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 0.5rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .info-item {
    margin-bottom: 1rem;
  }
  
  .info-item label {
    display: block;
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 0.3rem;
  }
  
  .info-item p {
    font-size: 1.1rem;
  }
  
  .info-item input, 
  .info-item textarea {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #dee2e6;
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
  }
  
  .info-item input:focus,
  .info-item textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 2rem 2rem;
  }
  
  .btn {
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
  }
  
  .btn i {
    margin-right: 0.5rem;
  }
  
  .btn-primary {
    background-color:#5a6268;
    color: white;
    margin-right: 1rem;
  }
  
  .btn-primary:hover {
    background-color:#d81b60
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    margin-right: 1rem;
  }
  
  .btn-secondary:hover {
    background-color:#d81b60;
  }
  
  .btn-sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .hidden {
    display: none;
  }
  
  /* Trình chỉnh sửa hình ảnh */
  .image-editor-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
  }
  
  .modal-header h3 {
    margin: 0;
    color: var(--dark-color);
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6c757d;
    transition: var(--transition);
  }
  
  .close-button:hover {
    color: var(--dark-color);
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-footer {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #dee2e6;
  }
  
  .editor-container {
    display: flex;
    flex-direction: column;
  }
  
  .canvas-container {
    margin-bottom: 1rem;
    background-color: #f8f9fa;
    border-radius: var(--border-radius);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  canvas {
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    max-height: 400px;
    touch-action: none;
  }
  
  .editor-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .control-group {
    margin-bottom: 1rem;
  }
  
  .control-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .tool-buttons, .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tool-button, .filter-button {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    background-color: white;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .tool-button:hover, .filter-button:hover {
    background-color: #f1f3f5;
  }
  
  .tool-button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
  }
  
  /* Animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .profile-header {
      flex-direction: column;
      text-align: center;
    }
    
    .profile-image-container {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
    
    .edit-toggle {
      top: 1rem;
      right: 1rem;
    }
    
    .editor-container {
      flex-direction: column;
    }
    
    .editor-controls {
      grid-template-columns: 1fr;
    }
  }
  </style>