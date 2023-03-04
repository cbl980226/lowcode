import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  type UserConfig
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  presets: [
    presetUno({
      attributifyPseudo: true
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      border: 'var(--color-border)'
    }
  }
}) as UserConfig
