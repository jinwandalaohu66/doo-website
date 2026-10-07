(() => {
  // This landing page never exchanges tokens or determines OAuth success.
  const query = new URLSearchParams(window.location.search);
  const hasError = query.has('error');
  const hasResponse = query.getAll('code').length === 1 && Boolean(query.get('code'))
    && query.getAll('state').length === 1 && Boolean(query.get('state'));
  const isEnglish = !((navigator.languages?.[0] || navigator.language || 'zh').toLowerCase().startsWith('zh'));
  const copy = isEnglish
    ? {
        response: ['Return to Doo', 'Check your connection in the app'],
        error: ['Connection incomplete', 'Return to the app to try again'],
        start: ['Connect from Doo', 'Start your connection in the app'],
        action: 'Return to Doo',
      }
    : {
        response: ['回到 Doo', '请回到 App 查看连接结果'],
        error: ['连接未完成', '连接未完成，请在 App 中重试'],
        start: ['从 Doo 开始连接', '请从 App 中开始连接'],
        action: '返回 Doo',
      };
  const state = hasError ? 'error' : hasResponse ? 'response' : 'start';
  document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
  document.body.dataset.state = state;
  document.getElementById('status').textContent = copy[state][1];
  document.getElementById('open-doo').textContent = copy.action;
  document.title = copy[state][0];
  // Clear response parameters from the current history entry.
  // The system session must hand them to the app before this fallback loads.
  window.history.replaceState(null, '', window.location.pathname);
})();
