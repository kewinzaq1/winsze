import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {AppBar as AppBarMaterial} from '@mui/material'
import {maxWidth} from '../LayoutStyles'

export const AppBar = styled(AppBarMaterial)`
  box-shadow: var(--light-box-shadow);
  background: #eceff1;
`
const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Nav = styled.nav`
  ${baseFlex};
  width: 100%;
  padding: 1rem;
  height: 100px;
  justify-content: space-between;
  max-width: ${({status}: {status?: string}) =>
    status === 'authenticated' ? maxWidth : '1400px'};
  margin: 0 auto;

  h1 {
    font-size: 2.25rem;

    span {
      color: #1565c0;
    }
  }

  button {
    white-space: nowrap;
  }
`
export const NavActions = styled.div`
  height: 100%;
  ${baseFlex};
  gap: 0.25rem;
`
