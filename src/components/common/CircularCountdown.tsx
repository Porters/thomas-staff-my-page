import React from 'react'
import { useTranslation } from 'react-i18next'

interface CircularCountdownProps {
  countdown: number
  maxTime?: number
}

export const CircularCountdown: React.FC<CircularCountdownProps> = ({
  countdown,
  maxTime = 60,
}) => {
  const { t } = useTranslation()
  const progress = countdown / maxTime
  const circumference = 2 * Math.PI * 26
  const strokeDashoffset = -circumference * (1 - progress)

  return (
    <div className="flex items-center justify-center gap-3">
      <p
        className="text-black dark:text-black"
        style={{ fontSize: '14px', fontWeight: 400, lineHeight: '150%' }}
      >
        {t('expiresIn')}
      </p>
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-16 h-16 transform -rotate-90">
          {/* Background circle */}
          <circle cx="32" cy="32" r="26" stroke="#D8D9DB" strokeWidth="5" fill="none" />
          {/* Progress circle */}
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="#000"
            strokeWidth="5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-black font-semibold" style={{ fontSize: '14px' }}>
            {countdown}s
          </span>
        </div>
      </div>
    </div>
  )
}
