import { Topic } from "@/types";

export interface SidebarProps {
  topics: Topic[];
  onSelectionChange: (conceptId: string | null, searchQuery?: string) => void;
}

export interface SidebarSearchProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export interface SidebarContentProps {
  topics: Topic[];
  onSelectionChange: (conceptId: string | null, searchQuery?: string) => void;
  onClose?: () => void;
}
