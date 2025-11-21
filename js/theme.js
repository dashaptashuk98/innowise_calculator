const themeToggle = document.querySelector('.theme-toggle__checkbox')
const bodyEl = document.body
const savedTheme = localStorage.getItem('theme') || 'dark'
bodyEl.setAttribute('data-theme', savedTheme)
themeToggle.checked = savedTheme === 'light'

themeToggle.addEventListener('change', function () {
  if (this.checked) {
    bodyEl.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  } else {
    bodyEl.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
})
