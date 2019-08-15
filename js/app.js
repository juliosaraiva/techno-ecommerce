const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: "",
    evento: "",
    carrinho: []
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
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach(item => {
          total += item.preco;
        });
      }
      return total;
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
    },
    adicionarItem() {
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    verificaLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    }
  },
  created() {
    this.getProdutos(), this.verificaLocalStorage();
  }
});
