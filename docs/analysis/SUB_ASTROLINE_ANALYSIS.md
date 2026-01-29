# Аналіз структури сайту sub.astroline.today

## Загальна інформація

**URL:** https://sub.astroline.today  
**Тип:** Single Page Application (SPA)  
**Технологічний стек:** React (з використанням Create React App або подібного бандлера)

## Технічна архітектура

### Frontend Framework
- **React** - основний фреймворк
- **SPA (Single Page Application)** - весь контент завантажується в `#root` елемент
- Використовує статичні бандли: `/static/js/main.6c56620f.js` та `/static/css/main.1a7a6bdb.css`

### Структура HTML

```html
<!doctype html>
<html lang="en">
<head>
  <!-- Meta tags, fonts, styles -->
</head>
<body>
  <div id="root" class="root">
    <pre-loader></pre-loader>
  </div>
</body>
</html>
```

### Ключові компоненти

1. **Preloader** - кастомний елемент `<pre-loader>` для завантаження
2. **Root Container** - основний контейнер з класом `root`
3. **Theme System** - підтримка тем через CSS змінні

## Стилізація та теми

### CSS Змінні

```css
:root {
  --loader-color: #142b35;
  --loader-bg-color: #142933;
  --loader-text-color: #faf6e8;
  --loader-text-font-family: 'Open Sans', sans-serif;
  --loader-circle-color: #16786c;
}

.theme-dark {
  --backgroundBlockColor: #111827;
  --loader-bg-color: #111827;
  --loader-text-color: #f4f8ff;
  --loader-circle-color: #5671ff;
}
```

### Підтримувані теми
- **Astroline** (default)
- **Atrix** → `theme-dark`
- **dark_theme** → `theme-dark`

### Шрифти
- **Philosopher** (400, 700)
- **Open Sans** (400, 500, 600, 700)
- **Crimson Pro** (600, 700)

## PWA (Progressive Web App)

### Manifest.json
```json
{
  "short_name": "Astroline",
  "name": "Astroline",
  "icons": [
    {
      "src": "icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

**Характеристики:**
- Підтримка standalone режиму
- Іконки для різних розмірів (192x192, 512x512)
- Theme color: #000000 (чорний)
- Background color: #ffffff (білий)

## SEO та Meta Tags

### Основні мета-теги
- **Title:** "Personalized Astrology Report - Quiz and Personalized prediction - Astroline"
- **Description:** "Get Personalized Powerful Predictions! Complete a 1-minute quiz to get a personalized astrology report."
- **Robots:** index, follow
- **Canonical:** `/quiz-pp`
- **Theme Color:** #000000
- **Viewport:** налаштований для мобільних пристроїв з фіксованим розміром

### Viewport налаштування
```html
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,interactive-widget=resizes-content,viewport-fit=cover"/>
```

## Аналітика та трекінг

### Google Tag Manager
- Інтегрований GTM з асинхронним завантаженням
- Скрипт: `/gtm-fps/?id=`
- DataLayer для подій

## Зовнішні ресурси

### Preconnect до доменів
- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`
- `https://mutator.magnus.ms`
- `https://astrology.astroline.app`

### CDN та статичні ресурси
- Google Fonts для шрифтів
- Статичні файли з `/static/` директорії
- Preloader скрипт: `/js/preloader.js`

## JavaScript функціональність

### Theme Detection
```javascript
const THEME_MAP = {
  Atrix: "theme-dark",
  dark_theme: "theme-dark"
};

// Визначення теми на основі URL path
const pType = window.location.pathname.split("/")[1];
const themeName = pType === "dark_theme" ? pType : "Astroline";
const themeClass = THEME_MAP[themeName];

// Застосування теми
if (themeClass) {
  document.documentElement.classList.add(themeClass);
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add(themeClass);
  });
}
```

## Стилі та Layout

### Root Container
```css
#root {
  position: relative;
  height: 100svh;
  overflow: auto;
}

#root.tik-tok {
  height: calc(100svh - 30px);
}

body, html {
  position: fixed;
  inset: 0;
  height: 100svh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  -webkit-overflow-scrolling: touch;
}
```

**Особливості:**
- Використання `100svh` для viewport height
- Фіксований layout з `position: fixed`
- Спеціальна обробка для TikTok (`tik-tok` клас)
- Touch scrolling підтримка

## Маршрутизація

На основі коду видно підтримку різних шляхів:
- `/quiz-pp` - основна сторінка квізу (canonical)
- Підтримка тем через path: `/dark_theme/`, `/Atrix/`

## Порівняння з поточним проектом (astroline)

### Схожості
- Обидва проекти про астрологію
- Обидва мають квіз функціональність
- Використання React
- PWA підтримка

### Відмінності

| Характеристика | sub.astroline.today | Поточний проект (astroline) |
|----------------|---------------------|----------------------------|
| Framework | React (CRA) | Next.js 14 (App Router) |
| Бандлинг | Статичні бандли | Next.js автоматичний |
| Темна тема | Підтримується | Власна система тем |
| Preloader | Кастомний елемент | PreLoader компонент |
| Шрифти | Google Fonts (3 родини) | Geist (локальні) |
| Аналітика | Google Tag Manager | Не визначено |

## Висновки

1. **Архітектура:** Класичний React SPA з статичними бандлами
2. **Теми:** Гнучка система тем з підтримкою кількох варіантів
3. **PWA:** Повноцінна підтримка Progressive Web App
4. **SEO:** Добре налаштовані мета-теги та canonical URLs
5. **Мобільність:** Оптимізовано для мобільних пристроїв
6. **Аналітика:** Інтеграція з Google Tag Manager

## Рекомендації для інтеграції

Якщо потрібно інтегрувати функціональність з sub.astroline.today:

1. **Theme System** - можна адаптувати систему тем
2. **Preloader** - використати існуючий PreLoader компонент
3. **PWA Manifest** - оновити manifest.json з новими налаштуваннями
4. **GTM Integration** - додати Google Tag Manager якщо потрібно
5. **Font Optimization** - розглянути використання Google Fonts або локальних шрифтів
