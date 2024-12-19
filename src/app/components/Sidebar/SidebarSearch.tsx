"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SidebarSearchProps } from "./types";

export default function SidebarSearch({
  value,
  onChange,
  placeholder,
}: SidebarSearchProps) {
  return (
    <div className="p-6">
      <div className="relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5
                     text-slate-400 dark:text-blue-400/50"
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg
                    bg-slate-100 dark:bg-blue-900/10
                    border border-slate-200 dark:border-blue-600/20
                    text-slate-900 dark:text-blue-100
                    placeholder-slate-400 dark:placeholder-blue-400/50
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent"
        />
      </div>
    </div>
  );
}
