import {
  Home,
  Folder,
  Star,
  Archive,
  Trash,
  Tag,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Settings2,
  UserCircle2,
  LogOut,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import TagTodo from "./tags/TagTodo";
import { useAuth } from "../context/AuthContext";


export default function Sidebar({ currentSection, setCurrentSection, }) {
  const { user, logout } = useAuth();
  const menuItems = [
    { name: "Notes", icon: Home },
    // { name: "Files", icon: Folder },
    { name: "Favorites", icon: Star },
    { name: "Archive", icon: Archive },
    { name: "Trash", icon: Trash },
  ];


  return (
    <aside className="flex h-screen w-52 flex-col border-r border-zinc-200 bg-zinc-50 px-3 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h1 className="mb-4 px-2 text-xl font-bold text-zinc-900 dark:text-white">
        My Notes
      </h1>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentSection === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setCurrentSection(item.name)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition
                ${active
                  ? "bg-zinc-300 text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
            >
              <Icon size={16} />
              {item.name}
            </button>
          );
        })}

        <TagTodo />


      </nav>

      <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800">
        {/* Profile */}
        <div className="mb-4 flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {user.name?.split(" ").map((part) => part[0]).join("").toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
              {user.name}
            </p>

            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
        </div>

        {/* Settings */}
        {/* <button className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <Settings size={16} />
          Settings
        </button> */}

        <ThemeToggle />

        {/* Logout */}
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-950"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* <div className="flex gap-1 mt-2">
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
        </div> */}
    </aside>
  );
}