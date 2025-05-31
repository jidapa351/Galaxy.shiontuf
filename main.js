async function generateArt() {
  const date = document.getElementById("dateInput").value;
  const resultEl = document.getElementById("result");
  const actionEl = document.getElementById("actionButtons");

  if (!date) {
    alert("🚫 กรุณาเลือกวันที่ก่อน!");
    return;
  }

  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate > today) {
    alert("⏳ ยังดูอนาคตไม่ได้ครับ!\nเลือกวันที่ในอดีตแทนนะ 🚀");
    return;
  }

  resultEl.innerHTML = `
    <div class="loader"></div>
    <p class="mt-2">⏳ กำลังโหลดภาพจากจักรวาล...</p>
  `;
  actionEl.classList.add("hidden");

  const apiKey = "cPjE2R990dBSJtyaPgULa5NH6xNNTX4v627ihqrs";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.media_type === "image") {
      resultEl.innerHTML = `
        <div id="captureArea" class="bg-white text-black rounded-2xl shadow-2xl overflow-hidden transition hover:scale-105 duration-300">
          <img src="${data.url}" alt="NASA image" class="w-full object-cover filter brightness-95 contrast-110 saturate-125" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">${data.title}</h2>
            <p class="text-sm text-gray-700 mt-2">${data.explanation.slice(0, 200)}...</p>
          </div>
        </div>
      `;
      actionEl.classList.remove("hidden");
    } else {
      resultEl.innerHTML = `
        <h2 class="text-xl font-semibold">${data.title}</h2>
        <p class="text-yellow-300">วันนี้มีวิดีโอ ไม่สามารถแสดงภาพได้</p>
        <a href="${data.url}" target="_blank" class="underline text-blue-400">ดูวิดีโอ</a>
      `;
    }
  } catch (error) {
    console.error(error);
    resultEl.innerHTML = `<p class="text-red-500">❌ เกิดข้อผิดพลาด: ${error.message}</p>`;
  }
}

function downloadImage() {
  html2canvas(document.getElementById("captureArea")).then(canvas => {
    const link = document.createElement("a");
    link.download = "nasa_art.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function shareResult() {
  const result = document.getElementById("captureArea");

  if (!result) {
    alert("ยังไม่มีภาพให้แชร์! ลองกดดูดวงดาวก่อนนะ 🚀");
    return;
  }

  html2canvas(result).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], "data-art.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "DataArt จากจักรวาล",
          text: "✨ ภาพนี้ถูกสร้างขึ้นจากวันสำคัญของฉัน ลองดูสิ!",
        })
        .then(() => console.log("แชร์สำเร็จ ✅"))
        .catch(err => console.error("แชร์ล้มเหลว ❌", err));
      } else {
        alert("เบราว์เซอร์ของคุณไม่รองรับการแชร์ภาพ 🙁 ลองคลิกขวาเซฟภาพแล้วแชร์เองได้นะครับ");
      }
    });
  });
}
