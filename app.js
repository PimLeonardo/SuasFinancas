class Despesas {
  constructor(dia, mes, ano, tipo, valor, descricao) {
    this.dia = dia;
    this.mes = mes;
    this.ano = ano;
    this.tipo = tipo;
    this.valor = valor;
    this.descricao = descricao;
  }

  validarDados() {
    for (let i in this) {
      if (
        this[i] == undefined ||
        this[i] == "" ||
        this[i] == null ||
        this.dia > 31 ||
        this.dia < 1
      ) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getId() {
    let novoId = localStorage.getItem("id");
    return parseInt(novoId) + 1;
  }

  salvar(d) {
    let id = this.getId();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem("id", id);
  }

  recuperarDados() {
    let id = localStorage.getItem("id");
    let despesas = Array();

    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i));

      if (despesa === null) {
        continue;
      }

      despesa.id = i;
      despesas.push(despesa);
    }
    return despesas;
  }

  pesquisar(despesa) {
    let despesasFiltro = Array();

    despesasFiltro = this.recuperarDados();

    if (despesa.dia != "") {
      despesasFiltro = despesasFiltro.filter((d) => d.dia == despesa.dia);
    }
    if (despesa.mes != "") {
      despesasFiltro = despesasFiltro.filter((d) => d.mes == despesa.mes);
    }
    if (despesa.ano != "") {
      despesasFiltro = despesasFiltro.filter((d) => d.ano == despesa.ano);
    }
    if (despesa.tipo != "") {
      despesasFiltro = despesasFiltro.filter((d) => d.tipo == despesa.tipo);
    }
    if (despesa.valor != "") {
      despesasFiltro = despesasFiltro.filter((d) => d.valor == despesa.valor);
    }
    if (despesa.descricao != "") {
      despesasFiltro = despesasFiltro.filter(
        (d) => d.descricao == despesa.descricao
      );
    }
    return despesasFiltro;
  }

  excluir(id) {
    localStorage.removeItem(id);
  }
}

let data = new Date();
let anoAtual = data.getFullYear();
let opcoes;

for (let ano = anoAtual; ano >= 2018; ano--) {
  opcoes += `<option value="${ano}">${ano}</option>`;
}

document.querySelector("#ano").innerHTML += opcoes;

let bd = new Bd();

function cadastrarDespesa() {
  let dia = document.getElementById("dia");
  let mes = document.getElementById("mes");
  let ano = document.getElementById("ano");
  let tipo = document.getElementById("tipo");
  let valor = document.getElementById("valor");
  let descricao = document.getElementById("descricao");

  let despesas = new Despesas(
    dia.value,
    mes.value,
    ano.value,
    tipo.value,
    valor.value,
    descricao.value
  );

  if (despesas.validarDados()) {
    bd.salvar(despesas);

    document.getElementById("modal_titulo").innerHTML =
      "Cadastro de despesa realizado";
    document.getElementById("modal_mensagem").innerHTML =
      "Sua despesa foi registrada com sucesso.";
    $("#modalregistro").modal("show");
    dia.value = "";
    mes.value = "";
    ano.value = "";
    tipo.value = "";
    valor.value = "";
    descricao.value = "";
  } else {
    document.getElementById("modal_titulo").innerHTML =
      "Erro no cadastro de despesa";
    document.getElementById("modal_mensagem").innerHTML =
      "Existem campos que não foram preenchidos de maneira correta.";
    $("#modalregistro").modal("show");
  }
}

function carregarDespesas(despesas = Array(), filtro = false) {
  if (despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarDados();
  }

  let listaDespesa = document.getElementById("listaDespesa");
  listaDespesa.innerHTML = "";

  despesas.forEach(function (d) {
    let row = listaDespesa.insertRow();

    switch (d.tipo) {
      case "1":
        d.tipo = "Necessidades";
        break;
      case "2":
        d.tipo = "Saúde";
        break;
      case "3":
        d.tipo = "Educação";
        break;
      case "4":
        d.tipo = "Lazer";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }

    row.insertCell(0).innerHTML = d.dia + "/" + d.mes + "/" + d.ano;
    row.insertCell(1).innerHTML = d.tipo;
    row.insertCell(2).innerHTML = d.descricao;
    row.insertCell(3).innerHTML = d.valor;

    let btn = document.createElement("button");
    btn.innerHTML = '<i class="fas fa-times"></i>';
    btn.className = "btn btn-drak";
    btn.id = "id_despesa_" + d.id;
    btn.onclick = function () {
      let id = this.id.replace("id_despesa_", "");

      bd.excluir(id);

      window.location.reload();
    };
    row.insertCell(4).append(btn);
  });
}

function pesquisar() {
  let dia = document.getElementById("dia");
  let mes = document.getElementById("mes");
  let ano = document.getElementById("ano");
  let tipo = document.getElementById("tipo");
  let valor = document.getElementById("valor");
  let descricao = document.getElementById("descricao");

  let despesa = new Despesas(
    dia.value,
    mes.value,
    ano.value,
    tipo.value,
    valor.value,
    descricao.value
  );

  let despesas = bd.pesquisar(despesa);

  carregarDespesas(despesas, true);
}
