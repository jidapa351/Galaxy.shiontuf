// ========== Helper ==========
function getZodiacSign(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius ♒️";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces ♓️";
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries ♈️";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus ♉️";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini ♊️";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer ♋️";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo ♌️";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo ♍️";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra ♎️";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio ♏️";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius ♐️";
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn ♑️";
  return "Unknown";
}

const zodiacDescriptions = {
  "Aquarius ♒️": "ฉลาดและคิดนอกกรอบ มองโลกในแง่ดี ชอบช่วยเหลือผู้อื่น",
  "Pisces ♓️": "มีจินตนาการสูง อ่อนไหว ชอบศิลปะและความสงบ",
  "Aries ♈️": "กล้าหาญ รักการแข่งขัน และเป็นผู้นำที่ดี",
  "Taurus ♉️": "มั่นคง รักความสวยงามและความสุขสบาย",
  "Gemini ♊️": "ฉลาดปราดเปรื่อง ช่างพูดและเข้าสังคมเก่ง",
  "Cancer ♋️": "อ่อนไหว รักครอบครัว และปกป้องคนที่รัก",
  "Leo ♌️": "มั่นใจและเป็นจุดสนใจ รักการแสดงออก",
  "Virgo ♍️": "ละเอียดรอบคอบ ชอบความเป็นระเบียบและช่วยเหลือผู้อื่น",
  "Libra ♎️": "รักความสมดุล มีเสน่ห์ และมีความยุติธรรม",
  "Scorpio ♏️": "เข้มแข็ง มีความลึกลับ และมุ่งมั่น",
  "Sagittarius ♐️": "รักอิสระ ชอบการผจญภัย และมองโลกในแง่ดี",
  "Capricorn ♑️": "ขยัน มุ่งมั่น และมีความรับผิดชอบสูง"
};

const zodiacImages = {
  "Aquarius ♒️": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Aquarius.svg",
  "Pisces ♓️": "https://upload.wikimedia.org/wikipedia/commons/0/03/Pisces.svg",
  "Aries ♈️": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Aries.svg",
  "Taurus ♉️": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Taurus.svg",
  "Gemini ♊️": "https://upload.wikimedia.org/wikipedia/commons/9/99/Gemini.svg",
  "Cancer ♋️": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Cancer.svg",
  "Leo ♌️": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Leo.svg",
  "Virgo ♍️": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Virgo.svg",
  "Libra ♎️": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Libra.svg",
  "Scorpio ♏️": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Scorpio.svg",
  "Sagittarius ♐️": "https://upload.wikimedia.org/wikipedia/commons/8/88/Sagittarius.svg",
  "Capricorn ♑️": "https://upload.wikimedia.org/wikipedia/commons/7/76/Capricorn.svg"
};


// === UI Elements ===
const resultEl = document.getElementById("result");
const actionEl = document.getElementById("actionButtons");
const dateInput = document.getElementById("dateInput");

// === Loading Spinner (smooth) ===
function showLoader() {
  resultEl.innerHTML = `
    <div class="loader mx-auto my-6" style="
      border: 4px solid rgba(255,255,255,0.2);
      border-top: 4px solid #a78bfa;
      border-radius: 50%;
      width: 40px; height: 40px;
      animation: spin 1s linear infinite;
    "></div>
    <p class="text-indigo-300 mt-2 font-medium">กำลังวิเคราะห์จักรราศี...</p>
  `;
  actionEl.classList.add("hidden");
}
function hideLoader() {
  resultEl.querySelector('.loader')?.remove();
}

// === Fade-in Animation for result block ===
function fadeIn(element, duration = 600) {
  element.style.opacity = 0;
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  requestAnimationFrame(() => {
    element.style.opacity = 1;
  });
}

// === Main function ===
async function generateArt() {
  const date = dateInput.value.trim();

  if (!date) {
    showAlert("🚫 กรุณาเลือกวันที่ก่อน!");
    return;
  }

  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate > today) {
    showAlert("⏳ ยังดูอนาคตไม่ได้ครับ! เลือกวันที่ในอดีตแทนนะ 🚀");
    return;
  }

  showLoader();

  // เลียนแบบการประมวลผล ใช้ timeout แทนการรอ API จริง
  await new Promise(r => setTimeout(r, 1500));

  const zodiac = getZodiacSign(date);
  const description = zodiacDescriptions[zodiac] || "ไม่มีคำอธิบายสำหรับราศีนี้";

  // สร้าง content ผลลัพธ์
  resultEl.innerHTML = `
    <div id="captureArea" class="bg-white bg-opacity-90 rounded-3xl p-6 shadow-lg text-black relative overflow-hidden">
      <img
        src="${zodiacImages[zodiac]}"
        alt="${zodiac}"
        class="mx-auto w-28 h-28 mb-4 drop-shadow-lg"
      />
      <h2 class="text-3xl font-extrabold mb-2 tracking-wide">${zodiac}</h2>
      <p class="text-gray-800 text-lg">${description}</p>
      <p class="mt-4 text-sm text-gray-600 font-mono">วันที่เลือก: <strong>${date}</strong></p>
      <div id="shootingStar" style="position:absolute; top:-30px; left:-30px; width:60px; height:60px; pointer-events:none;"></div>
    </div>
  `;
  fadeIn(resultEl.firstElementChild);

  actionEl.classList.remove("hidden");

  // แอนิเมชันดาวพุ่งเล็กๆ
  animateShootingStar();
}

