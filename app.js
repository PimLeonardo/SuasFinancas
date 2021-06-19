class Despesas {
	constructor(dia, mes, ano, tipo, valor, descricao){
		this.dia = dia
		this.mes = mes
		this.ano = ano
		this.tipo = tipo
		this.valor = valor
		this.descricao = descricao
	}
}

function cadastrarDespesa() {

	let dia = document.getElementById('dia')
	let mes = document.getElementById('mes')
	let ano = document.getElementById('ano')
	let tipo = document.getElementById('tipo')
	let valor = document.getElementById('valor')
	let descricao = document.getElementById('descricao')

	let despesas = new Despesas(dia.value, mes.value, ano.value, tipo.value, valor.value, descricao.value)

	salvar(despesas)
}

function salvar(d) {
	localStorage.setItem('despesas', JSON.stringify(d))
}