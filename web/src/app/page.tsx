import Header from '@/components/Header'
import SummaryTable from '@/components/SummaryTable'

export default function Home() {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-16 px-6">
      <Header />
      <SummaryTable />
    </div>
  )
}
