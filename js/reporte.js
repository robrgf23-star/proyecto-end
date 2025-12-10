// reporte.js
const total = counts.reduce((a,b)=>a+b,0);
const rows = labels.map((lab, idx)=>({ opcion: lab, votos: counts[idx], porcentaje: total? Math.round((counts[idx]/total)*1000)/10 : 0 }));
return { labels, counts, total, rows };
}


function renderTabla(rows){
tablaBody.innerHTML = '';
rows.forEach(r=>{
const tr = document.createElement('tr');
tr.innerHTML = `<td>${r.opcion}</td><td>${r.votos}</td><td>${r.porcentaje}%</td>`;
tablaBody.appendChild(tr);
});
}


function generarGrafico(){
const cargoId = selectCargo.value;
if(!cargoId) return alert('Seleccione un cargo');
const res = calcularResultados(cargoId);
renderTabla(res.rows);


if(chartInstance) chartInstance.destroy();
chartInstance = new Chart(canvas.getContext('2d'), {
type: 'bar',
data: {
labels: res.labels,
datasets: [{ label: 'Votos', data: res.counts }]
},
options: { responsive: true, maintainAspectRatio: false }
});
}


btnGenerar.addEventListener('click', generarGrafico);


btnExportJSON.addEventListener('click', ()=>{
const cargoId = selectCargo.value;
if(!cargoId) return alert('Seleccione cargo');
const res = calcularResultados(cargoId);
Storage.exportJSON('reporte_'+cargoId+'.json', res);
});


btnExportTXT.addEventListener('click', ()=>{
const cargoId = selectCargo.value;
if(!cargoId) return alert('Seleccione cargo');
const res = calcularResultados(cargoId);
const txt = res.rows.map(r => `${r.opcion}\t${r.votos}\t${r.porcentaje}%`).join('\n');
Storage.exportTXT('reporte_'+cargoId+'.txt', txt);
});


populateCargos();
});