import { useState } from "react";

const useTargetRoles = (initialRoles = []) => {
  const [roles, setRoles] = useState(initialRoles);
  const [currentInput, setCurrentInput] = useState("");

  const addRole = () => {
    const role = currentInput.trim();
    if (role && !roles.includes(role)) {
      setRoles([...roles, role]);
      setCurrentInput("");
    }
  };

  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((r) => r !== roleToRemove));
  };

  return {
    roles,
    setRoles,
    currentInput,
    setCurrentInput,
    addRole,
    removeRole,
  };
};

export default useTargetRoles;