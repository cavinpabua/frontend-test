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
  });
});
