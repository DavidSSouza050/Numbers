
// Inputs
const qtdNumMb = document.querySelector("#qtd-num-mb")
const initNumMb = document.querySelector("#initial-num-mb")
const termNumMb = document.querySelector("#terminal-num-mb")
const noRepeatMb = document.querySelector("#repeat-mb")
// divs
const contentDivMb = document.querySelector(".onlyMobile .container-content-mb")
const containerResultMb = document.querySelector(".onlyMobile .container-result-mb")
const numberResultMb = document.querySelector(".container-result-mb small span")
const resultMb = document.querySelector(".result-mb")
// Buttons
const drawButtonMb =  document.querySelector("#draw-mb")
const drawAgainButtonMb = document.querySelector("#draw-again-mb")


// Realizando sorteio
drawButtonMb.onclick = (event) => {
  event.preventDefault()

  let min = parseInt(initNumMb.value) 
  let max = parseInt(termNumMb.value)
  let qtd = parseInt(qtdNumMb.value)



  if(min >= max || max <= min){
    return alert("O número mínimo deve ser menor que o número máximo, e o número máximo deve ser maior que o número mínimo.")
  } else if( qtd < 1){
    return alert("A quantidade de números sorteados não podem ser menor que 1.")
  } else if(isNaN(min) ||  isNaN(max) || isNaN(qtd)){
    return alert("Preenche os campos para realizar o sorteio!")
  }
  

  // caso o repeat esteja checado irá entrar no if para gerar o número sem que ele se repita

  if(noRepeatMb.checked){
    
    if(qtd > max){
      return alert("A quantidade de números sorteados precisa ser menor que o número máximo!")
    }

    // gerando números que não podem repetir
    appearResultMB(notRepeatNumberMB(min, max, qtd))
    divToggleMB()
  }else{
    let numbers = []

    // Gerando números que podem repetir
    for(let i=0; i < qtd; i++){ 
      numbers.push(generateNumberMB(min, max))
    }

    appearResultMB(numbers)
    divToggleMB()
  }

}

// Limpando campos e voltando ao div de inputs
drawAgainButtonMb.onclick = () => {
  formClearMB()
  divToggleMB()
}

// Tirando a div de números e mostrando a div de resultado
function divToggleMB() {
  contentDivMb.classList.toggle("displayNone")
  containerResultMb.classList.toggle("displayNone")
}

// apresentando o resultado
function appearResultMB(numbers){
  resultMb.innerHTML = "";
  
  let delay = 3000
  for(let i=0; i < numbers.length; i++){
    
    setTimeout(() => {
      let resultLabel = document.createElement("label")
      resultLabel.textContent = numbers[i]
      numberResultMb.textContent = i + 1
      resultMb.append(resultLabel)
    },i * delay)

    delay *= 0.9
  }

}

// Gerando números aleatórios que não pode ser repetidos
function notRepeatNumberMB(min, max, qtd) {
  let numbers = [];

  for (let i = 0; i < qtd; i++) {
    let number
    // Gerar um número único
    do {
      number = generateNumberMB(min, max)
    } while (numbers.includes(number)) // Se o número já estiver na lista, gera um novo

    
    numbers.push(number) // Adiciona o número à lista
  }

  return numbers
}

// Gerando números aleatórios
function generateNumberMB(min, max){
  // Gerando o número aleatório entre o número máximo e mínimo arredondo para baixo
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Limpando os campos
function formClearMB(){
  // limpando inputs
  qtdNumMb.value = ""
  initNumMb.value = ""
  termNumMb.value = ""

  if(noRepeatMb.checked){
    noRepeatMb.checked = false
  }

}


