document.addEventListener("DOMContentLoaded", function() {
    const sidebarContent = `
    <div class="inner" style="display:flex;flex-direction:column;height:100vh;justify-content:space-between;">
      <a href="#menu" class="toggle"><span>選單</span></a>
      <nav id="menu">
        <header class="major"><h2>選單</h2></header>
        <ul>
          <li><a href="/index.html">首頁</a></li>
          <li><span class="opener">表演項目</span>
            <ul>
              <li><a href="/magic.html">魔術表演</a></li>
              <li><a href="/bubble.html">泡泡秀</a></li>
              <li><a href="/balloon.html">造型氣球</a></li>
              <li><a href="/decor.html">會場佈置</a></li>
            </ul>
          </li>
          
          <li><span class="opener">服務地區</span>
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
          <li><a href="/blog/index.html">活動足跡</a></li>
          
          <li><a href="/index.html#contact">聯絡方式</a></li>
        </ul>
      </nav>
      <footer id="footer" style="padding-bottom:40px;">
        <p>© 氣球大叔 Sony. All rights reserved.</p>
      </footer>
    </div>
    `;

    // 1. 將選單 HTML 塞入 ID 為 sidebar 的區塊
    const sidebarElement = document.getElementById("sidebar");
    if (sidebarElement) {
        sidebarElement.innerHTML = sidebarContent;
    }

    // 2. 自動判斷當前網址 (包含資料夾路徑)，將對應的選單項目設為 active (亮起來)
    const currentPath = window.location.pathname; 
    const menuLinks = document.querySelectorAll('#menu a');

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 比對網址是否包含該連結 (例如 /blog/faq.html)
        // 加上 decodeURIComponent 是為了防止中文字網址編碼問題
        if (href && href !== "/" && href !== "#" && currentPath.endsWith(href)) {
            link.style.color = "#f56a6a"; 
            link.style.fontWeight = "bold";
        }
    });
    
    // 3. 重新觸發 Template 的選單事件 (確保手機版按鈕能按)
    if (typeof $ !== 'undefined' && $('#menu').length) {
         // 這裡不需要特別寫代碼，因為 main.js 通常會監聽 body 的 click 事件
    }
});
