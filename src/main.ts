import './style.css'
import App from './App.svelte'

const rootElement = document.querySelector<HTMLDivElement>('#root')

if (!rootElement) {
  throw new Error('Missing root element!')
}

const loaderElement =
  rootElement.querySelector<HTMLDivElement>('#initial-loader')

if (!loaderElement) {
  throw new Error('Missing loader element!')
}

rootElement.removeChild(loaderElement)

const app = new App({
  target: rootElement,
})

export default app
