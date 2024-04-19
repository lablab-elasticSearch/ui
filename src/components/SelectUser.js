import React, { useContext } from "react";
import { userData } from "../UserData";
import userContext from "../contexts/UserContext";

const SelectUser = () => {
  const { user, setUser } = useContext(userContext);

  const handleUserChange = (event) => {
    const selectedUserEmail = event.target.value;
    const selectedUser = userData.find((item) => item.user_email === selectedUserEmail);
    setUser(selectedUser);
  };

  return (
    <div className="relative">
      <select
        className="appearance-none h-10 cursor-pointer text-white bg-blue-950 text-sm px-4 pr-8 rounded-lg border-none shadow-sm"
        name="userSelect"
        id="userSelect"
        onChange={handleUserChange}
      >
        {userData.map((item, index) => (
          <option className="text-black bg-white" key={item.id} value={item.id}>
            {item.user_email}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.293 11.707a1 1 0 001.414 0L10 10.414l.293.293a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectUser;