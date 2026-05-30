import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFamily } from "../hooks/useFamily";

const FamilyForm = () => {
  const { members, addMember, updateMember, editingMember, setEditingMember } =
    useFamily();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    fatherId: "",
    motherId: "",
  });

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name || "",
        gender: editingMember.gender || "",
        dob: editingMember.dob || "",
        fatherId: editingMember.fatherId || "",
        motherId: editingMember.motherId || "",
      });
    } else {
      setFormData({
        name: "",
        gender: "",
        dob: "",
        fatherId: "",
        motherId: "",
      });
    }
  }, [editingMember]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Same father and mother validation
    if (formData.fatherId && formData.fatherId === formData.motherId) {
      alert("Father and Mother cannot be same person");
      return;
    }

    // Self-parent validation
    if (
      editingMember &&
      (formData.fatherId === editingMember.id ||
        formData.motherId === editingMember.id)
    ) {
      alert("Member cannot be their own parent");
      return;
    }

    if (editingMember) {
      updateMember({
        ...editingMember,

        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,

        fatherId: formData.fatherId || null,

        motherId: formData.motherId || null,
      });
      setEditingMember(null);
    } else {
      const newMember = {
        id: uuidv4(),

        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,

        fatherId: formData.fatherId || null,

        motherId: formData.motherId || null,

        childrenIds: [],
      };

      addMember(newMember);
    }

    setFormData({
      name: "",
      gender: "",
      dob: "",
      fatherId: "",
      motherId: "",
    });
  };

  const maleMembers = members.filter(
    (member) => member.gender === "Male" && member.id !== editingMember?.id,
  );

  const femaleMembers = members.filter(
    (member) => member.gender === "Female" && member.id !== editingMember?.id,
  );

  return (
    <div>
      <h2 className="mb-5 underline text-lg font-semibold">Add Member Form</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Gender</option>

          <option value="Male">Male</option>

          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="fatherId"
          value={formData.fatherId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Father</option>

          {maleMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          name="motherId"
          value={formData.motherId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Mother</option>

          {femaleMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingMember ? "Update Member" : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default FamilyForm;
