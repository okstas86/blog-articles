<template>
  <div>
    <div class="title">
      <h1>{{ article.title }}</h1>
    </div>
    <p>{{ article.content }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    article() {
      const articles = require('@/static/articles.json')
      const articleId = parseInt(this.$route.params.id)
      const foundArticle = articles.find((article) => article.id === articleId)
      return foundArticle
    },
  },
}
</script>

<style scoped>
.title {
  width: 97%;
  background-color: #353030;
  color: #fafafa;
  text-align: center; 
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
h1 {
  margin-bottom: 2rem;
}

div p {
  font-size: 20px;
  text-align: center;
}
@media (max-width: 600px) {
  h1 {

    font-size: 22px; /
  }

  div p {
    font-size: 16px;
  }
}
</style>
