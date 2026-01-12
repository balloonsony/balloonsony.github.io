(function() {
    // 取得當前網址路徑，判斷是否在子資料夾
    var isSubPage = window.location.pathname.indexOf('/service/') !== -1 || window.location.pathname.indexOf('/blog/') !== -1;
    var prefix = isSubPage ? '../' : '';

    var sidebarContent = `
    <div class="inner" style="display:flex;flex-direction:column;height:100vh;justify-content:space-between;">
        <a href="#menu" class="toggle"><span>選單</span></a>
        <nav id="menu">
            <header class="major"><h2>選單</h2></header>
            <ul>
                <li><a href="${prefix}index.html">首頁</a></li>
                <li><span class="opener">表演項目</span>
                    <ul>
                        <li><a href="${prefix}magic.html">魔術表演</a></li>
                        <li><a href="${prefix}bubble.html">泡泡秀</a></li>
                        <li><a href="${prefix}balloon.html">造型氣球</a></li>
                        <li><a href="${prefix}decor.html">會場佈置</a></li>
                    </ul>
                </li>
                <li><span class="opener">服務地區</span>
                    <ul>
                        <li><a href="${prefix}service/keelung-kids-party-show.html">基隆表演服務</a></li>
                        <li><a href="${prefix}service/taipei-kids-party-show.html">台北表演服務</a></li>
                        <li><a href="${prefix}service/newtaipei-kids-party-show.html">新北表演服務</a></li>
                        <li><a href="${prefix}service/taoyuan-kids-party-show.html">桃園表演服務</a></li>
                        <li><a href="${prefix}service/hsinchu-kids-party-show.html">新竹表演服務</a></li>
                        <li><a href="${prefix}service/miaoli-kids-party-show.html">苗栗表演服務</a></li>
                        <li><a href="${prefix}service/taichung-kids-party-show.html">台中表演服務</a></li>
                        <li><a href="${prefix}service/mid-autumn-community-show.html">中秋活動服務</a></li>
                        <li><a href="${prefix}service/christmas-community-show.html">聖誕活動服務</a></li>
                        <li><a href="${prefix}service/birthday-balloon-show.html">生日派對服務</a></li>
                    </ul>
                </li>
                <li><a href="${prefix}index.html#portfolio">作品集</a></li>
                <li><a href="${prefix}blog/faq.html">FAQ 常見問題</a></li>
                <li><a href="${prefix}blog/blog.html">活動足跡</a></li>
                <li><a href="${prefix}index.html#contact">聯絡方式</a></li>
            </ul>
        </nav>
        <footer id="footer" style="padding-bottom:40px;">
            <p>&copy; 氣球大叔 Sony. All rights reserved.</p>
        </footer>
    </div>`;

    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = sidebarContent;

    // 手機版按鈕樣式與注入
    var ctaStyles = `<style>#sticky-cta{display:none}@media (max-width:768px){#sticky-cta{display:block!important;position:fixed;bottom:0;left:0;width:100%;z-index:500;background:white;box-shadow:0 -2px 10px rgba(0,0,0,0.1);padding:10px 15px;box-sizing:border-box}#sticky-cta a{display:block;width:100%;background-color:#06C755;color:white!important;text-align:center;padding:12px 0;border-radius:50px;font-weight:700;text-decoration:none;font-size:1.1em;box-shadow:0 4px 6px rgba(6,199,85,.3)}body{padding-bottom:70px}}</style>`;
    var ctaHTML = `<div id="sticky-cta"><a href="https://line.me/ti/p/ObX9ZjEBXu" target="_blank">💬 立即加 LINE 詢問檔期</a></div>`;
    document.head.insertAdjacentHTML("beforeend", ctaStyles);
    document.body.insertAdjacentHTML("beforeend", ctaHTML);
})();
