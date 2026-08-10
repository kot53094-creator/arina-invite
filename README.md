# Приглашение для Арины

Интерактивный сайт + Telegram-уведомления о каждом выборе.

## Важно про GitHub

**GitHub Pages не умеет хранить секреты и запускать API.**  
Токен бота нельзя класть в фронтенд.

Правильный вариант: репозиторий на GitHub → деплой на **Vercel** (бесплатно).  
Сайт + `/api/choice` работают вместе, токен остаётся в Environment Variables.

---

## 1. Создай Telegram-бота

1. Открой Telegram → найди [@BotFather](https://t.me/BotFather)
2. Напиши `/newbot`
3. Имя бота (например: `Arina Invite`)
4. Username бота (например: `arina_invite_bot`)
5. Скопируй **токен** (выглядит как `123456:ABC-DEF...`)

### Узнай свой Chat ID

1. Напиши своему новому боту любое сообщение (например `hi`)
2. Открой в браузере (подставь токен):

```
https://api.telegram.org/bot<ТОКЕН>/getUpdates
```

3. Найди `"chat":{"id": 123456789` — это и есть `TELEGRAM_CHAT_ID`

Или напиши [@userinfobot](https://t.me/userinfobot) — он покажет твой id.

---

## 2. Локальный запуск

Создай файл `.env` (не коммить его):

```env
TELEGRAM_BOT_TOKEN=токен_от_BotFather
TELEGRAM_CHAT_ID=твой_chat_id
PORT=3001
```

```bash
npm install
npm run dev
```

- Сайт: http://localhost:5173
- API: http://localhost:3001

Каждый клик (старт, занятие, игра, дата, ДА/НЕТ) уходит в Telegram.

---

## 3. Деплой с GitHub → Vercel

1. Залей проект на GitHub **без** `.env`
2. Зайди на [vercel.com](https://vercel.com) → Import репозиторий
3. В Project Settings → Environment Variables добавь:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Deploy

После деплоя открой ссылку Vercel и пройди сценарий — сообщения придут в Telegram.

---

## API

`POST /api/choice`

Тело (пример):

```json
{
  "name": "Арина",
  "activity": "Поиграем",
  "game": "Minecraft",
  "date": "На выходных",
  "finalChoice": "yes",
  "event": "yes"
}
```

Токен никогда не попадает в браузер.
