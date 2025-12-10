// participantes.js


document.addEventListener('DOMContentLoaded', ()=>{
const form = document.getElementById('form-participante');
const tablaBody = document.querySelector('#tabla-participantes tbody');
const btnExportJSON = document.getElementById('export-json');
const btnExportTXT = document.getElementById('export-txt');
const btnLimpiar = document.getElementById('limpiar');


function render(){
const arr = Storage.getParticipantes();
tablaBody.innerHTML = '';
arr.forEach(p => {
const tr = document.createElement('tr');
tr.innerHTML = `<td>${p.email}</td><td>${p.nombre}</td><td>${p.apellido}</td><td>${p.campo1}|${p.campo2}|${p.campo3}</td>`;
tablaBody.appendChild(tr);
});
}


form.addEventListener('submit', (e)=>{
e.preventDefault();
const participante = {
email: document.getElementById('email').value.trim(),
nombre: document.getElementById('nombre').value.trim(),
apellido: document.getElementById('apellido').value.trim(),
campo1: document.getElementById('campo1').value.trim(),
campo2: document.getElementById('campo2').value.trim(),
campo3: document.getElementById('campo3').value.trim(),
id: Date.now().toString()
};
const arr = Storage.getParticipantes();
arr.push(participante);
Storage.saveParticipantes(arr);
form.reset();
render();
alert('Participante guardado');
});


btnExportJSON.addEventListener('click', ()=>{
const arr = Storage.getParticipantes();
Storage.exportJSON('participantes.json', arr);
});
btnExportTXT.addEventListener('click', ()=>{
const arr = Storage.getParticipantes();
const txt = arr.map(x => `${x.email}\t${x.nombre}\t${x.apellido}\t${x.campo1}\t${x.campo2}\t${x.campo3}`).join('\n');
Storage.exportTXT('participantes.txt', txt);
});


btnLimpiar.addEventListener('click', ()=>{
if(confirm('Eliminar todos los participantes de localStorage?')){
Storage.saveParticipantes([]);
render();
}
});


render();
});