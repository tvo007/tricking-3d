import React from "react";
import api from "../api/api";
import useApiCreds from "../hooks/useApiCreds";
import UserCard from "../components/UserCard";
import useLogout from "../hooks/useLogout";
import useRefreshToken from "../hooks/useRefreshToken";
import { useUserStore } from "../store/userStore";

function Dashboard() {
	const user = useUserStore((s) => s.user);
	const accessToken = useUserStore((s) => s.accessToken);
	const setAccessToken = useUserStore((s) => s.setAccessToken);
	const logout = useLogout();
	const apiPrivate = useApiCreds();
	const refresh = () => {
		api
			.get(
				"/refresh",
				{},
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)
			.then((response) => {
				setAccessToken(response.data.accessToken);
				console.log(response);
			})
			.catch((err) => console.log(err));
	};
	const getUsers = () => {
		apiPrivate
			.get(
				"/user",
				{ accessToken },
				{
					headers: { "Content-Type": "application/json" },
				}
			)
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
	};
	return (
		<div className='mt-14 flex flex-col place-content-center place-items-center gap-2 text-zinc-300'>
			Dashboard
			<div>Welcome {user}</div>
			<UserCard name={`Dylan James`} username={user} src='./mesquared.jpg' />
			<button className='absolute right-5 bottom-14' onClick={() => logout()}>
				Logout
			</button>
			<button onClick={() => refresh()}>RefreshToken</button>
			<button onClick={() => getUsers()}>GetUsersToken</button>
		</div>
	);
}

export default Dashboard;