'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { Send, Mail, MapPin, Github, Gitlab, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from "@/hooks/use-mobile"
import { useIsStacked } from "@/hooks/use-is-stacked";
import PrivacyModal from '../ui/PrivacyModal';

const ContactSection = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const isStacked = useIsStacked();
  const isMobile = useIsMobile()
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!privacyAccepted) {
    //   toast({
    //     title: "Privacy Policy",
    //     description: "Please accept the Privacy Policy to continue.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: t('message.sendSuccessTitle'),
          description: result.message || t('message.sendSuccessDescription'),
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setPrivacyAccepted(false);
      } else {
        toast({
          title: t('message.sendErrorTitle'),
          description: result.error || t('message.sendErrorDescription'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('message.sendErrorTitle'),
        description: t('message.sendErrorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: t('common.email'),
      href: `mailto:${t('common.email')}`,
      description: t('common.emailDescription')
    },
    {
      icon: MapPin,
      title: t('common.location'),
      value: t('common.locationZone'),
      description: ''
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      title: 'GitHub',
      href: t('common.github'),
      description: t('common.gitHubDescription')
    }, {
      icon: Gitlab,
      title: 'GitLab',
      href: t('common.gitlab'),
      description: t('common.gitHubDescription')
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      href: t('common.linkedin'),
      description: t('common.linkedinDescription')
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contactInfoVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.subject.trim() !== '' &&
    formData.message.trim() !== '' &&
    privacyAccepted;

  return (
    <>
      <motion.div
        className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={titleVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4 sm:mb-6"
              variants={titleVariants}
            >
              {t('contact.title')}
            </motion.h2>
            <motion.div
              className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4"
              variants={titleVariants}
              transition={{ delay: 0.2 }}
            >
              {t('contact.tagline')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch min-h-[600px]">
            {/* Contact Form - Mobile First Responsive */}
            <motion.div
              className="order-2 lg:order-1 flex"
              variants={formVariants}
            >
              <motion.div
                className="flex-1 h-full"
              >
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg flex-1 flex flex-col transition-shadow duration-300 h-full min-h-[600px]">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-white flex items-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        whileTap={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                      </motion.div>
                      <span>{t('message.sendAMessage')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 flex-1 flex flex-col">
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6 flex-1 flex flex-col"
                      initial="hidden"
                      animate="visible"
                      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div className="space-y-2" variants={inputVariants}>
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('message.name')} *
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-sm sm:text-base transition-all duration-300"
                              placeholder={t('message.namePlaceholder')}
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div className="space-y-2" variants={inputVariants}>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('message.email')} *
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-sm sm:text-base transition-all duration-300"
                              placeholder={t('message.emailPlaceholder')}
                            />
                          </motion.div>
                        </motion.div>
                      </div>

                      <motion.div className="space-y-2" variants={inputVariants}>
                        <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('message.subject')} *
                        </Label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-sm sm:text-base transition-all duration-300"
                            placeholder={t('message.subjectPlaceholder')}
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div className="space-y-2 flex-1 flex flex-col" variants={inputVariants}>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('message.message')} *
                        </Label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1"
                        >
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={isMobile ? 6 : isStacked ? 9 : 16}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 resize-none text-sm sm:text-base flex-1 transition-all duration-300 min-w-[200px]"
                            placeholder={t('message.messagePlaceholder')}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Privacy Policy Checkbox */}
                      <motion.div
                        className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                        variants={inputVariants}
                      >
                        <input
                          type="checkbox"
                          id="privacy-consent"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                          data-testid="privacy-checkbox"
                        />
                        <label
                          htmlFor="privacy-consent"
                          className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none"
                        >
                          I agree to the processing of my data according to the{' '}
                          <button
                            type="button"
                            onClick={() => setIsPrivacyOpen(true)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                          >
                            Privacy Policy
                          </button>
                          {' *'}
                        </label>
                      </motion.div>

                      <motion.div className="mt-auto pt-4" variants={buttonVariants}>
                        <motion.div
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className={`w-full text-white py-2.5 sm:py-3 font-medium transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${isFormValid && !isSubmitting
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                              : 'bg-gray-400 hover:bg-gray-400'
                              }`}
                            data-testid="submit-button"
                          >
                            <AnimatePresence mode="wait">
                              {isSubmitting ? (
                                <motion.div
                                  key="loading"
                                  className="flex items-center justify-center space-x-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <motion.div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  <span>{t('message.sending')}</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="send"
                                  className="flex items-center justify-center space-x-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Send className="w-4 h-4" />
                                  </motion.div>
                                  <span>{t('message.sendMessage')}</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Information - Mobile First Responsive */}
            <motion.div
              className="order-1 lg:order-2 flex"
              variants={contactInfoVariants}
            >
              <div className="w-full space-y-6 sm:space-y-8 flex flex-col h-full min-h-[600px] justify-between">
                {/* Contact Methods */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <motion.h3
                    className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6"
                    variants={titleVariants}
                  >
                    {t('contact.getInTouch')}
                  </motion.h3>
                  <motion.div
                    className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                  >
                    {contactMethods.map((method, index) => {
                      const IconComponent = method.icon;
                      const Wrapper = method.href ? motion.a : motion.div;
                      return (
                        <Wrapper
                          key={index}
                          {...(method.href && { href: method.href })}
                          className={`block ${method.href ? 'cursor-pointer' : 'cursor-default'}`}
                          variants={cardVariants}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={method.href ? { scale: 0.98 } : {}}
                          target={method.href?.startsWith('http') ? '_blank' : undefined}
                          rel={method.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          <Card className={`transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full ${method.href ? 'hover:shadow-xl group' : 'hover:shadow-lg'}`}>
                            <CardContent className="p-4 sm:p-6 h-full flex items-center">
                              <div className="flex items-start space-x-3 sm:space-x-4 w-full">
                                <motion.div
                                  className={`p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0 ${method.href ? 'group-hover:scale-110' : ''} transition-transform duration-300`}
                                  whileHover={method.href ? { rotate: 360 } : {}}
                                  transition={{ duration: 0.6 }}
                                >
                                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                </motion.div>
                                <div className="min-w-0 flex-1">
                                  <h4 className={`text-base sm:text-lg font-semibold text-gray-900 dark:text-white ${method.href ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' : ''} transition-colors duration-300`}>
                                    {method.title}
                                  </h4>
                                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium break-words">
                                    {method.value}
                                  </p>
                                  {method.description && (
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                      {method.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Wrapper>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Social Links */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <motion.h3
                    className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6"
                    variants={titleVariants}
                  >
                    {t('contact.followMe')}
                  </motion.h3>
                  <motion.div
                    className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
                  >
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block flex-1"
                          variants={cardVariants}
                          whileHover={{
                            y: -5,
                            scale: 1.02,
                            transition: { duration: 0.3 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full group cursor-pointer">
                            <CardContent className="p-4 sm:p-6 h-full flex items-center">
                              <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                                <motion.div
                                  className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                >
                                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                </motion.div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {social.title}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {social.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
};

export default ContactSection;