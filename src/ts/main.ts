import '../scss/style.scss'

import './state'
import './utils'
import './handlers'
import './theme'

document.addEventListener('DOMContentLoaded', () => {
  const calcElement = document.querySelector('.calc')
  if (calcElement) {
    calcElement.classList.add('loaded')
  }
})
