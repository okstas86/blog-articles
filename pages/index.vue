<template>
  <section>
    <div class="top">
      <h1>Список статей</h1>
      <button @click="showModal = true">Создать статью</button>
    </div>

    <article-form-modal
      :visible="showModal"
      @close="showModal = false"
      @article-created="showModal = false"
    />
    <ul class="list">
      <li v-for="article in displayedArticles" :key="article.id">
        <nuxt-link :to="'/article/' + article.id">{{
          article.title
        }}</nuxt-link>
      </li>
    </ul>
    <div class="pagination">
      <nuxt-link v-for="page in totalPages" :key="page" :to="'?page=' + page">
        {{ page }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ArticleFormModal from '@/components/ArticleFormModal'

export default {
  components: {
    ArticleFormModal,
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapState(['articles']),
    articlesPerPage() {
      return 5
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage)
    },
    displayedArticles() {
      const currentPage = parseInt(this.$route.query.page) || 1
      const startIndex = (currentPage - 1) * this.articlesPerPage
      const endIndex = startIndex + this.articlesPerPage
      return this.articles.slice(startIndex, endIndex)
    },
  },
  watch: {
    $route(to, from) {
      if (!to.query.page) {
        this.$router.push({ path: to.path, query: { page: 1 } })
      }
    },
  },
  async created() {
    await this.fetchArticles()
  },
  methods: {
    ...mapActions(['createArticle', 'fetchArticles']),
  },
}
</script>

<style>
body {
  margin: 0;
}
section {
  background-image: url(../static/blogs-banner.png);
}
.top {
  width: 100%;
  height: 5rem;
  background-color: #353030;
  color: #fafafa;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

ul.list {
  list-style-type: none;
  padding: 0;
}

a {
  color: #fafafa;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: bold;
}

li {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0, 0, 0);
  padding: 1rem;
  margin: 1rem auto;
  max-width: 40rem;
  list-style: none;
  text-align: center;
  cursor: pointer;
  background-color: #353030;
}

button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  background-color: #ba3900;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #424141;
}

button:active {
  background-color: #6e6c6c;
}

button {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
}

.pagination a {
  padding: 5px;
  margin: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #424141;
  border-radius: 20px;
  background-color: #353030;
}

.list li:hover,
a:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .top {
    height: 4rem;
  }

  ul.list li,
  a {
    margin: 0.5rem auto;
    max-width: 20rem;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
