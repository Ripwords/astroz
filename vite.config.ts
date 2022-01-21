import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const IonicResolver = (ionic: string) => {
  if (ionic.startsWith("Ion")) {
    return { importName: "Ion" + ionic.slice(3), path: "@ionic/vue" }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Icons(),
    Components({
      dirs: ['src/components'],
      resolvers: [
        IconsResolver({
          prefix: 'i'
        }),
        IonicResolver
      ]
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts'
    }),
    VitePWA({
      base: '/',
      srcDir: 'src',
      manifest: {
        name: "astroz",
        short_name: "astroz",
        theme_color: "#285eb5",
        start_url: "/",
        icons: [
          {
            "src": "./img/icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./img/icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "./img/icons/android-chrome-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./img/icons/android-chrome-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./img/icons/apple-touch-icon-60x60.png",
            "sizes": "60x60",
            "type": "image/png"
          },
          {
            "src": "./img/icons/apple-touch-icon-76x76.png",
            "sizes": "76x76",
            "type": "image/png"
          },
          {
            "src": "./img/icons/apple-touch-icon-120x120.png",
            "sizes": "120x120",
            "type": "image/png"
          },
          {
            "src": "./img/icons/apple-touch-icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "./img/icons/apple-touch-icon-180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "./img/icons/apple-touch-icon.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "./img/icons/favicon-16x16.png",
            "sizes": "16x16",
            "type": "image/png"
          },
          {
            "src": "./img/icons/favicon-32x32.png",
            "sizes": "32x32",
            "type": "image/png"
          },
          {
            "src": "./img/icons/msapplication-icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "./img/icons/mstile-150x150.png",
            "sizes": "150x150",
            "type": "image/png"
          }
        ],
        shortcuts: [
          {
            "name": "Weather",
            "description": "Open the weather page",
            "url": "https://astroz.netlify.app/#/menu/weather",
            "icons": [
              // @ts-expect-error
              {
                "src": "./img/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
              }
            ]
          },
          {
            "name": "Settings",
            "description": "Open the settings page",
            "url": "https://astroz.netlify.app/#/menu/settings",
            "icons": [
              // @ts-expect-error
              {
                "src": "./img/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
              }
            ]
          }
        ]
      }
    })
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
})
