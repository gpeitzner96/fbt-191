const SENIOR_CONVERT_URL = Cypress.env("senior_convert_url");
const USERNAME = Cypress.env("username");
const PASSWORD = Cypress.env("password");

describe("Testing Seniors Convert Form", () => {
  before(() => {
    cy.visit(SENIOR_CONVERT_URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
  });

  it("Should show an error message when no first name is provided", () => {
    cy.get('input[id="input-2"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should not show an error message when the first name is provided", () => {
    cy.get('input[id="input-2"]').type("Jane").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should show an error message when no last name is provided", () => {
    cy.get('input[id="input-5"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should not show an error message when the last name is provided", () => {
    cy.get('input[id="input-5"]').type("Smith").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should show an error message when no email address is provided", () => {
    cy.get('input[id="input-8"]').type("{enter}");
    cy.contains("Ensure the email you entered is valid");
  });

  it("Should not show an error message when the email is provided", () => {
    cy.get('input[id="input-8"]').type("janesmith@telus.com").type("{enter}");
    cy.contains("Ensure the email you entered is valid").should("not.exist");
  });

  it("Should show an error message when no contact phone number is provided", () => {
    cy.get('input[id="input-14"]').type("{enter}");
    cy.contains("Please enter a valid phone number");
  });

  it("Should not show an error message when no contact phone number is provided", () => {
    cy.get('input[id="input-14"]').type("5555555555").type("{enter}");
    cy.contains("Please enter a valid phone number").should("not.exist");
  });

  it("Should show an error message when the user doesn't confirm his email", () => {
    cy.contains("Ensure this email matches the one above");
  });

  it("Should not show an error message when the user confirm his email", () => {
    cy.get('input[id="input-11"]').type("janesmith@telus.com").type("{enter}");
    cy.contains("Ensure this email matches the one above").should("not.exist");
  });

  it("Should show an error message when no billing address is provided", () => {
    cy.get('input[id="input-17"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should not show an error message when the billing address is provided", () => {
    cy.get('input[id="input-17"]').type("1523 Center Avenue").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should show an error message when no city is provided", () => {
    cy.get('input[id="input-20"]').type("{enter}");
    cy.contains("Please provide a valid answer");
  });

  it("Should not show an error message when the city is provided", () => {
    cy.get('input[id="input-20"]').type("Quebec").type("{enter}");
    cy.contains("Please provide a valid answer").should("not.exist");
  });

  it("Should select a province", () => {
    cy.get('[data-testid="dropdown-list-test"]').select("British Columbia");
    cy.get('[data-testid="dropdown-list-test"]').should("have.value", "BC");
  });

  it("Should show an error message when no postal code is provided", () => {
    cy.get('input[id="input-26"]').type("{enter}");
    cy.contains("Please enter a valid postal code");
  });

  it("Should not show an error message when the postal code is provided", () => {
    cy.get('input[id="input-26"]').type("V3H0M3").type("{enter}");
    cy.contains("Please enter a valid postal code").should("not.exist");
  });

  it("Should show an error message when no telus account number is provided", () => {
    cy.get('input[id="input-32"]').type("{enter}");
    cy.contains("Please enter a valid number");
  });

  it("Should show an error message when the telus account number is less than 8", () => {
    cy.get('input[id="input-32"]').type("5").type("{enter}");
    cy.contains("Please enter a valid number");
  });

  it("Should not show an error message when the telus account number is greater than 8", () => {
    cy.get('input[id="input-32"]').type("9").type("{enter}");
    cy.contains("Please enter a valid number").should("not.exist");
  });

  it("Should show an error message when no telus current mobile phone number is provided", () => {
    cy.get('input[id="input-35"]').type("{enter}");
    cy.contains("Please enter a valid phone number");
  });

  it("Should show an error message when a bad telus current mobile phone number is provided", () => {
    cy.get('input[id="input-35"]').type("555555555").type("{enter}");
    cy.contains("Please enter a valid phone number");
  });

  it("Should not show an error message when a telus current mobile phone number is provided", () => {
    cy.get('input[id="input-35"]').type("5").type("{enter}");
    cy.contains("Please enter a valid phone number").should("not.exist");
  });

  it("Should show an error message when no verification code is provided", () => {
    cy.get('input[id="input-38"]').type("{enter}");
    cy.contains("Please provide a valid verification code");
  });

  it("Should show an error message when a bad verification code is provided", () => {
    cy.get('input[id="input-38"]').type("MFG1234567").type("{enter}");
    cy.contains("Please provide a valid verification code");
  });

  it("Should not show an error message when the verification code is provided", () => {
    cy.get('input[id="input-38"]').type("8").type("{enter}");
    cy.contains("Please provide a valid verification code").should("not.exist");
  });

  it("Should show an error when the form is submitted and the consent disclaimer option is unselected", () => {
    cy.contains("Submit").click();
    cy.contains(
      "Please provide your consent to receive future TELUS email updates."
    );
  });

  it("Should not show an error message when the form is submitted and the consent disclaimer option is selected", () => {
    cy.contains("Consent Option label").click();
    cy.contains("Submit").click();
    cy.intercept("/form-builder-api/v1/form/", (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.equal(201);
      });
    });
  });
});
