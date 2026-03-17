'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  // Variants per le animazioni
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

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section className="py-40 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titolo */}
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
            {t('about.title')}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Bio */}
          <motion.div
            className="space-y-6 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="prose prose-lg dark:prose-invert max-w-none" variants={itemVariants}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t('about.bio')}
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('about.whatIBringToTheTable')}
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {[t('about.row1'), t('about.row2'), t('about.row3'), t('about.row4')].map((row, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    variants={itemVariants}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                    ></div>
                    <span>{row}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="relative w-full flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar circolare */}
            <motion.div
              className="inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="w-48 h-48 sm:w-60 sm:h-60 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-300">
                {t('common.name').split(' ').map(n => n[0]).join('')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;
