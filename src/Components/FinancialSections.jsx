import React from "react";
import { motion } from "framer-motion";

const FinancialSections = () => {
  // Section animation variant
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Staggered list items variant
  const listVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const budgetingTips = [
    "Create a monthly budget and stick to it.",
    "Separate needs vs. wants to control spending.",
    "Automate savings to secure your future.",
    "Review your budget regularly for improvements.",
  ];

  const financialPlanning = [
    "Plan for short-term and long-term goals.",
    "Protect yourself and your family against financial risks.",
    "Make informed investment decisions.",
    "Maintain control over your financial future.",
  ];

  return (
    <section className="my-12 px-6 md:px-20 space-y-12">
      {/* Budgeting Tips */}
      <motion.div
        className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 rounded-2xl shadow-lg p-8"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          💡 Budgeting Tips
        </h2>
        <p className="text-white text-lg md:text-xl leading-relaxed">
          Managing your money starts with smart budgeting. Track your income and
          expenses, set realistic spending limits, and prioritize saving. Use
          tools and apps to monitor your monthly cash flow and make adjustments
          whenever necessary.
        </p>
        <ul className="list-disc list-inside mt-4 text-white space-y-2">
          {budgetingTips.map((tip, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Why Financial Planning */}
      <motion.div
        className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 rounded-2xl shadow-lg p-8"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          📈 Why Financial Planning
        </h2>
        <p className="text-white text-lg md:text-xl leading-relaxed">
          Financial planning is essential to achieve your life goals with
          confidence. It helps you manage risk, prepare for emergencies, and
          invest wisely for long-term wealth. A well-thought-out financial plan
          ensures stability and peace of mind.
        </p>
        <ul className="list-disc list-inside mt-4 text-white space-y-2">
          {financialPlanning.map((point, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default FinancialSections;
