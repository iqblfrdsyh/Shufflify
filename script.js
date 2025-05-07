const names = [];

function addName() {
  const input = document.getElementById("nameInput");
  const raw = input?.value.trim();

  if (!raw) {
    alert("Input tidak boleh kosong.");
    return;
  }

  const splitNames = raw
    .split(/,|\n/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  const uniqueNames = splitNames.filter((name) => !names.includes(name));
  names.push(...uniqueNames);

  input.value = "";
  renderNames();
}

function renderNames() {
  const list = document.getElementById("nameList");
  if (names.length === 0) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML =
    '<strong>Anggota:</strong><ul class="list-disc list-inside mt-2 space-y-1 text-gray-700">' +
    names.map((n) => `<li>${n}</li>`).join("") +
    "</ul>";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleGroups() {
  if (names.length === 0) {
    alert("Silakan tambahkan nama terlebih dahulu.");
    return;
  }

  const count = parseInt(document.getElementById("groupCount").value);
  const includeLeader = document.getElementById("includeLeader").checked;

  if (!count || count < 1) {
    alert("Jumlah kelompok harus minimal 1.");
    return;
  }

  if (count > names.length) {
    alert("Jumlah kelompok tidak boleh lebih banyak dari jumlah anggota.");
    return;
  }

  const shuffled = shuffle([...names]);
  const groups = Array.from({ length: count }, () => []);

  shuffled.forEach((name, i) => {
    groups[i % count].push(name);
  });

  const container = document.getElementById("groups");
  container.classList.add("opacity-0", "transition-opacity", "duration-300");

  setTimeout(() => {
    container.innerHTML = "";

    groups.forEach((group, index) => {
      const div = document.createElement("div");
      div.className =
        "bg-white shadow-md rounded-xl p-4 border border-gray-200 transition transform hover:shadow-lg";

      const leaderIndex =
        includeLeader && group.length > 0
          ? Math.floor(Math.random() * group.length)
          : -1;

      const groupContent = group
        .map((name, i) =>
          i === leaderIndex
            ? `<strong class="text-blue-600">${name} (Ketua)</strong>`
            : name
        )
        .join("<br>");

      div.innerHTML = `
        <div class="text-lg font-semibold text-blue-700 mb-2">Kelompok ${
          index + 1
        }</div>
        <div class="text-gray-800 leading-relaxed">${groupContent}</div>
      `;

      container.appendChild(div);
    });

    container.classList.remove("opacity-0");
    container.classList.add("opacity-100");
  }, 300);
}
