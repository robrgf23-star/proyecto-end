// storage.js
// Abstracción para guardar/obtener datos del localStorage y exportar archivos


const Storage = (function(){
const KEYS = {
participantes: 'proyecto_end_participantes',
cargos: 'proyecto_end_cargos',
intencion: 'proyecto_end_intencion'
};


function _get(key){
const raw = localStorage.getItem(key);
return raw ? JSON.parse(raw) : [];
}
function _set(key, arr){
localStorage.setItem(key, JSON.stringify(arr));
}


return {
getParticipantes(){ return _get(KEYS.participantes); },
saveParticipantes(arr){ _set(KEYS.participantes, arr); },


getCargos(){ return _get(KEYS.cargos); },
saveCargos(arr){ _set(KEYS.cargos, arr); },


getIntenciones(){ return _get(KEYS.intencion); },
saveIntenciones(arr){ _set(KEYS.intencion, arr); },


exportJSON(filename, data){
const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
URL.revokeObjectURL(url);
},


exportTXT(filename, text){
const blob = new Blob([text], {type: 'text/plain'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
URL.revokeObjectURL(url);
}
};
})();