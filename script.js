const names = [];

function addName() {
  const input = document.getElementById('nameInput');
  const raw = input.value.trim();

  if (!raw) return;

  const splitNames = raw
    .split(/,|\n/)
    .map(name => name.trim())
    .filter(name => name.length > 0);

  names.push(...splitNames);
  input.value = '';
  renderNames();
}

function renderNames() {
  const list = document.getElementById('nameList');
  if (names.length === 0) {
    list.innerHTML = '';
    return;
  }
  list.innerHTML = '<strong>Anggota:</strong><ul>' + names.map(n => `<li>${n}</li>`).join('') + '</ul>';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleGroups() {
  const count = parseInt(document.getElementById('groupCount').value);
  const includeLeader = document.getElementById('includeLeader').checked;

  if (!count || count < 1) return;
  const shuffled = shuffle([...names]);
  const groups = Array.from({ length: count }, () => []);

  shuffled.forEach((name, i) => {
    groups[i % count].push(name);
  });

  const container = document.getElementById('groups');
  container.classList.add('fade-out');

  setTimeout(() => {
    container.innerHTML = '';
    groups.forEach((group, index) => {
      const div = document.createElement('div');
      div.className = 'group';

      let leaderIndex = -1;
      if (includeLeader && group.length > 0) {
        leaderIndex = Math.floor(Math.random() * group.length);
      }

      const groupContent = group.map((name, i) => {
        return (i === leaderIndex)
          ? `<strong>${name} (Ketua)</strong>`
          : name;
      }).join('<br>');

      div.innerHTML = `<div class="group-title">Kelompok ${index + 1}</div>` + groupContent;
      container.appendChild(div);
    });
    container.classList.remove('fade-out');
  }, 400);
}