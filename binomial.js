function calcula(){
	var NFatorial = 0;
	var KFatorial = 0;
	var NFatorialMENOSKFatorial = 0 ;// n menos k fatorial
	var N = Number(document.getElementById("N").value); // Pega o valor de N no html
	var P = Number(document.getElementById("P").value); // Pega o valor de Q no html
	var Q = Number(document.getElementById("Q").value); // Pega o valor de Q no html
	var K = document.getElementById("K").value; // Pega valor(es) de K no html
	K = K.split(';'); // Variável K separada por (;)
	var somaSaida = 0 ;
	for(var i = 0 ; i < K.length; i++){
		var NMK = (N - K[i]) // N - K  
		NFatorial = fatora(N) // Pega o fatorial de N
		KFatorial = fatora(K[i]) // Pega o fatorial de K
		NFatorialMENOSKFatorial = fatora(NMK) // Recebe a função de fatorial passando N - K como parâmetro
		var analiseCombinatoria = (NFatorial/(KFatorial*NFatorialMENOSKFatorial))
		var PEK = P ** K[i] // P elevado a K
		var QENMK = (Q **(N-K[i])) // Q elevado a N - K
		var saida = (analiseCombinatoria*PEK*QENMK)
		somaSaida += (saida * 100)
	}
	// Faz os cálculos
	var media = (N*P)
	var somaDP = (N*P*Q)
	var DP = Math.sqrt(somaDP)
	// Imprime as respostas na tela	
	document.getElementById("porcentagem").innerHTML = ((somaSaida.toFixed(2)) + "%")
	document.getElementById("media").innerHTML = ("media = " + media.toFixed(2))
	document.getElementById("DP").innerHTML = ("DP = " + DP.toFixed(2))
}

function fatora(num){ // Função recursiva para calcular o fatorial
    
    if (num < 0){
        return -1;
    }
    else if (num == 0){
        return 1;
    }
    else{
       return (num * fatora(num - 1));
    }
}

var logado
logado =  localStorage.getItem("logado") // ler no localStorage
if(logado == 1){
	setTimeout(nomeLogado, 1); // Aguarda um segundo
}
else{
	localStorage.removeItem("logado")
	window.location.href="index.html"
}
function nomeLogado(){
	nome = localStorage.getItem("nome"); // Faz a leitura do que está dentro do localStorage
	document.getElementById("nomeInvisivel").innerHTML =  nome
	document.getElementById("nomeInvisivel").id ="visivel"
	document.getElementById("botaoSair").id = "botaoVisivel"
	logado = 1
	localStorage.setItem("logado", logado);
}
function sair(link){ // Botão Sair
	localStorage.removeItem("logado") // Desloga
	window.location.href=link // Redireciona para a Landing Page
}
