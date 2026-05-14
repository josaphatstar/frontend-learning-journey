export function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export function getSavedTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // ignore
  }
}

