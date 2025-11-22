import { state, out } from './state.js'

export function clearAll() {
  state.numFirst = ''
  state.numSecond = ''
  state.sign = ''
  state.finish = false
  out.textContent = '0'
}

export function scrollToLeft() {
  out.scrollLeft = out.scrollWidth
}

export function formatNumber(num) {
  if (!num) return num
  const parts = num.toString().split('.')
  const firstPart = parts[0]
  const secondPart = parts[1] ? '.' + parts[1] : ''
  const formattedNum = parseFloat(firstPart).toLocaleString('ru-RU')
  return formattedNum + secondPart
}

export function toggleSign() {
  if (state.numSecond === '' && state.sign === '') {
    state.numFirst = state.numFirst
      ? (-parseFloat(state.numFirst)).toString()
      : '0'
  } else if (state.numSecond !== '') {
    state.numSecond = (-parseFloat(state.numSecond)).toString()
  }
}

export function findPercentage() {
  if (state.numSecond === '' && state.sign === '') {
    state.numFirst = (parseFloat(state.numFirst) / 100).toString()
  } else if (state.numSecond !== '') {
    state.numSecond = (parseFloat(state.numSecond) / 100).toString()
  }
}

export function handlePoint() {
  if (state.numSecond === '' && state.sign === '') {
    if (state.numFirst === '' || state.numFirst === '0') {
      state.numFirst = '0.'
      out.textContent = state.numFirst
    } else if (!state.numFirst.includes('.')) {
      if (state.numFirst.length >= 15) return
      state.numFirst += '.'
      out.textContent = state.numFirst
    }
  } else {
    if (state.numSecond === '' || state.numSecond === '0') {
      state.numSecond = '0.'
      out.textContent = `${formatNumber(state.numFirst)} ${state.sign} 0.`
    } else if (!state.numSecond.includes('.')) {
      if (state.numSecond.length >= 15) return
      state.numSecond += '.'
      out.textContent = `${formatNumber(state.numFirst)} ${state.sign} ${state.numSecond}`
    }
  }
  scrollToLeft()
}

export function displayFullExpression() {
  if (state.numSecond === '' && state.sign === '') {
    out.textContent = formatNumber(state.numFirst) || '0'
  } else {
    let secondNumDisplay
    if (state.numSecond.endsWith('.')) {
      const numWithoutPoint = state.numSecond.slice(0, -1)
      secondNumDisplay = formatNumber(numWithoutPoint) + '.'
    } else {
      secondNumDisplay = formatNumber(state.numSecond)
    }

    out.textContent =
      `${formatNumber(state.numFirst)} ${state.sign} ${secondNumDisplay}`.trim()
  }
}
