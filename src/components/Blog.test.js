import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import test_helper from "./test_helper";

const blogs = [
	{
		_id: {
			$oid: "64ea301da535bbf6e1d97e11"
		},
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 3,
		user: [
			{
				username: "mluukkai"
			}
		]
	}
];

const loggedUser = {
	_id: {
		$oid: "64f2db5aeba34f34840a8575"
	},
	name: "Matti Luukkainen",
	username: "mluukkai",
	blogs: ["64ea301da535bbf6e1d97e11"]
};

// const blogs = [
// 	{
// 		title: "title1",
// 		author: "author2",
// 		url: "url3",
// 		likes: 4,
// 		user: "bob1235"
// 	}
// ];

beforeEach(async () => {
	await test_helper.reset();
	await test_helper.registerNewUser();
});

test("renders content", async () => {
	render(<Blog blog={blogs[0]} loggedUser={loggedUser} />);
	screen.getByText(`${blogs[0].title} by ${blogs[0].author}`);
});

test("renders toggable content", async () => {
	const { container } = render(
		<Blog blog={blogs[0]} loggedUser={loggedUser} />
	);
	const user = userEvent.setup();
	const button = screen.getByRole("button");
	await user.click(button);
	screen.getByText("Url:");
	expect(container.getElementsByClassName("likes")).toBeDefined();
});

test.only("like button works", async () => {
	const mock = jest.fn();

	const { container } = render(
		<Blog
			blog={blogs[0]}
			loggedUser={loggedUser}
			blogs={blogs}
			setBlogs={mock}
		/>
	);

	const user = userEvent.setup();

	const button = screen.getByRole("button");
	await user.click(button);

	const like = container.querySelector("#like");
	await user.click(like);

	screen.debug();
});

// 	await user.click(like);

// 	expect(onClick.mock.calls).toHaveLength(2);
// });
