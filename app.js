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
		for()
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
		bd.salvar(despesas)
	} else {

	}
	
}

