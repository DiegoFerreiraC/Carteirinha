// ===============================
// DEPENDENTES
// ===============================

const dependentesContainer = document.getElementById("dependentesContainer");
const tabelaDependentes = document.getElementById("tabelaDependentes");

function adicionarCampoDependente() {

  const total = dependentesContainer.querySelectorAll(".dependenteNome").length + 1;

  const labelNome = document.createElement("label");
  labelNome.textContent = "Dependente " + total;

  const inputNome = document.createElement("input");
  inputNome.type = "text";
  inputNome.className = "dependenteNome";
  inputNome.placeholder = "Nome do dependente";

  const labelNasc = document.createElement("label");
  labelNasc.textContent = "Nascimento";

  const inputNasc = document.createElement("input");
  inputNasc.type = "date";
  inputNasc.className = "dependenteNascimento";

  dependentesContainer.appendChild(labelNome);
  dependentesContainer.appendChild(inputNome);
  dependentesContainer.appendChild(labelNasc);
  dependentesContainer.appendChild(inputNasc);

  // eventos para atualizar preview automaticamente

  inputNome.addEventListener("input", () => {
    verificarUltimoCampo();
    atualizarPreview();
  });

  inputNasc.addEventListener("change", atualizarPreview);
}

function verificarUltimoCampo() {

  const nomes = dependentesContainer.querySelectorAll(".dependenteNome");
  const ultimo = nomes[nomes.length - 1];

  if (ultimo.value.trim() !== "") {
    adicionarCampoDependente();
  }
}

// ===============================
// FORMATAR CPF
// ===============================

function formatarCPF(cpf) {

  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
}

// ===============================
// ATUALIZAR PREVIEW
// ===============================

function atualizarPreview() {

  document.getElementById("nomeText").textContent =
    document.getElementById("nome").value || "---";

  const cpfInput = document.getElementById("cpf").value;

  document.getElementById("cpfText").textContent =
    cpfInput ? formatarCPF(cpfInput) : "---";

  document.getElementById("cadText").textContent =
    document.getElementById("cad").value || "---";

  const validadeInput = document.getElementById("validade").value;

  let validadeFormatada = "---";

  if (validadeInput) {
    const partes = validadeInput.split("-");
    validadeFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  document.getElementById("validText").textContent = validadeFormatada;

  const expedicao = document.getElementById("expedicaoText");
  if (expedicao) expedicao.textContent = validadeFormatada;

  // limpar tabela

  tabelaDependentes.innerHTML = `
    <tr>
      <th>DEPENDENTES</th>
      <th>D. NASCIMENTO</th>
    </tr>
  `;

  const nomes = document.querySelectorAll(".dependenteNome");
  const nascs = document.querySelectorAll(".dependenteNascimento");

  nomes.forEach((n, i) => {

    if (n.value.trim() !== "") {

      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      td1.textContent = n.value;

      let nascFormatada = "---";

      if (nascs[i].value) {

        const partes = nascs[i].value.split("-");
        nascFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

      }

      td2.textContent = nascFormatada;

      tr.appendChild(td1);
      tr.appendChild(td2);

      tabelaDependentes.appendChild(tr);
    }

  });

}

// ===============================
// FOTO
// ===============================

document.getElementById("foto").addEventListener("change", ev => {

  const f = ev.target.files[0];

  if (!f) return;

  const reader = new FileReader();

  reader.onload = () => {

    document.getElementById("photoImg").src = reader.result;
    document.getElementById("photoImg").style.display = "block";
    document.getElementById("photoFallback").style.display = "none";

  };

  reader.readAsDataURL(f);
});

// ===============================
// BOTÃO PREVIEW
// ===============================

document.getElementById("gerar").addEventListener("click", e => {

  e.preventDefault();
  atualizarPreview();

});

// ===============================
// BOTÃO IMPRIMIR
// ===============================

document.getElementById("imprimir").addEventListener("click", function(e) {

  e.preventDefault();

  atualizarPreview();

  const form = document.querySelector(".form");
  const carteira = document.querySelector(".carteira");

  form.style.display = "none";
  carteira.style.display = "flex";

  setTimeout(() => {

    window.print();
    form.style.display = "block";

  }, 200);

});

// ===============================
// TROCAR MODELO
// ===============================
let modeloEducador = false;

document.getElementById("trocarModelo").addEventListener("click", function(e){

  e.preventDefault();

  const carteira = document.querySelector(".carteira");
  const dependentes = document.getElementById("dependentesContainer");
  const labelData = document.getElementById("labelData");

  modeloEducador = !modeloEducador;

  if(modeloEducador){

    carteira.classList.add("modeloEducador");

    // esconder dependentes
    dependentes.style.display = "none";

    // mudar texto
    labelData.textContent = "Expedição";

  }else{

    carteira.classList.remove("modeloEducador");

    // mostrar dependentes
    dependentes.style.display = "block";

    // voltar texto
    labelData.textContent = "Validade";

  }

});

// ===============================
// PRIMEIRO DEPENDENTE
// ===============================

dependentesContainer
  .querySelector(".dependenteNome")
  .addEventListener("input", () => {
    verificarUltimoCampo();
    atualizarPreview();
  });

dependentesContainer
  .querySelector(".dependenteNascimento")
  .addEventListener("change", atualizarPreview);