const separador=" |---- ";
var dados = [];
$(function() {
	$('#campos').submit(function(param) {
		param.preventDefault();
		var pop = $('input[name=populacao1]:checked').val();
		var dad = removerVazios($('#dados').val().split(';'));
		var nome = $('#nomeV').val();
		var selec = $('#selecionaQ').val();
		var colunas = [nome, 'fi', 'fr%', 'fac', 'fac%'];
		var dados = null;
		var media = calcMedia(dad);
		var mediana = calcMediana(dad);
		var moda = calcModa(dad);
		var amopop=0;
		var funcGraf = grafico;
		//var recebe_radio = PQ(dad); // inserido
		//var resto = PQ(dad); // inserido
		if (selec == 1) { // Qualitativa Nominal
			dados = calcNominal(dad);
			media = 0;
			if(dados !== null){
				var guardar = calcularQ(dad);
				var QNominal = PQ(guardar,dad);
				var funcGraf = qualiNomGrafico;
			$("#til").html('MS Nominal: | ' + QNominal[0] + ' | ');
			
			//console.log(PQ(guardar,dad));
			}
		} else if (selec == 2) { // Qualitativa Ordinal
				var ordem= removerVazios($('#ordemQ').val().split(';'));
				dados = calcOrdinal(dad,ordem);
				var guardar = calcularQ(dad);
				var QOrdinal = PQ(guardar,dad);
				var funcGraf = qualiNomGrafico;
				$("#til").html('MS Ordinal: | ' + QOrdinal[0] + ' |');
				//console.log(PQ(guardar,dad));

			}
			else if (selec == 3) { // Quantitativa Contínua
			colunas.unshift('classe');
			dados = calcContinua(dad);
			var pontoMedio=getMediConti(dados[1]);
			media=mediaContinua(dad.length,pontoMedio,dados[2])
			amopop=desvio(pontoMedio,pop, dados[2],media)
			var guardar = calcularQ(dad);
			var armazena = msCont(guardar,dados[1],dados[4],dados[2]);
			$("#til").html('|' + armazena[0] + '%: ' + armazena[1] + '|');
			moda = modaCont(dados, dad);
			mediana = medianaContinua(dados);
			funcGraf = graficoCont;
		} else if (selec == 4) { // Quantitativa Discreta
			dados = calcDiscreta(dad);
			amopop=desvio(dados[0],pop,dados[1],media)
			if(dados !== null){
				var guardar = calcularQ(dad);
				//var QDiscreta = ("Cálculo MS discreta: " + PQ(guardar,dad));
				var QDiscreta = PQ(guardar,dad);
				console.log(QDiscreta);
				$('#til').html('|' + QDiscreta[2] + "%: " + QDiscreta[0] + " ou -" + "|" + QDiscreta[1] + "%: " + QDiscreta[0] + " ou + |");
				//console.log(PQ(guardar,dad));
			}

			// Q[0]: RESPOSTA, Q[1]: RESTO Q[2]: recebe_radio
		}
		if (dados !== null) {
			calculos(media, moda, mediana);
			tabela(colunas, dados)
			var  checar=("desvio : " + amopop)
			$('#desvio').html(checar);
			var variacao = ("coeficiente de variação :" + cv(amopop, media))
			$('#cv').html(variacao)
			funcGraf(dados, colunas[0]);
		}
	});
	$('#selecionaQ').change(function(param) {
		if($(this).val() == 2)
		$("#ordemquali").show()
		else{
			$("#ordemquali").hide()
		}
	});
});

