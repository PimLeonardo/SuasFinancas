class Despesas {
	constructor(dia, mes, ano, tipo, valor, descricao){
		this.dia = dia
		this.mes = mes
		this.ano = ano
		this.tipo = tipo
		this.valor = valor
		this.descricao = descricao
	}

	validarDados()	{

		for(let i in this){
			if (this[i] == undefined || this[i] == '' || this[i] == null || this.dia > 31 || this.dia < 1) {
				return false
			} 
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getId(){
		let novoId = localStorage.getItem('id')
		return parseInt(novoId) + 1
	}

	salvar(d) {
		let id = this.getId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

	recuperarDados() {
		let id = localStorage.getItem('id')
		let despesas = Array()

		for(let i = 1; i <= id; i++) {
			let despesa = JSON.parse(localStorage.getItem(i))

			if (despesa === null) {
				continue
			}

			despesas.push(despesa)
		}
		return despesas
	}
}

let bd = new Bd()

function cadastrarDespesa() {

	let dia = document.getElementById('dia')
	let mes = document.getElementById('mes')
	let ano = document.getElementById('ano')
	let tipo = document.getElementById('tipo')
	let valor = document.getElementById('valor')
	let descricao = document.getElementById('descricao')

	let despesas = new Despesas(dia.value, mes.value, ano.value, tipo.value, valor.value, descricao.value)

	if (despesas.validarDados()) {
		//bd.salvar(despesas)

		document.getElementById('modal_titulo').innerHTML = 'Cadastro de despesa realizado'
		document.getElementById('modal_mensagem').innerHTML = 'Sua despesa foi cadastrada com sucesso.'
		$('#modalregistro').modal('show')
	} else {
		document.getElementById('modal_titulo').innerHTML = 'Erro no cadastro de despesa'
		document.getElementById('modal_mensagem').innerHTML = 'Existem campos que não foram preenchidos de maneira correta.'
		$('#modalregistro').modal('show')
	}
}

function carregarDespesas() {
	let despesas = Array()

	despesas = bd.recuperarDados()
}