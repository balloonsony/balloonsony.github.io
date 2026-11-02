(function() {
    var isSubPage = window.location.pathname.indexOf('/service/') !== -1 || window.location.pathname.indexOf('/blog/') !== -1;
    var prefix = isSubPage ? '../' : '';

    // 針對 HTML5 UP Editorial 模板量身打造的現代化寬螢幕樣式
    var editorialModernStyles = `
    <style>
        /* 1. 完美解鎖 Editorial 模板的左側欄限制，轉為滿版寬螢幕 */
        #sidebar { display: none !important; }
        #wrapper { 
            padding-left: 0 !important; 
            display: block !important; 
            width: 100% !important; 
            max-width: 100% !important;
        }
        #main { 
            width: 100% !important; 
            max-width: 1300px !important; 
            margin: 0 auto !important; 
            padding: 4em 3em !important; 
            box-sizing: border-box !important;
        }

        @media screen and (max-width: 736px) {
            #main { padding: 2em 1.5em !important; }
        }

        /* 2. 頂部導覽列 (Sticky Header) 完美融入 Editorial 風格 */
        #site-header {
            position: sticky;
            top: 0;
            z-index: 10000;
            background: #ffffff;
            box-shadow: 0 2px 15px rgba(0,0,0,0.06);
            border-bottom: solid 1px rgba(210, 215, 217, 0.75);
            width: 100%;
        }
        .nav-container {
            max-width: 1350px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2.5em;
            height: 4.5em;
            box-sizing: border-box;
        }
        .nav-brand {
            font-family: "Roboto Slab", serif;
            font-size: 1.3em;
            font-weight: 700;
            color: #3d4449;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
            border-bottom: none !important;
        }
        .nav-brand span { color: #f56a6a; }

        /* 電腦版選單 */
        .desktop-menu {
            display: flex;
            align-items: center;
            gap: 5px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .desktop-menu > li { position: relative; }
        .desktop-menu a, .desktop-menu .menu-drop-btn {
            display: block;
            padding: 8px 14px;
            color: #7f888f;
            text-decoration: none;
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 0.95em;
            border-radius: 4px;
            transition: all 0.2s ease;
            cursor: pointer;
            white-space: nowrap;
            border-bottom: none !important;
        }
        .desktop-menu a:hover, .desktop-menu .menu-drop-btn:hover {
            background-color: rgba(245, 106, 106, 0.08);
            color: #f56a6a !important;
        }

        /* 下拉選單 */
        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 210px;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-radius: 6px;
            padding: 8px 0;
            list-style: none;
            z-index: 10001;
            border: solid 1px rgba(210, 215, 217, 0.75);
        }
        .dropdown-content a {
            padding: 10px 18px;
            font-size: 0.9em;
            color: #7f888f;
            font-weight: 400;
        }
        .dropdown-content a:hover {
            background-color: rgba(245, 106, 106, 0.08);
            color: #f56a6a !important;
        }
        .desktop-menu > li:hover .dropdown-content { display: block; }

        /* 預約亮點按鈕 */
        .btn-header-cta {
            background-color: #f56a6a !important;
            color: #ffffff !important;
            border-radius: 4px !important;
            padding: 8px 18px !important;
            box-shadow: 0 2px 6px rgba(245, 106, 106, 0.3);
        }
        .btn-header-cta:hover { background-color: #e05555 !important; color: #ffffff !important; }

        /* 手機版漢堡按鈕 */
        .mobile-hamburger {
            display: none;
            background: none;
            border: none;
            font-size: 1.5em;
            color: #3d4449;
            cursor: pointer;
        }

        /* 手機版抽屜選單 */
        .mobile-drawer {
            display: none;
            position: fixed;
            top: 4.5em;
            left: 0;
            width: 100%;
            height: calc(100vh - 4.5em);
            background: #ffffff;
            z-index: 9999;
            overflow-y: auto;
            padding: 20px;
            box-sizing: border-box;
            border-bottom: solid 1px rgba(210, 215, 217, 0.75);
        }
        .mobile-drawer ul { list-style: none; padding: 0; margin: 0; }
        .mobile-drawer > ul > li { border-bottom: solid 1px rgba(210, 215, 217, 0.3); padding: 12px 0; }
        .mobile-drawer a, .mobile-drawer .mobile-cat-title {
            font-family: "Roboto Slab", serif;
            font-size: 1.05em;
            font-weight: 700;
            color: #3d4449;
            text-decoration: none;
            display: block;
            border-bottom: none !important;
        }
        .mobile-sub-menu { list-style: none; padding-left: 15px !important; margin-top: 8px !important; }
        .mobile-sub-menu a {
            font-family: "Open Sans", sans-serif !important;
            font-size: 0.95em !important;
            font-weight: 400 !important;
            color: #7f888f !important;
            padding: 6px 0;
        }

        /* 響應式斷點 (低於 1024px 切換手機漢堡選單) */
        @media screen and (max-width: 1024px) {
            .desktop-menu { display: none; }
            .mobile-hamburger { display: block; }
            .nav-container { padding: 0 1.5em; }
        }

        /* 原有手機版 LINE 底部懸浮按鈕 */
        #sticky-cta { display: none; }
        @media (max-width: 768px) {
            #sticky-cta {
                display: block !important;
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                z-index: 20000;
                background: white;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                padding: 10px 15px;
                box-sizing: border-box;
            }
            #sticky-cta a {
                display: block;
                width: 100%;
                background-color: #06C755;
                color: white !important;
                text-align: center;
                padding: 12px 0;
                border-radius: 50px;
                font-weight: 700;
                text-decoration: none;
                font-size: 1.1em;
            }
            body { padding-bottom: 70px !important; }
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
                <li style="margin-top: 15px;"><a href="${prefix}index.html#contact" style="background:#f56a6a;color:white;text-align:center;padding:12px;border-radius:4px;display:block;">立即預約檔期</a></li>
            </ul>
        </div>
    </header>`;

    document.head.insertAdjacentHTML("beforeend", editorialModernStyles);
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