/* -------- MODIFICAÇÕES -------- */
// Pegar a posição do maior fi
function maiorFi(vetorFi) {
	var pos = 0;
	vetorFi.forEach(function(element, index) {
		if (vetorFi[pos] < element) {
			pos = index;
		}
	});
	return pos;
}
// Fazer a moda da contínua
function modaCont(dados, dad) {
	var fi = maiorFi(dados[2]);
	var limites = dados[1][fi].split(separador);
	var dataModa = [];
	for (var i = 0; i < dad.length; i++) {
		if (dad[i] >= parseInt(limites[0]) && dad[i] < parseInt(limites[1]))
			dataModa.push(dad[i]);
	}
	var moda = (Number(limites[0]) + Number(limites[1])) / 2
	console.log('MODA CONTINUA: ' + moda)
	return moda;
}
function redraw() {
	var container = document.getElementById('chart-container');
	while (container.firstChild) {
        container.removeChild(container.firstChild);
	}
	newCtx = document.createElement('canvas');
	newCtx.id = 'myChart';
	container.appendChild(newCtx);
}
function graficoCont(dados) {
	redraw();
	nomeCont = document.getElementById('nomeV').value;
	var ctx = document.getElementById('myChart');
	console.log('Gráfico cont dados: ' + dados[1]);
	console.log('Gráfico cont dados: ' + dados[2]);
	var myBarChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: dados[1],
			datasets: [{
				label: nomeCont,
				data: dados[2],
				backgroundColor: getCores(dados[2].length),
			}]
		},
		options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
              categoryPercentage: 1.0,
              barPercentage: 1
          }],
        }
    }
	});
}

function grafico(dados, nome) {
	redraw();
	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: dados[0],
			datasets: [{
				label: nome,
				data: dados[1],
				backgroundColor: getCores(dados[1].length),
			}]
		},
		options: { // Configura em qual valor começa e qual termina no gráfico
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true, // Gráfico começa com valor igual a 0 na lateral
						suggestedMax: 1 // O maximo dele é 1
					}
				}],
			}
		}
	});
}
function qualiNomGrafico(dados,nome){
		redraw();
	nomeCont = document.getElementById('nomeV').value;
	var ctx = document.getElementById('myChart');
	console.log('Gráfico cont dados: ' + dados[0]);
	console.log('Gráfico cont dados: ' + dados[1]);
	var myPieChart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: dados[0],
			datasets: [{
				label: nomeCont,
				data: dados[1],
				backgroundColor: getCores(dados[1].length),
			}]
		},
	});
}


function getCores(tamanho) { // As cores geradas aleatoriamente na function abaixo, é inserida no vetor dessa função
	var cores = [];
	for (var i = 0; i < tamanho; i++) {
		cores.push(getCorAleatoria());
	}
	return cores;
}
function getCorAleatoria(alpha = "0.6") { // Gera cores aleatória pelo 'rgba' de 0 a 256
	cor_aleatoria = "rgba(";
	for (i = 0; i < 3; i++) {
		cor = aleatorio(0, 256);
		cor_aleatoria += cor + ", ";
	}
	return cor_aleatoria += alpha+")";
}
function aleatorio(inferior, superior) { 
	numPossibilidades = superior - inferior;
	aleat = Math.random() * numPossibilidades;
	aleat = Math.floor(aleat);
	return parseInt(inferior) + aleat;
}
/* -------- FIM MODIFICAÇÕES -------- */

function calculos(media, moda, mediana) {
	var tresm = 'Média: ' + media + '<br>Mediana: ' + mediana + '<br>Moda: ' + moda;
	$('#tresm').html(tresm);
}
function tabela(colunas, dados) {
	var cabecalho = "<tr>";
	var conteudo = "";
	for (var i = 0; i < colunas.length; i++) {
		cabecalho += '<th>' + colunas[i] + '</th>';
	}
	cabecalho += "</tr>";
	$('#tabela table thead').html(cabecalho);
	for (var i = 0; i < dados[0].length; i++) {
		conteudo += "<tr>";
		for (var j = 0; j < colunas.length; j++) {
			conteudo += "<td>"+dados[j][i]+"</td>";
		}
		conteudo += "</tr>";
	}
	$('#tabela table tbody').html(conteudo);
	$('#tabela').show();
}

