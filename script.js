class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previonsOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().replace(" ", this.currentOperand.toString().endsWith(String))
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previonsOperand !== '') {
            this.compute()
        }
        this.operation = " " + operation
        this.previonsOperand = this.currentOperand + this.operation
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previonsOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case ' +':
                computation = prev + current
                break
            case ' -':
                computation = prev - current
                break
            case ' *':
                computation = prev * current
                break
            case ' :':
                computation = prev / current
                break
            default: 
                return
            
        }
        if (this.currentOperand.includes('Infinity')) {
            this.currentOperand = "Error Math"
        } else {
            this.currentOperand = computation
            this.operation = undefined
            this.previonsOperand = ''
        }

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previonsOperand
        if (this.previousOperandTextElement.innerText === "Infinity") {
            this.previousOperandTextElement = "Error Math"
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});