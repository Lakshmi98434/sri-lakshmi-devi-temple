// ══════════════════════════════════════════
//  Sri Lakshmi Devi Temple – Shared Data Layer
//  All data saved in localStorage
// ══════════════════════════════════════════

const TempleDB = {

  defaults: {
    settings: {
      name: "Sri Lakshmi Devi Temple",
      tagline: "Divine Blessings Await",
      address: "Temple Street, Main Road, Mysore – 570001",
      phone: "+91 98765 43210",
      email: "info@srilakshmidevitemple.org",
      timings: "6:00 AM – 12:00 PM | 4:00 PM – 8:30 PM",
      dresscode: "Traditional attire preferred",
      about: "Sri Lakshmi Devi Temple is a sacred abode of peace, devotion, and divine grace. Established over 150 years ago, our temple has been a beacon of spiritual light for generations of devotees. The presiding deity, Goddess Maha Lakshmi, blesses all who seek her with wealth, health, and happiness.",
      upi: "temple@upi",
      whatsapp: "9876543210"
    },
    poojas: [
      { id:1, icon:"🌸", name:"Lakshmi Puja",       price:501,  duration:"45 Minutes", desc:"Traditional puja for wealth and prosperity blessings.", active:true },
      { id:2, icon:"🪔", name:"Abhishekam",          price:1001, duration:"1 Hour",     desc:"Sacred ritual bathing of deity with milk, honey & rose water.", active:true },
      { id:3, icon:"🔥", name:"Homam / Havan",       price:2501, duration:"2–3 Hours",  desc:"Fire ritual performed for health and removal of obstacles.", active:true },
      { id:4, icon:"🌺", name:"Satyanarayana Puja",  price:1501, duration:"1.5 Hours",  desc:"Auspicious puja for peace, harmony and fulfillment of wishes.", active:true },
      { id:5, icon:"👶", name:"Namakarana",           price:2001, duration:"1 Hour",     desc:"Sacred naming ceremony for newborns with priest guidance.", active:true },
      { id:6, icon:"💒", name:"Vivah Pooja",          price:5001, duration:"3–4 Hours",  desc:"Wedding blessings ceremony conducted at the temple.", active:true },
      { id:7, icon:"🎂", name:"Birthday Archana",     price:251,  duration:"20 Minutes", desc:"Special archana and blessings on your birthday.", active:true },
      { id:8, icon:"🕯️", name:"Griha Pravesh Puja", price:3001, duration:"2 Hours",    desc:"House warming ceremony for blessings in your new home.", active:true },
    ],
    announcements: [
      { id:1, title:"Varalakshmi Vratham 2025", date:"August 9, 2025",     body:"Grand celebration with special Abhishekam, Alankara, and Maha Prasad. Pre-booking mandatory.", active:true },
      { id:2, title:"Friday Special Poojas",    date:"Every Friday",       body:"Special Lakshmi Puja held every Friday evening at 6:00 PM. All devotees are invited.", active:true },
      { id:3, title:"Temple Renovation Update", date:"Ongoing",            body:"Gopuram renovation work is progressing well. Temple services remain unaffected.", active:true },
      { id:4, title:"Navratri Celebrations",    date:"October 2–11, 2025", body:"Nine-day festival with daily poojas, cultural programs, and Maha Arati.", active:true },
    ],
    bookings: [],
    admins: [
      { username:"admin",   password:"temple123", role:"Head Admin", name:"Temple Admin"   },
      { username:"priest",  password:"priest123", role:"Priest",     name:"Head Priest"    },
      { username:"manager", password:"mgr123",    role:"Manager",    name:"Temple Manager" },
    ]
  },

  // ── INIT ──
  init() {
    if(!localStorage.getItem('temple_settings'))      localStorage.setItem('temple_settings',      JSON.stringify(this.defaults.settings));
    if(!localStorage.getItem('temple_poojas'))        localStorage.setItem('temple_poojas',        JSON.stringify(this.defaults.poojas));
    if(!localStorage.getItem('temple_announcements')) localStorage.setItem('temple_announcements', JSON.stringify(this.defaults.announcements));
    if(!localStorage.getItem('temple_bookings'))      localStorage.setItem('temple_bookings',      JSON.stringify(this.defaults.bookings));
    if(!localStorage.getItem('temple_admins'))        localStorage.setItem('temple_admins',        JSON.stringify(this.defaults.admins));
  },

  // ── GETTERS ──
  getSettings()      { return JSON.parse(localStorage.getItem('temple_settings')); },
  getPoojas()        { return JSON.parse(localStorage.getItem('temple_poojas')); },
  getAnnouncements() { return JSON.parse(localStorage.getItem('temple_announcements')); },
  getBookings()      { return JSON.parse(localStorage.getItem('temple_bookings')); },
  getAdmins()        { return JSON.parse(localStorage.getItem('temple_admins')); },

  // ── SETTERS ──
  saveSettings(d)      { localStorage.setItem('temple_settings',      JSON.stringify(d)); },
  savePoojas(d)        { localStorage.setItem('temple_poojas',        JSON.stringify(d)); },
  saveAnnouncements(d) { localStorage.setItem('temple_announcements', JSON.stringify(d)); },
  saveBookings(d)      { localStorage.setItem('temple_bookings',      JSON.stringify(d)); },
  saveAdmins(d)        { localStorage.setItem('temple_admins',        JSON.stringify(d)); },

  // ── BOOKING HELPERS ──
  addBooking(b) {
    const all = this.getBookings();
    b.id        = Date.now();
    b.bookingRef= 'SLD' + String(all.length + 1).padStart(4,'0');
    b.status    = 'Pending';
    b.reason    = '';
    b.createdAt = new Date().toISOString();
    all.push(b);
    this.saveBookings(all);
    return b;
  },
  updateBookingStatus(id, status, reason='') {
    const all = this.getBookings();
    const idx = all.findIndex(b => b.id === id);
    if(idx > -1) {
      all[idx].status    = status;
      all[idx].reason    = reason;
      all[idx].updatedAt = new Date().toISOString();
      this.saveBookings(all);
    }
  },

  // ── AUTH ──
  login(username, password) {
    const admin = this.getAdmins().find(a => a.username===username && a.password===password);
    if(admin) { sessionStorage.setItem('temple_admin', JSON.stringify(admin)); return admin; }
    return null;
  },
  logout()      { sessionStorage.removeItem('temple_admin'); },
  getLoggedIn() { const a=sessionStorage.getItem('temple_admin'); return a?JSON.parse(a):null; },
  isLoggedIn()  { return !!this.getLoggedIn(); },

  // ── CHANGE PASSWORD ──
  changePassword(username, oldPass, newPass) {
    const admins = this.getAdmins();
    const idx    = admins.findIndex(a => a.username===username && a.password===oldPass);
    if(idx > -1) {
      admins[idx].password = newPass;
      this.saveAdmins(admins);
      // Update session
      sessionStorage.setItem('temple_admin', JSON.stringify(admins[idx]));
      return true;
    }
    return false;
  },

  // ── LANGUAGE ──
  getLang()     { return localStorage.getItem('temple_lang') || 'en'; },
  setLang(lang) { localStorage.setItem('temple_lang', lang); },
};

