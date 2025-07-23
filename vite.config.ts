import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import devtoolsJson from 'vite-plugin-devtools-json'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  css: {
    devSourcemap: true,
    preprocessorOptions: {}
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson(), cssInjectedByJsPlugin()],
  server: {
    warmup: {
      clientFiles: ['./app/root.tsx']
    }
  }
})
