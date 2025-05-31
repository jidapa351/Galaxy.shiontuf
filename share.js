function shareResult() {
  const result = document.getElementById("result");

  html2canvas(result).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], "data-art.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "DataArt จากจักรวาล",
          text: "ดูภาพที่สร้างจากวันสำคัญของฉัน!",
        })
        .then(() => console.log("แชร์สำเร็จ"))
        .catch(console.error);
      } else {
        alert("\uD83D\uDE41 เบราว์เซอร์ของคุณไม่รองรับการแชร์ภาพ\nคุณสามารถเซฟภาพด้วยการคลิกขวาแทนได้");
      }
    });
  });
}
