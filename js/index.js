"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localization");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value.trim();
    if (localizacao.length < 3) {
        alert("Preencha o campo corretamente");
        return;
    }
    try {
        // Requisição HTTP
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=e5e594417afd1c7e4ccf596a9e9812f3&units=metric&lang=pt_br`);
        if (!response.ok) {
            alert("Erro ao buscar dados. Verifique a localização.");
            return;
        }
        const dados = yield response.json();
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
    }
    catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao buscar os dados. Tente novamente.");
    }
}));
