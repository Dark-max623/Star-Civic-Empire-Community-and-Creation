import { useState } from 'react';
import { ImageUploader, type UploadedImage } from './ImageUploader';

interface SingleImageUploaderProps {
  value: string;
  onChange: (dataUrl: string) => void;
}

export const SingleImageUploader = ({
  value,
  onChange,
}: SingleImageUploaderProps) => {
  const [showUploader, setShowUploader] = useState(!value);

  const handleUpload = (images: UploadedImage[]) => {
    if (images[0]) {
      onChange(images[0].url);
      setShowUploader(false);
    }
  };

  if (value && !showUploader) {
    return (
      <div className="flex items-center gap-3 bg-bg-dark border border-text-muted rounded-sm p-3">
        <img
          src={value}
          alt="Preview"
          className="w-16 h-16 object-cover rounded-sm"
        />
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-xs font-medium truncate">
            Image ready
          </p>
          <p className="text-text-muted text-[10px]">
            {(value.length * 2 / 1024).toFixed(0)} KB
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            onChange('');
            setShowUploader(true);
          }}
          className="text-red-400 text-xs uppercase tracking-widest hover:text-red-300"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <ImageUploader
      onUpload={handleUpload}
      maxFiles={1}
      label="Upload event image"
    />
  );
};