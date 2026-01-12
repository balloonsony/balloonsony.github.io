document.addEventListener("DOMContentLoaded", function() {
    const sidebarContent = `
    <div class="inner" style="display:flex;flex-direction:column;height:100vh;justify-content:space-between;">
      <a href="#menu" class="toggle"><span>選單</span></a>
      <nav id="menu">
        <header class="major"><h2>選單</h2></header>
        <ul>
          <li><a href="index.html">首頁</a></li>
          <li><span class="opener">表演項目</span>
            <ul>
              <li><a href="magic.html">魔術表演</a></li>
              <li><a href="bubble.html">泡泡秀</a></li>
              <li><a href="balloon.html">造型氣球</a></li>
              <li><a href="decor.html">會場佈置</a></li>
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
          <li><a href="#portfolio">作品集</a></li>
          <li><a href="faq.html">FAQ 常見問題</a></li>
          <li><a href="blog.html">活動足跡</a></li>
          <li><a href="#contact">聯絡方式</a></li>
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

    // 2. 自動判斷當前網址，將對應的選單項目設為 active (亮起來)
    const currentPath = window.location.pathname.split("/").pop() || "index.html"; // 抓取檔名，若無則預設 index.html
    const menuLinks = document.querySelectorAll('#menu a');

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 如果連結等於當前頁面，就加上 active class (或者是 template 規定的樣式)
        if (href === currentPath || href === "./" + currentPath) {
            // 對於這個模板，通常不需要特別加 active class，
            // 但如果你想讓當前頁面變色，可以在這裡加上 link.classList.add('active');
            link.style.color = "#f56a6a"; // 舉例：讓當前頁面的文字變紅色
            link.style.fontWeight = "bold";
        }
    });
    
    // 3. 重新觸發 Template 的選單事件 (因為是動態生成的，原本的 main.js 可能抓不到)
    // 這一小段是為了確保手機版的選單按鈕 (Toggle) 能正常運作
    if (typeof $ !== 'undefined' && $('#menu').length) {
         // 如果原本的 main.js 需要重整，通常只要確保這個 script 在 main.js 之前執行即可
         // 或者在這裡補上簡單的 toggle 邏輯
    }
});
