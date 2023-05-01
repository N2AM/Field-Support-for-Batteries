import schoolsMockData from '../fixtures/schoolsMockData.json';
import { defineStore } from 'pinia'

describe('Schools tabel', () => {

  it('displays the schools with the highest number of battery issues', () => {
    cy.visit('/');

    cy.intercept('GET', '/data/battery-data.json', { fixture: 'schoolsMockData.json' }).as('getSchools');

    cy.wait('@getSchools').then(schoolsData => {
      // Convert the object into a Map
      const schoolsMap = schoolsMockData.map((school) => ({
        ...school,
        unhealthyDevices: school.unhealthyDevices.reduce((acc, { serialNumber, batteryUsage }) => {
          acc.set(serialNumber, batteryUsage);
          return acc
        }, new Map())

      }))

      expect(schoolsMap[0].unhealthyDevices.get('1805C67HD02259')).to.equal(0.45);
    });;

    schoolsMockData.forEach((school) => {
      cy.contains(school.academyId);
    });
  });
});
