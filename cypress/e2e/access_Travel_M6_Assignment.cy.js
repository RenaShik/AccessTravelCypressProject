///<reference types = "Cypress"/>

describe('The sanity test suite for travel site', () => {

  beforeEach(() => {
    cy.visit(' https://www.accesstravel.com/en-US/Home/Index')
  })

  it('navigates to main page', () => {
    cy.visit('https://www.accesstravel.com/en-US/Home/Index')
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Home/Index')
  })

  it('Verify the main page has the following categories and menu options: Hotels, Guides, Tours, Things to do', () => {
    cy.get('.nav-buttons-wrap').should("be.visible")
    cy.get('.nav-buttons-wrap').children('.hotels').contains('Hotels').should("be.visible")
    cy.get('.nav-buttons-wrap').children('.guides').contains('Guides').should("be.visible")
    cy.get('.nav-buttons-wrap').children('.tours').contains('Tours').should("be.visible")
    cy.get('.nav-buttons-wrap').children('.attraction-link').contains('Things to do').should("be.visible")
  })

  it('validates navigation to the Hotel page', () => {
    cy.get('.hotels').click()
    cy.get('.hotels-form').should("be.visible")
  })

  it('validates navigation to the Guides page', () => {
    cy.get('.guides').click()
    cy.get('.become-guide').should("be.visible")
  })

  it('validates navigation to the Tours page', () => {
    cy.get('.js-list-tours').click()
    cy.get('.tour-main').should("be.visible")
  })

  it('validates navigation to the Things to do page', () => {
    cy.get('.attraction-link').click()
    cy.get('.attractions-cards').should("be.visible")
  })

  it('Verifies click on Login will open dedicated page', () => {
    cy.get('.burger-new').should("be.visible").click()
    cy.get('a:contains("Login")').last().click({ force: true })
    cy.get('.login-form').should("be.visible")
  })

  it('Verifies click on Signup will open dedicated page', () => {
    cy.get('.burger-new').should("be.visible").click()
    cy.get('a:contains("Signup")').last().click({ force: true })
    cy.get('.registration').should("be.visible")
  })
})

describe('Test suite for Hotel page - travel site', () => {

  beforeEach(() => {
    cy.visit(' https://www.accesstravel.com/en-US/Home/Index')
    cy.get('.hotels').click()
  })

  it('validates navigation to the Hotel page', () => {
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Hotel/List')
  })

  it('validates Jerusalen is on the list and search is working in this city - positive test', () => {
    cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
    cy.get('[type = "submit"]').click()
  })

  it('validates London is on the list and search is working in this city - positive test', () => {
    cy.get('#Filter_DestinationId').select("London").invoke("val").should('eq', '31')
    cy.get('[type = "submit"]').click()
  })

  it('validates New York is on the list and search is working in this city - positive test ', () => {
    cy.get('#Filter_DestinationId').select("New York").invoke("val").should('eq', '51')
    cy.get('[type = "submit"]').click()
  })

  it('choosing a valid number of children, verifying ages and using those for search - positive test   ', () => {
    cy.get('#Filter_ChildrenNum').should('be.visible')
    cy.get('#Filter_ChildrenNum').clear().type('2').should('have.value', '2', { force: true })
    cy.get('.hotels-wrap').click()
    cy.get('[class="row children-age"]').should('be.visible')
    cy.get('[name="Filter.ChildrensAge[0]').clear().type('2', { force: true })
    cy.get('[name="Filter.ChildrensAge[1]').clear().type('15', { force: true })
    cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
    cy.get('[type = "submit"]').click()
  })

  it('choosing an invalid number of children - negative test', () => {
    cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
    cy.get('#Filter_ChildrenNum').should('be.visible')
    cy.get('#Filter_ChildrenNum').clear().type('11').should('have.value', '11', { force: true })
    cy.get('[type = "submit"]').click()
    cy.get('[data-valmsg-for="Filter.ChildrenNum"]').should('be.visible')
  })

  it('choosing an invalid number of adults - negative test', () => {
    cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
    cy.get('#Filter_AdultNum').should('be.visible')
    cy.get('#Filter_AdultNum').clear().type('11').should('have.value', '11', { force: true })
    cy.get('[type = "submit"]').click()
    cy.get('[data-valmsg-for="Filter.AdultNum"]').should('be.visible')
  })

  it('invalid dates will trigger an error - negative test', () => {
    cy.get('#Filter_DestinationId').select("Jerusalem").invoke("val").should('eq', '8')
    cy.get('[name="Filter.CheckIn"]').clear().type("2023-01-01").invoke("val").should('eq', '2023-01-01')
    cy.get('.hotels-wrap').click()
    cy.get('[type = "submit"]').click()
    cy.get('[data-valmsg-for="Filter.CheckIn"]').should('be.visible')
  })
})

