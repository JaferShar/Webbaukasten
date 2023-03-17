describe("Test Scenario 4", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/kursuebersicht");
    cy.loginWithGoogle();
  });

  it(`Create courses`, () => {
    const courses = ["Maths", "Chemistry", "Biology"];

    cy.clearCourses();
    cy.get(".css-hndopl > .MuiButtonBase-root").click().wait(1000);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 1);
    cy.get(".css-hndopl > .MuiButtonBase-root").click().wait(1000);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 2);
    cy.get(".css-hndopl > .MuiButtonBase-root").click().wait(1000);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 3);

    cy.renameCourse(0, courses[0], false);
    cy.renameCourse(1, courses[1], false);
    cy.renameCourse(2, courses[2], false);
  });

  it(`Search course and delete it`, () => {
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 3);
    cy.get(".MuiInputBase-input").clear().type("Maths");
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 1);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .first()
      .should("contain.text", "Maths");

    cy.get(
      ".MuiGrid-root > ul.MuiList-root > .MuiListItemButton-root:contains(Maths)"
    )
      .find("button")
      .click();
    cy.contains("Löschen").click();
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 0);

    cy.get(".MuiInputBase-input").clear();
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 2);
  });

  it("View profile", () => {
    cy.get(".MuiButtonBase-root > .MuiAvatar-root").click();
    cy.contains("Profile").click();
    cy.get("#root").should("contain.text", "First Name");
    cy.get("#root").should("contain.text", "Last Name");
    cy.get("#root").should("contain.text", "Email");
  });
});
