<template>
  <section>
    <div v-if="visible" class="modal">
      <div class="modal-content">
        <h2>Создать новую статью</h2>
        <form @submit.prevent="onSubmit">
          <Img
            class="close-button"
            src="CiCloseCircle.svg"
            @click="closeModal"
          />
          <div class="form-control">
            <label for="title">Заголовок:</label>
            <input id="title" v-model="title" required />
          </div>
          <div class="form-control">
            <label for="content">Содержание:</label>
            <textarea id="content" v-model="content" required></textarea>
          </div>
          <button type="submit">Создать статью</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    ...mapActions(['createArticle']),
    onSubmit() {
      const newArticle = {
        id: Date.now(),
        title: this.title,
        content: this.content,
      }
      this.createArticle(newArticle)
      this.title = ''
      this.content = ''
      this.$emit('article-created', newArticle)
    },
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  width: 50rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 12px;
  font: inherit;
  margin-bottom: 1rem;
  padding: 1rem 0 1rem 0;
}

input:focus,
textarea:focus {
  background-color: #dddddd;
  outline: none;
  border-color: #282828;
}

h2 {
  margin: 0.5rem 0;
  font-size: 2rem;
}

.close-button {
  position: relative;
  top: -50px;
  left: 95%;
  cursor: pointer;
}

@media (max-width: 768px) {
  .modal-content {
    width: 80%;
  }
}
</style>
