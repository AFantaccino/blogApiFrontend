import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);

	if (notification === null) {
		return null;
	}

	return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
