import React from 'react';
import { MOCK_POSTS } from '../constants';
import { Heart, MessageCircle, Share, Bookmark, CheckCircle2 } from 'lucide-react';

interface SocialFeedProps {
  onAction: (type: 'like' | 'save' | 'comment', targetId: string) => boolean;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ onAction }) => {
  return (
    <div className="space-y-4 pb-24">
      {MOCK_POSTS.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-in fade-in duration-500">
          <div className="flex space-x-3">
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="w-10 h-10 rounded-full bg-gray-200 object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-semibold text-gray-900 text-sm">{post.user.name}</span>
                {post.user.isTrusted && (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                )}
                <span className="text-gray-400 text-xs">· {post.timestamp}</span>
              </div>
              
              <p className="text-gray-800 text-sm leading-relaxed mb-2 font-ui">
                {post.content}
              </p>

              {post.restaurant && (
                <div className="inline-flex items-center px-2 py-0.5 rounded bg-orange-50 text-foodin-orange text-xs font-mono font-medium mb-3">
                  {post.restaurant.triKeyword}
                </div>
              )}

              {post.image && (
                <div className="rounded-2xl overflow-hidden mb-3 shadow-sm border border-gray-100">
                  <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-64" />
                </div>
              )}

              <div className="flex items-center justify-between text-gray-400 pt-2">
                <button 
                  onClick={() => onAction('like', post.id)}
                  className="flex items-center gap-1 hover:text-red-500 transition-colors group"
                >
                  <Heart className="w-4 h-4 group-hover:fill-red-500" />
                  <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button 
                  onClick={() => onAction('comment', post.id)}
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Share className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onAction('save', post.id)}
                  className="flex items-center gap-1 hover:text-foodin-orange transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center py-4">
        <div className="w-8 h-8 border-2 border-foodin-orange border-t-transparent rounded-full animate-spin mx-auto opacity-50"></div>
      </div>
    </div>
  );
};

export default SocialFeed;
