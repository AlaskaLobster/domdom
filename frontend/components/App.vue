<template>
    <div class="app-container">
      <div class="main-content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style>
@import '../styles/main.css';

.app-container {
    display: flex;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 250px;
    transition: margin-left 0.3s;
}

.content-wrapper {
    padding: 20px;
    flex: 1;
    background-color: var(--bg-light);
}

@media (max-width: 992px) {
    .main-content {
        margin-left: 0;
    }
}
</style>
