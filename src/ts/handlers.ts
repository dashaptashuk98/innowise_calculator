import { state, nums, actions, out } from '../ts/state'
import {
  clearAll,
  scrollToLeft,
  displayFullExpression,
  toggleSign,
  findPercentage,
  handlePoint,
  formatNumber,
} from './utils'

document.querySelector('.calc__btn--ac')!.addEventListener('click', clearAll)
const unusedVariable = 'Это не используется'
document
  .querySelector('.calc__buttons')!
  .addEventListener('click', (event: Event): void => {
    const target = event.target as HTMLElement

    if (!target.classList.contains('calc__btn')) return
    if (target.classList.contains('calc__btn--ac')) return
    const key: string = target.textContent!.trim()

    if (nums.includes(key)) {
      if (key === '.') {
        handlePoint()
      } else {
        if (state.numSecond === '' && state.sign === '') {
          if (state.numFirst.length >= 15) return
          state.numFirst = state.numFirst === '0' ? key : state.numFirst + key
        } else if (
          state.numFirst !== '' &&
          state.numSecond !== '' &&
          state.finish
        ) {
          if (key.length >= 15) return
          state.numSecond = key
          state.finish = false
        } else {
          if (state.numSecond.length >= 15) return
          state.numSecond =
            state.numSecond === '0' ? key : state.numSecond + key
        }
        displayFullExpression()
        scrollToLeft()
      }
      return
    }

    if (actions.includes(key)) {
      if (state.numFirst === '' && key !== '+/-') {
        return
      }
      if (key === '+/-') {
        toggleSign()
      } else if (key === '%') {
        findPercentage()
      } else {
        state.sign = key
        state.finish = false
      }
      displayFullExpression()
      scrollToLeft()
      return
    }

    if (key === '=') {
      if (state.numSecond === '') state.numSecond = state.numFirst
      const operationSign: string = state.sign
      switch (operationSign) {
        case '+':
          state.numFirst = (+state.numFirst + +state.numSecond).toString()
          break
        case '-':
          state.numFirst = (
            parseFloat(state.numFirst) - parseFloat(state.numSecond)
          ).toString()
          break
        case 'Х':
          state.numFirst = (
            parseFloat(state.numFirst) * parseFloat(state.numSecond)
          ).toString()
          break
        case '/':
          if (parseFloat(state.numSecond) === 0) {
            out.textContent = 'Ошибка'
            state.numFirst = ''
            state.numSecond = ''
            state.sign = ''
            return
          }
          state.numFirst = (
            parseFloat(state.numFirst) / parseFloat(state.numSecond)
          ).toString()
          break
      }

      state.finish = true
      out.textContent = formatNumber(state.numFirst)
      scrollToLeft()
      state.numSecond = ''
      state.sign = ''
    }
  })
