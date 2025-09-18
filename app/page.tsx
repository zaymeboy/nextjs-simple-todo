'use client';
import TodoItem from "@/components/TodoItem";
import Popup from "@/components/Popup";
import { useState, useEffect, use } from "react";
import { title } from "process";
import Loading from "@/components/Loading/loading";

type Task = {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {

  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAdd() {
    if (!newTask) {
      alert("Please enter task!");
      return;
    }
    setIsLoading(prev => !prev);
    const res = await fetch("/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    const data = await res.json();
    console.log("Added:", data);
    setNewTask("");
    setFetchTrigger(prev => !prev);
    setIsLoading(prev => !prev);
  }

  function editCliked(id: number, title: string) {
    setOpen(true);
    setTaskId(id);
    setTask(title);
  }

  async function handleEdit() {
    setIsLoading(prev => !prev);
    const res = await fetch("/api/v1/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, title: task }),
    });
    if (res.ok) {
      setFetchTrigger(prev => !prev)
      setOpen(false);
      setIsLoading(prev => !prev);
    } else {
      alert("Edit task failed")
    }
  }


  async function handleDelete(id: number) {
    setIsLoading(prev => !prev);
    const res = await fetch("/api/v1/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    if (res.ok) {
      setFetchTrigger(prev => !prev)
      setIsLoading(prev => !prev);
    } else {
      alert("Delete task failed")
    }
  }

  useEffect(() => {
    async function getTask() {
      const res = await fetch("api/v1/tasks");
      const data = await res.json();
      setTasks(data);
      console.table(data)
    }
    getTask();
  }, [fetchTrigger]);

  async function handleChecked(id: number, completed: boolean) {
    setIsLoading(prev => !prev);
    const res = await fetch("/api/v1/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed, id: id }),
    });
    if (res.ok) {
      setFetchTrigger(prev => !prev)
      setIsLoading(prev => !prev);
    } else {
      alert("Checked task failed")
    }
  }

  return (
    <>
      <div className="w-screen bg-white p-5 text-center rounded-3xl">
        <h1 className="pb-5">TODO LIST</h1>
        <div className="w-full border-1 border-neutral-300 rounded-2xl p-5 flex flex-col gap-10">
          <div className="flex justify-between items-center gap-2">
            <input type="text" placeholder="task" value={newTask} onChange={(e) => setNewTask(e.target.value)}
              className="border-1 border-neutral-300 rounded py-2 px-4 w-full" />
            <button onClick={handleAdd} className="bg-black text-white py-2 px-4 rounded">Add</button>
          </div>
          <div className="flex flex-col gap-2">

            {tasks.map(task => (
              <TodoItem key={task.id} text={task.title} isDone={task.completed} onChecked={() => handleChecked(task.id, task.completed)} editClicked={() => editCliked(task.id, task.title)} deleteClicked={() => handleDelete(task.id)} />
            ))}
          </div>
        </div>
        <Popup isOpen={open} value={task} onChange={(e) => setTask(e.target.value)} actionEdit={() => handleEdit()} actionClose={() => setOpen(false)} />
        <Loading show={isLoading} />
      </div>
    </>
  );
}
