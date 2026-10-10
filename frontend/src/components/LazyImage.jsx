import { useState, useRef, useEffect } from 'react';

/**
 * Optimizes image URLs by appending size/quality parameters.
 * For Unsplash images, this can reduce payload from 5MB to ~50KB.
 */
const optimizeUrl = (url, width = 600) => {
  if (!url) return '';
  // Unsplash: append width and quality params
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&q=75&fm=webp`;
  }
  return url;
};

/**
 * High-performance lazy image component.
 * - Only loads when the image scrolls into view (IntersectionObserver)
 * - Requests optimized/smaller versions of Unsplash images
 * - Shows a CSS-only shimmer placeholder (no JS animation overhead)
 * - Fades in smoothly once loaded
 * - Uses native loading="lazy" and decoding="async" as fallbacks
 */
const LazyImage = ({ src, alt, className = '', width = 600 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // IntersectionObserver: only start loading when near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const optimizedSrc = optimizeUrl(src, width);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* CSS-only shimmer placeholder — zero JS overhead */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-zinc-100"
          style={{
            backgroundImage: 'linear-gradient(90deg, #f4f4f5 0%, #e4e4e7 40%, #f4f4f5 80%)',
            backgroundSize: '200% 100%',
            animation: 'lazyShimmer 1.4s ease-in-out infinite',
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-zinc-50 flex items-center justify-center">
          <span className="text-zinc-300 text-[10px] font-bold uppercase tracking-widest">
            Image Unavailable
          </span>
        </div>
      )}

      {/* Actual image — only rendered once visible in viewport */}
      {isVisible && !hasError && (
        <img
          src={optimizedSrc}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

export default LazyImage;
