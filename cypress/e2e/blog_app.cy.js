describe("blog app", function () {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen"
		};
		const user2 = {
			name: "Matti Steven",
			username: "stevens1",
			password: "steven123"
		};
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
		cy.visit(`${Cypress.env("FRONTEND")}`);
	});

	it("front page can be opened", function () {
		cy.contains("Login");
	});

	it("contains the login form", function () {
		cy.contains("Login").click();
	});

	it("can login from ui", function () {
		cy.contains("Login").click();
		cy.get("#username").type("mluukkai");
		cy.get("#password").type("salainen");
		cy.get("#login").click();
		cy.contains("blogs");
	});

	it("failed login show notification", function () {
		cy.contains("Login").click();
		cy.get("#username").type("steve");
		cy.get("#password").type("123");
		cy.get("#login").click();
		cy.get(".error")
			.contains("wrong username or password")
			.and("have.css", "color", "rgb(255, 0, 0)")
			.and("have.css", "border-style", "solid");
	});

	describe("when logged in", function () {
		beforeEach(function () {
			cy.login({
				username: "mluukkai",
				password: "salainen"
			});
		});

		it("can create new blog", function () {
			cy.get("#Create").click();
			cy.contains("create new");
			cy.get("#title").type("title");
			cy.get("#author").type("cypress");
			cy.get("#url").type("cypress.com");
			cy.get("#create").click();
			cy.contains("View");
		});

		describe("when a blog is created", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "title",
					author: "cypress",
					url: "http.com"
				});
			});

			it("can see all details of the blog", function () {
				cy.get("#view").click();
				cy.contains("Likes: 0");
			});

			it("the like button works", function () {
				cy.get("#view").click();
				cy.get("#like").click();
				cy.contains("Likes: 1");
			});

			it("can delete a blog if the user is the creator", function () {
				cy.get("#view").click();
				cy.get("#remove").click();
				cy.contains("title by cypress").should("not.exist");
			});

			it("only the creator of the blog post should see the delete button", function () {
				cy.login({
					username: "stevens1",
					password: "steven123"
				});
				cy.get("#view").click();
				cy.contains("Remove").should("not.exist");
			});
			it("the blogs are sorted by the number of likes", function () {
				cy.createBlog({
					title: "title2",
					author: "bobby",
					url: "https.com"
				});
				cy.contains("title2 by bobby").contains("View").click();
				cy.get("#like").click();
				cy.get("#blog>div").eq(0).should("contain", "title2 by bobby");
				cy.get("#blog>div").eq(1).should("contain", "title by cypress");
			});
		});
	});
});
