import logoImage from '@/assets/logo.svg'
import Image from 'next/image'
import { Plus } from 'lucide-react'

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between">
      <Image src={logoImage} alt="Daily" />
      <button
        type="button"
        className="flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500" />
        New Daily
      </button>
    </header>
  )
}
