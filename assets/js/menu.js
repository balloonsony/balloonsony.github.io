(function() {
    const sidebarContent = `
    <div class="inner" style="display:flex;flex-direction:column;height:100vh;justify-content:space-between;">
      <a href="#menu" class="toggle"><span>選單</span></a>
      <nav id="menu">
        <header class="major"><h2>選單</h2></header>
        <ul>
          <li><a href="/index.html">首頁</a></li>
          <li><span class="opener" style="cursor:pointer; user-select:none;">表演項目</span>
            <ul>
              <li><a href="/magic.html">魔術表演</a></li>
              <li><a href="/bubble.html">泡泡秀</a></li>
              <li><a href="/balloon.html">造型氣球</a></li>
              <li><a href="/decor.html">會場佈置</a></li>
            </ul>
          </li>
          
          <li><span class="opener" style="cursor:pointer; user-select:none;">服務地區</span>
            <ul>
              <li><a href="/service/keelung-kids-party-show.html">基隆表演服務</a></li>
              <li><a href="/service/taipei-kids-party-show.html">台北表演服務</a></li>
              <li><a href="/service/newtaipei-kids-party-show.html">新北表演服務</a></li>
              <li><a href="/service/taoyuan-kids-party-show.html">桃園表演服務</a></li>
              <li><a href="/service/hsinchu-kids-party-show.html">新竹表演服務</a></li>
              <li><a href="/service/miaoli-kids-party-show.html">苗栗表演服務</a></li>
              <li><a href="/service/taichung-kids-party-show.html">台中表演服務</a></li>
            </ul>
          </li>
          
          <li><a href="/index.html#portfolio">作品集</a></li>
          <li><a href="/blog/faq.html">FAQ 常見問題</a></li>
          <li><a href="/blog/blog.html">活動足跡</a></li>
          <li><a href="/index.html#contact">聯絡方式</a></li>
        </ul>
      </nav>
      <footer id="footer" style="padding-bottom:40px;">
        <p>© 氣球大叔 Sony. All rights reserved.</p>
      </footer>
    </div>
    `;

    // 1. 立即將選單塞入
    const sidebarElement = document.getElementById("sidebar");
    if (sidebarElement) {
        sidebarElement.innerHTML = sidebarContent;
    }

    // 2. 🚨 修復下拉選單點擊 (關鍵修改)
    // 我們自己寫一段邏輯來控制開關，不依賴外部檔案
    const openers = document.querySelectorAll('#menu .opener');
    openers.forEach(opener => {
        opener.addEventListener('click', function(e) {
            e.preventDefault(); // 防止亂跳
            e.stopPropagation(); // 防止事件冒泡

            // 切換 active 樣式 (讓箭頭轉向)
            this.classList.toggle('active');

            // 找到下一個兄弟元素 (也就是那個 ul)
            const submenu = this.nextElementSibling;
            if (submenu) {
                // 如果目前是隱藏的，就顯示；反之則隱藏
                // 這裡模擬 jQuery slideToggle 的效果
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                } else {
                    submenu.style.display = 'block';
                }
            }
        });
    });

    // 3. 處理當前頁面亮燈
    try {
        const currentPath = window.location.pathname; 
        const menuLinks = document.querySelectorAll('#menu a');

        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (
                (currentPath === "/" && href === "/index.html") || 
                (href && href !== "/" && href !== "#" && currentPath.endsWith(href))
            ) {
                link.style.color = "#f56a6a"; 
                link.style.fontWeight = "bold";
            }
        });
    } catch (e) {
        console.log("Error in active link highlighting", e);
    }
})();
