(function() {
    // 1. 取得當前網址路徑，判斷是否在子資料夾 (service 或 blog)
    var isSubPage = window.location.pathname.indexOf('/service/') !== -1 || window.location.pathname.indexOf('/blog/') !== -1;
    var prefix = isSubPage ? '../' : '';

    // 2. 注入頂部選單與手機版漢堡選單的專屬 CSS 樣式
    var navStyles = `
    <style>
        /* 隱藏舊有側邊欄，讓畫面 100% 伸展 */
        #sidebar { display: none !important; }
        #wrapper { padding-left: 0 !important; }
        
        /* 頂部導覽列容器 (Desktop) */
        #site-header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: #ffffff;
            box-shadow: 0 2px 15px rgba(0,0,0,0.06);
            border-bottom: 1px solid #f0f0f0;
            width: 100%;
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
        }
        .nav-brand {
            font-size: 1.35em;
            font-weight: 800;
            color: #222222;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .nav-brand span { color: #f59e0b; }

        /* 電腦版選單樣式 */
        .desktop-menu {
            display: flex;
            align-items: center;
            gap: 5px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .desktop-menu > li {
            position: relative;
        }
        .desktop-menu a, .desktop-menu .menu-drop-btn {
            display: block;
            padding: 8px 16px;
            color: #333333;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.98em;
            border-radius: 6px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .desktop-menu a:hover, .desktop-menu .menu-drop-btn:hover {
            background-color: #fff7ed;
            color: #ea580c;
        }

        /* 下拉選單 (Dropdown) */
        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 200px;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-radius: 8px;
            padding: 8px 0;
            list-style: none;
            z-index: 1001;
            border: 1px solid #f1f5f9;
        }
        .dropdown-content a {
            padding: 10px 18px;
            font-size: 0.92em;
            color: #475569;
            font-weight: 500;
        }
        .dropdown-content a:hover {
            background-color: #fff7ed;
            color: #ea580c;
        }
        .desktop-menu > li:hover .dropdown-content {
            display: block;
        }

        /* 預約亮點按鈕 */
        .btn-header-cta {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
            color: #ffffff !important;
            border-radius: 50px !important;
            padding: 8px 20px !important;
            box-shadow: 0 4px 10px rgba(234, 88, 12, 0.25);
        }

        /* 手機版漢堡按鈕 (Mobile Toggle) */
        .mobile-hamburger {
            display: none;
            background: none;
            border: none;
            font-size: 1.6em;
            color: #333;
            cursor: pointer;
            padding: 4px 8px;
        }

        /* 手機版抽屜式選單 */
        .mobile-drawer {
            display: none;
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            height: calc(100vh - 60px);
            background: #ffffff;
            z-index: 999;
            overflow-y: auto;
            padding: 20px;
            box-sizing: border-box;
        }
        .mobile-drawer ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .mobile-drawer > ul > li {
            border-bottom: 1px solid #f1f5f9;
            padding: 12px 0;
        }
        .mobile-drawer a, .mobile-drawer .mobile-cat-title {
            font-size: 1.1em;
            font-weight: 700;
            color: #1e293b;
            text-decoration: none;
            display: block;
        }
        .mobile-sub-menu {
            list-style: none;
            padding-left: 15px !important;
            margin-top: 8px !important;
        }
        .mobile-sub-menu a {
            font-size: 0.95em !important;
            font-weight: 500 !important;
            color: #64748b !important;
            padding: 6px 0;
        }

        /* 響應式切換點 (Mobile Breakpoint) */
        @media (max-width: 900px) {
            .desktop-menu { display: none; }
            .mobile-hamburger { display: block; }
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
                z-index: 2000;
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
                box-shadow: 0 4px 6px rgba(6,199,85,.3);
            }
            body { padding-bottom: 70px; }
        }
    </style>`;

    // 3. 建立頂部選單 HTML 架構
    var topHeaderHTML = `
    <header id="site-header">
        <div class="nav-container">
            <a href="${prefix}index.html" class="nav-brand">
                🎈 氣球大叔 <span>Sony</span>
            </a>
            
            <!-- 電腦版頂部選單 -->
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
                        <li><a href="${prefix}service/corporate-brand-event.html">企業家庭日 / 品牌活動方案</a></li>
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
                <li><a href="${prefix}blog/faq.html">FAQ 常見問題</a></li>
                <li><a href="${prefix}blog/blog.html">活動足跡</a></li>
                <li><a href="${prefix}index.html#contact" class="btn-header-cta">立即預約檔期</a></li>
            </ul>

            <!-- 手機版漢堡選單按鈕 -->
            <button class="mobile-hamburger" id="hamburger-btn" aria-label="切換選單">☰</button>
        </div>

        <!-- 手機版展開選單 (Drawer) -->
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
                        <li><a href="${prefix}service/corporate-brand-event.html">企業家庭日 / 品牌活動方案</a></li>
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
                <li style="margin-top: 15px;"><a href="${prefix}index.html#contact" style="background:#ea580c;color:white;text-align:center;padding:10px;border-radius:25px;">立即預約檔期</a></li>
            </ul>
        </div>
    </header>`;

    // 4. 執行注入與初始化
    document.head.insertAdjacentHTML("beforeend", navStyles);
    
    // 插入頂部 Header 到 body 的第一個元素之前
    document.body.insertAdjacentHTML("afterbegin", topHeaderHTML);

    // 5. 手機版漢堡選單點擊開關邏輯
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

    // 6. 手機版 LINE 底部懸浮按鈕注入
    var ctaHTML = `<div id="sticky-cta"><a href="https://page.line.me/qxq3473t" target="_blank">💬 立即加 LINE 詢問檔期</a></div>`;
    document.body.insertAdjacentHTML("beforeend", ctaHTML);
})();