TempleDB.init();

// ── TRANSLATIONS ──
const LANG = {
  en: {
    nav_home:'🏠 Home', nav_poojas:'🌸 Poojas', nav_book:'📋 Book Pooja',
    nav_temple:'🛕 Temple Info', nav_mybooking:'🔍 My Booking', nav_admin:'🔐 Admin',
    hero_sub:'DIVINE BLESSINGS AWAIT',
    book_title:'Book a Pooja', book_sub:'RESERVE YOUR SACRED TIME',
    book_desc:'Fill in the form below. Our priest will confirm your booking via phone.',
    lbl_name:'FULL NAME *', lbl_phone:'PHONE NUMBER *', lbl_email:'EMAIL ADDRESS',
    lbl_city:'CITY / PLACE', lbl_pooja:'SELECT POOJA *', lbl_persons:'NUMBER OF PERSONS *',
    lbl_date:'PREFERRED DATE *', lbl_time:'PREFERRED TIME *', lbl_notes:'NAKSHATRA / GOTHRAM / SPECIAL REQUESTS',
    lbl_payment:'💰 PAYMENT METHOD', pay_title:'Cash Payment at Temple',
    pay_desc:'Please pay the pooja amount in cash at the temple counter on the day of your pooja. No online payment required.',
    pay_note:'* Please carry the exact amount. Receipt will be issued at the temple counter.',
    btn_confirm:'🙏 CONFIRM POOJA BOOKING',
    form_note:'* Booking is subject to priest confirmation via phone call.',
    success_title:'Booking Submitted!',
    success_pending:'⏳ STATUS: PENDING APPROVAL',
    success_pending_desc:'Our team will review and confirm your booking shortly. You will be contacted on your phone number.',
    success_sheet:'📊 Your booking has been saved. The temple admin will contact you shortly. 🙏',
    btn_another:'➕ BOOK ANOTHER POOJA', btn_home:'🏠 GO HOME',
    status_title:'Check Booking Status', status_sub:'TRACK YOUR POOJA BOOKING',
    status_desc:'Enter your Booking Reference ID and registered phone number to check your booking status.',
    lbl_ref:'BOOKING REFERENCE ID *', lbl_phone2:'REGISTERED PHONE NUMBER *',
    btn_check:'🔍 CHECK MY BOOKING STATUS',
    status_pending:'⏳ PENDING', status_confirmed:'✅ CONFIRMED', status_rejected:'❌ REJECTED',
    msg_pending:'⏳ Your booking is currently under review. Our priest will contact you on your registered phone number to confirm the pooja details. Please wait for the confirmation call.',
    msg_confirmed:'✅ Congratulations! Your pooja booking has been confirmed. Please arrive at the temple 15 minutes before your scheduled time. Dress code: Traditional attire preferred. 🙏',
    msg_rejected:'❌ Unfortunately your booking could not be confirmed.',
    reject_reason:'Reason:',
    notfound_title:'Booking Not Found',
    notfound_desc:'No booking found with this Reference ID and Phone Number. Please double-check or make a new booking.',
    announcements:'Temple Announcements', latest_news:'Latest News & Events',
    our_poojas:'Our Pooja Services', sacred:'Sacred Offerings',
    visit:'Visit the Temple', timings:'Timings', address:'Address',
    phone:'Phone', email:'Email', dresscode:'Dress Code', upi:'UPI Payment',
    footer_rights:'All Rights Reserved.',
  },
  kn: {
    nav_home:'🏠 ಮುಖಪುಟ', nav_poojas:'🌸 ಪೂಜೆಗಳು', nav_book:'📋 ಪೂಜೆ ಬುಕ್',
    nav_temple:'🛕 ದೇವಸ್ಥಾನ', nav_mybooking:'🔍 ನನ್ನ ಬುಕಿಂಗ್', nav_admin:'🔐 ನಿರ್ವಾಹಕ',
    hero_sub:'ದೈವಿಕ ಆಶೀರ್ವಾದ ನಿರೀಕ್ಷಿಸಿ',
    book_title:'ಪೂಜೆ ಬುಕ್ ಮಾಡಿ', book_sub:'ನಿಮ್ಮ ಪವಿತ್ರ ಸಮಯ ಕಾಯ್ದಿರಿಸಿ',
    book_desc:'ಕೆಳಗಿನ ಫಾರ್ಮ್ ತುಂಬಿ. ನಮ್ಮ ಅರ್ಚಕರು ಫೋನ್ ಮೂಲಕ ದೃಢಪಡಿಸುತ್ತಾರೆ.',
    lbl_name:'ಪೂರ್ಣ ಹೆಸರು *', lbl_phone:'ಫೋನ್ ಸಂಖ್ಯೆ *', lbl_email:'ಇಮೇಲ್ ವಿಳಾಸ',
    lbl_city:'ನಗರ / ಊರು', lbl_pooja:'ಪೂಜೆ ಆಯ್ಕೆ ಮಾಡಿ *', lbl_persons:'ವ್ಯಕ್ತಿಗಳ ಸಂಖ್ಯೆ *',
    lbl_date:'ಆದ್ಯತೆಯ ದಿನಾಂಕ *', lbl_time:'ಆದ್ಯತೆಯ ಸಮಯ *', lbl_notes:'ನಕ್ಷತ್ರ / ಗೋತ್ರ / ವಿಶೇಷ ವಿನಂತಿ',
    lbl_payment:'💰 ಪಾವತಿ ವಿಧಾನ', pay_title:'ದೇವಸ್ಥಾನದಲ್ಲಿ ನಗದು ಪಾವತಿ',
    pay_desc:'ಪೂಜೆಯ ದಿನ ದೇವಸ್ಥಾನದ ಕೌಂಟರ್‌ನಲ್ಲಿ ನಗದು ಪಾವತಿ ಮಾಡಿ. ಆನ್‌ಲೈನ್ ಪಾವತಿ ಅಗತ್ಯವಿಲ್ಲ.',
    pay_note:'* ನಿಖರವಾದ ಮೊತ್ತ ತನ್ನಿ. ರಸೀದಿ ನೀಡಲಾಗುವುದು.',
    btn_confirm:'🙏 ಪೂಜೆ ಬುಕಿಂಗ್ ದೃಢಪಡಿಸಿ',
    form_note:'* ಬುಕಿಂಗ್ ಅರ್ಚಕರ ದೃಢೀಕರಣಕ್ಕೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ.',
    success_title:'ಬುಕಿಂಗ್ ಸಲ್ಲಿಸಲಾಗಿದೆ!',
    success_pending:'⏳ ಸ್ಥಿತಿ: ಅನುಮೋದನೆ ಬಾಕಿ',
    success_pending_desc:'ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮ ಬುಕಿಂಗ್ ದೃಢಪಡಿಸುತ್ತದೆ. ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಸಂಪರ್ಕಿಸಲಾಗುವುದು.',
    success_sheet:'📊 ನಿಮ್ಮ ಬುಕಿಂಗ್ ಉಳಿಸಲಾಗಿದೆ. ದೇವಸ್ಥಾನದ ನಿರ್ವಾಹಕರು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ. 🙏',
    btn_another:'➕ ಮತ್ತೊಂದು ಪೂಜೆ ಬುಕ್', btn_home:'🏠 ಮುಖಪುಟಕ್ಕೆ',
    status_title:'ಬುಕಿಂಗ್ ಸ್ಥಿತಿ ತಿಳಿಯಿರಿ', status_sub:'ನಿಮ್ಮ ಪೂಜೆ ಬುಕಿಂಗ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    status_desc:'ಬುಕಿಂಗ್ ರೆಫರೆನ್ಸ್ ಐಡಿ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
    lbl_ref:'ಬುಕಿಂಗ್ ರೆಫರೆನ್ಸ್ ಐಡಿ *', lbl_phone2:'ನೋಂದಾಯಿತ ಫೋನ್ ಸಂಖ್ಯೆ *',
    btn_check:'🔍 ಬುಕಿಂಗ್ ಸ್ಥಿತಿ ತಿಳಿಯಿರಿ',
    status_pending:'⏳ ಬಾಕಿ ಇದೆ', status_confirmed:'✅ ದೃಢಪಡಿಸಲಾಗಿದೆ', status_rejected:'❌ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
    msg_pending:'⏳ ನಿಮ್ಮ ಬುಕಿಂಗ್ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ. ನಮ್ಮ ಅರ್ಚಕರು ದೃಢಪಡಿಸಲು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.',
    msg_confirmed:'✅ ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ಪೂಜೆ ಬುಕಿಂಗ್ ದೃಢಪಡಿಸಲಾಗಿದೆ. ನಿಗದಿತ ಸಮಯಕ್ಕೆ 15 ನಿಮಿಷ ಮೊದಲು ಬನ್ನಿ. 🙏',
    msg_rejected:'❌ ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಬುಕಿಂಗ್ ದೃಢಪಡಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
    reject_reason:'ಕಾರಣ:',
    notfound_title:'ಬುಕಿಂಗ್ ಕಂಡುಬಂದಿಲ್ಲ',
    notfound_desc:'ಈ ರೆಫರೆನ್ಸ್ ಐಡಿ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಯಾವುದೇ ಬುಕಿಂಗ್ ಕಂಡುಬಂದಿಲ್ಲ.',
    announcements:'ದೇವಸ್ಥಾನದ ಪ್ರಕಟಣೆಗಳು', latest_news:'ಇತ್ತೀಚಿನ ಸುದ್ದಿ & ಕಾರ್ಯಕ್ರಮಗಳು',
    our_poojas:'ನಮ್ಮ ಪೂಜಾ ಸೇವೆಗಳು', sacred:'ಪವಿತ್ರ ಅರ್ಪಣೆಗಳು',
    visit:'ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ', timings:'ಸಮಯ', address:'ವಿಳಾಸ',
    phone:'ಫೋನ್', email:'ಇಮೇಲ್', dresscode:'ಉಡುಪು ನಿಯಮ', upi:'UPI ಪಾವತಿ',
    footer_rights:'ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
  }
};

