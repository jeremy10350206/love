document.addEventListener("DOMContentLoaded", () => {
  console.log("網站載入成功，開始動畫...");

  const canvas = document.getElementById("threeCanvas");
  const enterButton = document.getElementById("enterButton");
  const introScreen = document.getElementById("intro");
  const mainContent = document.getElementById("mainContent");
  const messageElement = document.getElementById("message");
  const nextPageButton = document.getElementById("nextPage");

  // 書信內容（分頁）
  const messages = [
      "💖 情人節快樂 💖<br><br>寶寶~~",
      "如果命運能讓我們更早相遇 <br>或許故事會不同 <br>但現在的我 只想珍惜此刻的妳。",
      "我不想改變妳的過去 <br>因為那讓妳成為今天這麼美好的妳 <br>我只想陪著妳，走向未來。",
      "快樂的時候，我想和妳分享微笑，<br>難過的時候 我願意成為妳的避風港 <br>無論什麼時候，妳都不是一個人!",
      "時間怎麼流轉都沒關係 <br>我的心一直為妳留著 <br>無論妳走多遠 我都會在原地等妳。",
      "這世界很大，但我的世界裡，<br>只有妳最珍貴。<br><br>一直為妳心動的那個人 ❤️"
  ];

  let currentPage = 0;

  // 進入主頁
  enterButton.addEventListener("click", () => {
      console.log("按鈕點擊，切換畫面...");
      introScreen.style.display = "none";
      mainContent.style.display = "flex";
      messageElement.innerHTML = messages[currentPage];
  });

  // 書信分頁
  nextPageButton.addEventListener("click", () => {
      currentPage++;
      if (currentPage < messages.length) {
          messageElement.innerHTML = messages[currentPage];
      } else {
          nextPageButton.style.display = "none"; // 隱藏按鈕
      }
  });

  // 建立 Three.js 場景
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 愛心形狀
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0.5);
  heartShape.bezierCurveTo(0.5, 1, 1, 1, 1.5, 0.5);
  heartShape.bezierCurveTo(2, 0, 1.5, -1, 0, -1.5);
  heartShape.bezierCurveTo(-1.5, -1, -2, 0, -1.5, 0.5);
  heartShape.bezierCurveTo(-1, 1, -0.5, 1, 0, 0.5);

  const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05
  });

  const heartMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.7, roughness: 0.3 });
  const heart = new THREE.Mesh(heartGeometry, heartMaterial);
  scene.add(heart);

  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
      requestAnimationFrame(animate);
      heart.rotation.y += 0.02;
      heart.rotation.x += 0.01;
      renderer.render(scene, camera);
  }
  animate();
});
