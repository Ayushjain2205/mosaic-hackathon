"use client"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  avatar?: string
  isCurrentUser?: boolean
  rank: number
}

interface LeaderboardButtonProps {
  entries: LeaderboardEntry[]
  courseTitle: string
  userRank: number
}

export function LeaderboardButton({ entries, courseTitle, userRank }: LeaderboardButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span>Rank #{userRank}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Course Leaderboard
            <span className="text-sm font-normal text-muted-foreground ml-2">{courseTitle}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {entries.map((entry) => (
            <LeaderboardRow key={entry.id} entry={entry} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
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
    <div
      className={cn(
        "flex items-center justify-between p-2 rounded-lg transition-colors",
        entry.isCurrentUser ? "bg-primary/5 border border-primary/20" : "hover:bg-gray-50",
      )}
    >
      <div className="flex items-center">
        <div className="w-8 text-center font-bold">
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

        <div className="ml-3">
          <div className="font-medium">
            {entry.name} {entry.isCurrentUser && <span className="text-xs text-primary">(You)</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="font-bold text-primary">{entry.points} points</div>
      </div>
    </div>
  )
}

