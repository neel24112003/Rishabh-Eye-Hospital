import React from 'react';

export default function EyeVisualizerCanvas() {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ background: '#070C14', minHeight: '420px' }}
    >
      {/* Teal/lime atmospheric glow behind model */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(53,166,183,0.09) 0%, rgba(184,237,120,0.03) 45%, transparent 70%)',
        }}
      />

      {/* Sketchfab iframe – Eyeball Extension Neuroanatomy */}
      <iframe
        title="Eyeball Extension Neuroanatomy"
        className="absolute inset-0 w-full h-full z-10"
        style={{ border: 'none', borderRadius: '16px' }}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/7d1ff51c69c04455b093bf03c67a0d40/embed?autostart=1&preload=1&ui_theme=dark&ui_color=35A6B7&ui_watermark=0&ui_watermark_link=0&ui_infos=0&ui_controls=0&ui_stop=0&ui_hint=0&ui_ar=0&ui_vr=0&ui_fullscreen=1&transparent=0&dnt=1"
      />

      {/* Themed border overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
        style={{
          boxShadow:
            'inset 0 0 0 1px rgba(53,166,183,0.22), inset 0 0 50px 8px rgba(5,12,20,0.45)',
        }}
      />

      {/* Corner accents – teal & lime */}
      <div className="absolute top-0 left-0 z-30 pointer-events-none">
        <div style={{ width: 28, height: 2, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
        <div style={{ width: 2, height: 28, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
      </div>
      <div className="absolute top-0 right-0 z-30 pointer-events-none flex flex-col items-end">
        <div style={{ width: 28, height: 2, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
        <div style={{ width: 2, height: 28, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
      </div>
      <div className="absolute bottom-0 left-0 z-30 pointer-events-none flex flex-col justify-end">
        <div style={{ width: 2, height: 28, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
        <div style={{ width: 28, height: 2, background: '#B8ED78', borderRadius: 2, opacity: 0.75 }} />
      </div>
      <div className="absolute bottom-0 right-0 z-30 pointer-events-none flex flex-col items-end justify-end">
        <div style={{ width: 2, height: 28, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
        <div style={{ width: 28, height: 2, background: '#35A6B7', borderRadius: 2, opacity: 0.85 }} />
      </div>
    </div>
  );
}
