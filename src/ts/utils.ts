import { state, out } from '../ts/state'

export function clearAll(): void {
  state.currentInput = '0'
  state.expression = []
  state.finish = false
  out.textContent = '0'
}

export function scrollToLeft(): void {
  out.scrollLeft = out.scrollWidth
}

export function formatNumber(num: string): string {
  if (!num || num === '') return ''

  if (num.endsWith('.')) {
    const numWithoutPoint = num.slice(0, -1)
    const parts = numWithoutPoint.split('.')
    const firstPart = parts[0]
    const secondPart = parts[1] ? '.' + parts[1] : ''

    if (isNaN(parseFloat(firstPart))) return num

    const formattedNum = parseFloat(firstPart).toLocaleString('ru-RU')
    return formattedNum + secondPart + '.'
  }

  const parts = num.toString().split('.')
  const firstPart = parts[0]
  const secondPart = parts[1] ? '.' + parts[1] : ''

  if (isNaN(parseFloat(firstPart))) return num

  const formattedNum = parseFloat(firstPart).toLocaleString('ru-RU')
  return formattedNum + secondPart
}

export function toggleSign(): void {
  if (state.currentInput && state.currentInput !== '0') {
    if (state.currentInput.startsWith('-')) {
      state.currentInput = state.currentInput.slice(1)
    } else {
      state.currentInput = '-' + state.currentInput
    }
  }
}

export function findPercentage(): void {
  if (state.currentInput && state.currentInput !== '0') {
    const num = parseFloat(state.currentInput) / 100
    state.currentInput = num.toString()
  }
}

export function handlePoint(): void {
  if (state.finish) {
    state.currentInput = '0.'
    state.expression = []
    state.finish = false
  } else if (state.currentInput === '' || state.currentInput === '0') {
    state.currentInput = '0.'
  } else if (!state.currentInput.includes('.')) {
    if (state.currentInput.length >= 15) return
    state.currentInput += '.'
  }

  out.textContent = state.currentInput
  scrollToLeft()
}
export function displayFullExpression(): void {
  let display = ''

  for (let i = 0; i < state.expression.length; i++) {
    if (i % 2 === 0) {
      display += formatNumber(state.expression[i]) + ' '
    } else {
      display += state.expression[i] + ' '
    }
  }

  if (state.currentInput === '0.') {
    display += '0.'
  } else {
    display += formatNumber(state.currentInput)
  }

  out.textContent = display.trim()
}

export function calculateExpression(expression: string[]): number {
  if (expression.length < 3) {
    return parseFloat(expression[0] || '0')
  }

  let tempExpression = [...expression]

  for (let i = 1; i < tempExpression.length; i += 2) {
    if (tempExpression[i] === 'Х' || tempExpression[i] === '/') {
      const left = parseFloat(tempExpression[i - 1])
      const right = parseFloat(tempExpression[i + 1])
      let result: number

      if (tempExpression[i] === 'Х') {
        result = left * right
      } else {
        if (right === 0) {
          throw new Error('DIVISION_BY_ZERO')
        }
        result = left / right
      }

      result = parseFloat(result.toFixed(10))
      tempExpression.splice(i - 1, 3, result.toString())
      i -= 2
    }
  }

  let result = parseFloat(tempExpression[0])

  for (let i = 1; i < tempExpression.length; i += 2) {
    const operator = tempExpression[i]
    const right = parseFloat(tempExpression[i + 1])

    if (operator === '+') {
      result += right
    } else if (operator === '-') {
      result -= right
    }

    result = parseFloat(result.toFixed(10))
  }

  return result
}
