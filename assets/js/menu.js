(function() {
    var isSubPage = window.location.pathname.indexOf('/service/') !== -1 || window.location.pathname.indexOf('/blog/') !== -1;
    var prefix = isSubPage ? '../' : '';

    var globalStyles = `
    <style>
        /* 1. 徹底清除舊側邊欄，讓主內容展開而不被夾在中間 */
        #sidebar { display: none !important; }
        #wrapper { padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
        
        /* 讓主內容區塊可以適度展開，不再被死死限制在窄中間 */
        #main { 
            width: 100% !important; 
            max-width: 1400px !important; 
            margin: 0 auto !important; 
            padding: 40px 30px !important; 
            box-sizing: border-box !important;
        }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang TC", "Microsoft JhengHei", sans-serif !important; 
            color: #334155 !important; 
            background-color: #f8fafc !important; 
            margin: 0 !important;
        }

        /* 2. 頂部導覽列：拉寬至兩側，跟大螢幕完美貼合 */
        #site-header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border-bottom: 1px solid #e2e8f0;
            width: 100%;
        }
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 30px;
            box-sizing: border-box;
        }
        .nav-brand {
            font-size: 1.3em;
            font-weight: 800;
            color: #0f172a;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
        }
        .nav-brand span { color: #ea580c; }

        .desktop-menu {
            display: flex;
            align-items: center;
            gap: 10px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .desktop-menu > li { position: relative; }
        .desktop-menu a, .desktop-menu .menu-drop-btn {
            display: block;
            padding: 8px 14px;
            color: #475569;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95em;
            border-radius: 8px;
            transition: all 0.2s ease;
            cursor: pointer;
            white-space: nowrap;
        }
        .desktop-menu a:hover, .desktop-menu .menu-drop-btn:hover {
            background-color: #fff7ed;
            color: #ea580c;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 220px;
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            border-radius: 12px;
            padding: 10px 0;
            list-style: none;
            z-index: 1001;
            border: 1px solid #f1f5f9;
        }
        .dropdown-content a {
            padding: 10px 20px;
            font-size: 0.9em;
            color: #334155;
            font-weight: 500;
        }
        .dropdown-content a:hover {
            background-color: #fff7ed;
            color: #ea580c;
        }
        .desktop-menu > li:hover .dropdown-content { display: block; }

        .btn-header-cta {
            background: #ea580c !important;
            color: #ffffff !important;
            border-radius: 50px !important;
            padding: 9px 20px !important;
            box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25);
            font-weight: 700 !important;
        }
        .btn-header-cta:hover { background: #c2410c !important; }

        /* 3. 內文區塊現代化卡片設計（改為舒適的寬幅滿版感） */
        .inner > section, section.main {
            background: #ffffff !important;
            border-radius: 16px !important;
            padding: 40px !important;
            margin-bottom: 30px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03) !important;
            border: 1px solid #f1f5f9 !important;
        }
        h1 { font-size: 2.3em !important; color: #0f172a !important; font-weight: 800 !important; line-height: 1.3 !important; }
        h2 { font-size: 1.6em !important; color: #1e293b !important; border-bottom: 2px solid #ffedd5 !important; padding-bottom: 8px !important; margin-top: 25px !important; }

        /* 4. 手機版選單 */
        .mobile-hamburger { display: none; background: none; border: none; font-size: 1.8em; color: #0f172a; cursor: pointer; }
        .mobile-drawer {
            display: none; position: fixed; top: 65px; left: 0; width: 100%; height: calc(100vh - 65px);
            background: #ffffff; z-index: 999; overflow-y: auto; padding: 24px; box-sizing: border-box;
        }
        .mobile-drawer ul { list-style: none; padding: 0; margin: 0; }
        .mobile-drawer > ul > li { border-bottom: 1px solid #f1f5f9; padding: 14px 0; }
        .mobile-drawer a, .mobile-drawer .mobile-cat-title { font-size: 1.1em; font-weight: 700; color: #0f172a; text-decoration: none; display: block; }
        .mobile-sub-menu { list-style: none; padding-left: 15px !important; margin-top: 10px !important; }
        .mobile-sub-menu a { font-size: 0.95em !important; font-weight: 500 !important; color: #64748b !important; padding: 6px 0; }

        @media (max-width: 1024px) {
            .desktop-menu { display: none; }
            .mobile-hamburger { display: block; }
        }

        #sticky-cta { display: none; }
        @media (max-width: 768px) {
            #sticky-cta {
                display: block !important; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 2000;
                background: white; box-shadow: 0 -4px 15px rgba(0,0,0,0.08); padding: 12px 20px; box-sizing: border-box;
            }
            #sticky-cta a {
                display: block; width: 100%; background-color: #06C755; color: white !important;
                text-align: center; padding: 12px 0; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 1.1em;
            }
            body { padding-bottom: 75px !important; }
            #main { padding: 20px 15px !important; }
        }
    </style>`;

    var topHeaderHTML = `
    <header id="site-header">
        <div class="nav-container">
            <a href="${prefix}index.html" class="nav-brand">
                🎈 氣球大叔 <span>Sony</span>
            </a>
            
            <ul class="desktop-menu">
                <li><a href="${prefix}index.html">首頁</a></li>
                <li>
                    <span class="menu-drop-btn">表演項目 ▾</span>
                    <ul class="dropdown-content">
                        <li><a href="${prefix}magic.html">親子互動魔術秀</a></li>
                        <li><a href="${prefix}bubble.html">泡泡秀</a></li>
                        <li><a href="${prefix}balloon.html">造型氣球互動</a></li>
                        <li><a href="${prefix}decor.html">會場佈置</a></li>
                    </ul>
                </li>
                <li>
                    <span class="menu-drop-btn">活動場景 ▾</span>
                    <ul class="dropdown-content">
                        <li><a href="${prefix}service/birthday-balloon-show.html">生日派對方案</a></li>
                        <li><a href="${prefix}service/kindergarten-school-event.html">幼兒園 / 校園活動方案</a></li>
                        <li><a href="${prefix}service/corporate-brand-event.html">企業家庭日 / 品牌方案</a></li>
                        <li><a href="${prefix}service/mid-autumn-community-show.html">中秋活動方案</a></li>
                        <li><a href="${prefix}service/christmas-community-show.html">聖誕活動方案</a></li>
                    </ul>
                </li>
                <li>
                    <span class="menu-drop-btn">服務地區 ▾</span>
                    <ul class="dropdown-content">
                        <li><a href="${prefix}service/keelung-kids-party-show.html">基隆表演服務</a></li>
                        <li><a href="${prefix}service/taipei-kids-party-show.html">台北表演服務</a></li>
                        <li><a href="${prefix}service/newtaipei-kids-party-show.html">新北表演服務</a></li>
                        <li><a href="${prefix}service/taoyuan-kids-party-show.html">桃園表演服務</a></li>
                        <li><a href="${prefix}service/hsinchu-kids-party-show.html">新竹表演服務</a></li>
                        <li><a href="${prefix}service/miaoli-kids-party-show.html">苗栗表演服務</a></li>
                        <li><a href="${prefix}service/taichung-kids-party-show.html">台中表演服務</a></li>
                    </ul>
                </li>
                <li><a href="${prefix}index.html#portfolio">作品集</a></li>
                <li><a href="${prefix}blog/faq.html">FAQ</a></li>
                <li><a href="${prefix}blog/blog.html">活動足跡</a></li>
                <li><a href="${prefix}index.html#contact" class="btn-header-cta">立即預約</a></li>
            </ul>

            <button class="mobile-hamburger" id="hamburger-btn" aria-label="切換選單">☰</button>
        </div>

        <div class="mobile-drawer" id="mobile-drawer">
            <ul>
                <li><a href="${prefix}index.html">首頁</a></li>
                <li>
                    <span class="mobile-cat-title">🎩 表演項目</span>
                    <ul class="mobile-sub-menu">
                        <li><a href="${prefix}magic.html">親子互動魔術秀</a></li>
                        <li><a href="${prefix}bubble.html">泡泡秀</a></li>
                        <li><a href="${prefix}balloon.html">造型氣球互動</a></li>
                        <li><a href="${prefix}decor.html">會場佈置</a></li>
                    </ul>
                </li>
                <li>
                    <span class="mobile-cat-title">🎉 活動場景</span>
                    <ul class="mobile-sub-menu">
                        <li><a href="${prefix}service/birthday-balloon-show.html">生日派對方案</a></li>
                        <li><a href="${prefix}service/kindergarten-school-event.html">幼兒園 / 校園活動方案</a></li>
                        <li><a href="${prefix}service/corporate-brand-event.html">企業家庭日 / 品牌方案</a></li>
                        <li><a href="${prefix}service/mid-autumn-community-show.html">中秋活動方案</a></li>
                        <li><a href="${prefix}service/christmas-community-show.html">聖誕活動方案</a></li>
                    </ul>
                </li>
                <li>
                    <span class="mobile-cat-title">📍 服務地區</span>
                    <ul class="mobile-sub-menu">
                        <li><a href="${prefix}service/keelung-kids-party-show.html">基隆表演服務</a></li>
                        <li><a href="${prefix}service/taipei-kids-party-show.html">台北表演服務</a></li>
                        <li><a href="${prefix}service/newtaipei-kids-party-show.html">新北表演服務</a></li>
                        <li><a href="${prefix}service/taoyuan-kids-party-show.html">桃園表演服務</a></li>
                        <li><a href="${prefix}service/hsinchu-kids-party-show.html">新竹表演服務</a></li>
                        <li><a href="${prefix}service/miaoli-kids-party-show.html">苗栗表演服務</a></li>
                        <li><a href="${prefix}service/taichung-kids-party-show.html">台中表演服務</a></li>
                    </ul>
                </li>
                <li><a href="${prefix}index.html#portfolio">作品集</a></li>
                <li><a href="${prefix}blog/faq.html">FAQ 常見問題</a></li>
                <li><a href="${prefix}blog/blog.html">活動足跡</a></li>
                <li style="margin-top: 15px;"><a href="${prefix}index.html#contact" style="background:#ea580c;color:white;text-align:center;padding:12px;border-radius:25px;display:block;">立即預約檔期</a></li>
            </ul>
        </div>
    </header>`;

    document.head.insertAdjacentHTML("beforeend", globalStyles);
    document.body.insertAdjacentHTML("afterbegin", topHeaderHTML);

    var btn = document.getElementById('hamburger-btn');
    var drawer = document.getElementById('mobile-drawer');
    if (btn && drawer) {
        btn.addEventListener('click', function() {
            if (drawer.style.display === 'block') {
                drawer.style.display = 'none';
                btn.innerHTML = '☰';
            } else {
                drawer.style.display = 'block';
                btn.innerHTML = '✕';
            }
        });
    }

    var ctaHTML = `<div id="sticky-cta"><a href="https://page.line.me/qxq3473t" target="_blank">💬 立即加 LINE 詢問檔期</a></div>`;
    document.body.insertAdjacentHTML("beforeend", ctaHTML);
})();
