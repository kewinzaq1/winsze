import {render, screen, act, waitForElementToBeRemoved} from '@testing-library/react'
import {Layout} from '../../components/layout'
import {AuthProvider} from '../../Auth'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "../../components/layout/Navbar";
import {Footer} from "../../components/layout/Footer";


const renderLayout = (ui, {user} = {}) => {
    const Wrapper = ({children}) => <BrowserRouter>
        <AuthProvider initUser={user}>
            {children}
        </AuthProvider>
    </BrowserRouter>

    return render(ui, {wrapper: Wrapper})
}

test('render navbar', async () => {
    renderLayout(<Navbar/>)
    expect(screen.getByRole('heading')).toHaveTextContent('winsze')
    expect(screen.getByRole('button', {name: /sign up/i})).toBeInTheDocument()
})

test('render footer', async () => {
    renderLayout(<Footer/>, {user: {name: 'FAKE_USER'}})
    screen.debug()
    expect(screen.getByRole('button', {name: /favorites/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /feed/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /settings/i})).toBeInTheDocument()
})
