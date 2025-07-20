// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss({
//       config: {
//         content: [
//           "./index.html",
//           "./src/**/*.{js,ts,jsx,tsx}",
//         ],
//         darkMode: 'class', // This enables class-based dark mode
//         theme: {
//           extend: {},
//         },
//         plugins: [],
//       }
//     })],
// })

// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  // The plugin call is now empty
  plugins: [react(), tailwindcss()], 
})
