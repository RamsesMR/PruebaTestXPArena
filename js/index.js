let indice = 1; 

function cargarPerfil(index) {
  const ruta = `doc/doc${index}.json`;

  fetch(ruta)
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar el archivo " + ruta);
      return response.json();
    })
    .then(datos => mostrarDatos(datos))
    .catch(error => {
      console.error("No se pudo cargar el perfil:", error);
      alert("No hay más perfiles disponibles.");
    });
}

function mostrarDatos(datos) {
  document.getElementById("titulo").textContent = `Perfil de ${datos.alumno.nombre} (${datos.alumno.nick_juego})`;

  document.getElementById("perfil").innerHTML = `
    <h2>Estilo de Aprendizaje</h2>
    <p><strong>Estilo:</strong> ${datos.perfil.estilo_aprendizaje}</p>
    <p><strong>Características:</strong></p>
    <ul>${datos.perfil.caracteristicas.map(item => `<li>${item}</li>`).join('')}</ul>
    <p><strong>Habilidades destacadas:</strong></p>
    <ul>${datos.perfil.habilidades_destacadas.map(item => `<li>${item}</li>`).join('')}</ul>
  `;

  document.getElementById("competencias").innerHTML = `
    <h2>Competencias en el juego</h2>
    <ul>${Object.entries(datos.competencias_juego).map(([key, val]) => 
      `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${val}/5</li>`).join('')}</ul>
  `;

  document.getElementById("propuesta").innerHTML = `
    <h2>Propuesta Formativa</h2>
    <p><strong>Grado Medio:</strong></p>
    <ul>${datos.propuesta_formativa.grado_medio.map(c => `<li>${c}</li>`).join('')}</ul>
    <p><strong>Grado Superior:</strong></p>
    <ul>${datos.propuesta_formativa.grado_superior.map(c => `<li>${c}</li>`).join('')}</ul>
    <p><strong>Universidad:</strong></p>
    <ul>${datos.propuesta_formativa.universidad.map(c => `<li>${c}</li>`).join('')}</ul>
  `;

  document.getElementById("recomendacion").innerHTML = `
    <h2>Recomendación de la IA</h2>
    <p>${datos.recomendacion_IA.texto}</p>
  `;

  document.getElementById("familia").innerHTML = `
    <h2>Orientación para familias</h2>
    <ul>${datos.orientacion_familias.sugerencias.map(s => `<li>${s}</li>`).join('')}</ul>
  `;
}

function cambiarPerfil(direccion) {
  const nuevo = indice + direccion;
  if (nuevo >= 1 && nuevo <= 10) {
    indice = nuevo;
    cargarPerfil(indice);
  } else {
    alert("Has llegado al límite de perfiles.");
  }
}

function descargarPDF() {
    const elemento = document.getElementById("contenido-perfil");
    const opciones = {
      margin: 0.5,
      filename: `perfil_${indice}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
  
    html2pdf().set(opciones).from(elemento).save();
  }
  
  

window.onload = () => cargarPerfil(indice);