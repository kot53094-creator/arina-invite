# Приглашение для Арины

## Ссылки

- Репозиторий: https://github.com/kot53094-creator/arina-invite
- Сайт (GitHub Pages): https://kot53094-creator.github.io/arina-invite/
- Бот: https://t.me/ArinaChoiceBot

## Чтобы бот писал тебе (обязательно)

1. Открой бота: https://t.me/ArinaChoiceBot и нажми **Start** / напиши `привет`
2. Задеплой на Netlify (там есть API для Telegram):  
   https://app.netlify.com/start/deploy?repository=https://github.com/kot53094-creator/arina-invite
3. В Environment variables добавь:
   - `TELEGRAM_BOT_TOKEN` = токен от BotFather
   - `TELEGRAM_CHAT_ID` = твой chat id
4. Арине отправляй ссылку Netlify (`*.netlify.app`) — на ней бот работает.

### Как узнать Chat ID

После сообщения боту:

- открой `@userinfobot` в Telegram — он покажет Id  
  или  
- Actions → **Setup Telegram** → Run workflow

## Локально

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
PORT=3001
```

```bash
npm install
npm run dev
```

Никогда не коммить `.env`.
