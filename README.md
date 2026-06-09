# sri-lakshmi-devi-temple
Temple Pooja Booking Website 
[about.html](https://github.com/user-attachments/files/28734987/about.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Temple Info – Sri Lakshmi Devi Temple</title>
<link rel="stylesheet" href="style.css"/>
</head>
<body>
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">🪔 Sri Lakshmi Devi Temple <span>DIVINE POOJA BOOKING</span></a>
    <div class="nav-links">
      <a href="index.html">🏠 Home</a>
      <a href="services.html">🌸 Poojas</a>
      <a href="booking.html">📋 Book Pooja</a>
      <a href="about.html" class="active">🛕 Temple Info</a>
      <a href="booking-status.html">🔍 My Booking</a>
      <a href="admin-login.html" class="btn-admin">🔐 Admin</a>
      <div id="lang-toggle-nav" style="margin-left:4px;"></div>
    </div>
  </div>
</nav>

<section class="hero" style="padding:50px 24px 40px;">
  <div class="hero-om" style="font-size:3rem;">🛕</div>
  <h1 id="hero-name" style="font-size:clamp(1.3rem,3vw,2.2rem);">Sri Lakshmi Devi Temple</h1>
  <div class="hero-sub">✦ ABOUT OUR TEMPLE ✦</div>
  <div class="hero-divider"></div>
</section>

<section style="background:#fff;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;">
      <div>
        <h2 style="font-family:'Cinzel Decorative',cursive;color:var(--crimson);font-size:1.5rem;margin-bottom:16px;">About the Temple</h2>
        <p id="about-text" style="line-height:1.9;color:#444;font-size:1.05rem;margin-bottom:20px;"></p>
        <h3 style="font-family:'Cinzel',serif;color:var(--crimson);margin-bottom:14px;font-size:1rem;letter-spacing:1px;">TEMPLE INFORMATION</h3>
        <ul style="list-style:none;" id="info-list"></ul>
      </div>
      <div>
        <h3 style="font-family:'Cinzel',serif;color:var(--crimson);margin-bottom:16px;font-size:1rem;letter-spacing:1px;">TEMPLE GALLERY</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;">
          <div style="border-radius:8px;border:2px solid var(--border);background:linear-gradient(135deg,#f5e6c8,#fdf0d8);height:140px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;grid-column:span 2;">🛕</div>
          <div style="border-radius:8px;border:2px solid var(--border);background:linear-gradient(135deg,#f5e6c8,#fdf0d8);height:110px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">🪔</div>
          <div style="border-radius:8px;border:2px solid var(--border);background:linear-gradient(135deg,#f5e6c8,#fdf0d8);height:110px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">🌺</div>
          <div style="border-radius:8px;border:2px solid var(--border);background:linear-gradient(135deg,#f5e6c8,#fdf0d8);height:110px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">🔔</div>
          <div style="border-radius:8px;border:2px solid var(--border);background:linear-gradient(135deg,#f5e6c8,#fdf0d8);height:110px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">🌸</div>
        </div>
        <div style="background:var(--gold-pale);border:1px solid var(--border);border-radius:10px;padding:20px;text-align:center;">
          <h3 style="font-family:'Cinzel',serif;color:var(--crimson);margin-bottom:12px;font-size:0.95rem;">BOOK A POOJA TODAY</h3>
          <p style="font-size:0.9rem;color:#555;margin-bottom:14px;">Experience divine blessings with our traditional pooja services.</p>
          <a href="booking.html" class="btn btn-crimson btn-sm">🙏 BOOK NOW</a>
        </div>
      </div>
    </div>
  </div>
</section>

<footer>
  <h3 id="footer-name">🪔 Sri Lakshmi Devi Temple</h3>
  <p id="footer-info"></p>
  <div class="footer-links">
    <a href="index.html">Home</a><a href="services.html">Poojas</a>
    <a href="booking.html">Book Pooja</a><a href="about.html">About</a>
  </div>
  <div class="footer-copy">© 2025 Sri Lakshmi Devi Temple. All Rights Reserved.</div>
</footer>
<div id="toast"></div>
<script src="data.js"></script>
<script>
  const s = TempleDB.getSettings();
  document.title = 'Temple Info – ' + s.name;
  document.getElementById('hero-name').textContent = s.name;
  document.getElementById('about-text').textContent = s.about;
  document.getElementById('footer-name').textContent = '🪔 ' + s.name;
  document.getElementById('footer-info').innerHTML = s.address + '<br/>📞 ' + s.phone + ' | 📧 ' + s.email;
  document.getElementById('info-list').innerHTML = `
    <li style="padding:10px 0;border-bottom:1px dashed var(--border);display:flex;gap:12px;"><span>🕐</span><span><strong>Timings:</strong> ${s.timings}</span></li>
    <li style="padding:10px 0;border-bottom:1px dashed var(--border);display:flex;gap:12px;"><span>📍</span><span><strong>Address:</strong> ${s.address}</span></li>
    <li style="padding:10px 0;border-bottom:1px dashed var(--border);display:flex;gap:12px;"><span>📞</span><span><strong>Phone:</strong> ${s.phone}</span></li>
    <li style="padding:10px 0;border-bottom:1px dashed var(--border);display:flex;gap:12px;"><span>📧</span><span><strong>Email:</strong> ${s.email}</span></li>
    <li style="padding:10px 0;border-bottom:1px dashed var(--border);display:flex;gap:12px;"><span>👗</span><span><strong>Dress Code:</strong> ${s.dresscode}</span></li>
    <li style="padding:10px 0;display:flex;gap:12px;"><span>💳</span><span><strong>UPI Payment:</strong> ${s.upi}</span></li>`;
</script>
</body>
</html>
[admin-dashboard.html](https://github.com/user-attachments/files/28734991/admin-dashboard.html)
[admin-login.html](https://github.com/user-attachments/files/28734994/admin-login.html)
[booking.html](https://github.com/user-attachments/files/28734999/booking.html)
[booking-status.html](https://github.com/user-attachments/files/28735005/booking-status.html)
[style.css](https://github.com/user-attachments/files/28735010/style.css)
[services.html](https://github.com/user-attachments/files/28735009/services.html)
[index.html](https://github.com/user-attachments/files/28735008/index.html)
[data.js](https://github.com/user-attachments/files/28735006/data.js)
[data.js](https://github.com/user-attachments/files/28735017/data.js)
[style.css](https://github.com/user-attachments/files/28735016/style.css)
[services.html](https://github.com/user-attachments/files/28735015/services.html)
[index.html](https://github.com/user-attachments/files/28735014/index.html)
[index.html](https://github.com/user-attachments/files/28735028/index.html)
[data.js](https://github.com/user-attachments/files/28735027/data.js)
[style.css](https://github.com/user-attachments/files/28735026/style.css)
[services.html](https://github.com/user-attachments/files/28735025/services.html)
[services.html](https://github.com/user-attachments/files/28735032/services.html)
[index.html](https://github.com/user-attachments/files/28735031/index.html)
[data.js](https://github.com/user-attachments/files/28735030/data.js)
[style.css](https://github.com/user-attachments/files/28735029/style.css)
