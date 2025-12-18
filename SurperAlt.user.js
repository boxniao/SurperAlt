// ==UserScript==
// @name         Alt + 文本选择搜索/链接访问/复制/网盘识别
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  按住Alt键选择文本，释放Alt键在新标签页中搜索选中文本或访问链接，自动识别网盘链接和提取码，或在释放前按C键复制文本，按鼠标右键取消
// @author       Your Name
// @match        *://*/*
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMTAzLjYgMTA3LjRjMy41LTIuMiA4LjktNi4xIDEzLjgtMTIuNXM3LjMtMTIuNSA4LjUtMTYuNWMuNS0xLjcgMi4yLTcuNSAyLjItMTQuNyAwLTEwLjEtMy4zLTI1LjEtMTUuNC0zNi44LTE0LjUtMTQtMzIuMS0xNC4zLTM1LjctMTQuMy04IDAtMTUuNyAxLjktMjIuNiA1LjJDNDQgMjMgMzUuNyAzMS40IDMwLjggNDEuN2MtMS4yIDIuOC00IDQuNy03LjEgNS00IC4zLTcuNSA0LjQtOC45IDkuNi0uNSAxLjktMS42IDMuNS0zLjEgNC43QzQuNCA2Ni44IDAgNzUuNyAwIDg1YzAgNi44IDIuMyAxMy4xIDYuMSAxOC4yIDUuNSA3LjQgMTQuMiAxMi4yIDI0IDEyLjJoNDcuMWM0LjQgMCAxMS0uNSAxOC4zLTMuNSAzLjItMS40IDUuOS0zIDguMS00LjV6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTExOS44IDY0LjNjLjEtMTcuMS0xMC40LTI4LTEyLjUtMzAuMUM5NSAyMi4xIDc5LjkgMjEuOCA3Ni45IDIxLjhjLTE3LjYgMC0zMy4zIDEwLjUtMzkuOSAyNi43LS42IDEuMy0xLjggMi4zLTMuNCAyLjNoLS40Yy01LjggMC0xMC42IDQuOC0xMC42IDEwLjd2LjVjMCAxLjQtLjggMi42LTEuOSAzLjNDMTMuNCA2OSA4LjggNzYuOCA4LjggODVjMCAxMi4yIDkuOSAyMjMgMjIuMiAyMi4zaDQ1LjJjMy42LS4xIDE3LjYtLjkgMjkuNi0xMiAyLjktMi44IDEzLjktMTMuNyAxNC0zMXoiIGZpbGw9IiNkYjg0MTIiLz48cGF0aCBkPSJNMTEwLjggNTcuNGwuMiAzLjNjMCAxLjMtMS4xIDIuNC0yLjMgMi40LTEuMyAwLTIuMy0xLjEtMi4zLTIuNGwtLjEtMi44di0uM2MwLTEuMi45LTIuMiAyLjEtMi4zaC4zYy43IDAgMS4zLjMgMS43LjctLjIuMS4zLjUuNCAxLjR6bS0zLjMtMTAuM2MwIDEuMi0xIDIuMy0yLjIgMi4zaC0uMWMtLjggMC0xLjYtLjUtMi0xLjItNC42LTguMy0xMy4zLTEzLjUtMjIuOC0xMy41LTEuMiAwLTIuMy0xLTIuMy0yLjJ2LS4xYzAtMS4yIDEtMi4zIDIuMi0yLjNoLjFhMzAuMzcgMzAuMzcgMCAwIDEgMTUuOCA0LjRjNC42IDIuOCA4LjQgNi44IDExLjEgMTEuNS4xLjMuMi43LjIgMS4xek02OS4yIDQ5bDE5LjQgMTQuOGMxLjkgMS41IDMuMSAzLjUgMy41IDUuN3YuMmMuMS40LjEuOC4xIDEuMiAwIC42LS4xIDEuMS0uMiAxLjYtLjQgMi4yLTEuNyA0LjItMy41IDUuNkw2OS4zIDkzYy0yLjYgMi01LjQgMi41LTcuNyAxLjQtLjEtLjEtLjItLjEtLjItLjItMi0xLjItMy4yLTMuNS0zLjItNi40di02LjZINTNjLTYuOCAwLTEyLTQuNy0xMi0xMC45IDAtNC44IDIuNi04LjUgNy4yLTEwLjMgMS4zLS41IDIuNy4yIDMuMiAxLjVzLS4xIDIuOC0xLjQgMy4zYy0yLjcgMS4xLTQgMi45LTQgNS41IDAgMy41IDMgNiA3IDZoOC4xYy41IDAgMSAuMiAxLjQuNi43LjYgMS4xIDEuNyAxLjEgMi42djguNGMwIDEuMy40IDIgLjcgMi4xLjQuMiAxLjMgMCAyLjQtLjlsMTkuMi0xNC45YzEuMi0uOSAxLjgtMi4xIDEuOC0zLjNzLS42LTIuMy0xLjctMy4xTDY2LjIgNTNjLTEuMS0uOS0yLTEuMS0yLjQtLjktLjMuMi0uNy45LS43IDIuMXY3LjZjMCAuOS0uNSAxLjctMS4yIDIuMS0uNC4zLS44LjQtMS4zLjQtMS40IDAtMi41LTEuMS0yLjUtMi41di03LjZjMC0zLjEgMS4zLTUuNSAzLjUtNi42bC43LS4zYzIuMS0uNyA0LjYtLjEgNi45IDEuN3oiIGZpbGw9IiM0NDQiLz48L3N2Zz4=
// ==/UserScript==

