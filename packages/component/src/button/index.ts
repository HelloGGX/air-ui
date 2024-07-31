import type { App } from 'vue'
import Button from './Button.vue'

Button.install = (app: App) => {
  app.component(Button.name || 'AirButton', Button)
}

export default Button

export * from './Button'