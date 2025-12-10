// intencion.js
const btnExport = document.getElementById('export-intencion-json');


function populateParticipantes(){
const arr = Storage.getParticipantes();
selectParticipante.innerHTML = '<option value="">-- Selecciona --</option>' + arr.map(p=>`<option value="${p.id}">${p.nombre} ${p.apellido} (${p.email})</option>`).join('');
}


function populateCargos(){
const arr = Storage.getCargos();
selectCargo.innerHTML = '<option value="">-- Selecciona --</option>' + arr.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join('');
}


function populateOpcionesForCargo(cargoId){
const arr = Storage.getCargos();
const c = arr.find(x=>x.id===cargoId);
if(!c){ selectOpcion.innerHTML = '<option value="">-- --</option>'; return; }
selectOpcion.innerHTML = '<option value="">-- Selecciona --</option>' + c.opciones.map(o=>`<option value="${o}">${o}</option>`).join('') + '<option value="Ninguno">Ninguno</option><option value="No sé">No sé</option>';
}


function renderTabla(){
const arr = Storage.getIntenciones();
tablaBody.innerHTML = '';
arr.forEach(it=>{
const p = Storage.getParticipantes().find(x=>x.id===it.participanteId) || {nombre:'(no encontrado)'};
const c = Storage.getCargos().find(x=>x.id===it.cargoId) || {nombre:'(no encontrado)'};
const tr = document.createElement('tr');
tr.innerHTML = `<td>${p.nombre} ${p.apellido}</td><td>${c.nombre}</td><td>${it.opcion}</td>`;
tablaBody.appendChild(tr);
});
}


selectCargo.addEventListener('change', ()=>{ populateOpcionesForCargo(selectCargo.value); });


form.addEventListener('submit', (e)=>{
e.preventDefault();
if(!selectParticipante.value || !selectCargo.value || !selectOpcion.value) return alert('Seleccione participante, cargo y opción');
const record = { id: Date.now().toString(), participanteId: selectParticipante.value, cargoId: selectCargo.value, opcion: selectOpcion.value };
const arr = Storage.getIntenciones();
arr.push(record);
Storage.saveIntenciones(arr);
alert('Intención guardada');
renderTabla();
});


btnExport.addEventListener('click', ()=>{
const arr = Storage.getIntenciones();
Storage.exportJSON('intenciones.json', arr);
});


// inicializar
populateParticipantes();
populateCargos();
renderTabla();
});