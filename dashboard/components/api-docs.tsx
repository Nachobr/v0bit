"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiDocs() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const requestExample = `fetch('https://api.xappgenerator.com/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    tweetUrl: 'https://x.com/username/status/123456789',
    options: {
      framework: 'next',
      styling: 'tailwind',
      features: ['auth', 'darkMode']
    }
  })
})`

  const responseExample = `{
  "id": "gen_123456789",
  "status": "processing",
  "tweetId": "123456789",
  "estimatedTime": "2 minutes",
  "webhook": "https://api.xappgenerator.com/webhook/gen_123456789"
}`

  const webhookExample = `{
  "id": "gen_123456789",
  "status": "completed",
  "tweetId": "123456789",
  "tweetUrl": "https://x.com/username/status/123456789",
  "deploymentUrl": "https://your-app-name.vercel.app",
  "repositoryUrl": "https://github.com/your-username/your-app-name",
  "completedAt": "2025-04-02T12:34:56Z"
}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>X Integration API</CardTitle>
        <CardDescription>Generate apps directly from X (Twitter) comments using our REST API.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Endpoints</h3>
            <div className="mt-2 rounded-md bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm font-bold text-green-600 dark:text-green-400">POST</span>{" "}
                  <span className="font-mono text-sm">/generate</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleCopy("https://api.xappgenerator.com/generate")}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Generate a new app based on a prompt and options.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Parameters</h3>
            <div className="mt-2 space-y-4">
              <div className="grid grid-cols-3 gap-4 rounded-md bg-muted p-4">
                <div className="col-span-1">
                  <span className="font-mono text-sm">tweetUrl</span>
                  <p className="text-xs text-muted-foreground">string, required</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm">The URL of the tweet containing the app request.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 rounded-md bg-muted p-4">
                <div className="col-span-1">
                  <span className="font-mono text-sm">options</span>
                  <p className="text-xs text-muted-foreground">object, optional</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm">Additional options for the generation process.</p>
                  <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                    <li>framework: "next" | "react" | "vue" (default: "next")</li>
                    <li>styling: "tailwind" | "css" | "scss" (default: "tailwind")</li>
                    <li>features: string[] - Additional features to include</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 rounded-md bg-muted p-4">
                <div className="col-span-1">
                  <span className="font-mono text-sm">webhookUrl</span>
                  <p className="text-xs text-muted-foreground">string, optional</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm">A URL to receive notifications when the app generation is complete.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Examples</h3>
            <Tabs defaultValue="request" className="mt-2">
              <TabsList>
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="webhook">Webhook</TabsTrigger>
              </TabsList>
              <TabsContent value="request">
                <div className="relative rounded-md bg-muted p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(requestExample)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-x-auto">{requestExample}</pre>
                </div>
              </TabsContent>
              <TabsContent value="response">
                <div className="relative rounded-md bg-muted p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(responseExample)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-x-auto">{responseExample}</pre>
                </div>
              </TabsContent>
              <TabsContent value="webhook">
                <div className="relative rounded-md bg-muted p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(webhookExample)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-x-auto">{webhookExample}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

