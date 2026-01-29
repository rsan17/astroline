'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Mail, Twitter, Facebook, Link, Check } from 'lucide-react';

interface ShareSectionProps {
  reportId: string;
  email?: string;
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  isPaid?: boolean;
  onUnlockClick?: () => void;
}

export function ShareSection({ reportId, email, sunSign, moonSign, risingSign, isPaid = false, onUnlockClick }: ShareSectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/report/${reportId}` 
    : '';

  const shareText = `Мій астрологічний звіт на Astroline! Я - ${sunSign} ✨`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSendEmail = async () => {
    if (!email) return;
    
    setIsEmailSending(true);
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reportId, sunSign, moonSign, risingSign }),
      });
      
      if (response.ok) {
        setEmailSent(true);
      }
    } catch (err) {
      console.error('Failed to send email:', err);
    } finally {
      setIsEmailSending(false);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-400/20 hover:border-blue-400/50',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600/20 hover:border-blue-600/50',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-teal-500/20 mb-6"
          >
            <Share2 className="w-8 h-8 text-accent" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Поділіться звітом</span>
          </h2>
          <p className="text-text-secondary">
            Надішліть звіт на email або поділіться з друзями
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          {/* Email section */}
          {email && (
            <div className="mb-8 pb-8 border-b border-white/10">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-accent" />
                Надіслати на email
              </h3>
              
              <div className="flex gap-4 items-center">
                <div className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-text-secondary">
                  {email}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendEmail}
                  disabled={isEmailSending || emailSent}
                  className={`btn-primary whitespace-nowrap ${emailSent ? 'bg-green-500' : ''}`}
                >
                  {isEmailSending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Надсилаю...
                    </span>
                  ) : emailSent ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Надіслано!
                    </span>
                  ) : (
                    'Надіслати'
                  )}
                </motion.button>
              </div>
              
              {emailSent && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-400 mt-3"
                >
                  ✓ Звіт надіслано на вашу пошту!
                </motion.p>
              )}
            </div>
          )}

          {/* Social share */}
          <div className="mb-8 pb-8 border-b border-white/10">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-accent" />
              Поділитися в соцмережах
            </h3>
            
            <div className="flex gap-3">
              {shareLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-3 glass rounded-xl transition-all duration-300 ${link.color}`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copy link */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Link className="w-5 h-5 text-accent" />
              Скопіювати посилання
            </h3>
            
            <div className="flex gap-4 items-center">
              <div className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-text-secondary text-sm truncate">
                {shareUrl || 'Завантаження...'}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                className={`btn-secondary whitespace-nowrap ${isCopied ? 'border-green-500 text-green-500' : ''}`}
              >
                {isCopied ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Скопійовано!
                  </span>
                ) : (
                  'Копіювати'
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA for full report - only show if not paid */}
        {!isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-text-secondary mb-4">
              Хочете отримати ще більше інсайтів?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUnlockClick}
              className="btn-primary text-lg px-10"
            >
              Отримати повний звіт
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

