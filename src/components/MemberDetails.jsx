import React from "react";
import { useFamily } from "../hooks/useFamily";

const MemberDetails = () => {
  const { selectedMember, members, deleteMember, setEditingMember } =
    useFamily();

  if (!selectedMember) {
    return (
      <p className="mb-5 underline text-lg font-semibold">
        Click member to view details
      </p>
    );
  }

  const father = members.find(
    (member) => member.id === selectedMember.fatherId,
  );

  const mother = members.find(
    (member) => member.id === selectedMember.motherId,
  );

  const children = members.filter((member) =>
    (selectedMember.childrenIds || []).includes(member.id),
  );

  const siblings = members.filter(
    (member) =>
      member.id !== selectedMember.id &&
      (member.fatherId === selectedMember.fatherId ||
        member.motherId === selectedMember.motherId),
  );

  const handleDelete = () => {
    const confirmed = window.confirm("Delete this member?");

    if (confirmed) {
      deleteMember(selectedMember.id);
    }
  };

  const handleEdit = () => {};

  return (
    <div>
      <h2 className="mb-5 underline text-lg font-semibold">Member Details</h2>
      <p>
        <strong>Name:</strong>
        {selectedMember.name}
      </p>

      <p>
        <strong>Gender:</strong>
        {selectedMember.gender}
      </p>

      <p>
        <strong>DOB:</strong>
        {selectedMember.dob || "N/A"}
      </p>

      <p>
        <strong>Father:</strong>
        {father ? father.name : "N/A"}
      </p>

      <p>
        <strong>Mother:</strong>
        {mother ? mother.name : "N/A"}
      </p>

      <div>
        <strong>Children:</strong>

        {children.length > 0 ? (
          <ul>
            {children.map((child) => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
        ) : (
          <p>No Children</p>
        )}
      </div>

      <div>
        <strong>Siblings:</strong>

        {siblings.length > 0 ? (
          <ul>
            {siblings.map((sibling) => (
              <li key={sibling.id}>{sibling.name}</li>
            ))}
          </ul>
        ) : (
          <p>No Siblings</p>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setEditingMember(selectedMember)}
          className="bg-yellow-500 text-white px-3 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MemberDetails;
