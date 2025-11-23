export interface CalculatorState {
  numFirst: string
  numSecond: string
  sign: string
  finish: boolean
}

export const state: CalculatorState = {
  numFirst: '',
  numSecond: '',
  sign: '',
  finish: false,
}

export const nums: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
]
export const actions: string[] = ['-', '+', 'Х', '/', '+/-', '%']

export const out: HTMLElement = document.querySelector('.calc__display')!
