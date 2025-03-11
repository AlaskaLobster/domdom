   try {
     // API call
   } catch (error) {
     this.globalError = 'Có lỗi xảy ra, vui lòng thử lại sau'
   } finally {
     this.isSubmitting = false
   }