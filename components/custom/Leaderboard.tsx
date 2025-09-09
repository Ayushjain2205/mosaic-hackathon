"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown, ChevronUp, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  avatar?: string
  isCurrentUser?: boolean
  rank: number
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  courseTitle: string
}

export function Leaderboard({ entries, courseTitle }: LeaderboardProps) {
  const [expanded, setExpanded] = useState(false)

  // Sort entries by points (descending)
  const sortedEntries = [...entries].sort((a, b) => b.points - a.points)

  // Display only top 5 if not expanded
  const displayEntries = expanded ? sortedEntries : sortedEntries.slice(0, 5)

  // Find current user's position if not in top 5
  const currentUserEntry = sortedEntries.find((entry) => entry.isCurrentUser)
  const showCurrentUserSeparately = currentUserEntry && !expanded && !displayEntries.includes(currentUserEntry)

  return (
    <Card className="border-2 border-primary/20 shadow-md overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            <CardTitle className="text-lg font-heading">Course Leaderboard</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground font-body">{courseTitle}</div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          {displayEntries.map((entry, index) => (
            <LeaderboardRow key={entry.id} entry={entry} />
          ))}

          {/* Show current user separately if not in top 5 and not expanded */}
          {showCurrentUserSeparately && (
            <>
              <div className="flex justify-center my-2">
                <div className="border-t border-dashed border-primary/20 w-16"></div>
              </div>
              <LeaderboardRow entry={currentUserEntry} />
            </>
          )}
        </div>

        {entries.length > 5 && (
          <Button
            variant="ghost"
            className="w-full mt-4 text-primary hover:text-primary/80 hover:bg-primary/5"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <span className="flex items-center">
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </span>
            ) : (
              <span className="flex items-center">
                Show More <ChevronDown className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  // Determine rank icon
  let RankIcon = null
  let rankColor = ""

  if (entry.rank === 1) {
    RankIcon = Crown
    rankColor = "text-yellow-500"
  } else if (entry.rank === 2) {
    RankIcon = Medal
    rankColor = "text-gray-400"
  } else if (entry.rank === 3) {
    RankIcon = Award
    rankColor = "text-amber-700"
  }

  return (
    <motion.div
      className={cn(
        "flex items-center justify-between p-2 rounded-lg transition-colors",
        entry.isCurrentUser ? "bg-primary/5 border border-primary/20" : "hover:bg-gray-50",
      )}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center">
        <div className="w-8 text-center font-bold font-heading">
          {RankIcon ? (
            <RankIcon className={cn("h-5 w-5", rankColor)} fill="currentColor" />
          ) : (
            <span className="text-muted-foreground">{entry.rank}</span>
          )}
        </div>

        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src={entry.avatar} alt={entry.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {entry.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="ml-3 font-body">
          <div className="font-medium">
            {entry.name} {entry.isCurrentUser && <span className="text-xs text-primary">(You)</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="font-bold text-primary font-heading">{entry.points} XP</div>
      </div>
    </motion.div>
  )
}

