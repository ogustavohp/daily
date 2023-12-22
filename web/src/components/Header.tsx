'use client'
import logoImage from '@/assets/logo.svg'
import Image from 'next/image'
import { Plus, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import NewDailyForm from './NewDailyForm'

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between">
      <Image src={logoImage} alt="Daily" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold transition-colors hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
        >
          <Plus size={20} className="text-violet-500" />
          New Daily
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />
          <Dialog.Content className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 p-10">
            <Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl font-extrabold leading-tight">
              Criar Daily
            </Dialog.Title>
            <NewDailyForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  )
}
