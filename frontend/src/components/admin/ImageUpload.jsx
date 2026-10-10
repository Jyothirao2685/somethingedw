import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

const ImageUpload = ({ label, onUpload, currentImage, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('adminToken');

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    try {
      if (multiple) {
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/media/upload-multiple`, {
          method: 'POST',
          headers: { 'x-admin-token': token },
          body: formData
        });
        const data = await res.json();
        if (res.ok) onUpload(data.urls);
      } else {
        formData.append('image', files[0]);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/media/upload`, {
          method: 'POST',
          headers: { 'x-admin-token': token },
          body: formData
        });
        const data = await res.json();
        if (res.ok) onUpload(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Check if server is running and multer is installed.');
    } finally {
      setUploading(false);
    }
  };

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</label>
      
      <div className="flex flex-wrap gap-4 items-center">
        {/* Preview */}
        {!multiple && currentImage && (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 group">
            <img src={getFullUrl(currentImage)} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => onUpload('')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {multiple && currentImage && Array.isArray(currentImage) && currentImage.map((url, idx) => (
          <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-200 group">
            <img src={getFullUrl(url)} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => onUpload(currentImage.filter((_, i) => i !== idx))}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        <label className={`
          flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed 
          ${uploading ? 'border-zinc-200 bg-zinc-50' : 'border-zinc-200 hover:border-brand-orange hover:bg-brand-orange/5'} 
          cursor-pointer transition-all
        `}>
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-brand-orange" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-zinc-400" />
              <span className="text-[10px] text-zinc-400 mt-1 font-medium">
                {multiple ? 'Add More' : 'Upload'}
              </span>
            </>
          )}
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            multiple={multiple}
            accept="image/*"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
