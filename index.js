const accounts = [
    {
        numberCount: "1111",
        headline: "Maria Romero",
        balance: 200,
        password: "111"
    },
    {
        numberCount: "2222",
        headline: "Mario Fernandez",
        balance: 67,
        password: "222"
    },
    {
        numberCount: "3333",
        headline: "Laura Contreras",
        balance: 290,
        password: "333"
    },
];

//Varibles que guardan el numero de cuenta y la contraseña ingresados en el input
let validateAccount;
let validatePassword;
let validateAccountNumber;
//Variable para confirmar datos
var validateLogin;

const login = document.querySelector('.login');
const transaction = document.querySelector('.transaction');

//Variables 
 const errorLogin = document.getElementById("error-login");
 const showBalance = document.getElementById('balance');

//funcion validar login
function loginUser(){
    validateAccount = document.getElementById("user-name").value;
    validatePassword = document.getElementById("user-password").value;
    validateLogin = accounts.find(validate => validate.numberCount === validateAccount && validate.password === validatePassword);
       if(validateLogin){
            login.style.display = 'none';
            transaction.style.display = 'block';
            transaction.querySelector('#display-user-name').textContent = validateLogin.headline;

        } else {
            errorLogin.classList.remove("d-none");
        }
  }

//Funcion Consultar saldo
function checkBalance(){
    const balance = validateLogin.balance;
    showBalance.innerHTML = "Tu Saldo es de $" + balance;
}

//Funcion Retirar
function withdrawMoney(){
    const withdrawnValue = Number(document.getElementById('withdraw-value').value);
    if(!isNaN(withdrawnValue)){
        if(withdrawnValue > validateLogin.balance){
            alert("Saldo insuficiente");
            document.getElementById('withdraw-value').value = "";
        } else if (validateLogin.balance - withdrawnValue < 10 ){
            alert("Transascción fallida");
            document.getElementById('withdraw-value').value = "";
        } else {
            validateLogin.balance -= withdrawnValue;
            alert("Transacción exitosa")
            document.getElementById('withdraw-value').value = "";            
        }
    }
}

//Funcion Depositar
function depositMoney(){
    const valueDeposited = Number(document.getElementById('deposit-value').value);
    if(!isNaN(valueDeposited)){
        if(valueDeposited + validateLogin.balance > 999){
            alert("Trasacción Fallida");
            document.getElementById('deposit-value').value = "";
        } else {
            validateLogin.balance += valueDeposited;
            alert("Transacción exitosa")            
            document.getElementById('deposit-value').value = "";

        }
    }
}

//Funcion Transferir
function transferMoney(){
    const accountNumber = document.getElementById('deposit-account-number').value;
    const transferredValue = Number(document.getElementById('tranfer-value').value);
    const validateAccountNumber = accounts.find(validateNumber => validateNumber.numberCount === accountNumber);
    if( validateAccountNumber && !isNaN(transferredValue)){
        if(validateLogin.balance - transferredValue > 10){
            if(transferredValue + validateAccountNumber.balance > 999){
                alert("Trasacción Fallida");
                document.getElementById('deposit-account-number').value = "";
                document.getElementById('tranfer-value').value = "";
            }   else {
                    validateAccountNumber.balance += transferredValue;
                    validateLogin.balance -= transferredValue;
                    document.getElementById('deposit-account-number').value = "";
                    document.getElementById('deposit-account-number').value = "";
                    document.getElementById('tranfer-value').value = "";
                    alert("Transacción exitosa")
                }
        } else {
            alert("Trasacción Fallida");
            document.getElementById('deposit-account-number').value = "";
            document.getElementById('tranfer-value').value = "";
               }
    }
}


// Evento para sair
salir.addEventListener("click", exit => {
    exit.preventDefault();
    const close = exit.target;
    if (close){
        login.style.display = 'block';
        transaction.style.display = 'none';
        document.getElementById("user-name").value = '';
        document.getElementById("user-password").value = '';
        errorLogin.classList.add("d-none");
    }
});
