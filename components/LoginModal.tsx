import React from 'react';
import { X, Sparkles, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2rem] p-8 shadow-2xl transform transition-transform duration-500 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95">
        {/* Handle for mobile drag-down look */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8 sm:hidden" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-foodin-orange/10 mb-6 relative group">
             <div className="absolute inset-0 bg-foodin-orange/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
             <img src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png" className="w-12 h-12 relative z-10" alt="Logo" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-foodin-gray mb-3 tracking-tight">
            Craving for more?
          </h2>
          <p className="text-gray-500 font-sans text-base mb-10 leading-relaxed px-4">
            Join the <span className="text-foodin-orange font-bold">Foodin</span> community to save your favorite spots and interact with foodies.
          </p>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 bg-foodin-gray text-white py-4 px-6 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-foodin-gray py-4 px-6 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              <Mail className="w-5 h-5" />
              Sign in with Email
            </button>
          </div>

          <p className="mt-8 text-xs text-gray-400 font-ui px-10">
            By continuing, you agree to Foodin's <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
