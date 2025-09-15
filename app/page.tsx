import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-mystic-400 to-purple-400 bg-clip-text text-transparent">
          Mystic Tarot
        </h1>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mystic-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-mystic-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover Your
              </span>
              <span className="block mt-2 text-white">
                Mystic Path
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Unveil the mysteries of your past, present, and future through the ancient wisdom of Tarot cards. 
              Let the universe guide your journey of self-discovery.
            </p>

            <div className="space-y-4">
              <Link 
                href="/draw" 
                className="inline-block mystic-button text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
              >
                Begin Your Reading
              </Link>
              
              <div className="text-sm text-slate-400 mt-4">
                ✨ Daily limit: 3 readings ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mystic-card text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">Past, Present, Future</h3>
              <p className="text-slate-400 dark:text-slate-300">
                Discover the threads that connect your journey through time with our three-card spread.
              </p>
            </div>
            
            <div className="mystic-card text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold mb-2">Ancient Wisdom</h3>
              <p className="text-slate-400 dark:text-slate-300">
                Tap into centuries of mystical knowledge with authentic Tarot interpretations.
              </p>
            </div>
            
            <div className="mystic-card text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Personal Guidance</h3>
              <p className="text-slate-400 dark:text-slate-300">
                Receive personalized insights to help navigate life's challenges and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-slate-400 border-t border-slate-700/50">
        <p>&copy; 2024 Mystic Tarot. Embrace the mystery, trust the journey.</p>
      </footer>
    </div>
  )
}