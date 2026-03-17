'use client'

import React from 'react';
import { Button } from '../ui/button';
import { ArrowDown, Github, Gitlab, Linkedin, Mail } from 'lucide-react';
import TextType from '../ui/TextType';
import LiquidEther from '../ui/LiquidEther';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = React.useState("dark");
  const titles = t('common.herotitles', { returnObjects: true });
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse duration-4000"></div> */}
      
      {/* Red line for debug */}
      {/* <div className="absolute inset-x-1/2 w-px h-full bg-red-500"></div> */}

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 pointer-events-none">
        <div className="space-y-8 animate-fade-in">
          {/* Profile Image */}
          {/* <div className="mb-8">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-300">
                {f(common.name.split(' ').map(n => n[0]).join(''))}
              </div>
            </div>
          </div> */}
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white leading-tight pointer-events-none">
              {t('common.name')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-light from-blue-600 to-purple-600 bg-clip-text pointer-events-none">
              {/* Main Title {f(common.title)} */}
              <TextType
                text={titles}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                textColors={theme === "dark" ? "#ffffff" : "#000000"}
              />
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed pointer-events-none">
              {t('hero.tagline')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pointer-events-auto">
            <Button
              onClick={() => scrollToSection('about')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[200px] sm:min-w-[170px]"
            >
              {t('hero.rightButton')}
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 min-w-[200px] sm:min-w-[170px]"
            >
              {t('hero.leftBuffon')}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-8 pointer-events-auto">
            <a
              href={t('common.github')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={t('common.gitlab')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Gitlab className="w-6 h-6" />
            </a>
            <a
              href={t('common.linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${t('common.email')}`}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-[calc(50%-0.7rem)] transform -translate-x-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-900 animate-bounce pointer-events-auto"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroSection;