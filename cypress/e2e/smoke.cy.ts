import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  // afterEach(() => {
  //   cy.cleanupUser();
  // });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: faker.internet
        .email(undefined, undefined, "example.com")
        .toLowerCase(),
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visit("/");
    cy.wait(100);

    cy.findByTestId("signupButton").click();
    cy.wait(300);

    cy.findByTestId("email").type(loginForm.email);
    cy.findByTestId("password").type(loginForm.password);
    cy.findByTestId("create-account").click();

    cy.wait(300);
    cy.findByText("No items on database");

    cy.findByTestId("logout").click();
    cy.findByTestId("login");
  });

  it("should allow you to make a item", () => {
    const testItem = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentences(1),
    };
    const credentials = {
      email: faker.internet
        .email(undefined, undefined, "example.com")
        .toLowerCase(),
      password: faker.internet.password(),
    };

    cy.log("Create account with", credentials);
    cy.createAccount(credentials);
    cy.visit("/");
    cy.wait(300);

    cy.findByTestId("email").type(credentials.email);
    cy.findByTestId("password").type(credentials.password);
    cy.findByTestId("login").click();
    cy.wait(300);
    cy.findByTestId("createNewItem").click();
    cy.wait(500);

    cy.focused().should("have.attr", "name", "title");
    cy.focused().type(testItem.title);
    cy.findByTestId("itemDescription").type(testItem.description);
    cy.findByRole("button", { name: /save/i }).click();
    cy.wait(100);

    cy.findByTestId("deleteItemButton").click();
    cy.findByTestId("confirmDeleteItemButton").click();
    cy.wait(100);

    cy.findByText("No items on database");
    cy.findByTestId("logout").click();
    cy.findByTestId("login");
  });

  it("should allow you to make a category", () => {
    const testItem = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentences(1),
    };
    const credentials = {
      email: faker.internet
        .email(undefined, undefined, "example.com")
        .toLowerCase(),
      password: faker.internet.password(),
    };

    cy.log("Create account with", credentials);
    cy.createAccount(credentials);
    cy.visit("/");
    cy.wait(300);

    cy.findByTestId("email").type(credentials.email);
    cy.findByTestId("password").type(credentials.password);
    cy.findByTestId("login").click();
    cy.wait(300);
    cy.visit("/categories");
    cy.wait(300);
    cy.findByTestId("createNewCategory").click();
    cy.wait(500);

    cy.focused().should("have.attr", "name", "name");
    cy.focused().type(testItem.title);
    cy.findByTestId("categoryDescription").type(testItem.description);
    cy.findByTestId("generateRandomColor").click();

    cy.findByRole("button", { name: /create/i }).click();
    cy.wait(100);

    cy.findByTestId("deleteCategoryButton").click();
    cy.findByTestId("confirmDeleteCategoryButton").click();
    cy.wait(100);

    cy.findByText("No categories on database");
    cy.findByTestId("logout").click();
    cy.findByTestId("login");
  });
});
