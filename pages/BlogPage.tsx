
import React, { useState } from 'react';
import { BlogPost, Language } from '../types';
import { INITIAL_BLOG_POSTS } from '../constants';

interface BlogPageProps {
  lang: Language;
}

const BlogPage: React.FC<BlogPageProps> = ({ lang }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Scroll to top when opening a post
  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Article View
  if (selectedPost) {
      return (
        <div className="animate-fade-in-up py-24 max-w-[1920px] mx-auto px-6 md:px-12 relative min-h-screen">
            <button 
                onClick={handleBack}
                className="fixed top-24 left-6 md:left-12 z-50 text-xs text-mutedGold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 bg-charcoal/50 backdrop-blur px-4 py-2 rounded-full border border-white/5"
            >
                ← Back to Journal
            </button>

            <article className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                        {selectedPost.date} • {selectedPost.author}
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8">
                        {selectedPost.title[lang]}
                    </h1>
                </div>

                <div className="w-full aspect-video mb-16 overflow-hidden rounded-xl shadow-2xl">
                    <img 
                        src={selectedPost.imageUrl} 
                        alt={selectedPost.title[lang]} 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="prose prose-invert prose-lg mx-auto font-serif text-gray-300 leading-loose">
                    {selectedPost.content[lang].split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-8 first-letter:text-5xl first-letter:text-mutedGold first-letter:font-serif first-letter:mr-2 first-letter:float-left">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="mt-20 pt-12 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-500 italic mb-6">Share this story</p>
                    <div className="flex justify-center gap-6">
                        {['Twitter', 'Facebook', 'Email'].map(platform => (
                            <button key={platform} className="text-xs text-mutedGold uppercase tracking-widest hover:text-white transition-colors border border-mutedGold/20 px-4 py-2 rounded-full hover:bg-mutedGold hover:text-charcoal hover:border-transparent">
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>
            </article>
        </div>
      );
  }

  // List View
  return (
    <div className="animate-fade-in-up py-24 max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
            <span className="text-mutedGold text-xs uppercase tracking-[0.3em] mb-4 block">The Journal</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white">Curated Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {INITIAL_BLOG_POSTS.map(post => (
                <article key={post.id} className="group cursor-pointer" onClick={() => handleReadPost(post)}>
                    <div className="overflow-hidden rounded-xl mb-6 shadow-2xl relative aspect-[4/3]">
                        <div className="absolute inset-0 bg-charcoal z-0 animate-pulse"></div>
                        <img 
                            src={post.imageUrl} 
                            alt={post.title[lang]} 
                            className="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-110 z-10 relative opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-20"></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500 mb-3">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-mutedGold rounded-full"></span>
                            <span>{post.author}</span>
                        </div>
                        <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-mutedGold transition-colors leading-tight">
                            {post.title[lang]}
                        </h3>
                        <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt[lang]}
                        </p>
                        <span className="inline-block text-xs text-white border-b border-white/20 pb-1 group-hover:border-mutedGold group-hover:text-mutedGold transition-colors">
                            Read Article
                        </span>
                    </div>
                </article>
            ))}
        </div>
    </div>
  );
};

export default BlogPage;
