// 音量バーの取得
const volumeBar = document.getElementById('volumebar');
const volumeValue = document.getElementById('volume-value');

// 音楽ファイルの取得
const bgm = document.getElementById('bgm');

// 音量バーの初期値を設定
volumeBar.value = 50;
bgm.volume = 0.5; // 初期音量50%

// 音量バーを動かしたときの処理
volumeBar.addEventListener('input', function() {
  // 音量を更新
  const volume = volumeBar.value / 100;
  bgm.volume = volume;

  // 音量表示を更新
  volumeValue.textContent = volumeBar.value;
});

// BGMスイッチ
const bgmSwitch = document.getElementById('bgmSwitch');
const bgmSwitchToggle = document.getElementById('bgmSwitch_toggle');

// スイッチをクリックしたときの処理
bgmSwitch.addEventListener('click', function() {
  // トグルの状態を切り替え
  bgmSwitch.classList.toggle('active');
  bgmSwitchToggle.classList.toggle('active');

  // BGMの再生・停止を切り替え
  if (bgm.paused) {
    bgm.play();
  } else {
    bgm.pause();
  }
});
