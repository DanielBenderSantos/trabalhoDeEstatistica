var logado
logado =  localStorage.getItem("logado")
if(logado == 1){
	setTimeout(nomeLogado, 1);
}

function nomeLogado(){
	nome = localStorage.getItem("nome");
	//alert("Bem vindo " + nome)
	document.getElementById("emailLogin").id = "invisivel"
	document.getElementById("senhaLogin").id = "invisivel"
	document.getElementById("botaoLogar").id = "invisivel"
	document.getElementById("nomeInvisivel").innerHTML =  nome
	document.getElementById("nomeInvisivel").id ="visivel"
	document.getElementById("botaoSair").id = "botaoVisivel"

	logado = 1
	localStorage.setItem("logado", logado);
}

function sair(link){
	localStorage.removeItem("logado")
	window.location.href=link
}