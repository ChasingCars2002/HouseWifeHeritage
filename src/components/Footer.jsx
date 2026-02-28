import { Diamond, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-obsidian text-white/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Diamond className="w-5 h-5 text-gold/60" />
            <span className="font-display text-sm text-white/60">Housewife Heritage</span>
          </div>
          <p className="text-xs text-center sm:text-right flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose inline" /> for Bravo fans everywhere.
            Not affiliated with Bravo or NBCUniversal.
          </p>
        </div>
      </div>
    </footer>
  )
}
