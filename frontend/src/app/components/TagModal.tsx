import React, { useState } from "react";
import { TagInterface } from "../interfaces/tag";
import { UserInterface } from "../interfaces/user"; 

interface TagModalProps {
  onClose: () => void;
  onTagCreated: (newTag: TagInterface) => void;
  currentUser: UserInterface;
}

const TagModal: React.FC<TagModalProps> = ({ onClose, onTagCreated, currentUser }) => {
  const [tagName, setTagName] = useState("");

  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newTagData = {
      name: tagName,
      userId: currentUser.id,

    };


    const res = await fetch("http://localhost:3001/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTagData),
    });

    if (res.ok) {
      const createdTag: TagInterface = await res.json();

      onTagCreated(createdTag);
      onClose();
    } else {
      console.error("Error creating tag");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Create New Tag</h2>
        <form onSubmit={handleTagSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Create Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagModal;
