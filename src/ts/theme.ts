const themeToggle: HTMLInputElement = document.querySelector(
  '.theme-toggle__checkbox',
)!
const bodyEl: HTMLElement = document.body
const savedTheme: string = localStorage.getItem('theme') || 'dark'
bodyEl.setAttribute('data-theme', savedTheme)
themeToggle.checked = savedTheme === 'light'

themeToggle.addEventListener('change', (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    bodyEl.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  } else {
    bodyEl.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
})