(function() {
    'use strict';

    // ===================== 通用配置 =====================
    const BING_SEARCH_URL = 'https://www.bing.com/search?q=';

    // ===================== 网盘配置 (完整版) =====================
    const panOpt = {
        'baidu': {
            reg: /((?:https?:\/\/)?(?:e?yun|pan)\.baidu\.com\/(doc\/|enterprise\/)?(?:s\/[\w~]*(((-)?\w*)*)?|share\/\S{4,}))/,
            host: /(pan|e?yun)\.baidu\.com/,
            input: ['#accessCode', '.share-access-code', '#wpdoc-share-page > .u-dialog__wrapper .u-input__inner'],
            button: ['#submitBtn', '.share-access .g-button', '#wpdoc-share-page > .u-dialog__wrapper .u-btn--primary'],
            name: '百度网盘',
            storage: 'hash',
            autoCompleteReg: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\b[\w-]{23}\b/,
            autoCompleteUrlPrefix: 'https://pan.baidu.com/s/'
        },
        'aliyun': {
            reg: /((?:https?:\/\/)?(?:(?:www\.)?(?:aliyundrive|alipan)\.com\/s|alywp\.net)\/[a-zA-Z\d]+)/,
            host: /www\.(aliyundrive|alipan)\.com|alywp\.net/,
            input: ['form .ant-input', 'form input[type="text"]', 'input[name="pwd"]'],
            button: ['form .button--fep7l', 'form button[type="submit"]'],
            name: '阿里云盘',
            storage: 'hash'
        },
        'weiyun': {
            reg: /((?:https?:\/\/)?share\.weiyun\.com\/[a-zA-Z\d]+)/,
            host: /share\.weiyun\.com/,
            input: ['.mod-card-s input[type=password]', 'input.pw-input'],
            button: ['.mod-card-s .btn-main', ".pw-btn-wrap button.btn"],
            name: '微云',
            storage: 'hash'
        },
        'lanzou': {
            reg: /((?:https?:\/\/)?(?:[a-zA-Z0-9\-.]+)?(?:lanzou[a-z]|lanzn|lanpv)\.com\/[a-zA-Z\d_\-]+(?:\/[\w-]+)?)/,
            host: /(?:[a-zA-Z\d-.]+)?(?:lanzou[a-z]|lanzn|lanpv)\.com/,
            input: ['#pwd'],
            button: ['.passwddiv-btn', '#sub'],
            name: '蓝奏云',
            storage: 'hash',
        },
        'tianyi': {
            reg: /((?:https?:\/\/)?cloud\.189\.cn\/(?:t\/|web\/share\?code=)?[a-zA-Z\d]+)/,
            host: /cloud\.189\.cn/,
            input: ['.access-code-item #code_txt', "input.access-code-input"],
            button: ['.access-code-item .visit', ".button"],
            name: '天翼云盘',
            storage: (() => isMobile() ? 'local' : 'hash')(),
            storagePwdName: 'tmp_tianyi_pwd'
        },
        'xunlei': {
            reg: /((?:https?:\/\/)?pan\.xunlei\.com\/s\/[\w-]{10,})/,
            host: /pan\.xunlei\.com/,
            input: ['.pass-input-wrap .td-input__inner'],
            button: ['.pass-input-wrap .td-button'],
            name: '迅雷云盘',
            storage: 'hash',
            autoCompleteReg: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\b[\w-]{26}\b/,
            autoCompleteUrlPrefix: 'https://pan.xunlei.com/s/'
        },
        '123pan': {
            reg: /((?:https?:\/\/)?www\.(?:123pan|123865|123684|123652|123912)\.com\/s\/[\w-]{6,})/,
            host: /www\.(?:123pan|123865|123684|123652|123912)\.com/,
            input: ['.ca-fot input', ".appinput .appinput"],
            button: ['.ca-fot button', ".appinput button"],
            name: '123云盘',
            storage: 'hash'
        },
        'quark': {
            reg: /((?:https?:\/\/)?pan\.quark\.cn\/s\/[a-zA-Z\d-]+)/,
            host: /pan\.quark\.cn/,
            input: ['input[class*=ShareReceive]'],
            button: ['.ant-btn-primary'],
            name: '夸克网盘',
            storage: 'local',
            storagePwdName: 'tmp_quark_pwd',
            autoCompleteReg: /(?=.*[a-z])(?=.*[0-9])\b[a-z0-9]{12}\b/,
            autoCompleteUrlPrefix: 'https://pan.quark.cn/s/'
        },
        'cowtransfer': {
            reg: /((?:https?:\/\/)?(?:[a-zA-Z\d-.]+)?cowtransfer\.com\/s\/[a-zA-Z\d]+)/,
            host: /(?:[a-zA-Z\d-.]+)?cowtransfer\.com/,
            input: ['.receive-code-input input'],
            button: ['.open-button'],
            name: '奶牛快传',
            storage: 'hash'
        },
        'ctfile': {
            reg: /((?:https?:\/\/)?(?:[a-zA-Z\d-.]+)?(?:ctfile|545c|u062|ghpym)\.com\/\w+\/[a-zA-Z\d-]+)/,
            host: /(?:[a-zA-Z\d-.]+)?(?:ctfile|545c|u062)\.com/,
            input: ['#passcode'],
            button: ['.card-body button'],
            name: '城通网盘',
            storage: 'hash'
        },
        'flowus': {
            reg: /((?:https?:\/\/)?flowus\.cn\/[\S ^\/]*\/?share\/[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12})/,
            host: /flowus\.cn/,
            name: 'FlowUs息流',
            storage: 'hash'
        }
    };

    // ===================== 工具函数 =====================
    const util = {
        // 网盘解析函数
        parseLink(text = '', autoCompletePrefix = false) {
            let obj = { name: '', link: '', storage: '', storagePwdName: '' };
            if (!text) {
                return obj;
            }
            try {
                text = decodeURIComponent(text);
            } catch {
            }

            // 特殊字符替换
            const re = {
                "点": ".",
                "點": ".",
                "冒号": ":",
                "斜杠": "/",
            };
            const reg = new RegExp(`\\b(?:${Object.keys(re).join("|")})`, "g");
            text = text.replace(reg, (match) => re[match]);

            // 过滤链接中的中文或表情字符
            text = text.replace(/(?<=[\w./:])[\u4e00-\u9fa5\uD83C-\uDBFF\uDC00-\uDFFF]{1,2}(?=[\w./:])/g, "");
            text = text.replace(/lanzous/g, 'lanzouw');

            for (let name in panOpt) {
                let item = panOpt[name];
                // 自动补全链接前缀
                if (autoCompletePrefix && item.hasOwnProperty('autoCompleteReg')) {
                    text = text.replace(item.autoCompleteReg, item.autoCompleteUrlPrefix + "$&");
                }
                if (item.reg.test(text)) {
                    let matches = text.match(item.reg);
                    obj.name = item.name;
                    obj.link = matches[0];
                    obj.storage = item.storage || 'hash';
                    obj.storagePwdName = item.storagePwdName || null;
                    return obj;
                }
            }
            return obj;
        },

        parsePwd(text) {
            text = text.replace(/\u200B/g, '').replace('%3A', ":");
            text = text.replace(/(?:本帖)?隐藏的?内容[：:]?/, "");
            let reg = /wss:[a-zA-Z0-9]+|(?<=\s*(?:密|提取|访问|訪問|key|password|pwd|#|\?p=)\s*[码碼]?\s*[：:=]?\s*)[a-zA-Z0-9]{3,8}/i;
            if (reg.test(text)) {
                let match = text.match(reg);
                return match[0];
            }
            return '';
        },

        // 获取选择内容的DOM
        getSelectionHTML(selection, isDOM = false) {
            const testDiv = document.createElement("div");
            if (!selection.isCollapsed) {
                const docFragment = selection.getRangeAt(0).cloneContents();
                testDiv.appendChild(docFragment);
            }
            return isDOM ? testDiv : selection.toString();
        },

        // 解析超链接中的链接
        parseParentLink(selection) {
            const dom = this.getSelectionHTML(selection, true).querySelector('*[href]');
            return this.parseLink(dom ? dom.href : "");
        },

        // 将超链接的文本内容作为提取码
        parseLinkInnerTextAsPwd(selection) {
            const dom = this.getSelectionHTML(selection, true).querySelector('*[href]');
            if (/^[a-zA-Z0-9]+$/.test(dom ? dom.innerText : '')) {
                return dom.innerText;
            }
            return '';
        },

        // 查询参数解析
        parseQuery(name) {
            let reg = new RegExp(`(?<=(?:${name})\\=)(?:wss:[a-zA-Z0-9]+|[\\w-]+)`, "i")
            let pd = location.href.replace(/%3A/g, ":").match(reg);
            if (pd) {
                return pd[0];
            }
            return null;
        },

        // 检查元素是否隐藏
        isHidden(el) {
            try {
                return el.offsetParent === null;
            } catch (e) {
                return false;
            }
        },

        // 查询元素
        query(selector) {
            if (Array.isArray(selector)) {
                let obj = null;
                for (let i = 0; i < selector.length; i++) {
                    let o = document.querySelector(selector[i]);
                    if (o) {
                        obj = o;
                        break;
                    }
                }
                return obj;
            }
            return document.querySelector(selector);
        }
    };

    // 检测是否移动端
    function isMobile() {
        return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|HarmonyOS|MicroMessenger)/i);
    }

    // ===================== 主逻辑状态 =====================
    const URL_REGEX = /(?:(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}|(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/[^\s]*)?/gi;

    const COMMON_TLDS = [
        'com', 'org', 'net', 'edu', 'gov', 'mil',
        'io', 'ai', 'co', 'me', 'tv', 'us', 'uk',
        'ca', 'de', 'fr', 'jp', 'cn', 'ru', 'br',
        'au', 'in', 'it', 'es', 'mx', 'nl', 'se',
        'ch', 'no', 'dk', 'fi', 'pl', 'be', 'at',
        'cz', 'gr', 'hu', 'ie', 'il', 'nz', 'pt',
        'ro', 'sa', 'sg', 'th', 'tr', 'tw', 'ua',
        'vn', 'za', 'ar', 'cl', 'co', 'pe', 've',
        'info', 'biz', 'name', 'pro', 'aero', 'asia',
        'cat', 'coop', 'jobs', 'mobi', 'museum', 'tel',
        'travel', 'xxx', 'app', 'blog', 'dev', 'fm',
        'gg', 'ly', 'sh', 'to', 'ws', 'cc', 'bz',
        'eu', 'im', 'la', 'md', 'ms', 'nu', 'sc',
        'sr', 'su', 'tk', 'vc', 'vg'
    ];

    let isAltPressed = false;
    let hasSelectedDuringAltPress = false;
    let selectedText = '';
    let detectedLink = null;
    let selectionStyleElement = null;
    let originalSelection = null;
    let isExiting = false;
    let isPanDetected = false;

    // ===================== 选择相关函数 =====================
    const getSelectedText = () => {
        const selection = window.getSelection();
        return selection ? selection.toString().trim() : '';
    };

    const saveOriginalSelection = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            originalSelection = selection.getRangeAt(0).cloneRange();
        } else {
            originalSelection = null;
        }
    };

    const restoreOriginalSelection = () => {
        if (originalSelection && window.getSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(originalSelection);
            originalSelection = null;
        }
    };

    const clearAllSelections = () => {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        originalSelection = null;
    };

    // ===================== 链接处理函数 =====================
    const extractLinkFromText = (text) => {
        if (!text) return null;

        const matches = text.match(URL_REGEX);
        if (!matches || matches.length === 0) return null;

        let url = matches[0];
        url = url.replace(/[.,;:!?)]+$/g, '');

        // 检查是否是IP地址格式
        const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?(?:\/.*)?$/;
        if (ipRegex.test(url)) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            try {
                const urlObj = new URL(url);
                return urlObj.href;
            } catch (e) {
                return null;
            }
        }

        // 检查是否是localhost
        if (url.toLowerCase().startsWith('localhost')) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            try {
                const urlObj = new URL(url);
                return urlObj.href;
            } catch (e) {
                return null;
            }
        }

        // 处理普通的域名格式
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.startsWith('www.')) {
                url = 'https://' + url;
            } else {
                const domainParts = url.split('/')[0];
                const hostParts = domainParts.split(':')[0];

                if (hostParts.includes('.')) {
                    const tld = hostParts.split('.').pop().toLowerCase();

                    if (COMMON_TLDS.includes(tld) || (tld.length >= 2 && tld.length <= 6 && /^[a-z]+$/.test(tld))) {
                        url = 'https://' + url;
                    }
                }
            }
        } else if (url.startsWith('www.')) {
            url = 'https://' + url;
        }

        // 验证URL格式
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();

            if (hostname === 'localhost') {
                return urlObj.href;
            }

            const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            if (ipRegex.test(hostname)) {
                return urlObj.href;
            }

            const domainParts = hostname.split('.');
            if (domainParts.length >= 2) {
                const tld = domainParts[domainParts.length - 1];
                if (COMMON_TLDS.includes(tld) || (tld.length >= 2 && tld.length <= 6 && /^[a-z]+$/.test(tld))) {
                    return urlObj.href;
                }
            }

            return null;
        } catch (e) {
            try {
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                    const urlObj = new URL(url);
                    const hostname = urlObj.hostname.toLowerCase();

                    const domainParts = hostname.split('.');
                    if (domainParts.length >= 2) {
                        const tld = domainParts[domainParts.length - 1];
                        if (COMMON_TLDS.includes(tld) || (tld.length >= 2 && tld.length <= 6 && /^[a-z]+$/.test(tld))) {
                            return urlObj.href;
                        }
                    }
                }
            } catch (e2) {
                return null;
            }
            return null;
        }
    };

    // ===================== 网盘处理函数 =====================
    const handlePanDetection = (selection, text) => {
        if (!text) return false;

        // 首先尝试直接解析文本
        let linkObj = util.parseLink(text);
        let link = linkObj.link;
        let name = linkObj.name;
        let pwd = util.parsePwd(text);

        // 如果没有解析到链接，尝试从选中的超链接解析
        if (!link) {
            linkObj = util.parseParentLink(selection);
            link = linkObj.link;
            name = linkObj.name;
        }

        // 检查是否启用"超链接文本作为密码"功能
        const isTextAsPassword = GM_getValue('setting_text_as_password', false);
        if (isTextAsPassword && !pwd) {
            pwd = util.parseLinkInnerTextAsPwd(selection);
        }

        // 检查是否启用"自动推导网盘链接"功能
        const isAutoComplete = GM_getValue('setting_auto_complete', false);
        if (isAutoComplete && !link) {
            linkObj = util.parseLink(text, true);
            link = linkObj.link;
            name = linkObj.name;
        }

        if (link && name) {
            isPanDetected = true;

            // 显示网盘检测提示
            showNotification(`检测到${name}链接${pwd ? '，提取码：' + pwd : ''}，正在打开...`, 'info', 1500);

            // 更新指示器
            const indicator = document.getElementById('selection-indicator');
            if (indicator) {
                indicator.textContent = '📁';
                indicator.style.background = 'rgba(216, 59, 1, 0.9)';
            }

            return { link, name, pwd, storage: linkObj.storage, storagePwdName: linkObj.storagePwdName };
        }

        return false;
    };

    // 直接打开网盘链接，不弹窗
    const openPanLinkDirectly = (panData) => {
        if (!panData) return;

        const { link, pwd, storage, storagePwdName } = panData;
        const active = GM_getValue('setting_active_in_front', true);
        const autoClickBtn = GM_getValue('setting_auto_click_btn', true);

        // 如果是local存储方式，保存密码
        if (storage === 'local' && pwd && storagePwdName) {
            GM_setValue(storagePwdName, pwd);
        }

        let finalUrl = link;
        if (!/https?:\/\//.test(finalUrl)) {
            finalUrl = 'https://' + finalUrl;
        }

        // 如果有密码，构造带密码的链接
        if (pwd) {
            // 默认使用hash模式
            let targetLink = finalUrl.includes('?') ?
                `${finalUrl}&pwd=${pwd}#${pwd}` :
                `${finalUrl}?pwd=${pwd}#${pwd}`;

            // 检查是否已有#，可能是框架路由
            if (finalUrl.includes('#')) {
                const hashIndex = finalUrl.indexOf('#');
                const hashPart = finalUrl.slice(hashIndex + 1);
                const urlPart = finalUrl.slice(0, hashIndex);

                // 判断是否为框架路由模式
                const isFrameworkRoute = hashPart.startsWith('/') || hashPart.includes('?') || hashPart.includes('=');
                if (isFrameworkRoute) {
                    targetLink = urlPart.includes('?') ?
                        `${urlPart}&pwd=${pwd}#${hashPart}` :
                        `${urlPart}?pwd=${pwd}#${hashPart}`;
                }
            }

            GM_openInTab(targetLink, { active });
        } else {
            GM_openInTab(finalUrl, { active });
        }
    };

    // ===================== 自动填写密码函数 =====================
    // 根据域名检测网盘类型
    const panDetect = () => {
        let hostname = location.hostname;
        for (let name in panOpt) {
            let val = panOpt[name];
            if (val.host && val.host.test(hostname)) {
                return name;
            }
        }
        return '';
    };

    // 自动填写密码
    const autoFillPassword = () => {
        let query = util.parseQuery('pwd|p');
        let pwd = '';
        let hash = location.hash.slice(1);//hash中可能存在密码
        hash = /\W/.test(hash) ? null : hash //若hash中存在\W（非字母、下划线、数字字符）,有可能使用框架的hash模式，此时hash的可信度低
        let panType = panDetect();

        for (let name in panOpt) {
            let val = panOpt[name];
            if (panType === name) {
                if (val.storage === 'local') {
                    // 优先从URL获取，然后从存储获取
                    pwd = query || GM_getValue(val.storagePwdName) || hash;
                    pwd && doFillAction(val.input, val.button, pwd);
                    return;
                }
                if (val.storage === 'hash') {
                    if (!/^(?:wss:[a-zA-Z\d]+|[a-zA-Z0-9]{3,8})$/.test(hash)) { //过滤掉不正常的Hash
                        return;
                    }
                    pwd = query || hash;
                    pwd && doFillAction(val.input, val.button, pwd);
                    return;
                }
            }
        }
    };

    // 执行填写操作
    const doFillAction = (inputSelector, buttonSelector, pwd) => {
        let attempt = 0;
        const maxAttempts = 10;
        const baseDelay = 400;
        const maxDelay = 5000;
        let timeoutId = null;

        const retryWithBackoff = async () => {
            if (attempt >= maxAttempts) {
                console.log('密码填充超时，已达到最大尝试次数');
                return;
            }

            attempt++;

            try {
                let input = util.query(inputSelector);
                let button = util.query(buttonSelector);

                if (input && !util.isHidden(input)) {
                    // 找到输入框并可见，执行填充操作
                    showNotification('AI已识别到密码！正自动帮您填写', 'info', 2000);

                    let lastValue = input.value;
                    input.value = pwd;
                    // 触发input事件
                    let event = new Event('input', { bubbles: true });
                    let tracker = input._valueTracker;
                    if (tracker) {
                        tracker.setValue(lastValue);
                    }
                    input.dispatchEvent(event);

                    // 如果启用了自动点击按钮
                    const autoClickBtn = GM_getValue('setting_auto_click_btn', true);
                    if (autoClickBtn) {
                        setTimeout(() => {
                            if (button && !button.disabled) {
                                button.click();
                            }
                        }, 1000);
                    }

                    return;
                } else {
                    scheduleNextAttempt();
                }
            } catch (error) {
                console.error('密码填充过程中发生错误:', error);
                scheduleNextAttempt();
            }
        };

        const scheduleNextAttempt = () => {
            const exponentialDelay = Math.min(
                baseDelay * Math.pow(2, attempt - 1),
                maxDelay
            );
            const jitter = 0.8 + 0.4 * Math.random();
            const delay = Math.floor(exponentialDelay * jitter);

            timeoutId = setTimeout(retryWithBackoff, delay);
        };

        retryWithBackoff();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    };

    // ===================== 操作函数 =====================
    const searchWithBing = (text) => {
        if (!text) return;
        const searchUrl = BING_SEARCH_URL + encodeURIComponent(text);
        window.open(searchUrl, '_blank');
    };

    const visitLink = (url) => {
        if (!url) return;
        window.open(url, '_blank');
    };

    const copyToClipboard = (text) => {
        if (!text) return false;

        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);

            textArea.select();
            textArea.setSelectionRange(0, 99999);

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            return successful;
        } catch (err) {
            console.error('复制到剪贴板失败:', err);
            return false;
        }
    };

    // ===================== UI 相关函数 =====================
    const enableForcedTextSelection = () => {
        if (selectionStyleElement && selectionStyleElement.parentNode) {
            selectionStyleElement.parentNode.removeChild(selectionStyleElement);
        }

        selectionStyleElement = document.createElement('style');
        selectionStyleElement.id = 'forced-selection-style';
        selectionStyleElement.textContent = `
            * {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
                cursor: text !important;
            }

            input, textarea, [contenteditable="true"] {
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                -ms-user-select: auto !important;
                user-select: auto !important;
                cursor: auto !important;
            }

            ::selection {
                background-color: rgba(0, 120, 212, 0.3) !important;
                color: inherit !important;
            }
        `;

        document.head.appendChild(selectionStyleElement);
    };

    const disableForcedTextSelection = () => {
        if (selectionStyleElement && selectionStyleElement.parentNode) {
            selectionStyleElement.parentNode.removeChild(selectionStyleElement);
            selectionStyleElement = null;
        }
    };

    const showSelectionIndicator = () => {
        const existingIndicator = document.getElementById('selection-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        const indicator = document.createElement('div');
        indicator.id = 'selection-indicator';
        indicator.innerHTML = '🟢';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            font-size: 20px;
            z-index: 10000;
            background: rgba(0,120,212,0.9);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: default;
            user-select: none;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;

        document.body.appendChild(indicator);

        setTimeout(() => {
            indicator.style.opacity = '1';
        }, 10);
    };

    const showNotification = (message, type = 'info', duration = 2000) => {
        const existingNotification = document.getElementById('notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        let backgroundColor;
        switch(type) {
            case 'success': backgroundColor = 'rgba(16, 124, 16, 0.9)'; break;
            case 'error': backgroundColor = 'rgba(216, 59, 1, 0.9)'; break;
            case 'cancel': backgroundColor = 'rgba(128, 128, 128, 0.9)'; break;
            default: backgroundColor = 'rgba(0,120,212,0.9)'; break;
        }

        const notification = document.createElement('div');
        notification.id = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 60px;
            right: 10px;
            z-index: 9999;
            background: ${backgroundColor};
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 13px;
            max-width: 400px;
            word-break: break-all;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
            user-select: none;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 200);
        }, duration);
    };

    const removeAllPreviews = () => {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 200);
        }
    };

    const updateSelectionIndicator = (textLength, link = null, isPan = false) => {
        const indicator = document.getElementById('selection-indicator');
        if (indicator) {
            if (textLength > 0) {
                if (isPan) {
                    indicator.textContent = '📁';
                    indicator.style.background = 'rgba(216, 59, 1, 0.9)';
                } else if (link) {
                    indicator.textContent = '🔗';
                    indicator.style.background = 'rgba(216, 59, 1, 0.9)';
                } else {
                    indicator.textContent = textLength;
                    indicator.style.background = 'rgba(16, 124, 16, 0.9)';
                }
            } else {
                indicator.textContent = '🟢';
                indicator.style.background = 'rgba(0,120,212,0.9)';
            }
        }
    };

    const removeSelectionIndicator = () => {
        const indicator = document.getElementById('selection-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove();
                }
            }, 200);
        }
        removeAllPreviews();
    };

    // ===================== 事件处理函数 =====================
    const handleSelectionChange = () => {
        if (isAltPressed) {
            const text = getSelectedText();
            const selection = window.getSelection();
            selectedText = text;

            // 检测网盘
            const panData = handlePanDetection(selection, text);

            // 检测普通链接
            detectedLink = extractLinkFromText(text);

            if (text) {
                hasSelectedDuringAltPress = true;

                if (panData) {
                    updateSelectionIndicator(text.length, null, true);
                } else if (detectedLink) {
                    updateSelectionIndicator(text.length, detectedLink, false);
                } else {
                    updateSelectionIndicator(text.length, null, false);
                }
            } else {
                updateSelectionIndicator(0);
            }
        }
    };

    const handleMouseDown = (e) => {
        if (e.button !== 2) return;

        if (isAltPressed) {
            e.preventDefault();
            e.stopPropagation();

            if (isExiting) return;
            isExiting = true;

            clearAllSelections();
            showNotification('已取消选择', 'cancel', 1000);

            const indicator = document.getElementById('selection-indicator');
            if (indicator) {
                indicator.textContent = '✕';
                indicator.style.background = 'rgba(128, 128, 128, 0.9)';
            }

            setTimeout(() => {
                exitAltMode();
                isExiting = false;
            }, 300);
        }
    };

    const exitAltMode = () => {
        if (!isAltPressed) return;

        document.removeEventListener('selectionchange', handleSelectionChange);
        document.removeEventListener('mousedown', handleMouseDown, true);

        disableForcedTextSelection();
        removeSelectionIndicator();
        restoreOriginalSelection();

        isAltPressed = false;
        hasSelectedDuringAltPress = false;
        selectedText = '';
        detectedLink = null;
        originalSelection = null;
        isPanDetected = false;
    };

    // 键盘按下事件处理
    const handleKeyDown = (e) => {
        const target = e.target;
        const isInput = target.tagName === 'INPUT' ||
                        target.tagName === 'TEXTAREA' ||
                        (target.contentEditable && target.contentEditable === 'true');

        // 处理C键复制
        if ((e.key === 'c' || e.key === 'C' || e.keyCode === 67) && isAltPressed && selectedText) {
            if (isInput) return;

            e.preventDefault();
            e.stopPropagation();

            if (copyToClipboard(selectedText)) {
                showNotification(`已复制: ${selectedText.length > 50 ? selectedText.substring(0, 47) + '...' : selectedText}`, 'success', 2000);

                const indicator = document.getElementById('selection-indicator');
                if (indicator) {
                    indicator.textContent = '✓';
                    indicator.style.background = 'rgba(107, 70, 193, 0.9)';
                }

                hasSelectedDuringAltPress = false;
            }
            return;
        }

        // 检测Alt键按下
        if ((e.key === 'Alt' || e.keyCode === 18) && !isAltPressed && !isInput) {
            e.preventDefault();
            e.stopPropagation();

            isAltPressed = true;
            hasSelectedDuringAltPress = false;
            selectedText = '';
            detectedLink = null;
            isPanDetected = false;

            saveOriginalSelection();
            enableForcedTextSelection();
            document.addEventListener('mousedown', handleMouseDown, true);
            showSelectionIndicator();
            updateSelectionIndicator(0);
            document.addEventListener('selectionchange', handleSelectionChange);
        }
    };

    // 键盘释放事件处理
    const handleKeyUp = (e) => {
        if ((e.key === 'Alt' || e.keyCode === 18) && isAltPressed) {
            e.preventDefault();
            e.stopPropagation();

            document.removeEventListener('mousedown', handleMouseDown, true);

            // 处理选中的文本
            if (selectedText && hasSelectedDuringAltPress) {
                const selection = window.getSelection();

                // 检测网盘
                const panData = handlePanDetection(selection, selectedText);
                if (panData) {
                    // 如果是网盘，直接打开（不弹窗）
                    openPanLinkDirectly(panData);
                } else if (detectedLink) {
                    // 如果是普通链接，直接访问
                    visitLink(detectedLink);
                } else {
                    // 否则进行搜索
                    searchWithBing(selectedText);
                }
            }

            exitAltMode();
        }
    };

    const preventMenuActivation = (e) => {
        if (isAltPressed) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };

    // ===================== 初始化 =====================
    const init = () => {
        // 初始化默认配置
        if (GM_getValue('setting_active_in_front') === undefined) {
            GM_setValue('setting_active_in_front', true);
        }
        if (GM_getValue('setting_text_as_password') === undefined) {
            GM_setValue('setting_text_as_password', false);
        }
        if (GM_getValue('setting_auto_complete') === undefined) {
            GM_setValue('setting_auto_complete', false);
        }
        if (GM_getValue('setting_auto_click_btn') === undefined) {
            GM_setValue('setting_auto_click_btn', true);
        }

        // 清理之前的事件监听
        document.removeEventListener('keydown', handleKeyDown, true);
        document.removeEventListener('keyup', handleKeyUp, true);
        window.removeEventListener('contextmenu', preventMenuActivation);

        // 添加新的事件监听
        document.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('keyup', handleKeyUp, true);
        window.addEventListener('contextmenu', preventMenuActivation);

        // 自动填写密码
        setTimeout(autoFillPassword, 1000);
    };

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
