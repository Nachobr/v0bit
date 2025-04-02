import { RefreshCw, Rocket, Twitter } from "lucide-react"

import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "idle" | "processing" | "refining" | "deploying"
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {status === "idle" ? (
        <span className="text-muted-foreground">Waiting for X comments</span>
      ) : (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1.5",
              status === "processing" && "text-blue-500 dark:text-blue-400",
              status === "refining" && "text-yellow-500 dark:text-yellow-400",
              status === "deploying" && "text-green-500 dark:text-green-400",
            )}
          >
            {status === "processing" && (
              <>
                <Twitter className="h-4 w-4 animate-pulse" />
                Processing X comment...
              </>
            )}
            {status === "refining" && (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Refining prompt from tweet...
              </>
            )}
            {status === "deploying" && (
              <>
                <Rocket className="h-4 w-4 animate-pulse" />
                Deploying to Vercel...
              </>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

