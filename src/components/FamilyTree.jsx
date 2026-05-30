import React from "react";
import { useFamily } from "../hooks/useFamily";
import TreeNode from "./TreeNode";

const FamilyTree = () => {
  const { members } = useFamily();
  console.log("Members in family tree:", members);

  const rootMembers = members.filter(
    (member) => !member.fatherId && !member.motherId,
  );

  return (
    <div>
      <h2 className="mb-5 underline text-lg font-semibold">Family Tree</h2>
      {rootMembers.map((member) => (
        <TreeNode key={member.id} member={member} />
      ))}
    </div>
  );
};

export default FamilyTree;
