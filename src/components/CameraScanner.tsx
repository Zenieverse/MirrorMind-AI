import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, Upload, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CameraScannerProps {
  onCapture: (image: string) => void;
  isScanning: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onCapture, isScanning }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1080 } },
          audio: false
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Camera access denied. Please enable camera permissions.');
        console.error(err);
      }
    }
    
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto rounded-full overflow-hidden border-4 border-neon-purple/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-luxury-charcoal text-center p-6">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover grayscale-[0.3] brightness-110"
          />
          
          {/* Face Mesh Overlay Simulation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-[15%] inset-y-[20%] border-2 border-neon-purple/50 rounded-[40%_40%_60%_60%] animate-pulse">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-neon-purple/30 shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-scan" />
            </div>
            
            <AnimatePresence>
                {isScanning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-neon-purple/10 backdrop-blur-[2px] flex items-center justify-center"
                    >
                         <div className="text-center">
                            <RefreshCw className="w-12 h-12 text-neon-purple animate-spin mx-auto mb-4" />
                            <p className="text-neon-purple font-mono tracking-widest uppercase text-sm">Mapping Facial Landmarks...</p>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={capture}
              disabled={isScanning}
              className="w-16 h-16 rounded-full bg-white text-luxury-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Camera className="w-8 h-8" />
            </button>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  );
};
