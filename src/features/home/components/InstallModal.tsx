import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import step1Image from 'figma:asset/7f167fe4201aa65260013cc1142f9be6409ff001.png';
import step2Image from 'figma:asset/d60bcc3b6322bd99e7b1920031cf7217f0492ef7.png';
import step3Image from 'figma:asset/5d408579f08fd0025df36fa6a855491870342003.png';

// Preload images so they're cached before the modal opens
[step1Image, step2Image, step3Image].forEach((src) => {
  const img = new Image();
  img.src = src;
});

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstallModal({ isOpen, onClose }: InstallModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-12 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle size={20} className="text-black" />
                  <span 
                    className="text-black"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '16px',
                      fontWeight: 500,
                    }}
                  >
                    downloaded
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '36px',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}
                >
                  how to install fere
                </h2>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div 
                      className="absolute -top-3 -left-3 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white z-10"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '15px',
                        fontWeight: 600,
                      }}
                    >
                      1
                    </div>
                    <div className="bg-white rounded-3xl overflow-hidden aspect-[5/4] shadow-sm border border-black/5">
                      <img src={step1Image} alt="Downloads folder" className="w-full h-full object-cover object-center" />
                    </div>
                  </div>
                  <p 
                    className="text-black/70"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: '1.5',
                    }}
                  >
                    open <span className="text-black font-medium">fere.dmg</span> from your{' '}
                    <span className="text-black font-medium">downloads</span> folder
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div 
                      className="absolute -top-3 -left-3 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white z-10"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '15px',
                        fontWeight: 600,
                      }}
                    >
                      2
                    </div>
                    <div className="bg-white rounded-3xl overflow-hidden aspect-[5/4] shadow-sm border border-black/5">
                      <img src={step2Image} alt="Drag to Applications" className="w-full h-full object-cover object-center" />
                    </div>
                  </div>
                  <p 
                    className="text-black/70"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: '1.5',
                    }}
                  >
                    drag the <span className="text-black font-medium">fere icon</span> into your{' '}
                    <span className="text-black font-medium">applications</span> folder
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div 
                      className="absolute -top-3 -left-3 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white z-10"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '15px',
                        fontWeight: 600,
                      }}
                    >
                      3
                    </div>
                    <div className="bg-white rounded-3xl overflow-hidden aspect-[5/4] shadow-sm border border-black/5">
                      <img src={step3Image} alt="Open application" className="w-full h-full object-cover object-center" />
                    </div>
                  </div>
                  <p 
                    className="text-black/70"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: '1.5',
                    }}
                  >
                    open the <span className="text-black font-medium">fere</span> app from your{' '}
                    <span className="text-black font-medium">applications</span> folder
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4">
                <p 
                  className="text-black/50"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '15px',
                    fontWeight: 400,
                  }}
                >
                  problem?{' '}
                  <a href="#" className="text-black hover:underline">
                    download again
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
