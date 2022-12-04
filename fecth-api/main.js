const url = 'http://localhost:4000/api/roles';

//listar todos los roles
fetch(url, {
    method: 'GET',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzQyYzU0YzAwMjA2MjE2MmUwNGYwNSIsImlhdCI6MTY2ODU1NzkxNCwiZXhwIjoxNjY4NTg2NzE0fQ.diJjWD4yV6ObNtQyCOEU7sT3HS6yf52gSrS2jGamFds'
    }
})
    .then(response => response.json())
    .then(data => console.log(data))

//crear un rol
fetch(url, {
    method: 'POST',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzQyYzU0YzAwMjA2MjE2MmUwNGYwNSIsImlhdCI6MTY2ODU1NzkxNCwiZXhwIjoxNjY4NTg2NzE0fQ.diJjWD4yV6ObNtQyCOEU7sT3HS6yf52gSrS2jGamFds',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombreRol: "PRUEBA",
        estadoRol: 1
    })
})
    .then(response => response.json())
    .then(data => console.log(data))

//editar un rol
const urlEditar = `${url}/637430e2409e3f6785ab1cd3`
fetch(urlEditar, {
    method: 'PUT',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzQyYzU0YzAwMjA2MjE2MmUwNGYwNSIsImlhdCI6MTY2ODU1NzkxNCwiZXhwIjoxNjY4NTg2NzE0fQ.diJjWD4yV6ObNtQyCOEU7sT3HS6yf52gSrS2jGamFds',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombreRol: "PRUEBAS",
        estadoRol: 2
    })
})
    .then(response => response.json())
    .then(data => console.log(data))

//eliminar un rol
const urlEliminar = `${url}/637430e2409e3f6785ab1cd3`
fetch(urlEliminar, {
    method: 'DELETE',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzQyYzU0YzAwMjA2MjE2MmUwNGYwNSIsImlhdCI6MTY2ODU1NzkxNCwiZXhwIjoxNjY4NTg2NzE0fQ.diJjWD4yV6ObNtQyCOEU7sT3HS6yf52gSrS2jGamFds'
    }
})
    .then(response => response.json())
    .then(data => console.log(data))