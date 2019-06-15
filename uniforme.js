function maisQ(){
	var valorMinimo = document.getElementById("valorMinimo").value; // Pego o valor Minimo no html
	var valorMaximo = document.getElementById("valorMaximo").value; // Pego o valor maximo no html
	var media = (((Number(valorMaximo)) +(Number(valorMinimo))) / 2) // faço média
	var DP = (((valorMaximo - valorMinimo) **2)/12) // Pega o valor do desvio padrão
	DP = Math.sqrt(DP) // Raiz quadrada do desvio padrão
	DP = DP.toFixed(1) // Desvio padrão com uma casa decimal
	console.log("media = " + media , "DP = " + DP)
	var maisQue = document.getElementById("maisQue").value; // Pega o valor mais que no html
	//var menosQue = document.getElementById("menosQue").value;			
	//var primeiroEntre = document.getElementById("primeiroEntre").value;				
	//var segundoEntre = document.getElementById("segundoEntre").value;					
	var intervaloMaisQue = (valorMaximo - maisQue);
	//var intervaloMenosQue = (menosQue - valorMinimo);
	var saidaMaisQue =((((1/(valorMaximo - valorMinimo )) * intervaloMaisQue)*100).toFixed(2) + "%");
	//var saidaMenosQue = ((((1/(valorMaximo - valorMinimo)) * intervaloMenosQue) * 100).toFixed(2) + "%");
	//var saidaEntre = ((((1/(valorMaximo - valorMinimo)) * (segundoEntre - primeiroEntre)) * 100 ).toFixed(2) + "%");
	document.getElementById("media").innerHTML = ("A média é " + media);
	document.getElementById("DP").innerHTML = ("O desvio padrão é " + DP);
	if(maisQue != ""){
		document.getElementById("porcentagemMaisQue").innerHTML = ("Mais que = " + saidaMaisQue);
	}
	else{
		alert("Insira dados para o calculo do 'Mais Que'")
		document.getElementById("porcentagemMaisQue").innerHTML = ("");
	}

}

function menosQ(){
	var valorMinimo = document.getElementById("valorMinimo").value;
	var valorMaximo = document.getElementById("valorMaximo").value;
	var media = (((Number(valorMaximo)) +(Number(valorMinimo))) / 2)
	var DP = (((valorMaximo - valorMinimo) **2)/12)
	DP = Math.sqrt(DP)
	DP = DP.toFixed(1)
	console.log("media = " + media , "DP = " + DP)
	//var maisQue = document.getElementById("maisQue").value;
	var menosQue = document.getElementById("menosQue").value;			
	//var primeiroEntre = document.getElementById("primeiroEntre").value;				
	//var segundoEntre = document.getElementById("segundoEntre").value;					
	//var intervaloMaisQue = (valorMaximo - maisQue);
	var intervaloMenosQue = (menosQue - valorMinimo);
	//var saidaMaisQue =((((1/(valorMaximo - valorMinimo )) * intervaloMaisQue)*100).toFixed(2) + "%");
	var saidaMenosQue = ((((1/(valorMaximo - valorMinimo)) * intervaloMenosQue) * 100).toFixed(2) + "%");
	//var saidaEntre = ((((1/(valorMaximo - valorMinimo)) * (segundoEntre - primeiroEntre)) * 100 ).toFixed(2) + "%");
	document.getElementById("media").innerHTML = ("A média é " + media);
	document.getElementById("DP").innerHTML = ("O desvio padrão é " + DP);
	if(menosQue != ""){
		document.getElementById("porcentagemMenosQue").innerHTML = ("Menos que = " + saidaMenosQue)
	}
	else{
		alert("Insira dados para o calculo do 'Menos Que'")
		document.getElementById("porcentagemMenosQue").innerHTML = ("");
	}

}

function entre(){
	var valorMinimo = document.getElementById("valorMinimo").value;
	var valorMaximo = document.getElementById("valorMaximo").value;
	var media = (((Number(valorMaximo)) +(Number(valorMinimo))) / 2)
	var DP = (((valorMaximo - valorMinimo) **2)/12)
	DP = Math.sqrt(DP)
	DP = DP.toFixed(1)
	console.log("media = " + media , "DP = " + DP)
	//var maisQue = document.getElementById("maisQue").value;
	//var menosQue = document.getElementById("menosQue").value;			
	var primeiroEntre = document.getElementById("primeiroEntre").value;				
	var segundoEntre = document.getElementById("segundoEntre").value;					
	var intervaloMaisQue = (valorMaximo - maisQue);
	var intervaloMenosQue = (menosQue - valorMinimo);
	//var saidaMaisQue =((((1/(valorMaximo - valorMinimo )) * intervaloMaisQue)*100).toFixed(2) + "%");
	//var saidaMenosQue = ((((1/(valorMaximo - valorMinimo)) * intervaloMenosQue) * 100).toFixed(2) + "%");
	var saidaEntre = ((((1/(valorMaximo - valorMinimo)) * (segundoEntre - primeiroEntre)) * 100 ).toFixed(2) + "%");
	document.getElementById("media").innerHTML = ("A média é " + media);
	document.getElementById("DP").innerHTML = ("O desvio padrão é " + DP);
	if((primeiroEntre != "")&&(segundoEntre != "")){
		document.getElementById("porcentagemEntre").innerHTML = ("Entre = " + saidaEntre);
	}
	else{
		alert("Insira dados para o calculo do 'Entre'")
		document.getElementById("porcentagemEntre").innerHTML = ("");
	}
	
}




function voltar(link){
	window.location.href=link
}



//vvvvvvvvvvvvvvvvvvvvvvvvvvvvDanielvvvvvvvvvvvvvvvvvvvvvvvvvvvv	
	setTimeout(logado, 1);
function logado(){
	nome = localStorage.getItem("nome");
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
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Daniel^^^^^^^^^^^^^^^^^^^^^^^^^^^^^