function calcNominal(vetor) {
	var result = [];
	var fi = [];
	var fr = [];
	var fac = [];
	var facP = [];
	var ant = "";
	var cont = 0;
	vetor.sort();
	for (var i = 0; i < vetor.length; i++) {
		if (vetor[i] == ant)
			continue;
		result.push(vetor[i]);
		fi.push(getFi(vetor, vetor[i]));
		fr.push(getFr(vetor, fi[cont]));
		fac.push(getFac(fac, fi, cont));
		facP.push(getFacP(facP, fr, cont));
		ant = vetor[i];
		cont++;
	}
	return [result, fi, fr, fac, facP];
}

function calcOrdinal(vetor,ordem){
	var result = [];
	var fi = [];
	var fr = [];
	var fac = [];
	var facP = [];
	var ant = "";
	var cont = 0;
	vetor = ordenarVet(vetor, ordem)
	for (var i = 0; i < vetor.length; i++) {
		if (vetor[i] == ant)
			continue;
		result.push(vetor[i]);
		fi.push(getFi(vetor, vetor[i]));
		fr.push(getFr(vetor, fi[cont]));
		fac.push(getFac(fac, fi, cont));
		facP.push(getFacP(facP, fr, cont));
		ant = vetor[i];
		cont++;
	}
	return [result, fi, fr, fac, facP];
}
function ordenarVet(vet, ordem) {
	var vetor = [];
	var ant = "";
	vet.sort();
	for (var i = 0; i < ordem.length; i++) {
		for (var j = 0; j < vet.length; j++) {
			if (vet[j] == ordem[i])
				vetor.push(vet[j]);
		}
	}
	return vetor;
}


function calcContinua(vetor) {
	var classe = [];
	var result = [];
	var fi = [];
	var fr = [];
	var fac = [];
	var facP = [];
	var ant = "";
	var cont = 0;
	vetor = ordenarNum(vetor);
	var intervalo = getIntervalo(vetor);
	for (var i = 0, j = parseInt(vetor[0]); j <= parseInt(vetor[vetor.length - 1]); i++) {
		if (vetor[i] == ant)
			continue;
		classe.push(cont+1);
		result.push(j + separador + (j+intervalo));
		fi.push(getFiCont(vetor, j, j + intervalo));
		fr.push(getFr(vetor, fi[cont]));
		fac.push(getFac(fac, fi, cont));
		facP.push(getFacP(facP, fr, cont));
		ant = vetor[i];
		cont++;
		j += parseInt(intervalo)
	}
	return [classe, result, fi, fr, fac, facP];
}

function calcDiscreta(vetor) {
	var result = [];
	var fi = [];
	var fr = [];
	var fac = [];
	var facP = [];
	var ant = "";
	var cont = 0;
	vetor = ordenarNum(vetor);
	for (var i = 0; i < vetor.length; i++) {
		if (vetor[i] == ant)
			continue;
		result.push(vetor[i]);
		fi.push(getFi(vetor, vetor[i]));
		fr.push(getFr(vetor, fi[cont]));
		fac.push(getFac(fac, fi, cont));
		facP.push(getFacP(facP, fr, cont));
		ant = vetor[i];
		cont++;
	}
	return [result, fi, fr, fac, facP];
}

function getFi(vetor, pesq) {
	var result = 0;
	for (var i = 0; i < vetor.length; i++) {
		if (vetor[i] == pesq) {
			result++;
		}
	}
	return result;
}
function getFiCont(vetor, min, max) {
	var result = 0;
	for (var i = 0; i < vetor.length; i++) {
		if (vetor[i] >= min && vetor[i] < max) {
			result++;
		}
	}
	return result;
}
function getFr(vetor, fi) {
	return Number(fi / vetor.length * 100).toFixed(2);
}
function getFac(fac, fi, pos) {
	if (pos <= 0)
		return fi[0];
	return Number(fac[pos-1] + fi[pos]);
}
function getFacP(facp, fr, pos) {
	if (pos <= 0)
		return fr[0];
	return (Number(facp[pos-1]) + Number(fr[pos])).toFixed(2);
}
function getIntervalo(vetor) {
	var at = Number(vetor[vetor.length-1]) - Number(vetor[0]); // diminui o maior do menor
	var raiz = parseInt(Math.sqrt(vetor.length)); // faz a raiz dos elementos
	return divisao(at + 1, raiz);
}
function divisao(comp, raiz) { 
	var i = 0
	if (comp % 1 != 0) {
		comp = Math.ceil(comp);
	}
	for (i = raiz - 1; i <= raiz + 1; i++) {
		if (comp % i == 0) {
			return comp / i;
		}
	}
	return divisao(comp + 1, raiz)
}
function calcMedia(vet) { // Cálculo da média. Passagem de vetor por parâmetro
	let i; let soma = 0;
	let media = 0; let cont = 0;
	for (i = 0; i < vet.length; i++) {
		soma += Number(vet[i]); // adicionado Number() para evitar concatenação
		cont++;
	}
	media = soma / cont;
	return (media).toFixed(2);
}

