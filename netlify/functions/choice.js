/**
 * Self-contained Netlify function — no TS path imports that break bundling.
 */

const ALLOWED = {
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
}

const EVENTS = new Set([
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

function formatTime() {
  return new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function validate(body) {
  if (!body || typeof body !== 'object') return { ok: false }
  const data = { name: 'Арина' }
  if (body.name != null) {
    if (typeof body.name !== 'string' || !body.name.trim() || body.name.length > 40) return { ok: false }
    data.name = body.name.trim()
  }

  const checks = [
    ['activity', ALLOWED.activities],
    ['game', ALLOWED.games],
    ['mood', ALLOWED.moods],
    ['movie', ALLOWED.movies],
    ['hangout', ALLOWED.hangouts],
    ['custom', ALLOWED.customs],
    ['date', ALLOWED.dates],
  ]
  for (const [key, list] of checks) {
    const val = body[key]
    if (val == null || val === '') continue
    if (typeof val !== 'string' || !list.includes(val)) return { ok: false }
    data[key] = val
  }
  if (body.finalChoice != null) {
    if (body.finalChoice !== 'yes' && body.finalChoice !== 'no') return { ok: false }
    data.finalChoice = body.finalChoice
  }
  let event
  if (body.event != null) {
    if (typeof body.event !== 'string' || !EVENTS.has(body.event)) return { ok: false }
    event = body.event
  }
  const known = new Set([
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
  for (const key of Object.keys(body)) {
    if (!known.has(key)) return { ok: false }
  }
  return { ok: true, data, event }
}

function buildMessage(data, event) {
  const name = data.name || 'Арина'
  const time = formatTime()

  if (data.finalChoice === 'no' || event === 'no') {
    return [
      'АРИНА НАЖАЛА «НЕТ»',
      '',
      'Но кнопку всё-таки удалось поймать',
      '',
      'Выбор:',
      data.activity && `Занятие: ${data.activity}`,
      data.game && `Игра: ${data.game}`,
      data.mood && `Настроение: ${data.mood}`,
      data.movie && `Кино: ${data.movie}`,
      data.hangout && `Куда: ${data.hangout}`,
      data.custom && `Идея: ${data.custom}`,
      data.date && `Когда: ${data.date}`,
      '',
      time,
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (data.finalChoice === 'yes' || event === 'yes' || event === 'final') {
    return [
      'ПРИГЛАШЕНИЕ ПРИНЯТО',
      '',
      `Кто: ${name}`,
      data.activity && `Занятие: ${data.activity}`,
      data.game && `Игра: ${data.game}`,
      data.mood && `Настроение: ${data.mood}`,
      data.movie && `Кино: ${data.movie}`,
      data.hangout && `Куда: ${data.hangout}`,
      data.custom && `Идея: ${data.custom}`,
      data.date && `Когда: ${data.date}`,
      'Ответ: ДА',
      '',
      time,
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (event === 'start') return `Арина открыла приглашение\n\n${time}`
  if (event === 'activity' && data.activity)
    return `Новый выбор\n\n${name}\nВыбрала: ${data.activity}\n\n${time}`
  if (event === 'game' && data.game) return `Выбрала игру\n\n${data.game}\n\n${time}`
  if (event === 'mood' && data.mood) return `Настроение прогулки\n\n${data.mood}\n\n${time}`
  if (event === 'movie' && data.movie) return `Выбор кино\n\n${data.movie}\n\n${time}`
  if (event === 'hangout' && data.hangout) return `Куда сходим\n\n${data.hangout}\n\n${time}`
  if (event === 'custom' && data.custom) return `Свой вариант\n\n${data.custom}\n\n${time}`
  if (event === 'date' && data.date) return `Когда\n\n${data.date}\n\n${time}`
  return `Обновление\n\n${JSON.stringify(data)}\n\n${time}`
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.warn('[telegram] missing env', { hasToken: !!token, hasChatId: !!chatId })
    return { ok: false, reason: 'missing_env' }
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[telegram] API error', res.status, body.slice(0, 300))
    return { ok: false, reason: 'telegram_error' }
  }
  return { ok: true }
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }
  if (event.httpMethod === 'GET') {
    const token = process.env.TELEGRAM_BOT_TOKEN || ''
    const chatId = process.env.TELEGRAM_CHAT_ID || ''
    return {
      statusCode: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        hasToken: Boolean(token),
        hasChatId: Boolean(chatId),
        // safe hints only — never full secrets
        tokenLooksOk: /^\d+:[A-Za-z0-9_-]+$/.test(token),
        chatIdLooksOk: /^-?\d+$/.test(chatId) && chatId !== '8913074913',
      }),
    }
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    }
  }

  let body = {}
  try {
    body = event.body ? JSON.parse(event.body) : {}
  } catch {
    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Invalid request' }),
    }
  }

  const validated = validate(body)
  if (!validated.ok) {
    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Invalid request' }),
    }
  }

  const text = buildMessage(validated.data, validated.event)
  const sent = await sendTelegram(text)
  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, delivered: sent.ok, reason: sent.reason || null }),
  }
}
