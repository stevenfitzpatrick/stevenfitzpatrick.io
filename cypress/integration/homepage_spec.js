describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should display correct titles', () => {
    cy
      .title()
      .should(
        'eq',
        'Steven Fitzpatrick | Front-End Developer | Dublin, Ireland'
      );

    cy.get('h2').should('contain', 'I’m Steven Fitzpatrick.');
  });

  it('should have contact me button', () => {
    cy.get('button').should('have.class', 'button--outline');
    cy.get('button').should('contain', 'Contact Me');
  });

  it('should only show contact me window when clicked', () => {
    cy.get('.contact').should('not.exist');
    cy
      .contains('Contact Me') // 6.
      .click();
    cy.get('.contact').should('have.class', 'contact--visible');

    cy.get('.contact__close').click();
    cy.get('.contact').should('not.have.class', 'contact--visible');
  });
});
