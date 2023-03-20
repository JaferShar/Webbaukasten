describe("Test Scenario 3", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/kursuebersicht");
    cy.loginWithGoogle();
  });

  it(`Create courses`, () => {
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
    cy.get(".css-hndopl > .MuiButtonBase-root").click().wait(1000);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 4);

    cy.renameCourse(0, "Maths", false);
    cy.renameCourse(1, "Chemistry", false);
    cy.renameCourse(2, "Biology", false);
    cy.renameCourse(3, "Zoo Animals", false);
  });

  it("Edit Biology course", () => {
    cy.contains("Biology").click();
    cy.addCourseSlide();
    cy.clickSlide(2);
    cy.createTextfield();
    cy.fillTextfield("Chapter 1: Mitosis");
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);

    cy.addCourseSlide();
    cy.clickSlide(3);
    cy.createTextfield();
    cy.fillTextfield("Chapter 2: Meiosis");

    cy.wait(4000);
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(4000);
    cy.get(".MuiToolbar-root > :nth-child(3)").click();
  });

  it("Edit Zoo Animals course", () => {
    cy.wait(5000);
    cy.contains("Zoo Animals").click();
    cy.addCourseSlide();
    cy.clickSlide(2);
    cy.createTextfield();
    cy.fillTextfield("Elephant");
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);

    cy.createTextfield();
    cy.fillTextfield("Elephants are the worlds largest land animals");
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);

    cy.createTextfield();
    cy.fillTextfield("They communicate through vibrations");

    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(4000);
    cy.get(".MuiToolbar-root > :nth-child(3)").click();

    cy.contains("Zoo Animals").click();
    cy.clickSlide(2);
    cy.get("#root").should("contain.text", "Elephant");
    cy.get("#root").should(
      "contain.text",
      "Elephants are the worlds largest land animals"
    );
    cy.get("#root").should(
      "contain.text",
      "They communicate through vibrations"
    );
  });

  it("Publish course", () => {
    cy.get(
      ".MuiGrid-root > ul.MuiList-root > .MuiListItemButton-root:contains(Zoo Animals)"
    )
      .find("button")
      .click();
    cy.wait(200);
    cy.contains("Veröffentlichen").focus().realClick();
    cy.validateClipboard("http://localhost:3000/student/view?courseId=");
  });
});
