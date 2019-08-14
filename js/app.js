const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: "",
    evento: ""
  },
  filters: {
    changeValue(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
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
    },
    abrirModal(id) {
      this.getProduto(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.produto = false;
      }
    }
  },
  created() {
    this.getProdutos();
  }
});
