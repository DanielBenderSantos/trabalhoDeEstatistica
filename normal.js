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

////////////////////////////////////////////////////////calculos///////////////////////////////
// Cálculo mais que
function calculaMaisQue(){
	media = Number(document.getElementById("media").value);
	DP = Number(document.getElementById("DP").value); // Desvio Padrão
	maisQue = Number(document.getElementById("maisQue").value);
	if((maisQue % maisQue) == 0 ){
		var X = maisQue
		var Z = ((X - media) / DP).toFixed(2);
		var ZADV =((X - media) / DP).toFixed(2); //Z antes da virgula
		var ZADV= ZADV.split(".") // Separa o que vem antes e depois do ponto
		var Z = Z.split("")
		var tamanhoZ = (Z.length)
		var coluna = (Z[tamanhoZ-1])
		if(ZADV[0] == 0){
			var linha = Z[tamanhoZ-2]
		}
		else{
			var linha = (ZADV[0] + Z[tamanhoZ-2])
		}
		if(maisQue > media){
			tabela(coluna,linha) // Chama a função tabela e passa a linha e a coluna como referência
			probabilidade = Number(0.5) - Number(saidaZ)
			probabilidade = ((probabilidade*100).toFixed(2) + "%")
		}
		else if(maisQue < media){
			var Z = ((X - media) / DP).toFixed(2);
			var Z = (Number(Z)* -1).toFixed(2)			
			var ZADV =((X - media) / DP).toFixed(2); //Z antes da virgula
			var ZADV = (Number(ZADV)* -1).toFixed(2)
			var ZADV= ZADV.split(".")
			var Z = Z.split("")
			var tamanhoZ = (Z.length)
			var coluna = (Z[tamanhoZ-1])
		if(ZADV[0] == 0){
			var linha = Z[tamanhoZ-2]
		}
		else{
			var linha = (ZADV[0] + Z[tamanhoZ-2])
		}
			tabela(coluna,linha)  // Chama a função tabela e passa a linha e a coluna como referência
			probabilidade = Number(saidaZ) + Number(0.5)
			probabilidade = ((probabilidade*100).toFixed(2) + "%")
		}
		else if(maisQue = media){
			probabilidade = 0.5
			probabilidade = ((probabilidade*100).toFixed(2) + "%")
		}
		////alert(probabilidade)
		document.getElementById("saidaMaisQue").innerHTML = ("probabilidade mais que: " + probabilidade)	
	}
	else{
				document.getElementById("saidaMaisQue").innerHTML = ("")	

	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Cálculo menos que 
function calculaMenosQue(){
	media = Number(document.getElementById("media").value);
	DP = Number(document.getElementById("DP").value);
	menosQue = Number(document.getElementById("menosQue").value);
	if((menosQue % menosQue) == 0 ){
		var X = menosQue
		var Z = ((X - media) / DP).toFixed(2);
		var ZADV =((X - media) / DP).toFixed(2); //Z antes da virgula
		var ZADV= ZADV.split(".")
		var Z = Z.split("")
		var tamanhoZ = (Z.length)
		var coluna = (Z[tamanhoZ-1])
		if(ZADV[0] == 0){
			var linha = Z[tamanhoZ-2]
		}
		else{
			var linha = (ZADV[0] + Z[tamanhoZ-2])
		}
		//console.log("Z inteiro = " + Z) // a casa 1 ficou para o ponto portanto usarei as casa 0 , 2 e 3 
		if(menosQue > media){
			tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
			probabilidade = Number(0.5) + Number(saidaZ)
			probabilidade = ((probabilidade*100).toFixed(2) + "%")
		}
		else if(menosQue < media){
			var Z = ((X - media) / DP).toFixed(2);
			var Z = (Number(Z)* -1).toFixed(2)			
			var ZADV =((X - media) / DP).toFixed(2); //Z antes da virgula
			var ZADV = (Number(ZADV)* -1).toFixed(2)
			var ZADV= ZADV.split(".")
			var Z = Z.split("")
			var tamanhoZ = (Z.length)
			var coluna = (Z[tamanhoZ-1])
		if(ZADV[0] == 0){
			var linha = Z[tamanhoZ-2]
		}
		else{
			var linha = (ZADV[0] + Z[tamanhoZ-2])
		}
			tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
			probabilidade =  Number(0.5) - Number(saidaZ)
			probabilidade = ((probabilidade*100).toFixed(2) + "%")
		}
		else if(menosQue = media){
			probabilidade = 0.5
			probabilidade = ((probabilidade*100).toFixed(2) + "%")
		}
		////alert(probabilidade)
		document.getElementById("saidaMenosQue").innerHTML = ("probabilidade menos que: " + probabilidade)	
	}
	else{
				document.getElementById("saidaMenosQue").innerHTML = ("")	

	}
}
///////////////////////////////////////////////////////////////////////////////
// Cálculo entre
function calculaEntre(){
	media = Number(document.getElementById("media").value);
	DP = Number(document.getElementById("DP").value);
	primeiroEntre = Number(document.getElementById("primeiroEntre").value);
	X1 = primeiroEntre;
	segundoEntre = Number(document.getElementById("segundoEntre").value);
	X2 = segundoEntre;

	if(((primeiroEntre % primeiroEntre) == 0) && (segundoEntre % segundoEntre) == 0 ){
		if((primeiroEntre < media) && (segundoEntre <= media)){
			var Z1 = ((X1 - media) / DP).toFixed(2);
			Z1 = (Number(Z1)* -1).toFixed(2)
			var ZADV1 =((X1 - media) / DP).toFixed(2); //Z antes da virgula		
			var ZADV1 = (Number(ZADV1)* -1).toFixed(2)
			var ZADV1= ZADV1.split(".")
			var Z1 = Z1.split("")
			var tamanhoZ1 = (Z1.length)
			var coluna = (Z1[tamanhoZ1-1])
			if(ZADV1[0] == 0){
				var linha = Z1[tamanhoZ1-2]
			}
			else{
				var linha = (ZADV1[0] + Z1[tamanhoZ1-2])
			}
			tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
			saidaZ1 = (saidaZ)

			if(X2 == media){
				saidaZ2 = 0
			}
			else{
				var Z2 = ((X2 - media) / DP).toFixed(2);
				Z2 = (Number(Z2)* -1).toFixed(2)
				var ZADV2 =((X2 - media) / DP).toFixed(2); //Z antes da virgula		
				var ZADV2 = (Number(ZADV2)* -1).toFixed(2)
				var ZADV2= ZADV2.split(".")
				var Z2 = Z2.split("")
				var tamanhoZ2 = (Z2.length)
				var coluna = (Z2[tamanhoZ2-1])
				if(ZADV2[0] == 0){
					var linha = Z2[tamanhoZ2-2]
				}
				else{
					var linha = (ZADV2[0] + Z2[tamanhoZ2-2])
				}
				tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
				saidaZ2 = (saidaZ)
			}
			probabilidade = ((saidaZ1 - saidaZ2)*100).toFixed(2)
		}
		else if((primeiroEntre <= media) && (segundoEntre >= media)){
			if(X1 == media){
				saidaZ1 = 0
			}
			else{
				var Z1 = ((X1 - media) / DP).toFixed(2);
				Z1 = (Number(Z1)* -1).toFixed(2)
				var ZADV1 =((X1 - media) / DP).toFixed(2); //Z antes da virgula		
				var ZADV1 = (Number(ZADV1)* -1).toFixed(2)
				var ZADV1= ZADV1.split(".")
				var Z1 = Z1.split("")
				var tamanhoZ1 = (Z1.length)
				var coluna = (Z1[tamanhoZ1-1])
				if(ZADV1[0] == 0){
					var linha = Z1[tamanhoZ1-2]
				}
				else{
					var linha = (ZADV1[0] + Z1[tamanhoZ1-2])
				}
				tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
				saidaZ1 = (saidaZ)	
			}
			if(X2 == 0 ){
				saidaZ2 = 0
			}
			else{
				var Z2 = ((X2 - media) / DP).toFixed(2);
				var ZADV2 =((X2 - media) / DP).toFixed(2); //Z antes da virgula		
				var ZADV2= ZADV2.split(".")
				var Z2 = Z2.split("")
				var tamanhoZ2 = (Z2.length)
				var coluna = (Z2[tamanhoZ2-1])
				if(ZADV2[0] == 0){
					var linha = Z2[tamanhoZ2-2]
				}
				else{
					var linha = (ZADV2[0] + Z2[tamanhoZ2-2])
				}
				tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
				saidaZ2 = (saidaZ)
			}
			probabilidade = ((saidaZ1 + saidaZ2)*100).toFixed(2)
		}
		else if ((primeiroEntre >= media) && (segundoEntre > media)){
			if(X1 == 0 ){
				saidaZ1 = 0 
			}
			else{
				var Z1 = ((X1 - media) / DP).toFixed(2);
				var ZADV1 =((X1 - media) / DP).toFixed(2); //Z antes da virgula		
				var ZADV1= ZADV1.split(".")
				var Z1 = Z1.split("")
				var tamanhoZ1 = (Z1.length)
				var coluna = (Z1[tamanhoZ1-1])
				if(ZADV1[0] == 0){
					var linha = Z1[tamanhoZ1-2]
				}
				else{
					var linha = (ZADV1[0] + Z1[tamanhoZ1-2])
				}
				tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
				saidaZ1 = (saidaZ)
			}
				var Z2 = ((X2 - media) / DP).toFixed(2);
				var ZADV2 =((X2 - media) / DP).toFixed(2); //Z antes da virgula		
				var ZADV2= ZADV2.split(".")
				var Z2 = Z2.split("")
				var tamanhoZ2 = (Z2.length)
				var coluna = (Z2[tamanhoZ2-1])
				if(ZADV2[0] == 0){
					var linha = Z2[tamanhoZ2-2]
				}
				else{
					var linha = (ZADV2[0] + Z2[tamanhoZ2-2])
				}
				tabela(coluna,linha) // Chama a função tabela e passa coluna e linha como referência
				saidaZ2 = (saidaZ)

				probabilidade = ((saidaZ2 - saidaZ1)*100).toFixed(2)

	}
		document.getElementById("saidaEntre").innerHTML = ("A probabilidade de ser entre " + primeiroEntre + " e " + segundoEntre + " e de: " +  probabilidade + "%")
	}
	else{
			document.getElementById("saidaEntre").innerHTML = ("")
		}
}
///////////
function tabela(coluna,linha){
	var tabela = [
	[0.0000,0.0398,0.0793,0.1179,0.1554,0.1915,0.2257,0.2580,0.2881,0.3159,0.3413,0.3643,0.3849,0.4032,0.4192,0.4332,0.4452,0.4554,0.4641,0.4713,0.4772,0.4821,0.4861,0.4893,0.4918,0.4938,0.4953,0.4965,0.4974,0.4981,0.4987,0.4990,0.4993,0.4995,0.4997,0.4998,0.4998,0.4999,0.4999,0.5000],//tabela coluna 0 
	[0.0040,0.0438,0.0832,0.1217,0.1591,0.1950,0.2291,0.2611,0.2910,0.3186,0.3438,0.3665,0.3869,0.4049,0.4207,0.4345,0.4463,0.4564,0.4649,0.4719,0.4778,0.4826,0.4864,0.4896,0.4920,0.4940,0.4955,0.4966,0.4975,0.4982,0.4987,0.4991,0.4993,0.4995,0.4997,0.4998,0.4998,0.4999,0.4999,0.5000],//tabela coluna 1
	[0.0080,0.0478,0.0871,0.1255,0.1628,0.1985,0.2324,0.2642,0.2939,0.3212,0.3461,0.3686,0.3888,0.4066,0.4222,0.4357,0.4474,0.4573,0.4656,0.4726,0.4783,0.4830,0.4868,0.4898,0.4922,0.4941,0.4956,0.4967,0.4967,0.4982,0.4987,0.4991,0.4994,0.4995,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 2 
	[0.0120,0.0517,0.0910,0.1293,0.1664,0.2019,0.2357,0.2673,0.2967,0.3238,0.3485,0.3708,0.3907,0.4082,0.4236,0.4370,0.4484,0.4582,0.4664,0.4732,0.4788,0.4834,0.4871,0.4901,0.4925,0.4943,0.4957,0.4968,0.4977,0.4983,0.4988,0.4991,0.4994,0.4996,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 3 
	[0.0160,0.0557,0.0948,0.1331,0.1700,0.2054,0.2389,0.2703,0.2995,0.3264,0.3508,0.3729,0.3925,0.4099,0.4251,0.4382,0.4495,0.4591,0.4671,0.4738,0.4793,0.4838,0.4875,0.4904,0.4927,0.4945,0.4959,0.4969,0.4977,0.4984,0.4988,0.4992,0.4994,0.4996,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 4 
	[0.0199,0.0596,0.0987,0.1368,0.1736,0.2088,0.2422,0.2734,0.3023,0.3289,0.3531,0.3749,0.3944,0.4115,0.4265,0.4394,0.4505,0.4599,0.4678,0.4744,0.4798,0.4842,0.4878,0.4906,0.4929,0.4946,0.4960,0.4970,0.4978,0.4984,0.4989,0.4992,0.4994,0.4996,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 5 
	[0.0239,0.0636,0.1026,0.1406,0.1772,0.2123,0.2454,0.2764,0.3051,0.3315,0.3554,0.3770,0.3962,0.4131,0.4279,0.4406,0.4515,0.4608,0.4686,0.4750,0.4803,0.4846,0.4881,0.4909,0.4931,0.4948,0.4961,0.4971,0.4979,0.4985,0.4989,0.4992,0.4994,0.4996,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 6 
	[0.0279,0.0675,0.1064,0.1443,0.1808,0.2157,0.2486,0.2794,0.3078,0.3340,0.3577,0.3790,0.3980,0.4147,0.4292,0.4418,0.4525,0.4616,0.4693,0.4756,0.4808,0.4850,0.4884,0.4911,0.4932,0.4949,0.4962,0.4972,0.4979,0.4985,0.4989,0.4992,0.4995,0.4996,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 7 
	[0.0319,0.0714,0.1103,0.1480,0.1844,0.2190,0.2517,0.2823,0.3106,0.3365,0.3599,0.3810,0.3997,0.4162,0.4306,0.4429,0.4535,0.4625,0.4699,0.4761,0.4812,0.4854,0.4887,0.4913,0.4934,0.4951,0.4963,0.4973,0.4980,0.4986,0.4990,0.4993,0.4995,0.4996,0.4997,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 8 
	[0.0359,0.0753,0.1141,0.1517,0.1879,0.2224,0.2549,0.2852,0.3133,0.3389,0.3621,0.3830,0.4015,0.4177,0.4319,0.4441,0.4545,0.4633,0.4706,0.4767,0.4817,0.4857,0.4890,0.4916,0.4936,0.4952,0.4964,0.4974,0.4981,0.4986,0.4990,0.4993,0.4995,0.4997,0.4998,0.4998,0.4999,0.4999,0.4999,0.5000],//tabela coluna 9 
	]
	saidaZ = (tabela[coluna][linha])
	if(saidaZ == undefined){
		saidaZ = 0.4999
		return saidaZ
	}
	else{
		return saidaZ = (tabela[coluna][linha])
	}

}