import { Check } from 'lucide-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react'
import { api } from '@/lib/axios'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export default function NewDailyForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function createNewHabit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    api
      .post('/habits', {
        title,
        weekDays,
      })
      .then(() => {
        alert('Daily criada com sucesso!')
        setTitle('')
        setWeekDays([])
      })
      .catch((err) => console.error(err))
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="mt-6 flex w-full flex-col">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex: Exercícios, dormir bem, etc..."
        className="mt-3 rounded-lg bg-zinc-800 p-4 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="" className="mt-4 font-semibold leading-tight">
        Qual a recorrência
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((day, i) => (
          <Checkbox.Root
            key={`${day}-${i}`}
            className="group flex items-center gap-3 focus:outline-none"
            checked={weekDays.includes(i)}
            onCheckedChange={() => handleToggleWeekDay(i)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="leading-tight text-white">{day}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} strokeWidth={2.5} />
        Confirmar
      </button>
    </form>
  )
}
