let listaDeCompras = []

function adicionarItem() {
    let inputItem = document.getElementById ("item")
    let inputQtd = document.getElementById ("quantidade")

    if(inputItem.value.trim() === "") {
        return
    }
    

    let item = {
        id: Date.now(),
        nome: inputItem.value,
        quantidade: inputQtd.value || 1,
        comprado: false
    }

    listaDeCompras.push(item)
    atualizar()

    inputItem.value = ""
    inputQtd.value = ""
    inputItem.focus()

   salvaDados()
}

function limparLista() {
    listaDeCompras = []
    atualizar()
    salvaDados()
}

function atualizar() {
    let lista = document.querySelector(".lista")
    lista.innerHTML = ""

    for (let i = 0; i < listaDeCompras.length; i++) {
        let item = document.createElement("li")
        item.innerHTML = `
                <input ${listaDeCompras[i].comprado ? "checked" : ""} type="checkbox" name="" id="" onchange="toggleItem(${listaDeCompras[i].id})">
                <p>${listaDeCompras[i].nome}           / Qnt = ${listaDeCompras[i].quantidade}</p>
                <button onclick="excluirItem(${listaDeCompras[i].id})">X</button>
            `
        lista.append(item)
    }
}

function excluirItem(id) {
    listaDeCompras = listaDeCompras.filter((item) => item.id != id)
    atualizar()
    salvaDados()
}

function limparComprados() {
    listaDeCompras = listaDeCompras.filter((item) => item.comprado != true)
    atualizar()
    salvaDados()
}

function toggleItem(id) {
    const item = listaDeCompras.find((item) => item.id == id)
    item.comprado = !item.comprado
    salvaDados()
}

document.getElementById("item").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        adicionarItem()
    }
})
 
document.getElementById("quantidade").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        adicionarItem()
    }
})
 
function carregarDados() {
    const dados = localStorage.getItem("lista_de_compras")
 
    if(dados) {
        listaDeCompras = JSON.parse(dados)
        atualizar()
    }
}

function salvaDados () {
    localStorage.setItem ("lista_de_compras", JSON.stringify(listaDeCompras))

}
 
carregarDados()
    