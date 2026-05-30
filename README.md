# Family Tree App

A React-based Family Tree Management Application that allows users to create, manage, and visualize family relationships. The application supports adding, editing, deleting, and viewing family members while maintaining consistent parent-child relationships throughout the family tree.

---

## Features

### Family Member Management

* Add new family members
* Edit existing member details
* Delete family members
* View detailed member information

### Relationship Management

* Assign father and mother relationships
* Automatically maintain parent-child connections
* Prevent invalid family relationships
* Track children and siblings

### Family Tree Visualization

* Hierarchical family tree structure
* Recursive tree rendering
* Root ancestor identification
* Interactive member selection

### Data Persistence

* Automatic save to Local Storage
* Data restored on page refresh
* No backend or database required

---

## Tech Stack

### Frontend

* React.js
* Context API
* React Hooks
* JavaScript (ES6+)
* CSS

### Storage

* Browser Local Storage

---

## Project Structure

```
src/
│
├── context/
│   ├── FamilyContext.jsx
│   └── useFamily.js
│
├── components/
│   ├── FamilyForm.jsx
│   ├── FamilyTree.jsx
│   ├── TreeNode.jsx
│   └── MemberDetails.jsx
│
├── App.jsx
└── main.jsx
```

---

## Data Model

Each family member contains:

```javascript
{
  id: "unique-id",
  name: "John Doe",
  gender: "Male",
  dob: "1990-01-01",
  fatherId: "father-id",
  motherId: "mother-id",
  childrenIds: []
}
```

### Relationship Structure

The application uses a dual relationship model:

#### Parent References

```javascript
fatherId
motherId
```

Used to find a member's parents quickly.

#### Child References

```javascript
childrenIds
```

Used to find all children of a member efficiently.

This ensures fast lookup in both directions.

---

## Application Flow

### Add Member

1. User fills member form.
2. Parent selection is optional.
3. New member object is created.
4. Member is added to the members list.
5. Child ID is automatically added to selected parents.
6. Family tree updates instantly.

---

### Edit Member

1. User selects a member.
2. Clicks Edit.
3. Form is pre-filled.
4. User updates information.
5. Parent-child relationships are recalculated.
6. Tree structure updates automatically.

---

### Delete Member

1. User selects a member.
2. Clicks Delete.
3. Member is removed.
4. References are cleaned from:

   * Parents
   * Children
   * Selected Member
   * Editing Member
5. Tree refreshes immediately.

---

## Validation Rules

### Parent Validation

* Father and Mother cannot be the same person.
* A member cannot be their own parent.
* Father dropdown only displays Male members.
* Mother dropdown only displays Female members.

### Data Integrity

* Parent-child relationships remain synchronized.
* Invalid references are automatically removed.

---

## State Management

The application uses React Context API for centralized state management.

### Context State

```javascript
members
selectedMember
editingMember
```

### Context Functions

```javascript
addMember()
updateMember()
deleteMember()
setSelectedMember()
setEditingMember()
```

---

## Local Storage Persistence

### Load Data

```javascript
useEffect(() => {
  const data = localStorage.getItem("familyTree");
}, []);
```

### Save Data

```javascript
useEffect(() => {
  localStorage.setItem(
    "familyTree",
    JSON.stringify(members)
  );
}, [members]);
```

---

## Tree Rendering Logic

### Root Members

Members without parents become root nodes.

```javascript
!member.fatherId && !member.motherId
```

### Recursive Rendering

Each TreeNode component:

1. Displays current member.
2. Finds children using childrenIds.
3. Recursively renders child nodes.

This creates a complete family hierarchy from ancestors to descendants.

---

## Learning Outcomes

This project demonstrates:

* React Context API
* Custom Hooks
* State Management
* Recursive Components
* CRUD Operations
* Data Relationships
* Local Storage Persistence
* Form Handling
* Data Validation
* Component Architecture

---

## Future Enhancements

* Backend Integration (Node.js + Express)
* MongoDB Database
* Authentication & Authorization
* Family Search Feature
* Relationship Analytics
* Family Tree Export (PDF/Image)
* Drag & Drop Tree Visualization
* Responsive Mobile Design

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Run Application

```bash
npm run dev
```

### Open Browser

```bash
http://localhost:5173
```

---

## Author
Vaishnavi Dayama
