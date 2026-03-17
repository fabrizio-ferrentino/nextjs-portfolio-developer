'use client'

import React from 'react';
import { Heart, Coffee, Smile, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from "@/hooks/use-mobile"

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile()

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('common.name')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {t('footer.tagline2')}
            </p>
          </div>

          {/* Center Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">{t('footer.quickLinks')}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[t('header.about'), t('header.skills'), t('header.experience'), t('header.projects'), t('header.contact')].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">{t('footer.connect')}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a
                href={t('common.github')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href={t('common.gitlab')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                GitLab
              </a>
              <a
                href={t('common.linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${t('common.email')}`}
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap justify-center md:justify-start">
              <span className="whitespace-nowrap">© {currentYear} {t('common.name')}.</span>
              <div className="flex items-center space-x-1">
                <span className="whitespace-nowrap">Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>and</span>
                <Coffee className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <span>
                Built with <span className="font-semibold">Next.js</span> &{" "}
                <span className="font-semibold">Tailwind CSS</span>
              </span>
              <a
                href="https://github.com/fabrizio-ferrentino/nextjs-portfolio-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;