import "cypress-real-events";

Cypress.Commands.add("loginWithGoogle", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/api/account/",
    body: {
      email: Cypress.env("email"),
      firstName: Cypress.env("firstName"),
      lastName: Cypress.env("lastName"),
      picture: Cypress.env("picture"),
    },
  }).then(({ body }) => {
    const userItem = {
      token: body.token,
      user: {
        googleId: body._id,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        picture: body.picture,
      },
    };
    cy.wrap(userItem.token).as("token");

    window.localStorage.setItem("account", JSON.stringify(userItem));
    cy.visit("http://localhost:3000/kursuebersicht");
  });
});

Cypress.Commands.add("clearCourses", () => {
  cy.get("@token").then((token) => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/course/all",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ body }) => {
        cy.wrap(body).each(($el) => {
          cy.request({
            method: "DELETE",
            url: `http://localhost:3000/api/course/${$el["_id"]}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        });
      })
      .then(() => {
        cy.visit("http://localhost:3000/kursuebersicht");
      });
  });
});

Cypress.Commands.add("renameCourse", (index, name, cancel) => {
  cy.get(".MuiGrid-root > ul.MuiList-root")
    .children()
    .eq(index)
    .find("button")
    .click();
  cy.get(
    '#long-menu > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
  ).click();
  cy.get(".MuiBox-root input").clear().type(name);
  if (cancel) {
    cy.get(".css-1sn0xnf > .MuiBox-root > :nth-child(2)").click();
  } else {
    cy.get(".css-1sn0xnf > .MuiBox-root > :nth-child(1)").click();
  }
});

Cypress.Commands.add("editCourseDescriptions", (index, title, description) => {
  cy.get(`.MuiGrid-root > .MuiList-root > :nth-child(${index + 1})`).click();
  cy.wait(2000); 
  cy.get("#root").should("contain.text", "Kurs");
  cy.wait(2000); 

  cy.get("#standard-basic").clear().type(title);
  cy.wait(2000); 
  cy.get("#standard-textarea").clear().type(description);
  cy.wait(2000); 
  cy.get(".MuiToolbar-root > :nth-child(2)").click();
  cy.wait(2000);
  cy.get(".MuiToolbar-root > :nth-child(3)").click();
  cy.wait(2000); 
});



Cypress.Commands.add("addCourseSlide", () => {
  cy.get('[data-testid="NoteAddIcon"]').click({ force: true });
  cy.get('[data-testid="SourceIcon"]').click({ force: true });
});

Cypress.Commands.add("removeSlide", (slide) => {
  cy.get(
    `.MuiGrid-root > .MuiPaper-root > .MuiList-root > :nth-child(${slide})`
  ).rightclick();
  cy.contains("Löschen").click();
});

Cypress.Commands.add("shouldHaveSlides", (number) => {
  cy.get('[data-testid="ArticleIcon"]').should("have.length", number);
});

Cypress.Commands.add("clickSlide", (number) => {
  cy.get('[data-testid="ArticleIcon"]')
    .eq(number - 1)
    .click();
});

Cypress.Commands.add("createTextfield", () => {
  cy.get(".css-19kzrtu > .MuiBox-root > .MuiButtonBase-root")
    .click()
    .wait(1000);
});

Cypress.Commands.add("fillTextfield", (text) => {
  cy.get('.MuiInputBase-root textarea[aria-invalid="false"]')
    .last()
    .clear()
    .type(text);
});

Cypress.Commands.add("validateClipboard", (value) => {
  cy.window().then((win) => {
    win.navigator.clipboard.readText().then((text) => {
      expect(text).to.contain(value);
    });
  });
});

Cypress.Commands.add("changeToTextfield", () => {
  cy.contains("Austauschen").click({ force: true });
  cy.get(
    "#long-menu > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiPaper-root.MuiMenu-paper.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > ul"
  )
    .contains("Textfeld")
    .click({ force: true })
    .wait(1000);
});






