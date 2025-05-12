"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, DollarSign, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { FlowButton } from "../ui/flow-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function BusinessROICalculator() {
  const [employees, setEmployees] = useState(100)
  const [turnoverRate, setTurnoverRate] = useState(20)
  const [avgSalary, setAvgSalary] = useState(60000)
  const [absenteeismRate, setAbsenteeismRate] = useState(5)

  // Calculate ROI
  const calculateROI = () => {
    // Cost of turnover (typically 1.5x salary)
    const turnoverCost = employees * (turnoverRate / 100) * avgSalary * 1.5

    // Cost of absenteeism (days per year * daily cost)
    const absenteeismCost = employees * (absenteeismRate / 100) * 250 * (avgSalary / 250)

    // Total current costs
    const totalCurrentCosts = turnoverCost + absenteeismCost

    // Estimated savings with Thrive360 (based on case study averages)
    const turnoverReduction = 0.35 // 35% average reduction
    const absenteeismReduction = 0.28 // 28% average reduction

    const turnoverSavings = turnoverCost * turnoverReduction
    const absenteeismSavings = absenteeismCost * absenteeismReduction

    // Total savings
    const totalSavings = turnoverSavings + absenteeismSavings

    // Estimated Thrive360 investment (simplified)
    const estimatedInvestment = employees * 120 // $120 per employee per year (simplified)

    // ROI calculation
    const roi = (totalSavings - estimatedInvestment) / estimatedInvestment

    return {
      turnoverSavings: Math.round(turnoverSavings),
      absenteeismSavings: Math.round(absenteeismSavings),
      totalSavings: Math.round(totalSavings),
      estimatedInvestment: Math.round(estimatedInvestment),
      roi: Math.round(roi * 100) / 100,
    }
  }

  const results = calculateROI()

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Calculate Your <span className="text-purple-400">ROI</span>
          </h2>
          <p className="text-lg text-purple-100/70 max-w-3xl mx-auto">
            Use our interactive calculator to estimate the potential return on investment from implementing Thrive360 at
            your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-purple-500/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-purple-400" />
                  ROI Calculator
                </CardTitle>
                <CardDescription className="text-purple-100/70">
                  Adjust the sliders to match your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="employees" className="text-purple-100">
                      Number of Employees
                    </Label>
                    <span className="text-purple-400 font-medium">{employees}</span>
                  </div>
                  <Slider
                    id="employees"
                    min={10}
                    max={5000}
                    step={10}
                    value={[employees]}
                    onValueChange={(value) => setEmployees(value[0])}
                    className="py-4"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="turnover" className="text-purple-100">
                      Annual Turnover Rate (%)
                    </Label>
                    <span className="text-purple-400 font-medium">{turnoverRate}%</span>
                  </div>
                  <Slider
                    id="turnover"
                    min={1}
                    max={50}
                    step={1}
                    value={[turnoverRate]}
                    onValueChange={(value) => setTurnoverRate(value[0])}
                    className="py-4"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="salary" className="text-purple-100">
                      Average Annual Salary ($)
                    </Label>
                    <span className="text-purple-400 font-medium">${avgSalary.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="salary"
                    min={30000}
                    max={200000}
                    step={5000}
                    value={[avgSalary]}
                    onValueChange={(value) => setAvgSalary(value[0])}
                    className="py-4"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="absenteeism" className="text-purple-100">
                      Absenteeism Rate (%)
                    </Label>
                    <span className="text-purple-400 font-medium">{absenteeismRate}%</span>
                  </div>
                  <Slider
                    id="absenteeism"
                    min={1}
                    max={15}
                    step={0.5}
                    value={[absenteeismRate]}
                    onValueChange={(value) => setAbsenteeismRate(value[0])}
                    className="py-4"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-green-400" />
                  Your Estimated Results
                </CardTitle>
                <CardDescription className="text-purple-100/70">
                  Based on average improvements from Thrive360 implementations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                    <DollarSign className="h-6 w-6 text-green-400 mb-2" />
                    <p className="text-sm text-purple-100/70">Annual Turnover Savings</p>
                    <p className="text-2xl font-bold text-white">${results.turnoverSavings.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                    <Clock className="h-6 w-6 text-green-400 mb-2" />
                    <p className="text-sm text-purple-100/70">Absenteeism Savings</p>
                    <p className="text-2xl font-bold text-white">${results.absenteeismSavings.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-purple-100">Total Annual Savings</p>
                    <p className="text-xl font-bold text-green-400">${results.totalSavings.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-purple-100">Estimated Investment</p>
                    <p className="text-xl font-bold text-purple-400">${results.estimatedInvestment.toLocaleString()}</p>
                  </div>
                  <div className="h-px bg-purple-500/20 my-4"></div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-white">Return on Investment</p>
                    <p className="text-2xl font-bold text-green-400">{results.roi}x</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30">
                  <p className="text-white mb-2">Additional Benefits:</p>
                  <ul className="text-purple-100/80 space-y-1 text-sm">
                    <li>• Improved employee engagement and satisfaction</li>
                    <li>• Enhanced company culture and team cohesion</li>
                    <li>• Better customer service and client outcomes</li>
                    <li>• Reduced healthcare costs and disability claims</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <FlowButton className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Get Your Detailed ROI Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </FlowButton>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
