startButton.addEventListener("click", function () {
  navigator.mediaDevices

    .getUserMedia({ audio: true })

    .then(function (stream) {
      audioContext = new AudioContext();

      var audioInput = audioContext.createMediaStreamSource(stream);

      recorder = new Recorder(audioInput);

      // Bắt đầu ghi âm

      recorder.record();

      // Disable nút "Bắt đầu ghi âm" và enable nút "Dừng ghi âm"

      startButton.disabled = true;

      stopButton.disabled = false;

      console.log("Bắt đầu ghi âm...");
    })

    .catch(function (err) {
      console.error("Lỗi truy cập microphone:", err);
    });
});

stopButton.addEventListener("click", function () {
  // Dừng ghi âm

  recorder.stop();

  // Enable nút "Bắt đầu ghi âm" và disable nút "Dừng ghi âm"

  startButton.disabled = false;

  stopButton.disabled = true;

  console.log("Dừng ghi âm...");

  // Lấy dữ liệu âm thanh ghi âm và xử lý nó

  recorder.exportWAV(function (blob) {
    // Tạo URL từ blob

    const url = URL.createObjectURL(blob);

    // Cập nhật source của audio element với URL mới

    const recordedAudio = document.getElementById("recordedAudio");

    recordedAudio.src = url;

    playButton.addEventListener("click", function () {
      // Phát lại file ghi âm

      const recordedAudio = document.getElementById("recordedAudio");

      recordedAudio.play();
    });
    playButton.disabled = false;
    downloadButton.disabled = false;

    // Thêm đoạn code tải xuống:
    downloadButton.addEventListener("click", function () {
      const link = document.createElement("a");
      link.href = url;
      link.download = "recording.wav"; // Đổi thành tên file mong muốn
      link.click();
    });
  });
});
