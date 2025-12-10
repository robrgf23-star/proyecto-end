// cargos.js


function renderOpciones(){
listaOpciones.innerHTML = '';
opciones.forEach((op, idx)=>{
const li = document.createElement('li');
li.textContent = op;
const btn = document.createElement('button');
btn.textContent = 'Eliminar';
btn.type = 'button';
btn.addEventListener('click', ()=>{ opciones.splice(idx,1); renderOpciones(); });
li.appendChild(btn);
listaOpciones.appendChild(li);
});
}


function renderCargos(){
const arr = Storage.getCargos();
cargosListado.innerHTML = '';
arr.forEach(c => {
const div = document.createElement('div');
div.className = 'cargo-card';
div.innerHTML = `<h4>${c.nombre}</h4><p>${c.descripcion || ''}</p><ul>${c.opciones.map(o=>`<li>${o}</li>`).join('')}</ul>`;
cargosListado.appendChild(div);
});
}


agregarOpcionBtn.addEventListener('click', ()=>{
const v = opcionText.value.trim();
if(!v) return alert('Ingrese texto de opción');
opciones.push(v);
opcionText.value = '';
renderOpciones();
});


form.addEventListener('submit', (e)=>{
e.preventDefault();
if(!nombre.value.trim()) return alert('Nombre requerido');
const cargo = { id: Date.now().toString(), nombre: nombre.value.trim(), descripcion: desc.value.trim(), opciones: opciones.slice() };
const arr = Storage.getCargos();
arr.push(cargo);
Storage.saveCargos(arr);
nombre.value=''; desc.value=''; opciones = []; renderOpciones(); renderCargos();
alert('Cargo guardado');
});


btnExport.addEventListener('click', ()=>{
const arr = Storage.getCargos();
Storage.exportJSON('cargos.json', arr);
});


renderCargos();
renderOpciones();
});