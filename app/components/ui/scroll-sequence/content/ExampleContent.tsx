import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

const ExampleContent = () => {
  return (
    <div className="w-full">
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 dark:border-orange-800/30 overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 h-14 w-14 rounded-full flex items-center justify-center mb-4 shadow-md">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>
          <h4 className="font-semibold text-center mb-4 text-orange-900 dark:text-orange-100 text-lg">
            Track Progress
          </h4>

          <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-sm text-orange-900 dark:text-orange-100">Weekly Activity</h5>
              <TrendingUp className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            </div>

            <div className="flex items-end justify-between h-24 gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                const height = [60, 40, 75, 55, 90, 30, 50][i]
                return (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 dark:from-orange-600 dark:to-orange-500 rounded-t-sm"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-[10px] text-orange-700 dark:text-orange-300 mt-1">{day}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-sm text-orange-900 dark:text-orange-100">Health Metrics</h5>
              <Activity className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-700 dark:text-orange-300">Sleep Quality</span>
                  <span className="font-medium text-orange-900 dark:text-orange-100">Good</span>
                </div>
                <div className="w-full h-1.5 bg-orange-100 dark:bg-orange-800/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 dark:from-orange-600 dark:to-orange-500 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-700 dark:text-orange-300">Stress Level</span>
                  <span className="font-medium text-orange-900 dark:text-orange-100">Low</span>
                </div>
                <div className="w-full h-1.5 bg-orange-100 dark:bg-orange-800/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 dark:from-orange-600 dark:to-orange-500 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-700 dark:text-orange-300">Mood</span>
                  <span className="font-medium text-orange-900 dark:text-orange-100">Excellent</span>
                </div>
                <div className="w-full h-1.5 bg-orange-100 dark:bg-orange-800/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 dark:from-orange-600 dark:to-orange-500 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExampleContent