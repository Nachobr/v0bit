"use client"

import type { Dispatch, SetStateAction } from "react"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface QuickStartProps {
  setPrompt: Dispatch<SetStateAction<string>>
}

const examplePrompts = [
  {
    title: "Tweet Syntax",
    description: "How to request an app in a tweet",
    prompt:
      "To generate an app from X, tweet your app idea with #AppRequest or #BuildThis hashtag. Our bot will reply with a link when it's ready.",
  },
  {
    title: "App Request",
    description: "Example tweet for requesting an app",
    prompt:
      "Can someone build me a personal finance tracker that shows spending patterns and budget alerts? #AppRequest",
  },
  {
    title: "Integration",
    description: "How to integrate with your account",
    prompt:
      "Connect your X account to our service to automatically deploy apps generated from your tweets. Visit settings to authorize access.",
  },
  {
    title: "API Usage",
    description: "Using the API directly",
    prompt:
      "Use our API to programmatically generate apps from X comments. Check the API docs for authentication and endpoint details.",
  },
]

export default function QuickStart({ setPrompt }: QuickStartProps) {
  const { toast } = useToast()

  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleUse = (prompt: string) => {
    // For informational cards, just copy to clipboard
    handleCopy(prompt)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {examplePrompts.map((example) => (
        <Card key={example.title}>
          <CardHeader>
            <CardTitle>{example.title}</CardTitle>
            <CardDescription>{example.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">{example.prompt}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => handleCopy(example.prompt)}>
              <Copy className="mr-2 h-3 w-3" />
              Copy
            </Button>
            <Button size="sm" onClick={() => handleUse(example.prompt)}>
              Use
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

