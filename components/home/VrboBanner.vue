<template>
  <div class="vrbo-banner">
    <div class="banner-content">
      <h1 class="banner-title">Rent your property confidently with Vrbo</h1>
      <p class="banner-text">With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.</p>
      <button class="list-button">List your property</button>
    </div>
    <div class="banner-image">
      <img src="/images/vrbo-banner.avif" alt="Woman relaxing in sauna" />
    </div>
  </div>
</template>

<style scoped>
.vrbo-banner {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background-color: #2B2B2B;
  border-radius: 16px;
  display: flex;
  align-items: center;
  direction: ltr;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 450px;
  padding: 48px;
  background-color: white;
  border-radius: 16px;
  margin-left: 48px;
}

.banner-title {
  font-size: 42px;
  font-weight: 600;
  color: #2B2B2B;
  line-height: 1.2;
  margin-bottom: 16px;
  font-family: 'Georgia', serif;
}

.banner-text {
  font-size: 18px;
  color: #4A4A4A;
  line-height: 1.5;
  margin-bottom: 24px;
}

.list-button {
  background-color: #1976D2;
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.list-button:hover {
  background-color: #1565C0;
}

.banner-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .vrbo-banner {
    height: auto;
    flex-direction: column-reverse;
  }

  .banner-content {
    margin: 0;
    max-width: 100%;
    padding: 24px;
    border-radius: 0;
  }

  .banner-image {
    position: relative;
    width: 100%;
    height: 300px;
  }

  .banner-title {
    font-size: 32px;
  }

  .banner-text {
    font-size: 16px;
  }
}
</style> 