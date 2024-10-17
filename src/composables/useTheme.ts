import { ref, watch, onMounted, type Ref } from 'vue'

export function useTheme() {
  // Define the Theme type
  type Theme = 'light' | 'dark' | 'system' // '' represents system preference

  // The theme can be 'light', 'dark', or '' (system preference)
  const theme: Ref<Theme> = ref<Theme>('system')

  /**
   * Updates the HTML document's class list based on the theme.
   * @param themeValue - The current theme value.
   */
  const setThemeClass = (themeValue: Theme): void => {
    const htmlElement = document.documentElement
    htmlElement.classList.remove('light', 'dark')

    if (themeValue === 'light' || themeValue === 'dark') {
      htmlElement.classList.add(themeValue)
    }
  }

  /**
   * Initializes the theme by checking localStorage and applying the appropriate class.
   */
  const initTheme = (): void => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      theme.value = savedTheme
    } else {
      theme.value = 'system'
    }

    setThemeClass(theme.value)
  }

  /**
   * Toggles the theme between 'light', 'dark', and '' (system preference).
   */
  const toggleTheme = (): void => {
    if (theme.value === 'dark') {
      theme.value = 'light'
    } else if (theme.value === 'light') {
      theme.value = 'system'
    } else {
      theme.value = 'dark'
    }

    if (theme.value) {
      localStorage.setItem('theme', theme.value)
    } else {
      localStorage.removeItem('theme')
    }
  }

  // Watch for changes in theme and update the class accordingly
  watch(theme, (newTheme: Theme) => {
    setThemeClass(newTheme)
  })

  /**
   * Handles changes in system color scheme preferences.
   * @param e - The MediaQueryListEvent triggered by a change in the media query.
   */
  const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
    if (!localStorage.getItem('theme')) {
      theme.value = e.matches ? 'dark' : 'light'
    }
  }

  // Initialize theme and set up event listener for system preference changes
  onMounted(() => {
    initTheme()
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  })

  return {
    theme,
    toggleTheme,
    initTheme
  }
}
