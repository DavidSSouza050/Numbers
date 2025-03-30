// Elementos do formulário
const inputs = document.querySelectorAll("input[type='number']")
// Inputs
const qtdNum = document.getElementById("qtd-num")
const initNum = document.getElementById("initial-num")
const termNum = document.getElementById("terminal-num")
const noRepeat = document.getElementById("repeat")
// divs
const contentDiv = document.querySelector(".onlyDesktop .container-content")
const containerResult = document.querySelector(".onlyDesktop .container-result")
const numberResult = document.querySelector(".onlyDesktop .container-result small span")
const result = document.querySelector(".onlyDesktop .result")
// Buttons
const drawButton =  document.getElementById("draw")
const drawAgainButton = document.getElementById("draw-again")


// Bloqueando letras e limitando tamanho de números
// ForEach para passar por todos os elementos input
inputs.forEach(input => {
  input.oninput = () =>{
    // passando em cada elemento para tirar tudo que não for digito e limitando apenas um 4 caracteres
    let value = input.value.replace(/\D/g, "").slice(0, 4);
    //  colocando o valor formato nas input
    input.value = value;
  }
});




// Realizando sorteio
drawButton.onclick = (event) => {
  event.preventDefault()

  let min = parseInt(initNum.value) 
  let max = parseInt(termNum.value)
  let qtd = parseInt(qtdNum.value)

  

  if(min >= max || max <= min){
    return alert("O número mínimo deve ser menor que o número máximo, e o número máximo deve ser maior que o número mínimo.")
  } else if( qtd < 1){
    return alert("A quantidade de números sorteados não podem ser menor que 1.")
  } else if(isNaN(min) ||  isNaN(max) || isNaN(qtd)){
    return alert("Preenche os campos para realizar o sorteio!")
  }
  

  // caso o repeat esteja checado irá entrar no if para gerar o número sem que ele se repita

  if(noRepeat.checked){

    if(qtd > max){
      return alert("A quantidade de números sorteados precisa ser menor que o número máximo!")
    }

    // gerando números que não podem repetir
    appearResult(notRepeatNumber(min, max, qtd))
    divToggle()

  }else{
    let numbers = []
    // Gerando números que podem repetir
    for(let i=0; i < qtd; i++){ 
      numbers.push(generateNumber(min, max))
    }

    appearResult(numbers)
    divToggle()
  }

}

// Limpando campos e voltando ao div de inputs
drawAgainButton.onclick = () => {
  formClear()
  divToggle()
}

// Tirando a div de números e mostrando a div de resultado
function divToggle() {
  contentDiv.classList.toggle("displayNone")
  containerResult.classList.toggle("displayNone")
}

// apresentando o resultado
function appearResult(numbers){
  result.innerHTML = "";
  
  let delay = 3000
  for(let i=0; i < numbers.length; i++){
    
    setTimeout(() => {
      let resultLabel = document.createElement("label")
      resultLabel.textContent = numbers[i]
      numberResult.textContent = i + 1
      result.append(resultLabel)
    },i * delay)

    delay *= 0.9
  }

}

// Gerando números aleatórios que não pode ser repetidos
function notRepeatNumber(min, max, qtd) {
  let numbers = [];

  for (let i = 0; i < qtd; i++) {
    let number
    // Gerar um número único
    do {
      number = generateNumber(min, max)
    } while (numbers.includes(number)) // Se o número já estiver na lista, gera um novo

    
    numbers.push(number) // Adiciona o número à lista
  }

  return numbers
}

// Gerando números aleatórios
function generateNumber(min, max){
  // Gerando o número aleatório entre o número máximo e mínimo arredondo para baixo
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Limpando os campos
function formClear(){
  // limpando inputs
  qtdNum.value = ""
  initNum.value = ""
  termNum.value = ""

  if(noRepeat.checked){
    noRepeat.checked = false
  }

}


