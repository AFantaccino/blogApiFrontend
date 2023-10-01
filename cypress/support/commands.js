Cypress.Commands.add("login", ({ username, password }) => {
	cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
		username,
		password
	}).then(({ body }) => {
		localStorage.setItem("token", body.token);
		cy.visit(`${Cypress.env("FRONTEND")}`);
	});
});

Cypress.Commands.add("createBlog", blog => {
	cy.request({
		url: `${Cypress.env("BACKEND")}/blogs`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`
		},
		body: blog
	});

	cy.visit(`${Cypress.env("FRONTEND")}`);
});
