describe("Test Magnification Calculator", () => {
  beforeEach(() => {
    cy.visit("http://astroz.netlify.app/#/menu/magni")
  })
  it("Test Magnification Calculator", () => {
    cy.get("ion-card-header").contain("Magnification")
  })
})