function mediaContinua(tamanho,pontoM,fi){
	var somatudo=0;
	for(var i=0; i<pontoM.length;i++){
		somatudo+=pontoM[i]*fi[i];
		console.log(somatudo)
	}
	return (somatudo/tamanho).toFixed(2);

}
function getMediConti(intervlo){
	var vetor=[];
	for(var i=0;i<intervlo.length;i++){
		var pontaum = intervlo[i].split(separador)[0];
		var pontadois = intervlo[i].split(separador)[1];
		var medCont = (Number(pontaum)+Number(pontadois))/2;
		vetor.push(medCont)
	}
	return vetor

}

function medianaContinua(dados){
	var intervalo = dados[1];
	var aloca_posi;
	var fac = dados[4];
	var fi = dados[2];
	var total = fac[fac.length - 1];
	var posicao = (50 * total/100);
	var ponta_um;
	var ponta_dois;
	var fac_anterior;
	var h;
	var result;

	for(var i = 0;i<intervalo.length;i++){
		ponta_um = Number(intervalo[i].split(separador)[0]);
		ponta_dois = Number(intervalo[i].split(separador)[1]);
		if(posicao > fac[i]){
			continue;
		}
		h = ponta_dois - ponta_um;
		aloca_posi = i;
		break;
	}
	result = result -1;
	if(posicao % 1 != 0){ // Verifica se o valor é inteiro
		result = Math.ceil(result);

	}


	fac_anterior = fac[aloca_posi - 1] || fac[0];
	result = ponta_um + ((posicao - fac_anterior) * h / fi[aloca_posi]);
	console.log(ponta_um);
	console.log(ponta_dois);
	console.log(posicao);
	console.log(fac_anterior);
	console.log(aloca_posi);
	console.log(h);
	console.log(' MEDIANA DA CONTINUA: ' + result);

	return result.toFixed(2);
}
	

