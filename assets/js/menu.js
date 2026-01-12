收到！我看到您上傳的圖片了，這張圖片提供了非常關鍵的資訊。

根據您的截圖和說明：

faq.html (常見問題) 不在根目錄，而是在 blog 資料夾裡。

blog (活動足跡) 的主頁面當然也在 blog 資料夾裡。

其他的 magic.html, bubble.html, balloon.html, decor.html 都在最外層（根目錄）。

這意味著我們必須修正 menu.js 裡面的連結路徑，加上 /blog/ 前綴。

✅ 修正後的 assets/js/menu.js (最終正確版)
請將您的 menu.js 內容完全清空，貼上這段代碼。我已經把「FAQ」和「活動足跡」的路徑都修好了。

JavaScript

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
