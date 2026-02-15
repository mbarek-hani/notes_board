import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

function LogoutButton() {
	function handleClick() {
		toast.success("you logged out!");
	}

	return (
		<div id="logout-btn" title="Log out">
			<LogOut onClick={handleClick} />
		</div>
	);
}

export default LogoutButton;