function calcMediana(vet) { // Cálculo da mediana. Passagem de vetor por parâmetro
	let mediana = []; let tam_vet = vet.length;
	vet = ordenarNum(vet); // Ordena de novo os números
	if (tam_vet % 2 === 0) {
		mediana = [(vet[tam_vet / 2 - 1]), (vet[tam_vet / 2])];
	} else {
		mediana = (vet[Math.floor(tam_vet / 2)]);
	}
    if (tam_vet % 2 === 0) //aqui tambem mudou
    	if (Number(mediana[0]) && Number(mediana[1]))
			return (Number(mediana[0] + mediana[1]) / 2);
		//else
		//	return (mediana[0] + ',' + mediana[1]);
	else {
		return mediana;
	}
}
function calcModa(vet) {
	var saida = "";
	var vetorQuantidade = [];
	var vetorModa = [];
	vet.sort();
	vetorQuantidade = agrupaArray(vet);
	vetorQuantidade.sort((a, b) => b[1] - a[1]);
	if (numerosIguais(vetorQuantidade)) {
		saida = 'Não há moda';
	} else {
		vetorModa = defineModa(vetorQuantidade);
		saida = '[' + vetorModa + ']';
	}
	return saida;
}
function defineModa(vet) {
	var vetor = [];
	for (var i = 0, ant = vet[0][1]; i < vet.length; i++) {
		if (vet[i][1] != ant)
			break;
		vetor.push(vet[i][0]);
	}
	return vetor;
}
function numerosIguais(vet) {
	for (var i = 0; i < vet.length - 1; i++) {
		if (vet[i][1] !== vet[i + 1][1]) {
			return false;
		}
	}
	return true;
}
function agrupaArray(vet) {
	var ocorrencias = 1;
	var valores = [];
	if (vet.length === 0)
		return null;
	if (vet.length === 1)
		return [vet];
	for (var i = 0; i < vet.length; i++) {
		for (var t = i + 1; t < vet.length; t++)
			if (vet[i] == vet[t]) {
				ocorrencias++;
			}
		if (vet[i] != vet[i - 1])
			valores[i] = [(vet[i]), ocorrencias];
		ocorrencias = 1;
	}
	return removerVazios(valores);
}
function removerVazios(vet) {
	var resultado = vet.filter(function (elem) {
		return elem !== undefined && elem !== "";
	});
	return resultado;
}
function ordenarNum(vet) { // Ordena os números com INSERÇÃO DIRETA
	for (i = 1; i < vet.length; i++) {
		if (Number(vet[i]))
			numeroAtual = Number(vet[i]); // para ordenar as strings corretamente
		else
			numeroAtual = vet[i];
		posFinal = 0;
		j = i - 1;
		while (j >= 0 && posFinal == 0) {
			if (Number(vet[j]))
				vet[j] = Number(vet[j]);
			if (numeroAtual < vet[j]) {
				vet[j + 1] = vet[j];
				j--;
			} else {
				posFinal = j + 1;
			}
		}
		vet[posFinal] = numeroAtual;
	}
	return vet;
}

function calcMedia(vet) { // Cálculo da média. Passagem de vetor por parâmetro
	let i; let soma = 0;
	let media = 0; let cont = 0;
	vet = removerVazios(vet); // Remove caracteres vazios do vetor
	for (i = 0; i < vet.length; i++) {
		soma += Number(vet[i]); // adicionado parseInt() para evitar concatenação
		cont++;
	}
	media = soma / cont;
	return (media).toFixed(2);
}

function calcMediana(vet) { // Cálculo da mediana. Passagem de vetor por parâmetro
	vet = removerVazios(vet);
	let mediana = []; let tam_vet = vet.length;
	vet = ordenarNum(vet); // Ordena de novo os números
	if (tam_vet % 2 === 0) {
		mediana = [(vet[tam_vet / 2 - 1]), (vet[tam_vet / 2])];
	}
	else {
		mediana = (vet[Math.floor(tam_vet / 2)]);
	}

    if (tam_vet % 2 === 0) //aqui tambem mudou
    
    if (Number(mediana[0]) && Number(mediana[1]))
			return (Number(mediana[0] + mediana[1]) / 2);
		else
			return (mediana[0] + ',' + mediana[1]);
        
	else {
		return mediana;
	}
}



// Código MODA com todas implementações


function calcModa(vet) {
	var saida = "";
	var vetorQuantidade = [];
	var vetorModa = [];
	//vet = removerVazios(vet); Excluir
	vet.sort();
	vetorQuantidade = agrupaArray(vet);
	vetorQuantidade.sort((a, b) => b[1] - a[1]);
	if (numerosIguais(vetorQuantidade)) {
		saida = 'Não há moda';
	} else {
		vetorModa = defineModa(vetorQuantidade);
		saida = 'A moda é: [' + vetorModa + ']';

	}
	return saida;
	//console.log(saida);
}

function defineModa(vet) {
	var vetor = [];
	for (var i = 0, ant = vet[0][1]; i < vet.length; i++) {
		if (vet[i][1] != ant)
			break;
		vetor.push(vet[i][0]);
	}
	return vetor;
}

function numerosIguais(vet) {
	for (var i = 0; i < vet.length - 1; i++) {
		if (vet[i][1] !== vet[i + 1][1]) {
			return false;
		}
	}
	return true;
}

