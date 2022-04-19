/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {jsx, css} from '@emotion/react'
import React from 'react'
import {blue, red} from '@mui/material/colors'
import {Navbar} from './Navbar'
import {Footer} from './Footer'
import 'normalize.css'
import './index.css'
import {Toaster} from 'react-hot-toast'
import styled from '@emotion/styled'
import {CircularProgress} from '@mui/material'

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

interface Props {
  children: JSX.Element
}

export const Layout = ({children}: Props) => (
  <>
    <Toaster
      toastOptions={{
        duration: 1500,

        style: {
          fontFamily: 'Poppins',
        },
      }}
    />
    <Navbar />
    {children}
    <Footer />
  </>
)

export const Progress = styled(CircularProgress)`
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
`