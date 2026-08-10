import type { ActivityId } from '../types'

export const activities: Array<{
  id: ActivityId
  label: string
  emoji: string
  hint: string
}> = [
  { id: 'play', label: 'Поиграем', emoji: '🎮', hint: 'Залетим во что-нибудь весёлое' },
  { id: 'walk', label: 'Погуляем', emoji: '🌸', hint: 'Свежий воздух и разговоры' },
  { id: 'movie', label: 'Посмотрим фильм', emoji: '🍿', hint: 'Уютный вечер у экрана' },
  { id: 'hangout', label: 'Куда-нибудь сходим', emoji: '☕', hint: 'Место, вкусности и мы' },
  { id: 'custom', label: 'Придумаем что-нибудь своё', emoji: '✨', hint: 'Без плана — только вместе' },
]

export const games = [
  {
    name: 'Roblox',
    desc: 'Найдём вместе какую-нибудь игру',
    cover: '/covers/roblox.svg',
    accent: '#e2231a',
  },
  {
    name: 'Minecraft',
    desc: 'Построим что-то красивое или выживем вместе',
    cover: '/covers/minecraft.svg',
    accent: '#5a9e3a',
  },
  {
    name: 'It Takes Two',
    desc: 'Кооператив про двоих — идеально для нас',
    cover: '/covers/it-takes-two.svg',
    accent: '#ff4d8d',
  },
  {
    name: 'Among Us',
    desc: 'Кто из нас предатель?',
    cover: '/covers/among-us.svg',
    accent: '#e74c3c',
  },
  {
    name: 'Valorant',
    desc: 'Сыграем пару раундов вместе',
    cover: '/covers/valorant.svg',
    accent: '#ff4655',
  },
  {
    name: 'Terraria',
    desc: 'Построим свой маленький мир',
    cover: '/covers/terraria.svg',
    accent: '#66c2a5',
  },
  {
    name: 'Stardew Valley',
    desc: 'Заведём ферму и будем жить спокойно',
    cover: '/covers/stardew.svg',
    accent: '#ffb347',
  },
]

export const walkMoods = [
  { label: 'Просто погулять', emoji: '🌿' },
  { label: 'Зайти куда-нибудь', emoji: '☕' },
  { label: 'Вечерняя прогулка', emoji: '🌆' },
  { label: 'Главное — вместе', emoji: '✨' },
]

export const movieOptions = [
  { label: 'Фильм', emoji: '🎬' },
  { label: 'Сериал', emoji: '📺' },
  { label: 'Комедия', emoji: '😂' },
  { label: 'Что-нибудь страшное', emoji: '👻' },
]

export const hangoutOptions = [
  { label: 'Кафе', emoji: '🍰' },
  { label: 'Парк', emoji: '🌳' },
  { label: 'Кинотеатр', emoji: '🎟️' },
  { label: 'Сюрприз', emoji: '✨' },
]

export const customOptions = [
  { label: 'Импровизация', emoji: '🎲' },
  { label: 'Твой выбор', emoji: '👑' },
  { label: 'Что-нибудь новое', emoji: '🌟' },
  { label: 'Как в прошлый раз', emoji: '🔁' },
]

export const dateOptions = [
  { label: 'Сегодня', emoji: '☀️' },
  { label: 'Завтра', emoji: '🌙' },
  { label: 'На выходных', emoji: '📅' },
  { label: 'Выберем вместе', emoji: '🤝' },
]

export const escapeMessages = [
  'Эй, не так быстро 😏',
  'Ты точно хочешь НЕТ? 👀',
  'Кнопка испугалась 😂',
  'Может всё-таки ДА?',
  'Ну попробуй поймать меня 😏',
]
