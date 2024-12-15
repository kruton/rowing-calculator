import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    "body": {
      bg: { _light: "white", _dark: "gray.900" },
      color: { _light: "gray.900", _dark: "white" },
    },
  },
  theme: {
    keyframes: {
      gradientAnimation: {
        "0%": { transform: "background-position: 0% 50%" },
        "50%": { transform: "background-position: 100% 50%" },
        "100%": { transform: "background-position: 0% 50%" },
      },
    },
    tokens: {
      config: {
        initialColorMode: "system",
        useSystemColorMode: true,
      },
      fonts: {
        heading: { value: "'Montserrat', sans-serif" },
        logo: { value: "'Orbitron', sans-serif" },
      },
      breakpoints: {
        sm: "30em",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
      },
      animations: {
        gradientAnimation: { value: "gradientAnimation 8s ease infinite" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig)
