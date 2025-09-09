import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, CheckCircle, HelpCircle, XCircle } from "lucide-react"

interface QuizProps {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  userAnswer?: string
  selectedAnswer: string | null
  showExplanation: boolean
  onAnswerSelect: (answer: string) => void
  onAnswerSubmit: () => void
}

export function QuizSection({
  question,
  options,
  correctAnswer,
  explanation,
  userAnswer,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
  onAnswerSubmit,
}: QuizProps) {
  const isAnswered = userAnswer !== undefined

  return (
    <div className="mt-10 pt-10 border-t border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-secondary/10 p-2 rounded-full mr-3">
          <HelpCircle className="h-5 w-5 text-secondary" />
        </div>
        <h3 className="text-xl font-bold font-heading">Knowledge Check</h3>
      </div>

      <div className="space-y-6">
        <div className="text-lg font-bold font-heading">{question}</div>
        <div className="space-y-3">
          {options.map((option) => {
            const isCorrect = option === correctAnswer
            const wasSelected = userAnswer === option

            // Determine styling based on state
            let buttonStyle = {}
            let icon = null

            if (isAnswered) {
              if (isCorrect) {
                // Correct answer is always green
                buttonStyle = {
                  backgroundColor: "hsl(142.1 76.2% 36.3%)",
                  color: "white",
                  borderColor: "hsl(142.1 76.2% 36.3%)",
                }
                icon = <CheckCircle className="h-5 w-5 text-white" />
              } else if (wasSelected) {
                // Wrong selected answer is red
                buttonStyle = {
                  backgroundColor: "hsl(0 84.2% 60.2%)",
                  color: "white",
                  borderColor: "hsl(0 84.2% 60.2%)",
                }
                icon = <XCircle className="h-5 w-5 text-white" />
              } else {
                // Unselected wrong answers are neutral
                buttonStyle = {
                  backgroundColor: "transparent",
                  color: "hsl(var(--muted-foreground))",
                  borderColor: "hsl(var(--border))",
                }
              }
            } else {
              // Before answering
              if (selectedAnswer === option) {
                // Currently selected answer
                buttonStyle = {
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  borderColor: "hsl(var(--primary))",
                  borderWidth: "2px",
                  color: "hsl(var(--primary))",
                }
              } else {
                // Unselected answers
                buttonStyle = {
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                  borderColor: "hsl(var(--border))",
                }
              }
            }

            return (
              <button
                key={option}
                className="w-full flex justify-between items-center text-left px-4 py-6 rounded-md border-2 transition-all duration-200 font-body"
                style={buttonStyle}
                onClick={() => !isAnswered && onAnswerSelect(option)}
                disabled={isAnswered}
              >
                <span>{option}</span>
                {icon}
              </button>
            )
          })}
        </div>

        {!userAnswer && (
          <Button
            onClick={onAnswerSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 font-body"
          >
            Check Answer
          </Button>
        )}

        {showExplanation && (
          <Card className="border-2 border-primary/20 bg-primary/5 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center font-heading">
                <Award className="h-5 w-5 mr-2 text-secondary" />
                Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body">{explanation}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
