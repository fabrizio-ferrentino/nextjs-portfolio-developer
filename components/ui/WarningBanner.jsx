'use client'

import React from "react"
import { AlertTriangle, ArrowUpRight, X } from "lucide-react"
import { useTranslation } from "react-i18next"

const WarningBanner = ({ onClose }) => {
  const { t } = useTranslation()

  return (
    <div className="
      fixed
      top-0
      left-0
      right-0
      z-[100]
      border-b
      border-yellow-500/20
      bg-yellow-50/95
      dark:bg-yellow-950/90
      backdrop-blur-xl
    ">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">

        <div className="
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          py-3
        ">

          {/* Left */}
          <div className="flex items-start gap-3 min-w-0">

            {/* Icon */}
            <div className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-yellow-500/15
              text-yellow-700
              dark:text-yellow-300
            ">
              <AlertTriangle className="h-5 w-5" />
            </div>

            {/* Text */}
            <div className="min-w-0 pr-2">
              <p className="
                text-sm
                font-semibold
                text-yellow-900
                dark:text-yellow-100
              ">
                {t('notice.title')}
              </p>

              <p className="
                text-xs sm:text-sm
                leading-relaxed
                text-yellow-800/80
                dark:text-yellow-200/80
              ">
                {t('notice.description')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="
            flex
            items-center
            gap-2
            w-full
            sm:w-auto
          ">
            {/* This is an example button, you can replace it with a link or any other action you want. */}
            {/* <a
              href="https://fabrizioferrentino.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 sm:flex-none
                inline-flex
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-yellow-500
                px-4
                py-2.5
                text-sm
                font-medium
                text-black
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:shadow-lg
              "
            >
              {t('notice.button')}
              <ArrowUpRight className="h-4 w-4" />
            </a> */}

            <button
              onClick={onClose}
              className="
                shrink-0
                rounded-xl
                p-2.5
                text-yellow-700
                transition-colors
                hover:bg-yellow-500/10
                dark:text-yellow-300
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WarningBanner