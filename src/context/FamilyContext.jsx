import { createContext, useEffect, useState } from "react";

export const FamilyContext = createContext();

const FamilyProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("familyTree");

    if (storedData) {
      setMembers(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("familyTree", JSON.stringify(members));
  }, [members]);

  const addMember = (newMember) => {
    setMembers((prevMembers) => {
      let updatedMembers = [...prevMembers];

      if (newMember.fatherId) {
        updatedMembers = updatedMembers.map((member) =>
          member.id === newMember.fatherId
            ? {
                ...member,
                childrenIds: [...(member.childrenIds || []), newMember.id],
              }
            : member,
        );
      }

      if (newMember.motherId) {
        updatedMembers = updatedMembers.map((member) =>
          member.id === newMember.motherId
            ? {
                ...member,
                childrenIds: [...(member.childrenIds || []), newMember.id],
              }
            : member,
        );
      }

      return [...updatedMembers, newMember];
    });
  };

  const deleteMember = (memberId) => {
    setMembers((prevMembers) =>
      prevMembers
        .filter((member) => member.id !== memberId)
        .map((member) => ({
          ...member,
          fatherId: member.fatherId === memberId ? null : member.fatherId,
          motherId: member.motherId === memberId ? null : member.motherId,
          childrenIds: (member.childrenIds || []).filter(
            (childId) => childId !== memberId,
          ),
        })),
    );

    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
    }

    if (editingMember?.id === memberId) {
      setEditingMember(null);
    }
  };

  const updateMember = (updatedMember) => {
    setMembers((prevMembers) => {
      const oldMember = prevMembers.find(
        (member) => member.id === updatedMember.id,
      );

      let updatedMembers = [...prevMembers];
      // HANDLE FATHER CHANGE
      if (oldMember.fatherId !== updatedMember.fatherId) {
        // Remove from old father
        if (oldMember.fatherId) {
          updatedMembers = updatedMembers.map((member) =>
            member.id === oldMember.fatherId
              ? {
                  ...member,
                  childrenIds: (member.childrenIds || []).filter(
                    (childId) => childId !== updatedMember.id,
                  ),
                }
              : member,
          );
        }

        // Add to new father
        if (updatedMember.fatherId) {
          updatedMembers = updatedMembers.map((member) =>
            member.id === updatedMember.fatherId
              ? {
                  ...member,
                  childrenIds: (member.childrenIds || []).includes(
                    updatedMember.id,
                  )
                    ? member.childrenIds
                    : [...(member.childrenIds || []), updatedMember.id],
                }
              : member,
          );
        }
      }

      // HANDLE MOTHER CHANGE
      if (oldMember.motherId !== updatedMember.motherId) {
        // Remove from old mother
        if (oldMember.motherId) {
          updatedMembers = updatedMembers.map((member) =>
            member.id === oldMember.motherId
              ? {
                  ...member,
                  childrenIds: (member.childrenIds || []).filter(
                    (childId) => childId !== updatedMember.id,
                  ),
                }
              : member,
          );
        }

        // Add to new mother
        if (updatedMember.motherId) {
          updatedMembers = updatedMembers.map((member) =>
            member.id === updatedMember.motherId
              ? {
                  ...member,
                  childrenIds: (member.childrenIds || []).includes(
                    updatedMember.id,
                  )
                    ? member.childrenIds
                    : [...(member.childrenIds || []), updatedMember.id],
                }
              : member,
          );
        }
      }

      // UPDATE MEMBER
      updatedMembers = updatedMembers.map((member) =>
        member.id === updatedMember.id
          ? {
              ...member,
              ...updatedMember,
            }
          : member,
      );

      return updatedMembers;
    });

    setEditingMember(null);

    if (selectedMember?.id === updatedMember.id) {
      setSelectedMember(updatedMember);
    }
  };

  return (
    <FamilyContext.Provider
      value={{
        members,
        setMembers,
        selectedMember,
        setSelectedMember,
        editingMember,
        setEditingMember,
        addMember,
        deleteMember,
        updateMember,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export default FamilyProvider;
