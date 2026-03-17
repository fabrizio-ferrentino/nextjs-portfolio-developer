'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Badge } from './badge';
import { Button } from './button';
import { Github, ExternalLink, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslation } from 'react-i18next';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => {
    setSelectedImageIndex(emblaApi.selectedScrollSnap());
  };
  onSelect();
  emblaApi.on('select', onSelect);

  return () => emblaApi.off('select', onSelect);
}, [emblaApi]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const scrollPrev = useCallback(() => {
  if (emblaApi) emblaApi.scrollPrev();
}, [emblaApi]);  // Rimuovi setSelectedImageIndex

const scrollNext = useCallback(() => {
  if (emblaApi) emblaApi.scrollNext();
}, [emblaApi]);  // Rimuovi setSelectedImageIndex

  const scrollTo = useCallback((index) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setSelectedImageIndex(index);
    }
  }, [emblaApi]);

  if (!project) return null;

  const images = project.images || [project.image];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 p-0"
        data-testid="project-modal"
      >
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </DialogTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
                data-testid="close-modal-button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Carousel */}
          <div className="relative group">
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0"
                    data-testid={`project-image-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  data-testid="carousel-prev-button"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  data-testid="carousel-next-button"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === selectedImageIndex
                          ? 'bg-white scale-110'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      data-testid={`carousel-dot-${index}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('common.description')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('common.technologies')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  data-testid={`tech-badge-${index}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Features - Show ALL */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('common.mainfeatures')}
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3 text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  data-testid={`feature-${index}`}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400"
              disabled={!project.live}
              onClick={() => project.live && window.open(project.live, "_blank")}
              data-testid="live-demo-button"
            >
              <Eye className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled={!project.github}
              onClick={() => project.github && window.open(project.github, "_blank")}
              data-testid="github-button"
            >
              <Github className="w-4 h-4 mr-2" />
              Codice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;