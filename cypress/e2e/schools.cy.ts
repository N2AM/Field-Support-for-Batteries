import mockData from '../fixtures/mockData.json';

describe('Schools tabel', () => {

  it('displays the schools with the highest number of battery issues', () => {
    cy.visit('/');
    cy.contains('Schools with the highest number of battery issues');

    cy.intercept('GET', '/data/battery-data.json', { fixture: 'mockData.json' }).as('getData');

    mockData.forEach((data) => {
      cy.contains(data.academyId);
      cy.contains(data.serialNumber);
      cy.contains(data.employeeId).should('not.exist');
      cy.contains(data.timestamp).should('not.exist');
      cy.contains(data.batteryLevel).should('not.exist');
    });
  });
});
