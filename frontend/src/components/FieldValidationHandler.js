   validateField(field) {
     // Clear previous error
     this.errors[field] = ''
     
     if (field === 'username') {
       if (!this.formData.username) {
         this.errors.username = 'Vui lòng nhập tên đăng nhập'
       }
     }
     // ... other validations
   }