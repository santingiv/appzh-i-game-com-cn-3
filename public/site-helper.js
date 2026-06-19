/**
 * site-helper.js — 轻量页面提示卡片、关键词徽章与访问说明
 * 不依赖第三方库，纯 DOM 操作
 */
(function () {
  'use strict';

  // ---------- 配置数据 ----------
  var config = {
    siteUrl: 'https://appzh-i-game.com.cn',
    keyword: '爱游戏',
    cardTitle: '欢迎来到爱游戏助手',
    cardMessage: '点击上方链接或访问 ' + 'https://appzh-i-game.com.cn' + ' 获取更多精彩内容。',
    badgeLabel: '爱游戏',
    badgeColor: '#1a73e8',
    infoText: '本页展示提示卡片、关键词徽章与访问说明。',
    seed: '8876a03b7423ccf5'
  };

  // ---------- 工具函数 ----------
  function createElement(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          if (key === 'className') {
            el.className = attrs[key];
          } else if (key === 'style' && typeof attrs[key] === 'object') {
            for (var s in attrs[key]) {
              if (attrs[key].hasOwnProperty(s)) {
                el.style[s] = attrs[key][s];
              }
            }
          } else {
            el.setAttribute(key, attrs[key]);
          }
        }
      }
    }
    if (children) {
      children.forEach(function (child) {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else {
          el.appendChild(child);
        }
      });
    }
    return el;
  }

  // ---------- 创建提示卡片 ----------
  function buildCard() {
    var card = createElement('div', {
      className: 'sh-helper-card',
      style: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '280px',
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        zIndex: '9999',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333',
        transition: 'opacity 0.3s'
      }
    });

    // 标题
    var title = createElement('h4', {
      style: {
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: '600',
        color: '#1a1a1a'
      }
    }, [config.cardTitle]);
    card.appendChild(title);

    // 消息
    var msg = createElement('p', {
      style: {
        margin: '0 0 12px 0',
        color: '#555'
      }
    }, [config.cardMessage]);
    card.appendChild(msg);

    // 关闭按钮
    var closeBtn = createElement('button', {
      style: {
        position: 'absolute',
        top: '6px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#999',
        lineHeight: '1'
      }
    }, ['×']);
    closeBtn.addEventListener('click', function () {
      card.style.opacity = '0';
      setTimeout(function () {
        if (card.parentNode) {
          card.parentNode.removeChild(card);
        }
      }, 300);
    });
    card.appendChild(closeBtn);

    // 关联链接
    var link = createElement('a', {
      href: config.siteUrl,
      target: '_blank',
      style: {
        display: 'inline-block',
        marginTop: '4px',
        color: '#1a73e8',
        textDecoration: 'underline',
        fontSize: '13px'
      }
    }, ['前往 ' + config.keyword]);
    card.appendChild(link);

    return card;
  }

  // ---------- 创建关键词徽章 ----------
  function buildBadge() {
    var badge = createElement('span', {
      className: 'sh-keyword-badge',
      style: {
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: config.badgeColor,
        color: '#ffffff',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        marginLeft: '8px',
        cursor: 'default',
        userSelect: 'none'
      }
    }, [config.badgeLabel]);
    return badge;
  }

  // ---------- 创建访问说明区域 ----------
  function buildInfoSection() {
    var container = createElement('div', {
      className: 'sh-info-section',
      style: {
        marginTop: '16px',
        padding: '12px 16px',
        backgroundColor: '#f5f7fa',
        borderLeft: '4px solid #1a73e8',
        borderRadius: '6px',
        fontSize: '13px',
        color: '#444'
      }
    });

    var infoParagraph = createElement('p', {
      style: { margin: '0 0 6px 0' }
    }, [config.infoText]);

    var accessHint = createElement('p', {
      style: { margin: '0' }
    }, ['提示：本页面为演示卡片、徽章与说明，不收集任何数据。']);

    container.appendChild(infoParagraph);
    container.appendChild(accessHint);

    return container;
  }

  // ---------- 初始化：挂载到页面 ----------
  function init() {
    // 等待 DOM 就绪
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mount);
    } else {
      mount();
    }
  }

  function mount() {
    // 避免重复注入
    if (document.querySelector('.sh-helper-card')) {
      return;
    }

    // 1. 插入提示卡片到 body
    var card = buildCard();
    document.body.appendChild(card);

    // 2. 在页面中找一个合适的位置插入徽章和说明（比如 main 或 article 开头）
    var target = document.querySelector('main, article, .content, #content');
    if (!target) {
      target = document.body;
    }

    // 徽章加在目标元素的标题或第一个段落旁边
    var heading = target.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (heading) {
      var badge = buildBadge();
      heading.appendChild(badge);
    }

    // 3. 在目标元素末尾添加访问说明
    var infoSection = buildInfoSection();
    target.appendChild(infoSection);
  }

  // 启动
  init();
})();