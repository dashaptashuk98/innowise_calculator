let numFirst = ''
let numSecond = ''
let sign = ''
let finish = false

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const actions = ['-', '+', 'Х', '/', '+/-', '%']
const out = document.querySelector('.calc__display')
function clearAll() {
  numFirst = ''
  numSecond = ''
  sign = ''
  finish = false
  out.textContent = '0'
}

function scrollToLeft() {
  out.scrollLeft = out.scrollWidth
}

function formatNumber(num) {
  if (!num) return num
  const parts = num.toString().split('.')
  const firstPart = parts[0]
  const secondPart = parts[1] ? '.' + parts[1] : ''
  const formattedNum = parseFloat(firstPart).toLocaleString('ru-RU')
  return formattedNum + secondPart
}

function displayFullExpression() {
  if (numSecond === '' && sign === '') {
    out.textContent = formatNumber(numFirst) || '0'
  } else {
    out.textContent =
      `${formatNumber(numFirst)} ${sign} ${formatNumber(numSecond)}`.trim()
  }
}

document.querySelector('.calc__btn--ac').addEventListener('click', clearAll)
document.querySelector('.calc__buttons').onclick = (event) => {
  if (!event.target.classList.contains('calc__btn')) return
  if (event.target.classList.contains('calc__btn--ac')) return
  const key = event.target.textContent.trim()
  if (nums.includes(key)) {
    if (key === '.') {
      handlePoint()
    } else {
      if (numSecond === '' && sign === '') {
        if (numFirst.length >= 15) return
        numFirst = numFirst === '0' ? key : numFirst + key
      } else if (numFirst !== '' && numSecond !== '' && finish) {
        if (key.length >= 15) return
        numSecond = key
        finish = false
      } else {
        if (numSecond.length >= 15) return
        numSecond = numSecond === '0' ? key : numSecond + key
      }
      displayFullExpression()
      scrollToLeft()
    }

    return
  }
  if (actions.includes(key)) {
    if (key === '+/-') {
      toggleSign()
    } else if (key === '%') {
      findPercentage()
    } else {
      sign = key
      finish = false
    }
    displayFullExpression()
    scrollToLeft()
    return
  }
  if (key === '=') {
    if (numSecond === '') numSecond = numFirst
    const operationSign = sign
    switch (operationSign) {
      case '+':
        numFirst = (+numFirst + +numSecond).toString()
        break
      case '-':
        numFirst = (parseFloat(numFirst) - parseFloat(numSecond)).toString()
        break
      case 'Х':
        numFirst = (parseFloat(numFirst) * parseFloat(numSecond)).toString()
        break
      case '/':
        if (parseFloat(numSecond) === 0) {
          out.textContent = 'Ошибка'
          numFirst = ''
          numSecond = ''
          sign = ''
          return
        }
        numFirst = (parseFloat(numFirst) / parseFloat(numSecond)).toString()
        break
    }

    finish = true
    out.textContent = formatNumber(numFirst)
    scrollToLeft()
    numSecond = ''
    sign = ''
  }
}

function toggleSign() {
  if (numSecond === '' && sign === '') {
    numFirst = numFirst ? (-parseFloat(numFirst)).toString() : '0'
  } else if (numSecond !== '') {
    numSecond = (-parseFloat(numSecond)).toString()
  }
}

function findPercentage() {
  if (numSecond === '' && sign === '') {
    numFirst = (parseFloat(numFirst) / 100).toString()
  } else if (numSecond !== '') {
    numSecond = (parseFloat(numSecond) / 100).toString()
  }
}

function handlePoint() {
  if (numSecond === '' && sign === '') {
    if (numFirst === '' || numFirst === '0') {
      numFirst = '0.'
      out.textContent = numFirst
    } else if (!numFirst.includes('.')) {
      if (numFirst.length >= 15) return
      numFirst += '.'
      out.textContent = numFirst
    }
  } else {
    if (numSecond === '' || numSecond === '0') {
      numSecond = '0.'
      out.textContent = numSecond
    } else if (!numSecond.includes('.')) {
      if (numSecond.length >= 15) return
      numSecond += '.'
      out.textContent = numSecond
    }
  }
  scrollToLeft()
}
