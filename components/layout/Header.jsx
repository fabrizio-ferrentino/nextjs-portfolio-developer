'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import WarningBanner from "../ui/WarningBanner"

const Header = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Classe condivisa per i bottoni del menu mobile per evitare ripetizioni
  const mobileButtonClass = "block w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 active:bg-gray-100 dark:active:bg-gray-800 font-medium transition-all duration-200 focus:outline-none [-webkit-tap-highlight-color:transparent]";

  return (
  <>
    {showBanner && (
      <WarningBanner onClose={() => setShowBanner(false)} />
    )}
    <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        showBanner ? 'top-[85px] sm:top-[65px]' : 'top-0'
      } ${
        isScrolled || isMobileMenuOpen 
        ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm'
        : 'bg-transparent'
        }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 focus:outline-none [-webkit-tap-highlight-color:transparent]"
          >
            {t('common.name').split(' ').map(n => n[0]).join('')}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("about")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:-translate-y-0.5 transform focus:outline-none">
                {t('header.about')}
              </button>
              <button onClick={() => scrollToSection("skills")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:-translate-y-0.5 transform focus:outline-none">
                {t('header.skills')}
              </button>
              <button onClick={() => scrollToSection("experience")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:-translate-y-0.5 transform focus:outline-none">
                {t('header.experience')}
              </button>
              <button onClick={() => scrollToSection("projects")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:-translate-y-0.5 transform focus:outline-none">
                {t('header.projects')}
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:-translate-y-0.5 transform focus:outline-none">
                {t('header.contact')}
              </button>

            <LanguageSwitcher/>
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="block md:hidden">
              <LanguageSwitcher />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none [-webkit-tap-highlight-color:transparent]"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 focus:outline-none [-webkit-tap-highlight-color:transparent]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                  <Menu className="w-5 h-5" />
                </div>
                <div className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
                  <X className="w-5 h-5" />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out  ${
          isMobileMenuOpen 
            ? 'max-h-[400px] opacity-100 border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'max-h-0 opacity-0 border-transparent'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
            <button onClick={() => scrollToSection("about")} className={mobileButtonClass}>
              {t('header.about')}
            </button>

            <button onClick={() => scrollToSection("skills")} className={mobileButtonClass}>
              {t('header.skills')}
            </button>

            <button onClick={() => scrollToSection("experience")} className={mobileButtonClass}>
              {t('header.experience')}
            </button>

            <button onClick={() => scrollToSection("projects")} className={mobileButtonClass}>
              {t('header.projects')}
            </button>

            <button onClick={() => scrollToSection("contact")} className={mobileButtonClass}>
              {t('header.contact')}
            </button>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;