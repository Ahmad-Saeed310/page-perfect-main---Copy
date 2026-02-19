import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import { CanvasImageData } from '@/lib/canvasTypes';

interface ImageUploaderProps {
  images: CanvasImageData[];
  onImagesChange: (images: CanvasImageData[]) => void;
}

export function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const newImage: CanvasImageData = {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            src: event.target?.result as string,
            x: 50,
            y: 50,
            width: Math.min(img.width, 200),
            height: Math.min(img.height, 200),
          };
          onImagesChange([...images, newImage]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };

  return (
    <div className="control-section">
      <label className="control-label">Images</label>
      <p className="text-xs text-muted-foreground mb-2">
        Upload images to embed on the page. Drag to position.
      </p>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
      
      <Button
        variant="outline"
        size="sm"
        className="w-full mb-2"
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus className="w-4 h-4 mr-2" />
        Upload Image
      </Button>

      {images.length > 0 && (
        <div className="space-y-2 mt-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex items-center gap-2 p-2 bg-secondary rounded-md"
            >
              <img
                src={img.src}
                alt="Uploaded"
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-xs text-muted-foreground flex-1 truncate">
                Image
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => removeImage(img.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
