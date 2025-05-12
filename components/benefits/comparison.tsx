"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const comparisonData = [
  {
    feature: "24/7 Mental Health Support",
    thrive360: true,
    traditional: false,
  },
  {
    feature: "Personalized Wellbeing Programs",
    thrive360: true,
    traditional: false,
  },
  {
    feature: "Data-Driven Insights",
    thrive360: true,
    traditional: false,
  },
  {
    feature: "Team Building Resources",
    thrive360: true,
    traditional: true,
  },
  {
    feature: "Mobile App Access",
    thrive360: true,
    traditional: false,
  },
  {
    feature: "Regular Check-ins",
    thrive360: true,
    traditional: false,
  },
]

export default function BenefitsComparison() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Thrive360 Compares</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            See how Thrive360's comprehensive approach to employee wellbeing compares to traditional solutions.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-white">Feature</th>
                <th className="text-center p-4 bg-primary/10">Thrive360</th>
                <th className="text-center p-4 bg-slate-200">Traditional Solutions</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="p-4 border-t border-slate-200">{item.feature}</td>
                  <td className="text-center p-4 border-t border-slate-200">
                    {item.thrive360 ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-4 border-t border-slate-200">
                    {item.traditional ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