function removerVazios(vet) {
	var resultado = vet.filter(function (elem) {
		return elem !== undefined && elem !== "";
	});
	return resultado;
}

function agrupaArray(vet) {
	var ocorrencias = 1;
	var valores = [];
	if (vet.length === 0)
		return null;
	if (vet.length === 1)
		return [vet];
	for (var i = 0; i < vet.length; i++) {
		for (var t = i + 1; t < vet.length; t++)
			if (vet[i] == vet[t]) {
				ocorrencias++;
			}
		if (vet[i] != vet[i - 1])
			valores[i] = [(vet[i]), ocorrencias];
		ocorrencias = 1;
	}
	return removerVazios(valores);
}

function desvio(pontoM,tipo,fi,media){
	var somaelem=0;
	var totalelem=0;
	var resultraiz=0;
	for(var i=0;i<pontoM.length;i++){ 
		somaelem+=((pontoM[i]-media)**2)*fi[i]
		totalelem+=fi[i]
	}
	if (tipo=="option1")

		resultraiz=somaelem/totalelem
	else{
		resultraiz=somaelem/(totalelem-1)
	}
	return Math.sqrt(resultraiz).toFixed(2);
}

function cv(desvioP, media){

	result = 100 * (desvioP / media);
	return result.toFixed(2);

}

function selected(value){ // Função selected e parâmetro adicionada junto ao HTML.
    
    let Quartil = document.getElementsByClassName('Quartil'); // Pega o conteúdo pela classe configurada no HTML
    let elem = document.getElementsByName('Quartil');
        if((value != 'Selecionar' && value != 'Kintil' && value != 'Decil' && value != 'Porcentil'))  {
            // Caso Valor seja diferente de todos esses, ele mostra/esconde o Quartil

            Quartil[0].style.display = 'block';
        } else{
            Quartil[0].style.display = 'none';
        }
        for(i=0;i<elem.length;i++){ // Percorre os elementos do radio button
            
            elem[i].checked = false; // Desmarca o radio se clicar em outra opção
        }

    let Kintil = document.getElementsByClassName('Kintil'); // Busca variável pela classe no HTML
    let elem2 = document.getElementsByName('Kintil'); // Busca variável pela classe no HTML
    if((value != 'Selecionar' && value != 'Quartil' && value != 'Decil' && value != 'Porcentil')) {
        // Caso Valor seja diferente de todos esses, ele mostra/esconde o Kintil

        Kintil[0].style.display = 'block';
    }
    else {
        Kintil[0].style.display = 'none';
    }
     for(i=0;i<elem2.length;i++){ // Percorre os elementos do radio button
        
        elem2[i].checked = false; // Desmarca o radio se clicar em outra opção
     }   
 
    let Decil = document.getElementsByClassName('Decil'); // Busca variável pela classe no HTML
    let elem3 = document.getElementsByName('Decil'); // Busca variável pela classe no HTML
    if((value != 'Selecionar' && value != 'Kintil' && value != 'Quartil' && value != 'Porcentil')) {
        // Caso Valor seja diferente de todos esses, ele mostra/esconde o Decil

        Decil[0].style.display = 'block';
    }
    else {
        Decil[0].style.display = 'none';
    }
    for(i=0;i<elem2.length;i++){ // Percorre os elementos do radio button
        
        elem3[i].checked = false; // Desmarca o radio se clicar em outra opção
    }   
    
    let Porcentil = document.getElementsByClassName('Porcentil'); // Busca variável pela classe no HTML
    let elem4 = document.getElementsByName('Porcentil'); // Busca variável pela classe no HTML
    // Caso Valor seja diferente de todos esses, ele mostra/esconde o Porcentil

    if((value != 'Selecionar' && value != 'Quartil'  && value != 'Kintil' && value != 'Decil')){
        Porcentil[0].style.display = 'block';
    }       
    else{
        Porcentil[0].style.display = 'none';
    }
    for(i=0;i<elem4.length;i++){ // Percorre os elementos do radio button
        
        elem4[i].checked = false; // Desmarca o radio se clicar em outra opção
    }   
}

