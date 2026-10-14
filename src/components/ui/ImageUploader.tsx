import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface UploadedImage {
  file: File;
  alt: string;
  previewUrl: string;
}

interface ImageUploaderProps {
  onUpload: (images: UploadedImage[]) => void;
  maxFiles?: number;
  label?: string;
  maxFileSizeMB?: number;
}

export const ImageUploader = ({
  onUpload,
  maxFiles = 10,
  label = 'Drag & drop images here, or click to browse',
  maxFileSizeMB = 5,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const maxBytes = maxFileSizeMB * 1024 * 1024;

  const handleFiles = (files: FileList | File[]) => {
    setError('');
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));

    if (fileArray.length === 0) {
      setError('Please select valid image files.');
      return;
    }

    if (fileArray.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} images at a time.`);
      return;
    }

    const tooLarge = fileArray.find((f) => f.size > maxBytes);
    if (tooLarge) {
      setError(`"${tooLarge.name}" exceeds ${maxFileSizeMB}MB.`);
      return;
    }

    const uploaded: UploadedImage[] = fileArray.map((file) => ({
      file,
      alt: file.name.replace(/\.[^/.]+$/, ''),
      previewUrl: URL.createObjectURL(file),
    }));

    onUpload(uploaded);

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
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-sm p-8 md:p-12 text-center transition-all duration-200 ${
          isDragging
            ? 'border-gold-primary bg-gold-primary/5 scale-[1.01]'
            : 'border-text-muted hover:border-gold-primary hover:bg-gold-primary/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={maxFiles > 1}
          onChange={handleChange}
          className="hidden"
        />

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="text-4xl text-gold-primary">⬆</div>
            <p className="text-text-primary text-sm font-medium">{label}</p>
            <p className="text-text-muted text-xs">
              JPG, PNG, WebP · up to {maxFiles} file{maxFiles > 1 ? 's' : ''} · max {maxFileSizeMB}MB each
            </p>
          </motion.div>
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