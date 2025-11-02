(() => {
  const KEY = "tac:save";

  function saveData() {
    const data = {};
    document.querySelectorAll("input, textarea, select").forEach(el => {
      const id = el.id || el.name;
      if (!id) return;
      if (el.type === "checkbox" || el.type === "radio") {
        data[id] = el.checked;
      } else {
        data[id] = el.value;
      }
    });
    localStorage.setItem(KEY, JSON.stringify(data));
    alert("保存しました！");
  }

  function loadData() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    for (const [id, val] of Object.entries(data)) {
      const el = document.getElementById(id) || document.getElementsByName(id)[0];
      if (!el) continue;
      if (el.type === "checkbox" || el.type === "radio") {
        el.checked = val;
      } else {
        el.value = val;
      }
    }
  }

  // ページが開かれた時に保存ボタンを作って読み込み
  document.addEventListener("DOMContentLoaded", () => {
    loadData();

    // 保存ボタンを右下に表示
    const btn = document.createElement("button");
    btn.textContent = "💾 保存";
    btn.style.position = "fixed";
    btn.style.right = "20px";
    btn.style.bottom = "20px";
    btn.style.padding = "10px 16px";
    btn.style.background = "#4CAF50";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "9999";
    btn.onclick = saveData;

    document.body.appendChild(btn);
  });
})();
