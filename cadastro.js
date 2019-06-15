	var comparaEmail = [];
	var comparaSenha = [];
	var nome
	var logado
	if(logado == 1){
	setTimeout(Logado, 1); // Aguarda um segundo
}
	logado =  localStorage.getItem("logado") 

function cadastro(){
	var nome = document.getElementById("nome").value;
	var senha = document.getElementById("senha").value;
	var confirmaSenha = document.getElementById("confirmaSenha").value;
	var email = document.querySelector('#email');
	var emailTeste= document.getElementById("email").value;
	if(nome == ""){
		alert("Por favor Digite um Nome valido ");
	}
	else if (senha == ""){
		alert("Por favor Digite uma senha valida");
	}
	else if (confirmaSenha == ""){
		alert("Por favor confirme sua senha ");
	}
	else if(senha != confirmaSenha){
		alert("As senhas não são iguais");
	}
	else if (emailTeste == ""){
		alert("Por favor digite um e-mail");
	}
  	else if (!email.checkValidity()){
    	alert("Email invalido" );
 	}
	else if((nome!= "")&&(senha!="")&&(senha ==confirmaSenha)&&(emailTeste != "")&&(email.checkValidity() == true)){
		alert(nome + " Cadastrado(a) com sucesso");
		localStorage.setItem("nome",nome)
		localStorage.setItem("email", emailTeste);
		comparaEmail = localStorage.getItem("email");
		localStorage.setItem("senha", senha);
		comparaSenha = localStorage.getItem("senha");
		localStorage.removeItem("logado")

	}
}
function voltar(link){
	window.location.href=link;
}

function logar(){
	emailCadastro = localStorage.getItem("email")
	senhaCadastro = localStorage.getItem("senha")
	emailLogin=document.getElementById("emailLogin").value;
	senhaLogin=document.getElementById("senhaLogin").value;
	if(emailLogin == ""){
		alert("digite o e-mail")
	}		
	else if(senhaLogin == ""){
		alert("digite a senha")
	}
	else if(emailLogin==emailCadastro){
		if(senhaLogin==senhaCadastro){
			nome = localStorage.getItem("nome");
			alert("Bem vindo " + nome)
			document.getElementById("emailLogin").id = "invisivel"
	
			document.getElementById("senhaLogin").id = "invisivel"
	
			document.getElementById("botaoLogar").id = "invisivel"
			document.getElementById("nomeInvisivel").innerHTML =  nome
			document.getElementById("nomeInvisivel").id ="visivel"
			document.getElementById("botaoSair").id = "botaoVisivel"
			logado = 1
			localStorage.setItem("logado", logado);
		}
		else{
			alert("Nome de usuario ou senha errados")}
		}
		else{
			alert("Nome de usuario ou senha errados")}
		}

function Logado(){
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

function iniciar(link){
	if(logado == 1 ){
		window.location.href=link
	}
	else{
		alert("você não está logado")
	}
}