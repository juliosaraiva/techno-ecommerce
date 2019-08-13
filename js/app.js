const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false
  },
  filters: {
    changeValue(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "usd"
      });
    },
    upperCase(value) {
      return value.toUpperCase();
    }
  },
  methods: {
    getProdutos() {
      fetch("./api/produtos.json")
        .then(resp => resp.json())
        .then(json => (this.produtos = json));
    },
    getProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(resp => resp.json())
        .then(json => (this.produto = json));
    }
  },
  created() {
    this.getProdutos();
  }
});