function t(key) {
  const lang = TempleDB.getLang();
  return (LANG[lang] && LANG[lang][key]) ? LANG[lang][key] : (LANG['en'][key] || key);
}

function buildLangToggle() {
  const lang = TempleDB.getLang();
  return `<div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);border:1px solid rgba(200,146,42,0.4);border-radius:20px;padding:4px 8px;">
    <span style="font-size:0.7rem;font-family:'Cinzel',serif;color:#e8d5a3;">🌐</span>
    <button onclick="switchLang('en')" style="background:${lang==='en'?'var(--gold)':'transparent'};color:${lang==='en'?'var(--crimson-dark)':'#e8d5a3'};border:none;border-radius:12px;padding:3px 10px;font-family:'Cinzel',serif;font-size:0.68rem;cursor:pointer;font-weight:700;">EN</button>
    <button onclick="switchLang('kn')" style="background:${lang==='kn'?'var(--gold)':'transparent'};color:${lang==='kn'?'var(--crimson-dark)':'#e8d5a3'};border:none;border-radius:12px;padding:3px 10px;font-family:'Cinzel',serif;font-size:0.68rem;cursor:pointer;font-weight:700;">ಕನ್ನಡ</button>
  </div>`;
}

function switchLang(lang) {
  TempleDB.setLang(lang);
  location.reload();
}
