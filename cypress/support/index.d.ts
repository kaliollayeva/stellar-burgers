declare namespace Cypress {
  interface Window {
    store: any; // или точный тип твоего Redux store
  }
}