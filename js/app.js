const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    nova_mensagem: "Mensagem"
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
