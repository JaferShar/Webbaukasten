describe("Test Scenario 2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/kursuebersicht");
    cy.loginWithGoogle();
  });

  it("Create course", () => {
    cy.clearCourses();
    cy.get(".css-hndopl > .MuiButtonBase-root").click().wait(1000);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .should("have.length", 1);
  });

  it("Rename course", () => {
    cy.renameCourse(0, "Zoo Animals", false);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .eq(0)
      .should("contain.text", "Zoo Animals");
  });

  it("Edit course slides", () => {
    cy.contains("Zoo Animals").click();
    cy.addCourseSlide();

    cy.clickSlide(2);
    cy.createTextfield();
    cy.fillTextfield("King of the jungle: lion");
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);

    cy.addCourseSlide();
    cy.clickSlide(3);
    cy.createTextfield();
    cy.fillTextfield(
      "We Share 95 to 98 Percent of the Same DNA with Chimpanzees."
    );
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);

    cy.createTextfield();
    cy.fillTextfield("Wild Chimpanzees Can Only Be Found in Africa.");

    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);
    cy.get(".MuiToolbar-root > :nth-child(3)").click();

    cy.contains("Zoo Animals").click();
    cy.clickSlide(3);
    cy.get("#root").should(
      "contain.text",
      "We Share 95 to 98 Percent of the Same DNA with Chimpanzees."
    );
    cy.get("#root").should(
      "contain.text",
      "Wild Chimpanzees Can Only Be Found in Africa."
    );
  });

  it("Share a course", () => {
    cy.get(
      ".MuiGrid-root > ul.MuiList-root > .MuiListItemButton-root:contains(Zoo Animals)"
    )
      .find("button")
      .click();
    cy.wait(200);
    cy.contains("Teilen").focus().realClick();

    cy.get("input[aria-invalid=false]").clear().type("test@test.de");
    cy.get(
      "body > div.MuiModal-root.css-79ws1d-MuiModal-root > div.MuiBox-root.css-1sn0xnf > div.MuiBox-root.css-10igwnb > button:nth-child(1)"
    ).click();
    cy.contains("course was shared with test@test.de").should("exist");
  });
});
