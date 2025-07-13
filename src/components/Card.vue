<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
  margin-bottom: 1.5rem;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #eee;
}
</style> 