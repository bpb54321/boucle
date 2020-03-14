describe('Mvp user journey', () => {
  it('should allow a user to create new clips', function () {
    // The user opens the app
    cy.visit('/');
    
    // No clip editing forms are currently visible
    cy.findByTestId('clip-edit-form').should('not.be.visible');
    
    // The user presses the New Clip button
    cy.findByTestId('new-clip-button').click();
  });
});