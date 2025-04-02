"use client"

import { useState } from "react"
import { Bot, Code, Info, Lightbulb, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import AppFeed from "./app-feed"
import ApiDocs from "./api-docs"
import QuickStart from "./quick-start"
import StatusIndicator from "./status-indicator"

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [currentStatus, setCurrentStatus] = useState<"idle" | "processing" | "refining" | "deploying">("idle")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden w-64 border-r bg-muted/40 p-6 md:block">
          <div className="flex items-center gap-2 mb-8">
            <Bot className="h-6 w-6" />
            <h1 className="text-xl font-bold">X App Generator</h1>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#feed">
                <Bot className="mr-2 h-4 w-4" />
                App Feed
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#quickstart">
                <Lightbulb className="mr-2 h-4 w-4" />
                Quick Start
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#api">
                <Code className="mr-2 h-4 w-4" />
                API Docs
              </a>
            </Button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1 md:hidden">
              <Bot className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Info className="mr-2 h-4 w-4" />
                Help
              </Button>
            </div>
          </header>

          <main className="container mx-auto p-6">
            <section id="feed" className="space-y-6 mb-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight">X-Generated Apps</h2>
                <p className="text-muted-foreground">Browse apps generated from X (Twitter) comments.</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search apps or posts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Deployed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <StatusIndicator status={currentStatus} />
                <Button variant="outline" size="sm">
                  Refresh Feed
                </Button>
              </div>

              <AppFeed />
            </section>

            <section id="quickstart" className="space-y-6 mb-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight">Quick Start</h2>
                <p className="text-muted-foreground">Get started with X App Generator.</p>
              </div>
              <QuickStart setPrompt={setPrompt} />
            </section>

            <section id="api" className="space-y-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight">API Documentation</h2>
                <p className="text-muted-foreground">Learn how to integrate with our X App Generator API.</p>
              </div>
              <ApiDocs />
            </section>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