// === ดาวน์โหลดภาพ ===
async function downloadImage() {
  const captureArea = document.getElementById("captureArea");
  if (!captureArea) return;

  const canvas = await html2canvas(captureArea);
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zodiac-result.png";
    a.click();
    URL.revokeObjectURL(url);
  });
}

// === แชร์ผลลัพธ์ (copy URL พร้อมพารามิเตอร์) ===
function shareResult() {
  const date = dateInput.value.trim();
  if (!date) {
    showAlert("❗ กรุณาวิเคราะห์ก่อนแชร์นะครับ");
    return;
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}?date=${encodeURIComponent(date)}`;

  if (navigator.share) {
    navigator.share({
      title: "วิเคราะห์วันเกิดของฉัน",
      text: `มาดูผลวิเคราะห์จักรราศีของฉัน! วันที่ ${date}`,
      url: shareUrl
    }).catch(() => {
      fallbackCopyUrl(shareUrl);
    });
  } else {
    fallbackCopyUrl(shareUrl);
  }
}

function fallbackCopyUrl(url) {
  navigator.clipboard.writeText(url).then(() => {
    showAlert("✅ คัดลอกลิงก์เรียบร้อย! แชร์ให้เพื่อนดูได้เลย");
  }).catch(() => {
    showAlert("❌ ไม่สามารถคัดลอกลิงก์ได้ ลองแชร์ด้วยมือแทน");
  });
}

// === Alert แบบสวยงาม (ไม่ใช้ alert ธรรมดา) ===
function showAlert(msg) {
  if (document.querySelector(".custom-alert")) return; // กันซ้อน alert

  const alertBox = document.createElement("div");
  alertBox.className = "custom-alert fixed top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white py-3 px-6 rounded-xl shadow-lg font-semibold z-50 animate-slideDown";
  alertBox.textContent = msg;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add("animate-slideUp");
  }, 2000);

  setTimeout(() => {
    alertBox.remove();
  }, 2700);
}

// === Animation keyframes for alert ===
const style = document.createElement('style');
style.innerHTML = `
@keyframes slideDown {
  0% {opacity: 0; transform: translate(-50%, -40px);}
  100% {opacity: 1; transform: translate(-50%, 0);}
}
@keyframes slideUp {
  0% {opacity: 1; transform: translate(-50%, 0);}
  100% {opacity: 0; transform: translate(-50%, -40px);}
}
.custom-alert {
  animation: slideDown 0.3s forwards;
}
.custom-alert.animate-slideUp {
  animation: slideUp 0.3s forwards;
}

/* loader spin */
@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
`;
document.head.appendChild(style);

// === ดาวพุ่งแอนิเมชัน ===
function animateShootingStar() {
  const starContainer = document.getElementById("shootingStar");
  if (!starContainer) return;

  starContainer.innerHTML = "";
  const star = document.createElement("div");
  star.style.width = "6px";
  star.style.height = "6px";
  star.style.background = "linear-gradient(45deg, white, rgba(255,255,255,0))";
  star.style.position = "absolute";
  star.style.borderRadius = "50%";
  star.style.filter = "drop-shadow(0 0 6px white)";
  star.style.top = "0";
  star.style.left = "0";
  star.style.opacity = "1";
  star.style.transform = "translate(0, 0)";

  starContainer.appendChild(star);

  star.animate([
    { transform: 'translate(0, 0)', opacity: 1 },
    { transform: 'translate(80px, 40px)', opacity: 0 }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });

  setTimeout(() => {
    star.remove();
  }, 1100);
}

// === เริ่มอ่าน query param เพื่อแสดงผลลัพธ์ถ้ามี ===
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get("date");

  if (dateParam) {
    dateInput.value = dateParam;
    generateArt();
  }
});
