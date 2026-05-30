import React, { useState } from "react";
import { useFamily } from "../hooks/useFamily";

const Searchbar = () => {
  const { members, setSelectedMember } = useFamily();
  const [q, setQ] = useState("");

  const doSearch = () => {
    const term = q.trim().toLowerCase();
    if (!term) return;
    const found = members.find(
      (m) => m.name && m.name.toLowerCase().includes(term),
    );
    if (found) {
      setSelectedMember(found);
    } else {
      alert("No member found");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && doSearch()}
        type="text"
        placeholder="Search name"
        className="border p-2 w-full"
      />
      <button onClick={doSearch} className="border p-2">
        Search
      </button>
    </div>
  );
};

export default Searchbar;
