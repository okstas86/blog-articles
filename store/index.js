export const state = () => ({
  articles: [],
})

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  addArticle(state, newArticle) {
    state.articles.unshift(newArticle)
  },
}

export const actions = {
  async fetchArticles({ commit }) {
    try {
      const response = await require('@/static/articles.json')
      commit('setArticles', response)
    } catch (error) {
      console.log(error)
    }
  },
  createArticle({ commit, state }, newArticle) {
    commit('addArticle', newArticle)
  },
}

export const getters = {
  getArticles(state) {
    return state.articles
  },
}
