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
var leitorDeCSV = new FileReader()
window.onload = function init() {
    leitorDeCSV.onload = leCSV;
}

function pegaCSV(inputFile) {
     var file = inputFile.files[0];
     leitorDeCSV.readAsText(file);
}
function leCSV(evt) {
	var fileArr = evt.target.result;
	fileArr =  fileArr.split("\n")
	document.getElementById("vI").value = fileArr[0]
	document.getElementById("vD").value = fileArr[1]

}
//************************ Calculos de Correlação e Regressão **************************//
function calcularCorreRegre(){
	var sxy = 0;
	var sx = 0;
	var sy = 0;
	var sxa2 = 0;
	var sya2 = 0;
	var x = 0;
	var y = 0;
	var r = 0;
	var a = 0;
	var b = 0;
	var nivelCorre;
	var Super;
	var Infer;
	var saidaEquacReta;
	var pfxy = 0;
	var rpfxy;
	var valorx = false;
	var valory = false;
	var I = [];
	var D = [];
	var varI = [];
	var varD = [];
	var scatter = [];
	var line = [];
	I = (document.getElementById("vI").value);
	D = (document.getElementById("vD").value);
	varI = I.split(";");
	varD = D.split(";");
    
	console.log(varI);
    console.log(varD);

	for(var i=0; i< varD.length; i++){
		varI[i] = Number(varI[i].replace(",","."));
		varD[i] = Number(varD[i].replace(",","."));
		sxy += varI[i]*varD[i];
		sx += varI[i];
		sy += varD[i];
		sxa2 += varI[i]*varI[i];
		sya2 += varD[i]*varD[i];
	}
	console.log(sxy);
	console.log(sx);
	console.log(sy);
	console.log(sxa2);
	console.log(sya2);
    
//************************ Correlação **************************//
	r = ((varI.length*sxy) - (sx*sy))/Math.sqrt(((varI.length*sxa2)-(sx*sx))*((varI.length*sya2)-(sy*sy)));

	console.log("r:" + r)

	if (Math.abs(r) < 0 || Math.abs(r) < 0.3) {
		console.log("Correlação de inexistente à muito fraca");
        nivelCorre = "De Inexistente à Muito Fraca";
        }
    else if (Math.abs(r) <= 0.3 || Math.abs(r) < 0.6) {
		console.log("Correlação de fraca à média");
        nivelCorre = "De Fraca à Média";        
        }
    else if (Math.abs(r) <= 0.6 || Math.abs(r) <= 1) {
		console.log("Correlação de média à forte");
        nivelCorre = "De Média à Forte";                
		}
		console.log("Coeficiente de correlação linear: " + r.toFixed(2));

//************************ Regressão **************************//
	a = ((varI.length*sxy)-(sx*sy))/((varI.length*sxa2)-(sx*sx));
	b = (sy/varI.length)-a*(sx/varI.length);

	console.log("A equação da regrssão é: y = " + a.toFixed(2) + " x + " + b.toFixed(2) + ".");
//******************* Equação da Reta ************************//
	if (b > 0) {
		EquacReta = " A equação da reta é = A Variável Dependente(y) = " + a.toFixed(2) + "A Variável Independente(x) + " + b.toFixed(2);
	}
	else {
		EquacReta = " A equação da reta é = A Variável Dependente(y) = " + a.toFixed(2) + "  Variável Independente(x) " + b.toFixed(2);
}

//******************* Projeção Futura ************************//

	y = (document.getElementById("y").value);

	x = (document.getElementById("x").value);

	if (x % x == 0){
		valorx = true;
	}
	if (y % y == 0){
		valory = true;
	}
	if ((valorx == false) && (valory == true)){
		pfxy = (y-b)/a;
		rpfxy ="de y = "+y+" é x = "+pfxy.toFixed(2)
	}
	if ((valory == false) && (valorx == true)){
		pfxy = (a*x)+b;
		rpfxy ="de x = "+x+" é y = "+pfxy.toFixed(2)
	}
	if ((valory == true) && (valorx == true)){
		rpfxy = "É Ilógica Apague Uma das Variáveis e Aperte Calcular";
	}
	if ((valory == false) && (valorx == false)){
		rpfxy = "Ainda Não Foi Feita";
	}
//******************* Grafico de CorreRegre ************************//
	Super = varD[0];
	Infer = varD[0];

	
    for (var i = 0; i < varD.length; i++) {
		if (varD[i] > Super) {
			Super = varD[i];
			}
		if (varD[i] < Infer) {
			Infer = varD[i];
			}
	y = Super;
	x = (y-b)/a;
	line.push({x,y});
	y = Infer;
	x = (y-b)/a;
	line.push({x,y});		
	}

	for (var i = 0; i < varD.length; i++) {
		scatter.push({ x: varI[i], y: varD[i] });
	}

	console.log(scatter);
	document.getElementById("saidaCoefiCorre").innerHTML ="O Coeficiente do Nível de Correlação é: De "+r.toFixed(2)*100+"%";
	document.getElementById("saidaNivelCorre").innerHTML ="O Nível de Correlação é: "+nivelCorre;
	document.getElementById("saidaEquacReta").innerHTML ="A Equação da Reta é: "+"y = " + a.toFixed(2) + ' * ' + " x + " + b.toFixed(2);
	document.getElementById("saidaProjeFutur").innerHTML ="Sua Projeção Futura "+rpfxy;
	grafiCorreRegre(scatter, line);

}

	function grafiCorreRegre(scatter, line){
	var ctx = document.getElementById("myChartcorrela");
	var mixedChart = new Chart(ctx, {
	type: 'scatter',
	data: {
	datasets: [{
		label: 'Correlação entre x e y',
			data: scatter,
				backgroundColor: "rgba(82,178,197,1)"
			},
		{
		type: 'line',
		label: 'Equação Reta',
			data: line,
			showLine: true,
			fill: false,
				backgroundColor: "rgba(243,232,83,1)",
				pointBorderColor: "rgba(243,232,83,1)",                
				borderColor: "rgba(243,232,83,1)"                
				},
				]
			},
			options: {
				scales: {
					yAxes: [{
						beginAtZero: true
					}],
					xAxes: [{
						beginAtZero: true
						
					}],
					
				},
				elements: {
					line: {
						tension: 0
					}
				}
			}
	});
	}


//********************* Resultados **********************//	

//********************* Fim da Correlação e Regressão **********************//