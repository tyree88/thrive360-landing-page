import { Card, CardContent } from "@/components/ui/card"
import { Clock, Stethoscope, CheckCircle, Star } from "lucide-react"
import { CalendarIcon, ArrowRightIcon } from "@radix-ui/react-icons"

const TreatmentPlanContent = () => {
  return (
    <div className="w-full">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/30 dark:to-green-800/20 dark:border-green-800/30 overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 h-14 w-14 rounded-full flex items-center justify-center mb-4 shadow-md">
            <Stethoscope className="h-7 w-7 text-white" />
          </div>
          <h4 className="font-semibold text-center mb-4 text-green-900 dark:text-green-100 text-lg">
            Your Treatment Plan
          </h4>

          <div className="w-full grid grid-cols-1 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute transform rotate-45 bg-green-500/10 w-16 h-16 -right-8 -top-8"></div>
                <Star className="absolute top-2 right-2 h-4 w-4 text-green-500 dark:text-green-400" />
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-lg flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-sm text-green-900 dark:text-green-100 mb-1">Weekly Sessions</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 bg-green-200 dark:bg-green-700/50 rounded-full flex-1"></div>
                    <span className="text-xs font-medium text-green-700 dark:text-green-300">Tuesdays</span>
                  </div>
                  <div className="flex items-center text-xs text-green-700 dark:text-green-300">
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-500 dark:text-green-400" />
                    <span>Next: May 14, 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-lg flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-sm text-green-900 dark:text-green-100 mb-1">Daily Check-ins</h5>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${
                          i < 5
                            ? "bg-green-500 dark:bg-green-600 text-white"
                            : "bg-green-100 dark:bg-green-800/30 text-green-500 dark:text-green-400"
                        }`}
                      >
                        {i < 5 && <CheckCircle className="h-2.5 w-2.5" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-700 dark:text-green-300">5/7 completed</span>
                    <span className="text-green-500 dark:text-green-400 font-medium flex items-center">
                      View all <ArrowRightIcon className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="text-xs text-center text-green-700 dark:text-green-300 font-medium">Plan progress: 68%</div>
            <div className="mt-1.5 w-full h-1.5 bg-green-100 dark:bg-green-800/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 dark:from-green-600 dark:to-green-500 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TreatmentPlanContent
