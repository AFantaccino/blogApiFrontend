import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);

	if (notification === null) {
		return null;
	}

	return <Alert severity={notification.type}>{notification.message}</Alert>;
};

export default Notification;
