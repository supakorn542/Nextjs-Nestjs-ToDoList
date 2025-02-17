"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Image from "next/image";
import TaskModal from "@/app/components/TaskModal";
import { TaskInterface } from "@/app/interfaces/task";

const mockTasks = [
  {
    id: 1,
    title: "Implement Authentication",
    description: "Set up authentication using Firebase",
    status: "To Do",
    date: "28/02/2024",
  },
  {
    id: 2,
    title: "Design Landing Page",
    description: "Create a responsive UI for the homepage",
    status: "In Progress",
    date: "28/02/2024",
  },
  {
    id: 3,
    title: "Optimize Database Queries",
    description: "Improve SQL queries for better performance",
    status: "Completed",
    date: "28/02/2024",
  },
  {
    id: 4,
    title: "Write Unit Tests",
    description: "Ensure components have proper test coverage",
    status: "To Do",
    date: "28/02/2024",
  },
  {
    id: 5,
    title: "Integrate Payment Gateway",
    description: "Implement Stripe for handling payments",
    status: "In Progress",
    date: "28/02/2024",
  },
];

export default function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const toDoTask = tasks.filter((t) => t.status === "To Do");
  const inProgressTask = tasks.filter((t) => t.status === "In Progress");
  const completedTask = tasks.filter((t) => t.status === "Completed");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3001/tasks"); 
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full min-h-screen flex bg-[#ffffff]">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl">My Todo</h1>
            <div className="flex gap-4">
              <button 
                onClick={openModal}
              className="flex py-2 px-4 bg-black text-white rounded-lg gap-1">
                {" "}
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "inline-block" }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 7V11H8V13H12V17H14V13H18V11H14V7H12Z" />
                </svg>
                New Task
              </button>
              <Image
                src="/user.png"
                alt="User Profile"
                width={40}
                height={30}
                className="border-2 border-black rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <input
              className="border-2 py-1 px-3 rounded-xl"
              type="text"
              placeholder="Search"
            />
            <div className="flex gap-5">
              <input
                className="border-2 py-1 px-3 rounded-xl"
                type="date"
                placeholder="From"
              />
              <input
                className="border-2 py-1 px-3 rounded-xl"
                type="date"
                placeholder="To"
              />
            </div>
          </div>
          <div className="flex mt-5 gap-2">
            <div className="flex-1">
              <h2 className="text-lg px-5">To Do</h2>
              <div className="w-full  bg-[#F2F6FF] rounded-lg">
                <div className="w-full  p-5 space-y-3">
                  {toDoTask.map((task, index) => (
                    <div
                      key={index}
                      className=" bg-white border-2 p-2 rounded-lg"
                    >
                      <h2 className="font-bold text-lg ">{task.title}</h2>
                      <p className="text-[#9D9D9F]">{task.description}</p>
                      <p className="text-[#9D9D9F]">  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <button 
                  onClick={openModal}
                  className="border-2 w-full rounded-lg py-1 text-lg">
                    Add Now
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg px-5">In Progress</h2>
              <div className="w-full  bg-[#F2F6FF] rounded-lg">
                <div className="w-full  p-5 space-y-3">
                  {inProgressTask.map((task, index) => (
                    <div
                      key={index}
                      className=" bg-white border-2 p-2 rounded-lg"
                    >
                      <h2 className="font-bold text-lg ">{task.title}</h2>
                      <p className="text-[#9D9D9F]">{task.description}</p>
                      <p className="text-[#9D9D9F]">  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg px-5">Completed</h2>
              <div className="w-full  bg-[#F2F6FF] rounded-lg">
                <div className="w-full  p-5 space-y-3">
                  {completedTask.map((task, index) => (
                    <div
                      key={index}
                      className=" bg-white border-2 p-2 rounded-lg"
                    >
                      <h2 className="font-bold text-lg ">{task.title}</h2>
                      <p className="text-[#9D9D9F]">{task.description}</p>
                      <p className="text-[#9D9D9F]">  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <TaskModal onClose={closeModal} />}
    </>
  );
}
