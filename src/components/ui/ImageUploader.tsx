import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { compressImage } from '../../utils/imageUpload';

export interface UploadedImage {
  url: string;
  alt: string;
  sizeBytes: number;
  fileName: string;
}

interface ImageUploaderProps {
  onUpload: (images: UploadedImage[]) => void;
  maxFiles?: number;
  label?: string;
}

export const ImageUploader = ({
  onUpload,
  maxFiles = 10,
  label = 'Drag & drop images here, or click to browse',
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState('');

  const handleFiles = async (files: FileList | File[]) => {
    setError('');
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith('image/')
    );

    if (fileArray.length === 0) {
      setError('Please select valid image files.');
      return;
    }

    if (fileArray.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} images at a time.`);
      return;
    }

    setIsProcessing(true);
    setProgress({ done: 0, total: fileArray.length });

    const results: UploadedImage[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      try {
        const dataUrl = await compressImage(file);
        results.push({
          url: dataUrl,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          sizeBytes: Math.round(dataUrl.length * 0.75),
          fileName: file.name,
        });
      } catch (err) {
        console.error('Failed to process:', file.name, err);
      }
      setProgress({ done: i + 1, total: fileArray.length });
    }

    setIsProcessing(false);
    setProgress({ done: 0, total: 0 });

    if (results.length > 0) {
      onUpload(results);
    } else {
      setError('No images could be processed.');
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isProcessing && inputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-sm p-8 md:p-12 text-center transition-all duration-200 ${
          isDragging
            ? 'border-gold-primary bg-gold-primary/5 scale-[1.01]'
            : 'border-text-muted hover:border-gold-primary hover:bg-gold-primary/5'
        } ${isProcessing ? 'pointer-events-none opacity-70' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={maxFiles > 1}
          onChange={handleChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 border-2 border-gold-primary/30 border-t-gold-primary rounded-full animate-spin" />
              <p className="text-text-primary text-sm font-medium">
                Processing {progress.done} of {progress.total}...
              </p>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{
                    width: `${
                      progress.total
                        ? (progress.done / progress.total) * 100
                        : 0
                    }%`,
                  }}
                  className="h-full bg-gold-primary"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-4xl text-gold-primary">⬆</div>
              <p className="text-text-primary text-sm font-medium">{label}</p>
              <p className="text-text-muted text-xs">
                JPG, PNG, WebP · up to {maxFiles} file{maxFiles > 1 ? 's' : ''} · auto-compressed
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
          {error}
        </p>
      )}
    </div>
  );
};