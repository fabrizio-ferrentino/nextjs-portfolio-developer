'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Github, ExternalLink, Eye, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProjectModal from '../ui/ProjectModal';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = t('projects.projectsList', { returnObjects: true });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Get unique technologies for filter
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];
  const filters = ['All', ...allTechnologies.slice(0, 5)]; // Show top 5 technologies

  // Filter projects based on selected filter
  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.technologies.includes(filter));

  // Show limited projects initially
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('projects.tagline')}
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('common.filterBy')}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filter === tech ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(tech)}
                  className={`transition-all duration-200 ${filter === tech
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                    }`}
                >
                  {tech}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              layout
              transition={{ duration: 0.3 }}
            >
              <Card
                className="cursor-pointer group h-full hover:shadow-2xl transition-all duration-300 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-xl"
                onClick={() => handleProjectClick(project)}
                data-testid={`project-card-${project.id}`}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-400 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></motion.div>
                  <div className="absolute top-4 right-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className={`text-xs ${project.status === 'Completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                      >
                        {project.status}
                      </Badge>
                    </motion.div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies - Show ALL technologies */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        variants={badgeVariants}
                        whileHover="hover"
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Key Features */}
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Key Features:
                    </h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {project.features.slice(0, 2).map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        >
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}

                      {project.features.length > 2 && (
                        <li className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          + more features…
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 mt-auto">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        className={`
                        w-full 
                        bg-gradient-to-r from-blue-600 to-purple-600 
                        text-white 
                        hover:from-blue-700 hover:to-purple-700
                        disabled:from-gray-400 disabled:to-gray-400 
                        disabled:text-gray-200 disabled:cursor-not-allowed
                      `}
                        disabled={!project.live}
                        onClick={() => project.live && window.open(project.live, "_blank")}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Live Demo</span>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600"
                        disabled={!project.github}
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-3"
              >
                {showAll ? 'Show Less' : `Show All ${filteredProjects.length} Projects`}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsSection;