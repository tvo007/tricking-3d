import useGetAllUsers from "api/useGetAllUsers";
import Link from "next/link";
import React from "react";
import { trpc } from "utils/trpc";

const UserList = () => {
  // const { data: users } = useGetAllUsers();
  const { data: users } = trpc.userDB.findAll.useQuery();
  console.log(users);
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <div className="p-1">Users by SessionSummaries</div>
      <div className="flex flex-col gap-2">
        {users &&
          users
            ?.sort((a, b) =>
              a?.sessionSummaries.length > b?.sessionSummaries.length ? -1 : 1
            )
            .map((user) => (
              <Link
                key={user.uuid}
                href={`/userProfile/${user.uuid}`}
                className="flex justify-between rounded-md bg-zinc-900 p-1"
              >
                <img
                  src={
                    !user.profilePic
                      ? `/images/noimg.jpeg`
                      : `/images/${user.uuid}/${user.profilePic}`
                  }
                  alt={"profilePic"}
                  className={"h-6 w-6 rounded-full"}
                />
                <div className="rounded-md  p-1">{user.username}</div>
                <div className="rounded-md  p-1">
                  {user?.sessionSummaries?.length +
                    user?.SessionSummaries?.length}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default UserList;
