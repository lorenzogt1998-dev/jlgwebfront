// src/pages/gallery.tsx
import { useState } from "react";
import { X, Heart, MessageCircle, Send, Bookmark } from "lucide-react";

type GalleryPost = {
  id: number;
  image: string;
  caption: string;
  likes: number;
  comments: number;
};

const galleryPosts: GalleryPost[] = [
  { id: 1, image: "/images/DSC05015.jpg", caption: "", likes: 0, comments: 0 },
  { id: 2, image: "/images/DSC04837-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 3, image: "/images/DSC04839-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 4, image: "/images/DSC04855-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 5, image: "/images/DSC04858-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 6, image: "/images/DSC05012.jpg", caption: "", likes: 0, comments: 0 },
  { id: 7, image: "/images/DSC04999-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 8, image: "/images/DSC04993-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 9, image: "/images/DSC04996-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 10, image: "/images/DSC04869-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 11, image: "/images/DSC04871-Editar.jpg", caption: "", likes: 0, comments: 0 },
  { id: 12, image: "/images/DSC04936-Editar.jpg", caption: "", likes: 0, comments: 0 },
];

export default function Gallery() {
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);

  return (
    <div className="w-full px-4 py-12 pt-28">
      {/* HEADER estilo perfil Instagram */}
      <header className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
              <img
                src="/images/DSC06753.jpg"
                alt="Emanuel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              {/*
              <h1 className="text-2xl font-bold text-white">emanuel.jlg</h1>*/}
              <a 
                href="https://www.instagram.com/manu.l0pezz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:inline-block px-4 py-1.5 rounded-lg bg-neutral-800 text-sm font-semibold text-white hover:bg-neutral-700 transition cursor-pointer"
              >
                Follow
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-4">
              <div className="text-center md:text-left">
                <span className="font-bold text-black">12</span>{" "}
                <span className="text-neutral-400 text-sm">posts</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-bold text-black">2230</span>{" "}
                <span className="text-neutral-400 text-sm">followers</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-bold text-black">943</span>{" "}
                <span className="text-neutral-400 text-sm">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="text-sm">
              <p className="font-semibold text-white">Emanuel</p>
              <p className="text-neutral-400">Artist · Emanuel Lopez</p>
              <p className="text-neutral-400">Inspiring students through music</p>
            </div>
          </div>
        </div>
      </header>

      {/* GRID de fotos estilo Instagram */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {galleryPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square bg-neutral-800 overflow-hidden group cursor-pointer"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.caption || `Photo ${post.id}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600 group-hover:bg-neutral-700 transition-colors">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 3.75h16.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z"
                    />
                  </svg>
                </div>
              )}

              {/* Overlay con stats al hover */}
              {post.image && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                    <Heart className="w-5 h-5 fill-white" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    {post.comments}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL / Lightbox al click */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-neutral-800 rounded-full transition"
            onClick={() => setSelectedPost(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Contenido del modal */}
          <div
            className="bg-neutral-900 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen */}
            <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              {selectedPost.image ? (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.caption}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-neutral-600 flex flex-col items-center gap-3">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 3.75h16.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z"
                    />
                  </svg>
                  <p className="text-sm">Add photo here</p>
                </div>
              )}
            </div>

            {/* Sidebar con info */}
            <div className="md:w-80 flex flex-col bg-neutral-900">

              {/* Header del post
              <div className="flex items-center gap-3 p-4 border-b border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden">
                    <img
                      src="/images/DSC06753.jpg"
                      alt="Emanuel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-black">emanuel.jlg</span>
              </div>*/}

              {/* Caption */}
              {selectedPost.caption && (
                <div className="p-4 border-b border-neutral-800">
                  <p className="text-sm text-neutral-200">
                    {/*
                    <span className="font-semibold text-white">emanuel.jlg </span> */}
                    {selectedPost.caption}
                  </p>
                </div>
              )}

              {/* Acciones
              <div className="p-4 flex items-center gap-4 border-b border-neutral-800">
                <Heart className="w-6 h-6 text-white hover:text-red-500 cursor-pointer transition" />
                <MessageCircle className="w-6 h-6 text-white hover:text-neutral-400 cursor-pointer transition" />
                <Send className="w-6 h-6 text-white hover:text-neutral-400 cursor-pointer transition" />
                <Bookmark className="w-6 h-6 text-white hover:text-yellow-400 cursor-pointer transition ml-auto" />
              </div>*/}

              {/* Likes
              <div className="p-4">
                <p className="text-sm font-semibold text-white">
                  {selectedPost.likes} likes
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Add a comment...
                </p>
              </div>*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
