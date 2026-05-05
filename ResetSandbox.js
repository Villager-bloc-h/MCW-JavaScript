(function() {
    'use strict';
    if (!mw.config.get('wgCanonicalSpecialPageName') === 'Contributions') return;
    var userName = mw.config.get('wgRelevantUserName');
    if (!userName || userName === mw.config.get('wgUserName')) return;
    var sandboxTitle = 'User:' + userName + '/Sandbox';
    var editUrl = mw.util.getUrl(sandboxTitle, { action: 'edit' });
    var btn = document.createElement('a');
    btn.href = editUrl;
    btn.textContent = '清空沙盒';
    btn.style.cssText = 'background:#ffc107;color:#000;padding:4px 12px;border-radius:4px;text-decoration:none;margin:10px 0;display:inline-block;';
    btn.onclick = function() {
        return confirm('确定要清空用户「' + userName + '」的沙盒吗？');
    };
    var target = document.querySelector('.mw-htmlform-ooui-wrapper') || document.querySelector('#contentSub');
    if (target) target.appendChild(btn);
})();
