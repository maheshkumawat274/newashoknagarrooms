// components/SEO.tsx
import { useEffect } from 'react';

export default function LANDINGSEO({ title, description, keywords }: { 
  title: string; 
  description: string; 
  keywords: string;
}) {
  useEffect(() => {
    document.title = title;
    
    const updateMetaTag = (name: string, content: string, isProperty: boolean = false) => {
      let selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (isProperty) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('description', description, false);
    updateMetaTag('keywords', keywords, false);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:card', 'summary_large_image', false);
    
  }, [title, description, keywords]);

  return null;
}