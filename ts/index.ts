const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localization");
const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value.trim();
  if (localizacao.length < 3) {
    alert("Preencha o campo corretamente");
    return;
  }

  try {
    // Requisição HTTP
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=e5e594417afd1c7e4ccf596a9e9812f3&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      alert("Erro ao buscar dados. Verifique a localização.");
      return;
    }

    const dados = await response.json();

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    // Atualiza a seção com os dados do clima
    sectionTempoInfo.innerHTML = `
      <div class="tempo-dados">
        <h2>${infos.local}</h2>
        <span>${infos.temperatura}°C</span>
      </div>
      <img src="${infos.icone}" alt="Ícone do clima" />
    `;
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Ocorreu um erro ao buscar os dados. Tente novamente.");
  }
});
