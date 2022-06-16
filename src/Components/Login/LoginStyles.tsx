import styled from '@emotion/styled'
import {baseFlex, mobileBreakpoint, myBlue} from '../../Utils/Layout'
import {FormGroup} from '@mui/material'

export const LoginWrapper = styled.main`
  ${baseFlex};
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  justify-content: center;

  span {
    color: ${myBlue};
  }
`
export const Form = styled.form`
  ${baseFlex};
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 2rem;
  align-items: center;
  justify-items: center;

  div:first-of-type {
    gap: 2rem;
    justify-content: center;
    max-width: 700px;
  }

  @media (max-width: ${mobileBreakpoint}) {
    width: 90%;
    padding: 2rem 0;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
  }
`
export const FormActions = styled(FormGroup)`
  margin-top: 2rem;
  gap: 0.5rem;
`
export const FormWallpaper = styled.div`
  width: 50%;
  min-height: 100vh;
  background-image: url('assets/login.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`
