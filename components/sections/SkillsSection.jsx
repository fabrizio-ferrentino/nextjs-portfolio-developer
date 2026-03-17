'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Code, Server, Wrench, Layers, Settings, Palette, TestTube, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SkillsSection = () => {
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState([]);

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      skills: t('skills.categories.languages', { returnObjects: true }),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Frameworks',
      icon: Layers,
      skills: t('skills.categories.frameworks', { returnObjects: true }),
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Tools',
      icon: Settings,
      skills: t('skills.categories.tools', { returnObjects: true }),
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Libraries',
      icon: Palette,
      skills: t('skills.categories.libraries', { returnObjects: true }),
      color: 'from-orange-500 to-red-500'
    },
    /*{
      title: 'Testing',
      icon: TestTube,
      skills: t('skills.categories.testing', { returnObjects: true }),
      color: 'from-indigo-500 to-purple-500'
    },*/
    {
      title: 'Design',
      icon: Smartphone,
      skills: t('skills.categories.design', { returnObjects: true }),
      color: 'from-pink-500 to-rose-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      x: -20,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: -30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6"
            variants={titleVariants}
          >
            {t('skills.title')}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto"
            variants={titleVariants}
            transition={{ delay: 0.3 }}
          >
            {t('skills.tagline')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onAnimationComplete={(definition) => {
                  if (definition === 'visible') {
                    setVisibleCards((prev) => {
                      if (!prev.includes(index)) {
                        return [...prev, index];
                      }
                      return prev;
                    });
                  }
                }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full group cursor-pointer shadow-md hover:shadow-2xl">                  
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`inline-flex p-4 bg-gradient-to-r ${category.color} rounded-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      variants={iconVariants}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      whileTap={{ rotate: 360, scale: 1.1 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white dark:group transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
                    >
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          variants={badgeVariants}
                          whileHover={{ 
                            scale: 1.1,
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 hover:scale-105 cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Card moreDescrition */}
        <div className="mt-24 text-center">
          <div
            className={`bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform transition-all duration-1000 relative overflow-hidden ${visibleCards.length === skillCategories.length ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-purple-500/10 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-400/10 rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('skills.moreTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('skills.moreDescrition')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;