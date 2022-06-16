/* eslint-disable no-undef */
import {buildUser} from '../../src/Utils/Builders'

const {email, username: nickname, password} = buildUser()
beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
})

describe('Fully functionality app', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
  it('create new user', () => {
    cy.findByRole('button', {name: /sign up/i}).click()

    cy.findByLabelText('email').type(email)
    cy.findByLabelText('nickname').type(nickname)
    cy.findByLabelText('password').type(password)

    cy.findByRole('button', {name: /register/i}).click()
  })

  it('Publish post add like and write comment', () => {
    cy.findByRole('heading', {name: /share with friends/i}).should('exist')

    cy.findByPlaceholderText(/what's up/i)
      .click()
      .type('Hello everyone')

    cy.findByRole('button', {name: /publish/i}).click()
  })

  it('display post on user section and edit', () => {
    cy.findByText(/you/i, {selector: 'a'}).click()

    cy.findByText('Hello everyone').should('exist')

    cy.findByLabelText(/open post menu/i).click()

    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/edit post/i).click()
    })

    cy.findByDisplayValue('Hello everyone')
      .click()
      .clear()
      .type('Goodbye everyone{enter}')

    cy.findByRole('button', {name: /upload changes/i}).click()

    cy.findByLabelText(/add like/i).click()
    cy.findByLabelText(/likes counter/i).should('have.text', '1')

    cy.findByRole('button', {name: /open comment/i}).click()

    cy.findByRole('dialog').within(() => {
      cy.findByPlaceholderText(/write a comment/i).type('look nice')
      cy.findByRole('button', {name: /add/i}).click()
    })
  })

  it('back to feed page and remove post', () => {
    // I used force true, because previously opened comment's dialog wherefor
    // bottom navigation has aria label hidden true
    cy.findByLabelText(/go to feed/i).click({force: true})

    cy.findByText('Hello everyone').should('not.exist')
    cy.findByText('Goodbye everyone').should('exist')

    cy.findByLabelText(/open post menu/i).click()

    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/delete post/i).click()
    })

    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/accept confirmation/i).click()
    })
  })

  it('open header menu and go to settings', () => {
    cy.findByRole('navigation').within(() => {
      cy.findByLabelText('account-menu').click()
    })

    cy.findByText(/settings/i, {selector: 'li'}).click()
  })

  it('change nickname', () => {
    const newNickname = 'newFancyName'

    cy.findByText(/nickname/i, {selector: 'span'}).click()

    cy.findByRole('dialog').within(() => {
      cy.findByPlaceholderText(/nickname/i).type(newNickname)
      cy.findByRole('button').click()
    })

    cy.findByRole('navigation').within(() => {
      cy.findByLabelText('account-menu').click()
    })

    cy.findByRole('menu', () => {
      cy.findByText(newNickname, {selector: 'li'}).should('exist')
    })

    cy.findByText(newNickname).click()
  })

  it('delete account and back to login screen', () => {
    cy.findByText(/delete account/i, {selector: 'span'}).click()

    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/accept confirmation/i).click()
    })

    cy.findByRole('heading', {name: /welcome back/i}).should('exist')
  })
})
