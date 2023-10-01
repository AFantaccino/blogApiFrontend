import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import blogsReducer from "./reducers/blogsReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

import "./index.css";
import usersListReducer from "./reducers/usersListReducer";

const store = configureStore({
	reducer: {
		blogs: blogsReducer,
		notification: notificationReducer,
		user: userReducer,
		usersList: usersListReducer
	}
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
