import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SidebarLogoProps {
  onClose?: () => void;
}

export default function SidebarLogo({ onClose }: SidebarLogoProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-blue-600/20">
      <div className="p-4 lg:p-6 flex justify-center">
        <div className="flex items-center gap-4 max-w-[280px]">
          {/* Text block */}
          <div className="flex flex-col flex-1 min-w-0">
            <h1
              className="text-xl lg:text-2xl font-extrabold uppercase truncate
                         bg-gradient-to-r from-blue-600 to-yellow-500
                         dark:from-sky-500 dark:to-yellow-500
                         text-transparent bg-clip-text
                         drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]
                         dark:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
            >
              OpenTelemetry
            </h1>
            <span
              className="font-teko font-bold text-xl tracking-wider truncate
                        text-slate-900 dark:text-white
                        drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]
                        dark:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
            >
              Technology Radar
            </span>
          </div>

          {/* Radar Animation */}
          <div className="flex-shrink-0 w-12 aspect-square relative">
            <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 dark:border-blue-500/50" />
            <div className="absolute inset-0">
              {[0.2, 0.4, 0.6, 0.8].map((scale) => (
                <div
                  key={scale}
                  className="absolute inset-0 rounded-full
                             border border-blue-400/20 dark:border-blue-500/20"
                  style={{ transform: `scale(${scale})` }}
                />
              ))}
            </div>
            <div className="absolute inset-0 origin-center overflow-hidden rounded-full">
              <div
                className="absolute h-1/2 w-1/2 origin-bottom-right animate-radar-sweep"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 50%, rgba(59, 130, 246, 0.3))",
                  clipPath:
                    "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)",
                  right: "50%",
                  bottom: "50%",
                }}
              />
            </div>
            <div className="absolute inset-0">
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px
                             bg-blue-400/20 dark:bg-blue-500/20
                             transform -translate-x-1/2"
              />
              <div
                className="absolute top-1/2 left-0 right-0 h-px
                             bg-blue-400/20 dark:bg-blue-500/20
                             transform -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 mr-4 rounded-lg
                     hover:bg-slate-100 dark:hover:bg-blue-900/20
                     transition-colors"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="w-6 h-6 text-slate-400 dark:text-blue-400"
          />
        </button>
      )}
    </div>
  );
}
