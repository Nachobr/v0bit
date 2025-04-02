import { ExternalLink, MessageSquare, ThumbsUp, Twitter } from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock data for the X-generated apps
const appData = [
  {
    id: "1",
    timestamp: "2025-04-02T10:30:00Z",
    tweetUrl: "https://x.com/user1/status/123456789",
    tweetAuthor: {
      name: "Sarah Johnson",
      handle: "@sarahjdev",
      avatar: "/placeholder.svg?height=40&width=40",
      fallback: "SJ",
    },
    tweetContent:
      "Can someone build me a personal finance tracker that shows spending patterns and budget alerts? #AppRequest",
    prompt: "Create a personal finance tracker with spending pattern visualization and budget alerts",
    appUrl: "https://finance-tracker-example.vercel.app",
    status: "completed",
    likes: 42,
    replies: 12,
  },
  {
    id: "2",
    timestamp: "2025-04-01T15:45:00Z",
    tweetUrl: "https://x.com/user2/status/987654321",
    tweetAuthor: {
      name: "Alex Chen",
      handle: "@alexctech",
      avatar: "/placeholder.svg?height=40&width=40",
      fallback: "AC",
    },
    tweetContent:
      "Looking for a workout planner that can generate routines based on available equipment and time constraints #BuildThis",
    prompt: "Build a workout planner app that generates routines based on available equipment and time constraints",
    appUrl: "https://workout-planner-example.vercel.app",
    status: "completed",
    likes: 78,
    replies: 23,
  },
  {
    id: "3",
    timestamp: "2025-03-30T09:15:00Z",
    tweetUrl: "https://x.com/user3/status/456789123",
    tweetAuthor: {
      name: "Maya Patel",
      handle: "@mayacodes",
      avatar: "/placeholder.svg?height=40&width=40",
      fallback: "MP",
    },
    tweetContent:
      "Need a recipe finder that filters by dietary restrictions and available ingredients in my pantry #AppIdea",
    prompt: "Create a recipe finder app that filters by dietary restrictions and available ingredients",
    appUrl: "https://recipe-finder-example.vercel.app",
    status: "processing",
    likes: 56,
    replies: 18,
  },
  {
    id: "4",
    timestamp: "2025-03-28T14:20:00Z",
    tweetUrl: "https://x.com/user4/status/789123456",
    tweetAuthor: {
      name: "Jordan Lee",
      handle: "@jordandev",
      avatar: "/placeholder.svg?height=40&width=40",
      fallback: "JL",
    },
    tweetContent:
      "Can someone make a language learning flashcard app with spaced repetition and pronunciation practice? #AppRequest",
    prompt: "Build a language learning flashcard app with spaced repetition and pronunciation practice",
    appUrl: "",
    status: "failed",
    likes: 34,
    replies: 9,
  },
]

export default function AppFeed() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {appData.map((app) => (
        <Card key={app.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={app.tweetAuthor.avatar} alt={app.tweetAuthor.name} />
                  <AvatarFallback>{app.tweetAuthor.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{app.tweetAuthor.name}</CardTitle>
                    <span className="text-sm text-muted-foreground">{app.tweetAuthor.handle}</span>
                  </div>
                  <CardDescription>{formatDate(app.timestamp)}</CardDescription>
                </div>
              </div>
              <Badge
                variant={
                  app.status === "completed" ? "default" : app.status === "processing" ? "outline" : "destructive"
                }
              >
                {app.status === "completed" ? "Deployed" : app.status === "processing" ? "Processing" : "Failed"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="flex items-start gap-2">
                  <Twitter className="h-4 w-4 mt-1 text-blue-500" />
                  <p className="text-sm">{app.tweetContent}</p>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{app.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{app.replies}</span>
                  </div>
                  <a
                    href={app.tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline ml-auto flex items-center gap-1"
                  >
                    View Tweet <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <Collapsible>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Generated App Details</p>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2">
                  <div className="rounded-md border p-3 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Prompt</p>
                      <p className="text-sm">{app.prompt}</p>
                    </div>
                    {app.status === "completed" && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Preview</p>
                        <div className="relative h-40 w-full overflow-hidden rounded-md border">
                          <Image
                            src="/placeholder.svg?height=400&width=800"
                            alt="App preview"
                            width={800}
                            height={400}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
          <CardFooter>
            {app.status === "completed" ? (
              <a href={app.appUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full">
                  View App <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Button>
              </a>
            ) : app.status === "processing" ? (
              <Button disabled className="w-full">
                Processing...
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                View Error Details
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

