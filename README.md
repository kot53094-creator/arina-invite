# Приглашение для Арины

Интерактивный сайт + Telegram-уведомления о каждом выборе.

## Ссылки

- **Репозиторий:** https://github.com/kot53094-creator/arina-invite
- **Публичный сайт (GitHub Pages):** https://kot53094-creator.github.io/arina-invite/
- **Для рабочего бота** нужен деплой на Vercel (GitHub Pages не умеет держать секретный токен)

## Как сделать Telegram-бота рабочим (по шагам)

### A. Создай бота

1. Открой Telegram → [@BotFather](https://t.me/BotFather)
2. Команда `/newbot`
3. Придумай имя и username
4. Скопируй **токен**

### B. Узнай Chat ID

1. Напиши своему боту любое сообщение
2. Открой в браузере (подставь токен):

```
https://api.telegram.org/bot<ТОКЕН>/getUpdates
```

3. Найди `"chat":{"id": ЧИСЛО}` — это `TELEGRAM_CHAT_ID`  
   Или напиши [@userinfobot](https://t.me/userinfobot)

### C. Задеплой на Vercel (чтобы бот реально писал тебе)

1. Открой:  
   https://vercel.com/new/clone?repository-url=https://github.com/kot53094-creator/arina-invite&env=TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID
2. Войди через GitHub
3. Вставь:
   - `TELEGRAM_BOT_TOKEN` = токен от BotFather
   - `TELEGRAM_CHAT_ID` = твоё число id
4. Нажми Deploy
5. Открой выданную ссылку `*.vercel.app` — это основная ссылка для Арины

На Vercel каждый клик будет приходить тебе в Telegram.

> GitHub Pages показывает сайт, но **без** Telegram API.  
> Для Арины лучше отправлять именно ссылку Vercel.

## Локальный запуск

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
PORT=3001
```

```bash
npm install
npm run dev
```

- Сайт: http://localhost:5173
- API: http://localhost:3001

`.env` никогда не коммить — он уже в `.gitignore`.
