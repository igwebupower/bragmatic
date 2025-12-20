"use client";

import { useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
  /** YouTube, Vimeo, or direct video URL */
  src?: string;
  /** Thumbnail image URL (shows before play) */
  thumbnail?: string;
  /** Placeholder text when no video */
  placeholder?: string;
  /** Aspect ratio: "16:9" (landscape) or "9:16" (portrait/vertical) */
  aspect?: "16:9" | "9:16";
  /** Optional title for accessibility */
  title?: string;
};

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  // Direct video URL (mp4, webm, etc)
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return url;
  }

  return null;
}

function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return null;
}

export function VideoEmbed({
  src,
  thumbnail,
  placeholder = "Video coming soon",
  aspect = "16:9",
  title = "Video",
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  const aspectClass = aspect === "9:16" ? "aspect-[9/16]" : "aspect-video";
  const embedUrl = src ? getEmbedUrl(src) : null;
  const autoThumbnail = src ? getYouTubeThumbnail(src) : null;
  const thumbSrc = thumbnail || autoThumbnail;

  // No video source - show placeholder
  if (!src) {
    return (
      <div
        className={`relative ${aspectClass} bg-surface-card border border-dashed border-border-subtle rounded-xl flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="text-4xl opacity-40 mb-2">&#9654;</div>
          <p className="text-text-muted text-sm">{placeholder}</p>
        </div>
      </div>
    );
  }

  // Direct video file
  if (embedUrl && src.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <div className={`relative ${aspectClass} rounded-xl overflow-hidden bg-black`}>
        <video
          src={src}
          controls
          className="absolute inset-0 w-full h-full object-cover"
          title={title}
        />
      </div>
    );
  }

  // Embed (YouTube/Vimeo) - show thumbnail until clicked
  if (embedUrl && !playing) {
    return (
      <button
        onClick={() => setPlaying(true)}
        className={`relative ${aspectClass} w-full rounded-xl overflow-hidden bg-black group cursor-pointer`}
        aria-label={`Play ${title}`}
      >
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-surface-card" />
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/40">
          <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center transition-transform group-hover:scale-110">
            <svg
              className="w-6 h-6 text-brand-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  // Playing - show iframe
  if (embedUrl && playing) {
    return (
      <div className={`relative ${aspectClass} rounded-xl overflow-hidden bg-black`}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Fallback
  return (
    <div
      className={`relative ${aspectClass} bg-surface-card border border-dashed border-border-subtle rounded-xl flex items-center justify-center`}
    >
      <p className="text-text-muted text-sm">Invalid video URL</p>
    </div>
  );
}

/**
 * Grid of video embeds for showcase sections
 */
export function VideoGrid({
  videos,
}: {
  videos: Array<{
    src?: string;
    thumbnail?: string;
    title?: string;
  }>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map((video, i) => (
        <VideoEmbed
          key={i}
          src={video.src}
          thumbnail={video.thumbnail}
          title={video.title || `Video ${i + 1}`}
          aspect="9:16"
        />
      ))}
    </div>
  );
}
