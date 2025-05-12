import { Card, CardContent } from "@/components/ui/card"
import { ClipboardCheck, CheckCircle2, User, Brain, Heart } from "lucide-react"

const PersonalizedAssessmentContent = () => {
  return (
    <div className="w-full">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 dark:border-blue-800/30 overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 h-14 w-14 rounded-full flex items-center justify-center mb-4 shadow-md">
            <ClipboardCheck className="h-7 w-7 text-white" />
          </div>
          <h4 className="font-semibold text-center mb-4 text-blue-900 dark:text-blue-100 text-lg">Your Assessment</h4>

          <div className="w-full mb-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-900 dark:text-blue-200">Personal Profile</span>
            </div>
            <div className="space-y-2.5 w-full">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-2 bg-blue-200 dark:bg-blue-700/50 rounded-full w-full"></div>
                  <div className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">Completed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mb-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-900 dark:text-blue-200">Mental Health</span>
            </div>
            <div className="space-y-2.5 w-full">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 dark:border-blue-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 rounded-full w-[75%]"></div>
                  <div className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">In progress (75%)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-900 dark:text-blue-200">Physical Health</span>
            </div>
            <div className="space-y-2.5 w-full">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-300 dark:border-blue-600 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-2 bg-blue-100 dark:bg-blue-800/50 rounded-full w-full"></div>
                  <div className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">Not started</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="text-xs text-center text-blue-700 dark:text-blue-300 font-medium">
              2 of 3 sections completed
            </div>
            <div className="mt-1.5 w-full h-1.5 bg-blue-100 dark:bg-blue-800/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-full"
                style={{ width: "66%" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PersonalizedAssessmentContent
