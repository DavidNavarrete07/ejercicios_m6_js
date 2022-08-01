
// formulario para añadir un archivo
const formAdd = document.querySelector("#form-add");
const fileName = document.querySelector("#fileName");
const contentFile = document.querySelector("#contentFile");

// formulario para leer el archivo
const formRead = document.querySelector("#form-read");
const fileNameRead = document.querySelector("#fileName-read");

// formulario para renombrar un archivo
const formRename = document.querySelector("#form-rename");
const fileNameRename = document.querySelector("#fileName-rename");
const fileNameNew = document.querySelector("#fileName-new");

// formulario para eliminar archivo
const formDelete = document.querySelector("#form-rename");
const fileNameDelete = document.querySelector("#fileName-delete")

formAdd.addEventListener('submit', async function (e) {
  e.preventDefault()
  let data = {
    fileName: fileName.value,
    contentFile: contentFile.value
  };
  let response = await fetch('/add', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  response = await response.json()
  console.log(response);
});

formRead.addEventListener('submit', async function (e) {
  e.preventDefault();
  try {
    let response = await fetch(`/read?fileNameRead=${fileNameRead.value.trim()}`, {
      method: 'GET'
    });
    response = await response.text();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

formRename.addEventListener('submit', async function (e) {  
  e.preventDefault();
  try{
    let response = await fetch(`/rename?fileNameRename=${fileNameRename.value.trim()}&&fileNameNew=${fileNameNew.value.trim()}`, {
      method: 'GET'
    });
    response = await response.text();
    console.log(response);
  }catch(error){
    console.log(error);
  }
});

formDelete.addEventListener('submit', async function(e){
  e.preventDefault();
  try{
    let response = await fetch(`/delete?fileNameDelete=${fileNameDelete.value.trim()}`, {
      method: 'GET'
    });
    response = await response.text();
    console.log(response);
  }catch(error){
    console.log(error);
  }
});

