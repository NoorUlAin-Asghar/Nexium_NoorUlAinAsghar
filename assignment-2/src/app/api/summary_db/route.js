// app/api/summary_db/route.ts
import { NextResponse } from 'next/server'
import { getAllSummaries } from '@/lib/summary'

export async function GET() {
  const data = await getAllSummaries()
  return NextResponse.json(data)
}
