'use client'

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';

const PrivacyModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 p-0 scroll-pt-24">

                {/* HEADER STICKY */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <DialogHeader>
                        <div className="flex items-start justify-between">
                            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t('privacy.title')}
                            </DialogTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </DialogHeader>
                </div>

                {/* CONTENUTO */}
                <div className="p-6 prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-gray-500 dark:text-gray-400 mb-5">
                        {t('privacy.time')}
                    </p>

                    <section className="mb-12">
                        <p>
                            {t('privacy.description')}
                        </p>
                    </section>

                    {/* FOOTER */}
                    <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500">
                        {t('privacy.footer')}
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PrivacyModal;