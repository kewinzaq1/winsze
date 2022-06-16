import {blue, red} from '@mui/material/colors'
import {css} from '@emotion/react'

export const maxWidth = '900px'
export const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const myBlue = blue[700]
export const alertRed = red[500]
export const desktopBreakpoint = '1200px'
export const laptopBreakpoint = '768px'
export const tabletBreakpoint = '768px'
export const mobileBreakpoint = '600px'
export const padEl = '1rem'
export const styleFlexColumn = css`
  margin: 0 auto;
  width: 100%;
  max-width: ${maxWidth};
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
export const toastOptions = {
  duration: 1500,
  style: {
    fontFamily: 'Poppins'
  }
}
