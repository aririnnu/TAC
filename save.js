(() => {
  const KEY = "tac:save";

  // 入力内容を保存する関数
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
  }

  // 保存した内容を読み込む関数
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

  // ページを開いた時に読み込み、自動保存もON
  document.addEventListener("DOMContentLoaded", () => {
    loadData();
    document.addEventListener("input", () => saveData());
  });
})();
