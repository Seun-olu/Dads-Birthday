import { useEffect, useState } from 'react'
import { TRIBUTES } from '../data/content'
import { TRIBUTES_SHEET_CSV_URL } from '../data/tributesConfig'

export type TributeItem = {
  from: string
  relation?: string
  note: string
}

type TributeStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error'

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false
  const src = text.replace(/^\uFEFF/, '')

  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i]
    const next = src[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i += 1
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(cell.trim())
      cell = ''
    } else if (ch === '\n') {
      row.push(cell.trim())
      if (row.some(Boolean)) rows.push(row)
      row = []
      cell = ''
    } else if (ch !== '\r') {
      cell += ch
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim())
    if (row.some(Boolean)) rows.push(row)
  }

  return rows
}

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function findColumn(headers: string[], keys: string[]) {
  const normalized = headers.map(normalizeHeader)
  for (const key of keys) {
    const index = normalized.findIndex((header) => header.includes(key))
    if (index >= 0) return index
  }
  return -1
}

function rowsToTributes(rows: string[][]): TributeItem[] {
  if (rows.length < 2) return []

  const headers = rows[0]
  const fromIndex = findColumn(headers, ['name', 'from', 'guest', 'author'])
  const relationIndex = findColumn(headers, ['relationship', 'relation'])
  const noteIndex = findColumn(headers, [
    'tribute',
    'message',
    'note',
    'wish',
    'words',
  ])

  const fallbackNoteIndex =
    noteIndex >= 0
      ? noteIndex
      : headers.findIndex((header) => !/timestamp|time|date/i.test(header))

  return rows
    .slice(1)
    .map((row) => {
      const from = (fromIndex >= 0 ? row[fromIndex] : '')?.trim() || 'Guest'
      const relation = (relationIndex >= 0 ? row[relationIndex] : '')?.trim()
      const note = (fallbackNoteIndex >= 0 ? row[fallbackNoteIndex] : '')?.trim() || ''
      return {
        from,
        relation: relation || undefined,
        note,
      }
    })
    .filter((item) => item.note.length > 0)
    .reverse()
}

export function useTributes() {
  const sheetUrl = TRIBUTES_SHEET_CSV_URL
  const [items, setItems] = useState<TributeItem[]>(
    sheetUrl ? [] : TRIBUTES.items
  )
  const [status, setStatus] = useState<TributeStatus>(
    sheetUrl ? 'loading' : 'idle'
  )

  useEffect(() => {
    if (!sheetUrl) return

    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      try {
        const response = await fetch(sheetUrl, {
          signal: controller.signal,
          cache: 'no-store',
        })
        if (!response.ok) throw new Error('Could not load tributes')
        const text = await response.text()
        const next = rowsToTributes(parseCsv(text))
        setItems(next)
        setStatus(next.length > 0 ? 'ready' : 'empty')
      } catch {
        if (controller.signal.aborted) return
        setItems(TRIBUTES.items)
        setStatus('error')
      }
    }

    void load()
    return () => controller.abort()
  }, [sheetUrl])

  return { items, status, connected: Boolean(sheetUrl) }
}
