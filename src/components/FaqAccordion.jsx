import { useState } from 'react'
import { ChevronDown } from '../lib/icons'

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!faqs?.length) return null

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-white mb-4">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-[#2a2a2a]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-medium text-zinc-300">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-sm text-zinc-500">{faq.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
