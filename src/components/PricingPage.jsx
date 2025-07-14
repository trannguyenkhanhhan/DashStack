import React from "react";

const plans = [
  {
    title: "Basic",
    price: "$14.99",
    features: [
      "Free Setup",
      "Bandwidth Limit 10 GB",
      "20 User Connection",
      { label: "Analytics Report", available: false },
      { label: "Public API Access", available: false },
      { label: "Plugins Integration", available: false },
      { label: "Custom Content Management", available: false },
    ],
  },
  {
    title: "Standard",
    price: "$49.99",
    features: [
      "Free Setup",
      "Bandwidth Limit 10 GB",
      "20 User Connection",
      "Analytics Report",
      "Public API Access",
      { label: "Plugins Integration", available: false },
      { label: "Custom Content Management", available: false },
    ],
  },
  {
    title: "Premium",
    price: "$89.99",
    features: [
      "Free Setup",
      "Bandwidth Limit 10 GB",
      "20 User Connection",
      "Analytics Report",
      "Public API Access",
      "Plugins Integration",
      "Custom Content Management",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#1e2430] text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-[#273142] rounded-2xl p-6 shadow-xl flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-2">{plan.title}</h2>
            <p className="text-gray-400 mb-4">Monthly Charge</p>
            <p className="text-3xl font-bold text-blue-400 mb-6">{plan.price}</p>
            <ul className="space-y-2 text-sm mb-6 w-full text-center">
              {plan.features.map((feature, i) => {
                const item =
                  typeof feature === "string"
                    ? { label: feature, available: true }
                    : feature;
                return (
                  <li
                    key={i}
                    className={
                      item.available !== false
                        ? "text-white"
                        : "text-gray-500 line-through"
                    }
                  >
                    {item.label || item}
                  </li>
                );
              })}
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-2">
              Get Started
            </button>
            <a href="#" className="text-xs text-blue-400 underline">
              Start Your 30 Day Free Trial
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
