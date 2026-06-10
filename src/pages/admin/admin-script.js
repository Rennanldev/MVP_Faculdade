document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-event-btn');
  const cancelBtn = document.getElementById('cancel-add-event-btn');
  const cancelFormBtn = document.getElementById('cancel-form-btn');
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('event-form');

  // Abre o modal
  addBtn.addEventListener('click', () => {
    overlay.classList.add('ativo');
  });

  // Fecha o modal (botão X ou cancelar)
  function fecharModal() {
    overlay.classList.remove('ativo');
  }

  cancelBtn.addEventListener('click', fecharModal);
  cancelFormBtn.addEventListener('click', fecharModal);

  // Fecha clicando fora do modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharModal();
  });

  // Submete o formulário
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('event-title').value.trim();
    const data = document.getElementById('event-date').value.trim();
    const local = document.getElementById('event-local').value.trim();
    const tema = document.getElementById('event-theme').value.trim();
    const imagemInput = document.getElementById('event-image');
    const imagemFile = imagemInput.files[0];

    if (!titulo || !data || !local || !tema || !imagemFile) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    criarCardEvento(titulo, data, local, tema, imagemFile);
    form.reset();
    fecharModal();
    alert("Evento cadastrado! ⚠️ Sem banco de dados, ao recarregar a página o evento será removido.");
  });

  // Adiciona botão excluir nos cards fixos
  adicionarBotaoExcluirEmTodosOsCards();
});

function criarCardEvento(titulo, data, local, tema, imagemFile) {
  const card = document.createElement('div');
  card.classList.add('card-evento');

  const img = document.createElement('img');
  img.src = URL.createObjectURL(imagemFile);
  img.alt = titulo;
  img.onerror = () => { alert("Não foi possível carregar a imagem."); img.remove(); };

  const h3 = document.createElement('h3');
  h3.textContent = titulo;

  const pData = document.createElement('p');
  pData.innerHTML = `<strong>Data:</strong> ${data}`;

  const pLocal = document.createElement('p');
  pLocal.innerHTML = `<strong>Local:</strong> ${local}`;

  const pTema = document.createElement('p');
  pTema.innerHTML = `<strong>Tema:</strong> ${tema}`;

  const deleteBtn = criarBotaoExcluir(card, true);

  card.append(img, h3, pData, pLocal, pTema, deleteBtn);
  document.querySelector('.container-cards-eventos').appendChild(card);
}

function criarBotaoExcluir(card, isNovo = false) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Excluir';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    if (confirm("Deseja realmente excluir este evento?")) {
      if (!isNovo) {
        alert('Evento removido da tela. Ao recarregar, reaparecerá pois está fixo no HTML.');
      }
      card.remove();
    }
  });
  return deleteBtn;
}

function adicionarBotaoExcluirEmTodosOsCards() {
  document.querySelectorAll('.card-evento').forEach(card => {
    if (!card.querySelector('.delete-btn')) {
      card.appendChild(criarBotaoExcluir(card, false));
    }
  });
}
