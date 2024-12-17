import { Topic } from "@/types";

export interface Selection {
  topics: string[];
  dimensions: Record<string, string[]>;
}

export interface SidebarProps {
  topics: Topic[];
  onSelectionChange: (selection: Selection) => void;
}

export interface SidebarContentProps extends SidebarProps {
  onClose?: () => void;
}

export interface TreeNode {
  id: string;
  name: string;
  type: "topic" | "dimension";
  children?: TreeNode[];
}
