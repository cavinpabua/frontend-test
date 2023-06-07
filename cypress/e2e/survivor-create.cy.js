function selectDropdown(optionText) {
  // open select
  cy.get(
    `.ant-select > .ant-select-selector > .ant-select-selection-item`
  ).click();

  // wait for 2 seconds
  cy.wait(2000);

  return cy
    .get(".ant-select-dropdown :not(.ant-select-dropdown-hidden)")
    .find(".ant-select-item-option")
    .each((el) => {
      if (el.text() === optionText) {
        cy.wrap(el).click();
      }
    });
}

describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/login");

    // Simulate Login
    cy.get("input[id=normal_login_email]").type("admin@admin.com");
    cy.get("input[id=normal_login_password]").type("test1234");

    cy.get("button").click();

    // The new url should include "/dashboard"
    cy.url().should("include", "/dashboard");

    // The new page should contain an h1 with "Dashboard"
    cy.get("h3").contains("Reports");

    // Click on the sidebar
    cy.get("li").contains("Survivors").click();

    // The new url should include "/survivors"
    cy.url().should("include", "/survivors");

    // The new page should contain an h1 with "Survivors"
    cy.get("h3").contains("List of Survivors");
    // should have a button to add a new survivor
    cy.get("button").contains("Add Survivor");

    // create a new survivor
    cy.get("button").contains("Add Survivor").click();
    // random email
    cy.get("input[id=form_in_modal_email]").type(
      Math.random().toString(36).substring(7) + "@gmail.com"
    );
    // random first name
    cy.get("input[id=form_in_modal_firstName]").type(
      Math.random().toString(36).substring(7)
    );
    // random last name
    cy.get("input[id=form_in_modal_lastName]").type(
      Math.random().toString(36).substring(7)
    );
    // random age
    cy.get("input[id=form_in_modal_age]").type(Math.floor(Math.random() * 100));
    // random gender
    selectDropdown("Female");
    // 8 minimum length
    cy.get("input[id=form_in_modal_password]").click();
    cy.get("input[id=form_in_modal_password]").type("test1234");

    // click Create button
    cy.get("button").contains("Create").click();
    // find for antd message.success
    cy.get(".ant-message-success").contains("Survivor created successfully");
  });
});
