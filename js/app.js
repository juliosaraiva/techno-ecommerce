const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    nova_mensagem: "Mensagem"
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
    }
  },
  created() {
    this.getProdutos();
  }
});
