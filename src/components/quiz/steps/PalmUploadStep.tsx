'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Hand, X, RotateCcw, RefreshCw, Loader2, Settings, AlertCircle } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Mode = 'select' | 'camera' | 'preview';
type PermissionState = 'prompt' | 'granted' | 'denied' | 'unknown';

export function PalmUploadStep() {
  const { updateData, nextStep, prevStep } = useQuizStore();
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Camera state
  const [mode, setMode] = useState<Mode>('select');
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [permissionState, setPermissionState] = useState<PermissionState>('unknown');
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check camera permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setPermissionState(result.state as PermissionState);
          
          // Listen for permission changes
          result.onchange = () => {
            setPermissionState(result.state as PermissionState);
            if (result.state === 'granted') {
              setCameraError(null);
              setShowPermissionHelp(false);
            }
          };
        }
      } catch (e) {
        // Permissions API not supported
        setPermissionState('unknown');
      }
    };
    
    checkPermission();
  }, []);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Stop camera when mode changes away from camera
  useEffect(() => {
    if (mode !== 'camera') {
      setIsCameraReady(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [mode]);

  const startCamera = useCallback(async () => {
    // Check browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Ваш браузер не підтримує доступ до камери');
      return;
    }

    try {
      setIsCameraLoading(true);
      setCameraError(null);
      setShowPermissionHelp(false);
      setIsCameraReady(false);
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMode('camera');
      setPermissionState('granted');
    } catch (error) {
      console.error('Camera error:', error);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setPermissionState('denied');
          setShowPermissionHelp(true);
          setCameraError('Доступ до камери заборонено');
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          setCameraError('Камера не знайдена на вашому пристрої');
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          setCameraError('Камера вже використовується іншою програмою');
        } else {
          setCameraError('Не вдалося отримати доступ до камери');
        }
      } else {
        setCameraError('Не вдалося отримати доступ до камери');
      }
    } finally {
      setIsCameraLoading(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraReady(false);
    setMode('select');
    setCameraError(null);
  }, []);

  // Handle video ready state
  const handleVideoCanPlay = useCallback(() => {
    setIsCameraReady(true);
    setIsCameraLoading(false);
  }, []);

  const capturePhoto = useCallback(() => {
    // Only capture if camera is ready
    if (!isCameraReady || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Make sure video has valid dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn('Video dimensions not ready');
      return;
    }
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setPreview(dataUrl);
    updateData({ palmImageUrl: dataUrl });
    
    // Stop camera and go to preview
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraReady(false);
    setMode('preview');
  }, [isCameraReady, updateData]);

  const switchCamera = useCallback(async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    setIsCameraReady(false);
    
    // Restart camera with new facing mode
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    try {
      setIsCameraLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      // isCameraReady will be set to true by onCanPlay event
    } catch (error) {
      console.error('Switch camera error:', error);
      setCameraError('Не вдалося перемкнути камеру');
    } finally {
      setIsCameraLoading(false);
    }
  }, [facingMode]);

  const handleRetake = useCallback(() => {
    setPreview(null);
    setIsCameraReady(false);
    updateData({ palmImageUrl: undefined });
    startCamera();
  }, [startCamera, updateData]);

  const handleClearPreview = useCallback(() => {
    setPreview(null);
    updateData({ palmImageUrl: undefined });
    setMode('select');
  }, [updateData]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, завантажте зображення');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      updateData({ palmImageUrl: dataUrl });
      setIsUploading(false);
      setMode('preview');
    };
    reader.readAsDataURL(file);
  }, [updateData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSkip = () => {
    updateData({ palmImageUrl: 'skipped' });
    nextStep();
  };

  const canContinue = !!preview;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="text-5xl mb-4"
        >
          🤚
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Аналіз долоні
        </h2>
        <p className="text-text-secondary">
          Завантажте фото вашої долоні для детального аналізу ліній долі
        </p>
      </div>

      {/* Hidden canvas for capturing photos */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main content area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <AnimatePresence mode="wait">
          {/* SELECT MODE */}
          {mode === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* File upload area */}
              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={cn(
                  'glass rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 border-dashed',
                  isDragging ? 'border-accent bg-accent/10' : 'border-white/20 hover:border-accent/50'
                )}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Hand className="w-16 h-16 text-accent opacity-60" />
                </motion.div>
                <p className="text-text-primary font-medium mb-2">
                  {isDragging ? 'Відпустіть файл тут' : 'Перетягніть фото сюди'}
                </p>
                <p className="text-sm text-text-secondary mb-4">
                  або натисніть для вибору файлу
                </p>
                <span className="flex items-center gap-2 text-xs text-text-muted bg-white/5 px-3 py-1.5 rounded-full">
                  <Upload className="w-3 h-3" /> Обрати файл
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
            </motion.div>
          )}

          {/* CAMERA MODE */}
          {mode === 'camera' && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl overflow-hidden border-2 border-accent/30"
            >
              {/* Video container */}
              <div className="relative aspect-[3/4] bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  onCanPlay={handleVideoCanPlay}
                  className="w-full h-full object-cover"
                />
                
                {/* Loading overlay */}
                {isCameraLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 className="w-12 h-12 text-accent animate-spin" />
                  </div>
                )}

                {/* Hand positioning guide overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Corner guides */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-accent/60 rounded-tl-xl" />
                  <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-accent/60 rounded-tr-xl" />
                  <div className="absolute bottom-24 left-8 w-16 h-16 border-b-2 border-l-2 border-accent/60 rounded-bl-xl" />
                  <div className="absolute bottom-24 right-8 w-16 h-16 border-b-2 border-r-2 border-accent/60 rounded-br-xl" />
                  
                  {/* Instructions */}
                  <div className="absolute top-4 left-0 right-0 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-sm text-white">
                      Розмістіть долоню в рамці
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={stopCamera}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                {/* Camera switch button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={switchCamera}
                  disabled={isCameraLoading}
                  className="absolute top-4 left-4 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={cn("w-5 h-5 text-white", isCameraLoading && "animate-spin")} />
                </motion.button>
              </div>

              {/* Capture controls */}
              <div className="p-4 flex flex-col items-center gap-3">
                <motion.button
                  whileHover={isCameraReady ? { scale: 1.05 } : {}}
                  whileTap={isCameraReady ? { scale: 0.95 } : {}}
                  onClick={capturePhoto}
                  disabled={!isCameraReady || isCameraLoading}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                    isCameraReady 
                      ? "bg-gradient-to-r from-accent to-teal-500 shadow-glow cursor-pointer" 
                      : "bg-gray-600 cursor-not-allowed opacity-50"
                  )}
                >
                  <div className="w-14 h-14 rounded-full border-4 border-white/30 flex items-center justify-center">
                    {isCameraReady ? (
                      <Camera className="w-6 h-6 text-background" />
                    ) : (
                      <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
                    )}
                  </div>
                </motion.button>
                <p className="text-xs text-white/70">
                  {isCameraReady ? 'Натисніть щоб зробити фото' : 'Камера завантажується...'}
                </p>
              </div>
            </motion.div>
          )}

          {/* PREVIEW MODE */}
          {mode === 'preview' && preview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl overflow-hidden border-2 border-accent/30"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={preview}
                  alt="Palm preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Success indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-0 right-0 text-center"
                >
                  <span className="inline-block px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent font-medium">
                    ✓ Фото готове
                  </span>
                </motion.div>
              </div>

              {/* Preview controls */}
              <div className="p-4 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearPreview}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-secondary text-sm">Скасувати</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetake}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-accent" />
                  <span className="text-text-primary text-sm">Перезняти</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Camera button - separate prominent block */}
      {mode === 'select' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startCamera}
            disabled={isCameraLoading}
            className="w-full glass rounded-2xl p-6 flex items-center justify-center gap-4 border-2 border-accent/30 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 disabled:opacity-50 group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-accent to-teal-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              {isCameraLoading ? (
                <Loader2 className="w-7 h-7 text-background animate-spin" />
              ) : (
                <Camera className="w-7 h-7 text-background" />
              )}
            </div>
            <div className="text-left">
              <p className="text-text-primary font-semibold text-lg">
                {isCameraLoading ? 'Запуск камери...' : 
                 permissionState === 'denied' ? 'Дозволити камеру' : 'Зробити фото'}
              </p>
              <p className="text-sm text-text-secondary">
                {isCameraLoading ? 'Очікуємо дозвіл...' :
                 permissionState === 'prompt' || permissionState === 'unknown' 
                   ? 'Натисніть щоб дозволити доступ до камери' 
                   : permissionState === 'denied'
                   ? 'Натисніть щоб спробувати знову'
                   : 'Сфотографуйте долоню прямо зараз'}
              </p>
            </div>
          </motion.button>
          
          {/* Permission prompt hint */}
          {(permissionState === 'prompt' || permissionState === 'unknown') && !cameraError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-3 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm text-center"
            >
              <span className="inline-flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Браузер запитає дозвіл на доступ до камери
              </span>
            </motion.div>
          )}

          {/* Error message with permission help */}
          {cameraError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3"
            >
              <div className="p-4 rounded-xl bg-error/10 border border-error/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-error text-sm font-medium mb-2">{cameraError}</p>
                    
                    {showPermissionHelp && (
                      <div className="space-y-3">
                        <p className="text-text-secondary text-xs">
                          Щоб дозволити доступ до камери:
                        </p>
                        <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside">
                          <li>Натисніть на іконку 🔒 зліва від адресної строки</li>
                          <li>Знайдіть "Камера" або "Camera"</li>
                          <li>Змініть на "Дозволити" або "Allow"</li>
                          <li>Оновіть сторінку</li>
                        </ol>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setCameraError(null);
                              setShowPermissionHelp(false);
                              startCamera();
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-medium hover:bg-accent/30 transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Спробувати знову
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-text-secondary text-xs font-medium hover:bg-white/15 transition-colors"
                          >
                            <Settings className="w-3 h-3" />
                            Оновити сторінку
                          </motion.button>
                        </div>
                      </div>
                    )}
                    
                    {!showPermissionHelp && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startCamera}
                        className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-medium hover:bg-accent/30 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Спробувати знову
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-4 mb-6"
      >
        <p className="text-sm text-text-secondary text-center">
          💡 Порада: розкрийте долоню і сфотографуйте її при хорошому освітленні
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" onClick={prevStep}>
            Назад
          </Button>
          <Button onClick={nextStep} disabled={!canContinue} isLoading={isUploading}>
            Аналізувати
          </Button>
        </div>
        <button
          onClick={handleSkip}
          className="text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          Пропустити цей крок
        </button>
      </div>
    </motion.div>
  );
}
