describe('Fluxo de Autenticação - E2E Real', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Deve renderizar os elementos principais da tela', () => {
    cy.contains('Seja Bem-vindo!').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('Entrar').should('be.visible')
  })

  it('Deve fazer login com sucesso e ser redirecionado', () => {

    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: "token-falso-para-passar-no-ci",
        nome: "João Teste",
        cargo: "ADMIN"
      }
    }).as('chamadaLogin')

    cy.get('input[type="email"]').type('j@j.com')
    cy.get('input[type="password"]').type('123')
    cy.get('button[type="submit"]').click()

    // O Cypress espera o nosso mock responder
    cy.wait('@chamadaLogin')

    cy.url().should('eq', 'http://localhost:3000/')

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.not.be.null;
    })
  })

  it('Deve redirecionar para a tela de cadastro ao clicar no link', () => {
    cy.contains('Cadastre-se aqui').click()
    cy.url().should('include', '/cadastro')
  })

  it('Deve redirecionar para a recuperação de senha ao clicar no link', () => {
    cy.get('form').should('be.visible')
    cy.wait(500)
    cy.contains('span', 'Trocar Senha')
        .should('have.css', 'cursor', 'pointer')
        .click({ force: true })

    cy.url({ timeout: 6000 }).should('include', '/esquecisenha')
    cy.contains('Recuperar Senha').should('be.visible')
  })
})