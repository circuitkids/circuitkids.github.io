/* Circuit Kids optional website analytics. No collection before opt-in. */
(function () {
  'use strict';
  var id = 'G-XHHZSD6SZD', key = 'ck-analytics-consent-v1', active = false;
  function choice() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function remember(value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function start() {
    if (active) return;
    active = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    gtag('js', new Date());
    gtag('config', id, {allow_google_signals:false, allow_ad_personalization_signals:false, page_location:location.origin+location.pathname, page_referrer:document.referrer.split('?')[0].split('#')[0]});
    var script = document.createElement('script');
    script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
  function download(name, link) {
    if (!active) return;
    gtag('event', 'file_download', {file_name:name, file_extension:'pdf', link_text:link.textContent.trim(), link_url:location.origin+location.pathname, page_location:location.origin+location.pathname});
  }
  window.ckTrackDownload = download;
  function ready() {
    var box = document.createElement('aside');
    box.setAttribute('aria-label', 'Website analytics choice');
    box.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;max-width:640px;margin:auto;z-index:10000;padding:16px;background:#fff;color:#17324d;border:1px solid #b8c9dc;border-radius:12px;box-shadow:0 3px 18px #0003;font:14px/1.45 system-ui,sans-serif;';
    var text = document.createElement('p'); text.style.margin='0 0 12px';
    text.textContent = 'Optional analytics: with your permission, Circuit Kids uses Google Analytics cookies to count visits, page use and book or resource download clicks. We do not send names, email addresses or form answers. The site and free downloads work without analytics.';
    var details = document.createElement('a'); details.href='https://policies.google.com/technologies/partner-sites'; details.target='_blank'; details.rel='noopener'; details.textContent='How Google uses this data'; details.style.cssText='display:inline-block;color:#145fa0;margin-bottom:12px';
    box.appendChild(text); box.appendChild(details); box.appendChild(document.createElement('br'));
    function button(label, value) {
      var b=document.createElement('button'); b.type='button'; b.textContent=label;
      b.style.cssText='font:inherit;padding:8px 14px;margin:0 8px 4px 0;border:1px solid #17324d;border-radius:7px;background:#fff;color:#17324d;cursor:pointer';
      b.onclick=function () {remember(value); box.hidden=true; if(value==='yes')start(); else if(active)location.reload();};
      box.appendChild(b);
    }
    button('Allow analytics','yes'); button('No thanks','no');
    document.body.appendChild(box);
    var settings=document.createElement('button'); settings.type='button'; settings.textContent='Analytics privacy & choices';
    settings.style.cssText='display:block;margin:16px auto;padding:7px 12px;font:13px system-ui,sans-serif;border:1px solid #b8c9dc;border-radius:6px;background:white;color:#17324d;cursor:pointer';
    settings.onclick=function () {box.hidden=false;}; document.body.appendChild(settings);
    var saved=choice(); box.hidden=!!saved; if(saved==='yes')start();
    document.addEventListener('click',function (e) {
      var a=e.target.closest('a'); if(!a)return;
      var filename=a.getAttribute('download');
      if(filename && /\.pdf$/i.test(filename)) download(filename,a);
    },true);
    document.addEventListener('click',function(e){
      if(!active)return;
      var b=e.target.closest('button');
      if(b && /^(Next page|Previous page|Next|Previous)$/.test(b.textContent.trim()))gtag('event','book_page_turn',{direction:/Next/.test(b.textContent)?'next':'previous'});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
