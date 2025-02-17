import React, { useState, useEffect } from "react";
import { TaskInterface } from "../interfaces/task"; 
import { TagInterface } from "../interfaces/tag";  
import TagModal from "./TagModal";


const currentUser = {
  id: 1,
  username: "john_doe",
  email: "john@example.com",
  password: "password",
};

interface TaskModalProps {
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Completed">("To Do");


  const [availableTags, setAvailableTags] = useState<TagInterface[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);


  useEffect(() => {
    async function fetchTags() {
      const res = await fetch("http://localhost:3001/tags");
      if (res.ok) {
        const data: TagInterface[] = await res.json();
        setAvailableTags(data);
      }
    }
    fetchTags();
  }, []);


  const handleNewTag = (newTag: TagInterface) => {
    setAvailableTags((prev) => [...prev, newTag]);

    setSelectedTagIds((prev) => [...prev, newTag.id!]);
  };


  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    


    const taskData: TaskInterface = {
      title,
      description,
      status,
      dueDate: new Date(),
      tagIds: selectedTagIds,
      userId: currentUser.id,
   
    };

    console.log("taskData",taskData); 

   
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (res.ok) {

      onClose();
    } else {
      console.error("Error creating task");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
          <form onSubmit={handleTaskSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "To Do" | "In Progress" | "Completed")
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

         
            <div>
              <label className="block mb-2 font-medium">Select Tags:</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <label key={tag.id} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={tag.id}
                      checked={selectedTagIds.includes(tag.id!)}
                      onChange={(e) => {
                        const tagId = Number(e.target.value);
                        if (e.target.checked) {
                          setSelectedTagIds((prev) => [...prev, tagId]);
                        } else {
                          setSelectedTagIds((prev) =>
                            prev.filter((id) => id !== tagId)
                          );
                        }
                      }}
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsTagModalOpen(true)}
                className="mt-2 text-blue-500 underline"
              >
                + Add New Tag
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
   
      {isTagModalOpen && (
        <TagModal
          onClose={() => setIsTagModalOpen(false)}
          onTagCreated={handleNewTag}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default TaskModal;
