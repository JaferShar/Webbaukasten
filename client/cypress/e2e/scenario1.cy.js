const courses = ["Maths", "Chemistry", "Biology"];

describe("Test Scenario 1", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/kursuebersicht");
    cy.loginWithGoogle();
  });

  it("Login with Google Account", () => {
    cy.get("#root").should("contain.text", "Kursübersicht");
  });

  it(`Create new courses`, () => {
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
  });

  it(`Rename courses (with cancel)`, () => {
    cy.renameCourse(0, courses[0], true);
    cy.get(".MuiGrid-root > ul.MuiList-root")
      .children()
      .eq(0)
      .should("not.contain.text", courses[0]);
    cy.renameCourse(0, courses[0], false);
    cy.renameCourse(1, courses[1], false);
    cy.renameCourse(2, courses[2], false);

    for (let i = 1; i <= courses.length; i++) {
      cy.get(
        `:nth-child(${i}) > .MuiListItemText-root > .MuiTypography-root`
      ).should(($el) => {
        expect($el.text()).to.match(new RegExp("\\b" + courses[i - 1] + "\\b"));
      });
    }
  });

  it("Edit course title and descriptions", () => {
    const title = ["Maths", "States of Matter", "Cell Division"];
    const description = [
      "Introduction to fractals",
      "Introduction to solid, liquid, gas",
      "Mitosis and meiosis",
    ];

    cy.wrap(courses).each((el, index) => {
      cy.editCourseDescriptions(index, title[index], description[index]);
    });
    cy.wrap(courses).each((el, index) => {
      cy.verifyCourseDescriptions(index, title[index], description[index]);
    });
  });

  it("Edit course slides", () => {
    cy.contains("Biology").click();
    cy.addCourseSlide();
    cy.addCourseSlide();
    cy.shouldHaveSlides(3);

    cy.removeSlide(2);
    cy.shouldHaveSlides(2);

    cy.clickSlide(2);

    cy.createTextfield();
    cy.fillTextfield(
      "1.{enter}2.{enter}3.{enter}4.{enter}5.{enter}6.{enter}7.{enter}8.{enter}9.{enter}10."
    );
    cy.get(".MuiToolbar-root > :nth-child(2)").click();
    cy.wait(2000);
    cy.get(".MuiToolbar-root > :nth-child(3)").click();

    cy.contains("Biology").click();
    cy.clickSlide(2);
    cy.get(".MuiInputBase-root").should(
      "contain.text",
      "1.\n2.\n3.\n4.\n5.\n6.\n7.\n8.\n9.\n10."
    );

    cy.get(".MuiAvatar-root").click();
    cy.contains("Logout").click();
    cy.get("#root").should("contain.text", "Sign in");
  });

  it("Add image to slide (check if iFrame gets opened)", () => {
    cy.contains("Biology").click();
    cy.clickSlide(2);
    cy.get("#simple-tab-1").click();
    cy.get(".MuiGrid-root > :nth-child(1) > .MuiButtonBase-root").click();

    cy.get('[data-test="uw-iframe"]').should("exist");
    // todo: iFrame compatibility with cypress is bad
    // cy.get('button[data-test="image_search-btn"]').click()
    // cy.get('input[data-test="search-input"]').clear().type("lets go!{enter}")
  });
});
