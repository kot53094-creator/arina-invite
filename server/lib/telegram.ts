export const ALLOWED = {
  activities: [
    'Поиграем',
    'Погуляем',
    'Посмотрим фильм',
    'Куда-нибудь сходим',
    'Придумаем что-нибудь своё',
  ],
  games: [
    'Roblox',
    'Minecraft',
    'It Takes Two',
    'Among Us',
    'Valorant',
    'Terraria',
    'Stardew Valley',
  ],
  moods: [
    'Просто погулять',
    'Зайти куда-нибудь',
    'Вечерняя прогулка',
    'Главное — вместе',
  ],
  movies: ['Фильм', 'Сериал', 'Комедия', 'Что-нибудь страшное'],
  hangouts: ['Кафе', 'Парк', 'Кинотеатр', 'Сюрприз'],
  customs: ['Импровизация', 'Твой выбор', 'Что-нибудь новое', 'Как в прошлый раз'],
  dates: ['Сегодня', 'Завтра', 'На выходных', 'Выберем вместе'],
} as const

export type InvitationChoice = {
  name?: string
  activity?: string
  game?: string
  mood?: string
  movie?: string
  hangout?: string
  custom?: string
  date?: string
  finalChoice?: 'yes' | 'no'
}

export type ChoiceEvent =
  | 'start'
  | 'activity'
  | 'game'
  | 'mood'
  | 'movie'
  | 'hangout'
  | 'custom'
  | 'date'
  | 'yes'
  | 'no'
  | 'final'

function isNonEmptyString(v: unknown, max = 80): v is string {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= max
}

export function validateChoice(
  body: unknown,
): { ok: true; data: InvitationChoice; event?: ChoiceEvent } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid body' }
  }
  const raw = body as Record<string, unknown>
  const data: InvitationChoice = {}

  if (raw.name !== undefined) {
    if (!isNonEmptyString(raw.name, 40)) return { ok: false, error: 'Invalid name' }
    data.name = raw.name.trim()
  } else {
    data.name = 'Арина'
  }

  const checks: Array<[keyof InvitationChoice, readonly string[]]> = [
    ['activity', ALLOWED.activities],
    ['game', ALLOWED.games],
    ['mood', ALLOWED.moods],
    ['movie', ALLOWED.movies],
    ['hangout', ALLOWED.hangouts],
    ['custom', ALLOWED.customs],
    ['date', ALLOWED.dates],
  ]

  for (const [key, allowed] of checks) {
    const val = raw[key]
    if (val === undefined || val === null || val === '') continue
    if (!isNonEmptyString(val) || !(allowed as readonly string[]).includes(val)) {
      return { ok: false, error: `Invalid ${key}` }
    }
    ;(data as Record<string, string>)[key] = val
  }

  if (raw.finalChoice !== undefined) {
    if (raw.finalChoice !== 'yes' && raw.finalChoice !== 'no') {
      return { ok: false, error: 'Invalid finalChoice' }
    }
    data.finalChoice = raw.finalChoice
  }

  const allowedEvents = new Set<string>([
    'start',
    'activity',
    'game',
    'mood',
    'movie',
    'hangout',
    'custom',
    'date',
    'yes',
    'no',
    'final',
  ])

  let event: ChoiceEvent | undefined
  if (raw.event !== undefined) {
    if (typeof raw.event !== 'string' || !allowedEvents.has(raw.event)) {
      return { ok: false, error: 'Invalid event' }
    }
    event = raw.event as ChoiceEvent
  }

  const knownKeys = new Set([
    'name',
    'activity',
    'game',
    'mood',
    'movie',
    'hangout',
    'custom',
    'date',
    'finalChoice',
    'event',
  ])
  for (const key of Object.keys(raw)) {
    if (!knownKeys.has(key)) {
      return { ok: false, error: 'Unknown field' }
    }
  }

  return { ok: true, data, event }
}

function formatTime(d = new Date()) {
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function buildMessage(data: InvitationChoice, event?: ChoiceEvent): string {
  const name = data.name ?? 'Арина'
  const time = formatTime()

  if (data.finalChoice === 'no' || event === 'no') {
    return [
      'АРИНА НАЖАЛА «НЕТ»',
      '',
      'Но кнопку всё-таки удалось поймать',
      '',
      'Выбор:',
      data.activity ? `Занятие: ${data.activity}` : null,
      data.game ? `Игра: ${data.game}` : null,
      data.mood ? `Настроение: ${data.mood}` : null,
      data.movie ? `Кино: ${data.movie}` : null,
      data.hangout ? `Куда: ${data.hangout}` : null,
      data.custom ? `Идея: ${data.custom}` : null,
      data.date ? `Когда: ${data.date}` : null,
      '',
      time,
    ]
      .filter((l) => l !== null)
      .join('\n')
  }

  if (data.finalChoice === 'yes' || event === 'yes' || event === 'final') {
    return [
      'ПРИГЛАШЕНИЕ ПРИНЯТО',
      '',
      `Кто: ${name}`,
      data.activity ? `Занятие: ${data.activity}` : null,
      data.game ? `Игра: ${data.game}` : null,
      data.mood ? `Настроение: ${data.mood}` : null,
      data.movie ? `Кино: ${data.movie}` : null,
      data.hangout ? `Куда: ${data.hangout}` : null,
      data.custom ? `Идея: ${data.custom}` : null,
      data.date ? `Когда: ${data.date}` : null,
      'Ответ: ДА',
      '',
      time,
    ]
      .filter((l) => l !== null)
      .join('\n')
  }

  if (event === 'start') {
    return `Арина открыла приглашение\n\n${time}`
  }
  if (event === 'activity' && data.activity) {
    return `Новый выбор\n\n${name}\nВыбрала: ${data.activity}\n\n${time}`
  }
  if (event === 'game' && data.game) {
    return `Выбрала игру\n\n${data.game}\n\n${time}`
  }
  if (event === 'mood' && data.mood) {
    return `Настроение прогулки\n\n${data.mood}\n\n${time}`
  }
  if (event === 'movie' && data.movie) {
    return `Выбор кино\n\n${data.movie}\n\n${time}`
  }
  if (event === 'hangout' && data.hangout) {
    return `Куда сходим\n\n${data.hangout}\n\n${time}`
  }
  if (event === 'custom' && data.custom) {
    return `Свой вариант\n\n${data.custom}\n\n${time}`
  }
  if (event === 'date' && data.date) {
    return `Когда\n\n${data.date}\n\n${time}`
  }

  return `Обновление\n\n${JSON.stringify(data)}\n\n${time}`
}

export async function sendTelegram(text: string): Promise<{ ok: boolean }> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return { ok: false }
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[telegram] API error', res.status, body.slice(0, 200))
      return { ok: false }
    }
    return { ok: true }
  } catch (err) {
    console.error('[telegram] Network error', err)
    return { ok: false }
  }
}

export async function handleChoiceRequest(body: unknown): Promise<{
  status: number
  json: { ok: boolean; delivered?: boolean; error?: string }
}> {
  const validated = validateChoice(body)
  if (!validated.ok) {
    return { status: 400, json: { ok: false, error: 'Invalid request' } }
  }

  const text = buildMessage(validated.data, validated.event)
  const result = await sendTelegram(text)
  return { status: 200, json: { ok: true, delivered: result.ok } }
}
