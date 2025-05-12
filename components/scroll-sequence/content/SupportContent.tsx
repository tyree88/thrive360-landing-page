import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Video, User, Clock, ArrowUpRight } from "lucide-react"

const SupportContent = () => {
  return (
    <div className="w-full">
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 dark:border-purple-800/30 overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 h-14 w-14 rounded-full flex items-center justify-center mb-4 shadow-md">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
          <h4 className="font-semibold text-center mb-4 text-purple-900 dark:text-purple-100 text-lg">24/7 Support</h4>

          <div className="w-full space-y-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/10 px-2 py-1 rounded-bl-lg">
                <span className="text-[10px] font-medium text-purple-600 dark:text-purple-300">New</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-600 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">3</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-purple-900 dark:text-purple-100">Chat Messages</div>
                    <div className="text-xs text-purple-600 dark:text-purple-300 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Dr. Sarah Johnson
                    </div>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-600 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">1</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-purple-900 dark:text-purple-100">Phone Call</div>
                    <div className="text-xs text-purple-600 dark:text-purple-300 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Yesterday, 3:45 PM
                    </div>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-600 flex items-center justify-center">
                      <Video className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">2</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-purple-900 dark:text-purple-100">Video Sessions</div>
                    <div className="text-xs text-purple-600 dark:text-purple-300 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Next: Tomorrow, 10:00 AM
                    </div>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full bg-purple-50 dark:bg-purple-900/10 rounded-lg p-3 border border-purple-200 dark:border-purple-800/30">
            <div className="text-xs text-center text-purple-700 dark:text-purple-300 font-medium">
              Support available 24/7
            </div>
            <div className="mt-1 flex justify-center gap-3">
              <div className="flex items-center gap-1 text-[10px] text-purple-600 dark:text-purple-400">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Online now
              </div>
              <div className="flex items-center gap-1 text-[10px] text-purple-600 dark:text-purple-400">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                Avg. response: 5 min
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SupportContent
