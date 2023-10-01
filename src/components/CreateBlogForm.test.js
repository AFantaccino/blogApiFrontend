import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";
import loginService from "../services/login";

test("can create a new blog", async () => {
	const { container } = render(<CreateBlogForm />);

	window.localStorage.setItem(
		"token",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0ZXZvbjMxMjMxIiwiaWQiOiI2NGVhMjliNzQ3NGU4OGY3ODQwOGQzNDMiLCJpYXQiOjE2OTM0MDk2NzEsImV4cCI6MTY5MzQxMzI3MX0.VprYCOctIncnQxDgc0D3wMO84dGPBkVkjlaqeCWNmTo"
	);

	const user = userEvent.setup();

	const title = container.querySelector("#title");
	await user.type(title, "title1");

	const author = container.querySelector("#author");
	await user.type(author, "author2");

	const url = container.querySelector("#url");
	await user.type(url, "url3");

	const submit = screen.getByText("Create");

	await user.click(submit);
}, 50000);
