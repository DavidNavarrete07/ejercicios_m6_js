
const formAdd = document.querySelector("#form-add");
const fileName = document.querySelector("#fileName");
const contentFile = document.querySelector("#contentFile");

// 
const formRead = document.querySelector("#form-read");
const fileNameRead = document.querySelector("#fileName-read");

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

