import React from "react";
import { useFamily } from "../hooks/useFamily";

const TreeNode = ({ member }) => {
  const { members, setSelectedMember } = useFamily();
  const children = members.filter((m) =>
    (member.childrenIds || []).includes(m.id),
  );

  return (
    <div className="ml-6 border-2 p-4">
      <button onClick={() => setSelectedMember(member)}>{member.name}</button>
      {children.map((child) => (
        <TreeNode key={child.id} member={child} />
      ))}
    </div>
  );
};

export default TreeNode;
