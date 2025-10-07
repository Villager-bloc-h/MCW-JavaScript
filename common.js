// https://zh.minecraft.wiki/w/User:Villager-bloc-h/common.js
// 采用CC BY-NC-SA 3.0授权
//UTC时钟工具
window.LiveClockTimeZone = 'Asia/Shanghai'; //设置自定义时区代码
window.LiveClockHideSeconds = false; //显示秒

// from Wilf233
// 显示巡查数，感谢Leo768和MarkusRost
mw.loader.using(['mediawiki.language', 'mediawiki.api']).then(() => {
    mw.hook('wikipage.content').add($content => {
        if (!$content.is('.horse-userprofile')) return;
        $userprofile = $content.find('.horse-userprofile-info');
        if (window.loadedPatrolsCount || !$userprofile.length) return;
        window.loadedPatrolsCount = true;
        const user = mw.config.get('wgRelevantUserName');
        function query(api, count, data) {
            return api.get(data).then(result => {
                count += result.query.logevents.length;
                if (result.continue) return query(api, count, result.continue);
                return count;
            });
        }
        const api = new mw.Api({
            parameters: {
                action: 'query',
                list: 'logevents',
                formatversion: 2,
                leprop: [],
                letype: 'patrol',
                leuser: user,
                lelimit: 'max'
            }
        });
        query(api, 0)
            .then(count => {
                if (!count) return;
                $userprofile.append($('<p>').append(
                    $('<span>').text('巡查数：'),
                    '\t',
                    $('<span>').append(
                        $('<a>')
                            .attr('href', '/w/Special:Log/patrol/'+user)
                            .attr('title', 'Special:Log/patrol/'+user)
                            .text(mw.language.convertNumber(count))
                    )
                ));
            });
    });
});


/** InPageEdit Preferences */
;(window.InPageEdit = window.InPageEdit || {}).myPreference = {
  "doNotCollectMyInfo": false,
  "editMinor": false,
  "editSummary": "[InPageEdit] $section",
  "lockToolBox": true,
  "redLinkQuickEdit": true,
  "outSideClose": true,
  "watchList": "nochange",
  "noConfirmEdit": false,
  "plugins": [
    "toolbox.js",
    "wiki-editor.js"
  ]
}

// from TeaSummer
// 使删除页面时“其他/附加原因”默认留空
$('#ca-delete a').attr('href', $('#ca-delete a').attr('href') + '&wpReason=');

// 英语跨维基链接快捷键
mw.hook('wikipage.content').add(() => {
  $('#p-lang .interwiki-en a').attr('accesskey', ',');
});
