import React from 'react'

const STEPS = [
  { id: 1, label: 'Customer details' },
  { id: 2, label: 'Delivery' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Review' },
]

export default function CheckoutStepIndicator({ currentStep = 1 }) {
  return (
    <nav aria-label="Checkout progress" className="velmora-section-panel p-4 sm:p-5 mb-6">
      <ol className="flex items-start gap-1 sm:gap-2 list-none m-0 p-0">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep
          const isComplete = step.id < currentStep

          return (
            <li
              key={step.id}
              className={`velmora-checkout-step ${isActive ? 'is-active' : ''} ${
                isComplete ? 'is-complete' : ''
              }`}
            >
              <span className="velmora-checkout-step-dot" aria-hidden>
                {isComplete ? '✓' : step.id}
              </span>
              <span
                className={`text-[10px] sm:text-xs font-semibold leading-tight ${
                  isActive || isComplete
                    ? 'text-[#111827] dark:text-white'
                    : 'text-[#64748B]'
                }`}
              >
                {step.label}
              </span>
              {index < STEPS.length - 1 ? (
                <span
                  className="hidden sm:block absolute top-4 left-1/2 w-full h-px bg-slate-200 dark:bg-gray-700 -z-1"
                  aria-hidden
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