function calcularQ(){ 
	var recebe_radio;
	var Quartil = document.getElementsByName('Quartil');
	var Kintil = document.getElementsByName('Kintil');
	var Decil = document.getElementsByName('Decil');
	var Porcentil = document.getElementsByName('Porcentil');
	for(var i = 0;i<Quartil.length;i++){
		if(Quartil[i].checked && Quartil[i].value !== undefined){
		recebe_radio = (Quartil[i].value);
		}
	}
	for(var i=0;i<Kintil.length;i++){
		if(Kintil[i].checked && Kintil[i].value !== undefined){
			recebe_radio = (Kintil[i].value);
		}
	}
	for(var i=0;i<Decil.length;i++){
		if(Decil[i].checked && Decil[i].value !== undefined){
			recebe_radio = (Decil[i].value);
		}
	}
	for(var i=0;i<Porcentil.length;i++){
		if(Porcentil[i].checked && Porcentil[i].value !== undefined){
			recebe_radio = (Porcentil[i].value);
		}
	}
	return recebe_radio; // RETURN FORA DO FOR -- SENAO RETORNA NaN
}

function PQ(recebe_radio,vet){ // Recebe os parâmetros de um vetor e do radio selecionado pelo usuário
	var posi=[]; var resto=0; 
	for(var i=0;i<vet.length;i++){
		dados = Number(vet[i]);
	}
	ordenarNum(vet); // Ordena o vetor para achar o indice correto
	
	posi = (vet.length/100) * recebe_radio; // Cálculo da separatriz descritiva
	resto = 100 - (recebe_radio); // Retira 100% da porcentagem escolhida pelo usuário

	posi = posi -1;
	if(posi % 1 != 0){ // Verifica se o valor é inteiro
		posi = Math.ceil(posi);

	}
	

	console.log(resto);
	console.log(posi);
	return [vet[posi],resto,recebe_radio]; // ------ RESPOSTA FINAL --------
}

function msCont(recebe_radio,intervalos,fac,fi){ // Medida separatriz da Contínua
	var total = fac[fac.length - 1];
	var posicao = (recebe_radio * total / 100);
	//console.log(posicao);
	var msi;
	var i;
	var resultado;
	var limites;
	var h;
	for(i=0;i<fac.length;i++){ // For percorre todos os valores da fac, se a fac for menor que a posição ele continua e sai do for
		if(fac[i] < posicao)
			continue;
		break;
	}
	var fac_ant= fac[i - 1] || fac[0]; // Pega o valor da fac anterior à fac da linha atual. Essa var funciona como um if.
	limites = intervalos[i].split(separador); // Pega os números entre (|---). o delimitador é a variável separador que significa = |---
	console.log(intervalos[i]);
	msi = (Number(limites[0])); // Pega o primeiro valor entre os limites
	console.log(msi);
	h = (Number(limites[1]) - Number(limites[0])); // SUbstração dos 2 limites escolhidos
	console.log('fac anterior' + fac_ant);
	console.log('valor do i: ' +i);
	console.log(fac[0]);
	console.log('Posição ' + posicao);
	console.log( ' Limites ' + limites[1]);
	console.log(' Limites ' + limites[0]);
	console.log('fi ' + fi[i]);
	console.log('h ' + h);
	if (i+1 == 1){
		resultado = msi + (((posicao) / fi[i]) * h); // Calculo para achar a separatriz contínua
	console.log('resultado ' + resultado);
	}
	else if(i+1 !== 0){
		console.log(i);
		resultado = msi + (((posicao - fac_ant) / fi[i]) * h); // Calculo para achar a separatriz contínua
	console.log('resultado ' + resultado);
	}
	
	return [recebe_radio, resultado]; // Retorna 2 resultados para serem mostrados no HTML
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




///////////////////////inicio da importação/////////////////////////////
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
  fileArr =  fileArr.split(";")

      document.getElementById("dados").value = fileArr
}

///////////////////////fim da importação/////////////////////////////
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Daniel^^^^^^^^^^^^^^^^^^^^^^^^^^^^^