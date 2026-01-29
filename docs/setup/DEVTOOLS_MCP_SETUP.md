# Browser DevTools MCP Setup

## Огляд

Browser DevTools MCP дозволяє отримувати доступ до Chrome DevTools Protocol через Model Context Protocol (MCP) в Cursor IDE.

## Налаштування

### 1. Встановлення MCP сервера для Browser DevTools

MCP сервер для Browser DevTools зазвичай налаштовується через конфігурацію Cursor.

### 2. Конфігурація в Cursor

Додайте наступну конфігурацію до файлу налаштувань MCP Cursor (зазвичай знаходиться в `~/.cursor/mcp.json` або в налаштуваннях Cursor):

```json
{
  "mcpServers": {
    "browser-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-browser-devtools"
      ],
      "env": {
        "BROWSER_WS_ENDPOINT": "ws://localhost:9222"
      }
    }
  }
}
```

### 3. Запуск Chrome з Remote Debugging

Для роботи Browser DevTools MCP потрібно запустити Chrome з увімкненим remote debugging:

**Windows:**
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

**Або для Chrome Canary:**
```powershell
& "C:\Users\$env:USERNAME\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --remote-debugging-port=9222
```

### 4. Перевірка підключення

Після налаштування MCP сервер має доступ до:
- DOM інспекції
- Console logs
- Network requests
- Performance metrics
- JavaScript debugging

### 5. Використання

Після налаштування ви можете використовувати Browser DevTools MCP для:
- Аналізу структури DOM
- Перевірки стилів та CSS
- Відстеження мережевих запитів
- Дебагу JavaScript коду
- Аналізу продуктивності

## Примітки

- Remote debugging порт (9222) має бути доступним
- Chrome має бути запущений з флагом `--remote-debugging-port`
- MCP сервер автоматично підключається до Chrome через WebSocket

## Альтернативні методи

Якщо стандартний MCP сервер не працює, можна використовувати:
- Puppeteer для автоматизації браузера
- Playwright для тестування та інспекції
- Chrome DevTools Protocol напряму через WebSocket
