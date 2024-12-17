import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SidebarLogo from "./SidebarLogo";

interface SidebarHeaderProps {
  onClose?: () => void;
}

export default function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-blue-600/20">
      <SidebarLogo />
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-blue-900/20 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6 text-blue-400" />
        </button>
      )}
    </div>
  );
}
