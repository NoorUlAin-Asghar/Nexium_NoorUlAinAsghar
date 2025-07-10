// app/api/summary_db/add/route.ts
import { NextResponse } from 'next/server'
import { addSummary } from '@/lib/summary'

export async function POST(req: Request) {
  const body = await req.json()
  const { url, english, urdu } = body

  if (!url || !english || !urdu) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await addSummary(url, english, urdu)
  return NextResponse.json({ message: "Added" })
}
