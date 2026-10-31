(function(){
function iniciar(){
 const barra=document.querySelector('main>.barra-empresas'),header=document.querySelector('header.cabecera-historial-integrada');
 if(!barra||!header)return;
 const ajustar=()=>document.documentElement.style.setProperty('--altura-lineas',Math.ceil(barra.getBoundingClientRect().height)+'px');
 ajustar();window.addEventListener('resize',ajustar);
 if(window.ResizeObserver)new ResizeObserver(ajustar).observe(barra);
 const el=document.createElement('div');el.id='estado-f1';el.className='estado-f1';el.setAttribute('role','status');el.textContent='SIN CONEXIÓN';header.appendChild(el);
 function comprobar(){
  const s=window.__carlanEstadoServidor;
  const marca=s&&(s.heartbeat||s.ultima_comprobacion);
  const t=marca?Date.parse(marca):NaN;
  const vivo=s&&s.online===true&&Number.isFinite(t)&&Math.abs(Date.now()-t)<120000;
  el.className='estado-f1'+(vivo?' online':s&&s.online===false?' offline':'');
  el.textContent=vivo?'● ONLINE':s&&s.online===false?'● OFFLINE':'SIN CONEXIÓN';
 }
 const anterior=window.__carlanSetData;
 if(typeof anterior==='function')window.__carlanSetData=function(datos){
  const estado=datos&&(datos.estado_servidor||datos.servidor_estado);
  window.__carlanEstadoServidor=estado||null;
  anterior(datos);comprobar();
 };
 window.addEventListener('carlan-datos',comprobar);
 setInterval(comprobar,30000);comprobar();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
})();