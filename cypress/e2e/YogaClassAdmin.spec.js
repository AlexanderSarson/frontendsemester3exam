/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe('Login', () => {
  it('Visits login', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('Login').click();
    cy.findByText('Welcome back. Sign in below!').should('exist');
  });
  it('Sign in as admin', () => {
    cy.get('#username').type(Cypress.env('TEST_USER'));
    cy.get('#password').type(Cypress.env('TEST_PASSWORD'));
    cy.findByText('Sign in').click();
    cy.get('h1').contains('Home');
  });
  it('Go to CoursesAdmin page', () => {
    cy.findByText('Admin').click();
    cy.url().should('include', '/admin');
    cy.findByText('Yoga Class').click();
    cy.url().should('include', '/yogaClassAdmin');
  });
  it('Logs out', () => {
    cy.findByText('Logout').click();
    cy.findByText('Sign out').click();
    cy.findByText('Logout').should('not.exist');
  });
});
