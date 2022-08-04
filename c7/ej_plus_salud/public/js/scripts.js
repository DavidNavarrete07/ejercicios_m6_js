const list = document.querySelector('#list-users');

async function getData() {
    let res_api = await fetch('/users');
    res_api = await res_api.json();
    let text_ul = '';
    for (let user of res_api.users) {
        text_ul += `<li class="list-group-item fw-bold">${user.firstName} ${user.lastName} - ${user.email}</li>`;
    }    
    list.innerHTML = text_ul;
}

getData();