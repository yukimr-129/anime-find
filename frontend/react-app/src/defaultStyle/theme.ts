import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  })

const theme = extendTheme({
    breakpoints,
    styles: {
        global: {
            body: {
                // height: '100%',
                background: 'rgb(239, 239, 239)',
                color: 'gray.800',
                margin: '0',
                padding: '0',
            },
            a: {
                textDecoration:'none',
            }
        }
    }
})

export default theme