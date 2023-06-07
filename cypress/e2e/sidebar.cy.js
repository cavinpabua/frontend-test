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
    // should have a table with survivors,with name, status and last location
    cy.get("table").contains("Name");
    cy.get("table").contains("Status");
    cy.get("table").contains("Last Location");

    // // Click on the sidebar
    cy.get("li").contains("Trades").click();
    cy.get("li").contains("Open Trades").click();
    cy.get("table").contains("Trading With");
    cy.get("table").contains("Trade Status");
  });
});
