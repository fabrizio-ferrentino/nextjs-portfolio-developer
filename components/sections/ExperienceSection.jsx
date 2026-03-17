'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ExperienceSection = () => {
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const experience = t('experience.jobs', { returnObjects: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);

            // Staggered animation with delay
            setTimeout(() => {
              setVisibleCards(prev => {
                if (!prev.includes(index)) {
                  return [...prev, index].sort((a, b) => a - b);
                }
                return prev;
              });
            }, index * 200); // 500ms delay between each card
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Observer each card container
    const cardElements = document.querySelectorAll('[data-timeline-card]');
    cardElements.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardElements.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            {t('experience.tagline')}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full">
            <div className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full shadow-lg"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-10">
            {experience.map((job, index) => {
              const isVisible = visibleCards.includes(index);
              const isRight = index % 2 === 0; // Even indexes go to right, odd to left

              return (
                <div
                  key={job.id}
                  data-index={index}
                  data-timeline-card="true"
                  className="relative flex items-center"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20 top-8 hidden lg:block">
                    <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transition-all duration-700 ${isVisible
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110 shadow-blue-500/50'
                      : 'bg-gray-300 dark:bg-gray-600 scale-90'
                      }`}>
                      {/* Inner dot */}
                      <div className={`absolute inset-2 rounded-full transition-all duration-500 ${isVisible
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-100 dark:bg-gray-700'
                        }`}></div>
                    </div>
                  </div>

                  {/* Card Container */}
                  <div className={`w-full ${isRight ? 'flex justify-start' : 'flex justify-end'}`}>
                    <div className={`w-full max-w-md ${isRight ? 'pr-0' : 'pl-0'}`}>
                      <div
                        className={`transform transition-all duration-1000 ease-out ${!isVisible
                          ? isRight
                            ? 'translate-x-[150px] opacity-0 scale-95 rotate-2'
                            : 'translate-x-[-150px] opacity-0 scale-95 -rotate-2'
                          : 'translate-x-0 opacity-100 scale-100 rotate-0'
                          }`}
                        style={{
                          transitionDelay: isVisible ? '0ms' : `${index * 200}ms`,
                        }}
                      >
                        {/* Timeline Arrow */}
                        <div className="hidden lg:block">
                          <div className={`absolute top-8 ${isRight ? '-right-4' : '-left-4'} w-0 h-0 border-t-[12px] border-b-[12px] border-transparent ${isRight
                            ? 'border-l-[16px] border-l-white dark:border-l-gray-900'
                            : 'border-r-[16px] border-r-white dark:border-r-gray-900'
                            } drop-shadow-md`}></div>
                        </div>

                        <Card className="hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:scale-[1.03] overflow-hidden group relative shadow-lg">
                          {/* Subtle gradient overlay */}
                          <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isRight
                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                            : 'bg-gradient-to-l from-blue-500/10 to-purple-500/10'
                            }`}></div>

                          <CardHeader className="relative z-10 pb-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1"
                                >
                                  {job.type}
                                </Badge>
                                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Calendar className="w-3 h-3" />
                                  <span className="font-medium">{job.duration}</span>
                                </div>
                              </div>

                              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                {job.title}
                              </CardTitle>

                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                  <Briefcase className="w-4 h-4 text-blue-500" />
                                  {job.companyUrl ? (
                                    <a
                                      href={job.companyUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                      {job.company}
                                    </a>
                                  ) : (
                                    <span className="font-medium">{job.company}</span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4 text-purple-500" />
                                  <span>{job.location}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4 relative z-10 pt-0">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                              {job.description}
                            </p>

                            {/* Achievements */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                                <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2"></span>
                                {t('experience.keyAchievements')}
                              </h4>
                              <ul className="space-y-1.5">
                                {job.achievements.map((achievement, achieveIndex) => (
                                  <li
                                    key={achieveIndex}
                                    className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300"
                                  >
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="leading-relaxed">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                                <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-2"></span>
                                {t('experience.technologies')}
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {job.technologies.map((tech, techIndex) => (
                                  <Badge
                                    key={techIndex}
                                    variant="secondary"
                                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 px-2 py-1"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card moreDescrition */}
        {/* <div className="mt-24 text-center">
          <div
            className={`bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform transition-all duration-1000 relative overflow-hidden ${visibleCards.length >= experience.length ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            {/* Animated background elements */}
        {/*<div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-purple-500/10 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-400/10 rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('experience.moreTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('experience.moreDescrition')}
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ExperienceSection;