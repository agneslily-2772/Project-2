class Calculator {
    constructor(firstElement, secondElement) {
      this.firstElement = firstElement
      this.secondElement = secondElement
      this.clear()
    }
    clear() {
      this.second = ''
      this.first = ''
      this.operation = undefined
    }
    delete() {
      this.second= this.second.toString().slice(0, -1)
    }
    append(number) {
      if (number === '.' && this.second.includes('.')) return
      this.second = this.second.toString() + number.toString()
    }
    chooseOperation(operation) {
      if (this.second === '') return
      if (this.first !== '') {
        this.compute()
      }
      this.operation = operation
      this.first = this.second
      this.second = ''
    }
    calculate() {
      let computation
      const a = parseFloat(this.first)
      const b = parseFloat(this.second)
      if (isNaN(a) || isNaN(b)) return
      switch (this.operation) {
        case '+':
          computation = a + b
          break
        case '-':
          computation = a - b
          break
        case '*':
          computation = a * b
          break
        case '÷':
          computation = a / b
          break
        case '^':
          computation = Math.pow(a,b)
          break
        default:
          return
      }
      this.second = computation
      this.operation = undefined
      this.first = ''
    }
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integer = parseFloat(stringNumber.split('.')[0])
      const decimal = stringNumber.split('.')[1]
      let display
      if (isNaN(integer)) {
        display = ''
      } else {
        display = integer.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimal != null) {
        return `${display}.${decimal}`
      } else {
        return display
      }
    }
    updateDisplay() {
      this.secondElement.innerText =
        this.getDisplayNumber(this.second)
      if (this.operation != null) {
        this.firstElement.innerText =
          `${this.getDisplayNumber(this.first)} ${this.operation}`
      } else {
        this.firstElement.innerText = ''
      }
    }
  }

  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalButton = document.querySelector('[data-equal]')
  const delButton = document.querySelector('[data-del]')
  const acButton = document.querySelector('[data-ac]')
  const firstElement = document.querySelector('[data-first-number]')
  const secondElement = document.querySelector('[data-second-number]')
  const calculator = new Calculator(firstElement, secondElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.append(button.innerText)
      calculator.updateDisplay()
    })
  })
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  equalButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
  })
  acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })