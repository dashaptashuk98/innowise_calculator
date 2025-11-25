import { state, nums, actions, out } from '../ts/state'
import {
  clearAll,
  scrollToLeft,
  displayFullExpression,
  toggleSign,
  findPercentage,
  handlePoint,
  calculateExpression,
} from './utils'

document.querySelector('.calc__btn--ac')!.addEventListener('click', clearAll)
document
  .querySelector('.calc__buttons')!
  .addEventListener('click', (event: Event): void => {
    const target = event.target as HTMLElement

    if (!target.classList.contains('calc__btn')) return
    if (target.classList.contains('calc__btn--ac')) return
    const key: string = target.textContent!.trim()

    if (nums.includes(key)) {
      if (state.finish) {
        if (key === '.') {
          state.currentInput = '0.'
        } else {
          state.currentInput = key
        }
        state.expression = []
        state.finish = false
      } else if (key === '.') {
        handlePoint()
      } else {
        if (state.currentInput === '' && state.expression.length > 0) {
          state.currentInput = key
        } else if (state.currentInput === '0') {
          state.currentInput = key
        } else {
          if (state.currentInput.length >= 15) return
          state.currentInput += key
        }
      }
      displayFullExpression()
      scrollToLeft()
      return
    }

    if (actions.includes(key)) {
      if (key === '+/-') {
        toggleSign()
      } else if (key === '%') {
        findPercentage()
      } else {
        if (state.currentInput !== '') {
          state.expression.push(state.currentInput)
          state.expression.push(key)
          state.currentInput = ''
        } else if (state.expression.length > 0) {
          state.expression[state.expression.length - 1] = key
        }
        state.finish = false
      }
      displayFullExpression()
      scrollToLeft()
      return
    }

    if (key === '=') {
      if (state.expression.length > 0 && state.currentInput !== '') {
        state.expression.push(state.currentInput)
        try {
          const result = calculateExpression(state.expression)
          state.currentInput = result.toString()
          state.expression = []
          state.finish = true
          displayFullExpression()
        } catch (error) {
          if (error instanceof Error && error.message === 'DIVISION_BY_ZERO') {
            out.textContent = 'Ошибка'
            state.currentInput = '0'
            state.expression = []
            state.finish = true
          }
        }
        scrollToLeft()
      }
    }
  })
