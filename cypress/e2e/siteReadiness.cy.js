const SITE_READINESS_URL = Cypress.env("site_readiness_url");
const USERNAME = Cypress.env("username");
const PASSWORD = Cypress.env("password");

describe("Testing Site Readiness Form", () => {
  before(() => {
    cy.visit(SITE_READINESS_URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
  });

  it("Should show an error when no account holder last name is provided", () => {
    cy.get('input[id="input-1"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should not show an error message when an account holder last name is provided", () => {
    cy.get('input[id="input-1"]').type("Jane").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should show an error when no confirmation number is provided", () => {
    cy.get('input[id="input-4"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should show an error when a bad confirmation number is provided", () => {
    cy.get('input[id="input-4"]').type("OR-1234567").type("{enter}");
    cy.contains("Minimum characters required: 11");
  });

  it("Should not show an error message when the confirmation number is provided", () => {
    cy.get('input[id="input-4"]').type("8").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should show a second form when the user selects the third option of the first question", () => {
    cy.contains(
      "No, we need to reschedule or cancel this appointment time"
    ).click();
    cy.contains("To reschedule or make changes to your internet package");
  });

  it("Should show a second form when the user selects the second option of the first question", () => {
    cy.contains("Yes, an authorized decision-maker").click();
    cy.contains("Please provide contact information for the authorized");
  });

  it("Should show an error message when no full name is provided", () => {
    cy.get('input[placeholder="Full Name"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should not show an error message when the full name is provided", () => {
    cy.get('input[placeholder="Full Name"]').type("Jane Smith").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should show an error message when no phone number is provided", () => {
    cy.get('input[placeholder="Phone Number"]').type("{enter}");
    cy.contains("Please enter a valid phone number");
  });

  it("Should show an error message when a bad phone number is provided", () => {
    cy.get('input[placeholder="Phone Number"]')
      .type("555555555")
      .type("{enter}");
    cy.contains("Please enter a valid phone number");
  });

  it("Should not show an error message when the phone number is provided", () => {
    cy.get('input[placeholder="Phone Number"]').type("5").type("{enter}");
    cy.contains("Please enter a valid phone number").should("not.exist");
  });

  it("Should show a second form when the user selects the third option of the fifth question", () => {
    cy.contains(
      "Site does not have power or electrical wiring on-site is not complete"
    ).click();
    cy.contains(
      "For example, electrical wiring is being currently completed and may not be ready by time of instal."
    );
  });

  it("Should show an error when the user does answer some question", () => {
    cy.contains(
      "Yes, on-site contact has access to the email account provided for security account setup"
    ).click();
    cy.contains(
      "Yes, on-site contact will have access to all portions of the premises"
    ).click();
    cy.contains(
      "Yes, the site is under construction but will not impede installation"
    ).click();
    cy.contains(
      "Have sought approval from the landlord or property manager, expecting approval, but have not yet received it"
    ).click();
    cy.contains("Submit").click();
    cy.contains("Please select at least one option");
  });

  it("Should not show an error message when the form is submitted and all fields are good", () => {
    cy.contains(
      "Yes, internet is active and meets minimum speed requirements"
    ).click();
    cy.contains("Submit").click();
    cy.intercept("/form-builder-api/v1/form/", (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.equal(201);
      });
    });
  });
});
