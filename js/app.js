const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: "",
    evento: "",
    carrinho: [],
    mensagemAlerta: "Item adicionado",
    alertaAtivo: false,
    carrinhoAtivo: false
  },
  filters: {
    changeValue(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "BRL"
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
    clickForaCarrinho({ target, currentTarget }) {
      if (target === currentTarget) {
        this.carrinhoAtivo = false;
      }
    },
    adicionarItem() {
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
      this.alerta(`${nome} adicionado ao carrinho`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
      this.alerta(`Item removido do carrinho`);
    },
    verificaLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    compararEstoque() {
      const items = this.carrinho.filter(({ id }) => id === this.produto.id);
      this.produto.estoque -= items.length;
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) this.getProduto(hash.replace("#", ""));
    }
  },
  watch: {
    produto() {
      document.title = this.produto.nome || "Techno";
      const hash = this.produto.id || "";
      history.pushState(null, null, `#${hash}`);
      if (this.produto) this.compararEstoque();
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    }
  },
  created() {
    this.getProdutos(), this.verificaLocalStorage(), this.router();
  }
});
