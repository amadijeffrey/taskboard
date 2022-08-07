const addColumnButton = document.querySelector(".btn-primary");
const section = document.querySelector(".section");
const addPosition = document.querySelector(".addColumn");
const editTicketButtons = document.querySelectorAll('.edit')
const body = document.querySelector('body')


// addColumnButton.disabled = true

// document.getElementById("addColumnValue").addEventListener('change', (e) => {
// if(e.target.value !== '') return addColumnButton.disabled = false
//  addColumnButton.disabled = true
// })


addColumnButton.addEventListener("click", (e) => {
  console.log(this)
  const newColumn = document.querySelector("#addColumnValue").value;
  const id = Date.now()
  addPosition.insertAdjacentHTML("beforebegin", `<div class="container" data-id=${id}><span class="columnOptions"><p class="column editColumn" data-bs-toggle="modal" data-bs-target="#editColumnModal">edit column</p><p class="column deleteColumn">delete column</p></span>
  <div class="title"><p class='head'><span style="margin-right: 5px;background-color:lightgray;padding:2px 4px;border-radius: 50%;font-weight:normal;">0</span>${newColumn}</p><div style="display: flex;align-items: center;"><p class="symbol addTicket">+</p><p class="symbol dropdown">...</p></div></div><div class="scrollable"> <div class="addTicketInput">
  <input class='newTicketValue' type="text"/><button class="btn btn-success add">add</button><button class="btn btn-secondary">cancel</button></div></div></div>`);
  document.querySelector("#addColumnValue").value = ''
});

body.addEventListener('click', (e) => {
  if(e.target.classList.contains('addTicket')){
    const input = e.target.parentElement.parentElement.nextSibling.firstElementChild
    input.style.display = 'block'
  }

  if(e.target.classList.contains('add')){
    const newTicket = e.target.previousElementSibling.value;
    const id = Date.now()
    e.target.parentElement.insertAdjacentHTML("afterend", `<div class='ticket' id=${id} draggable="true"><p><a class='editTicket' data-bs-toggle="offcanvas" href="#offcanvasRight">${newTicket}</a><span class="options" >...</span></p><span class="ticketOption"><p class="column delete">delete ticket</p></span></div>`);
    e.target.parentElement.style.display = 'none'
    e.target.previousElementSibling.value = ''
    const newValue = Number(e.target.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.textContent) + 1
    e.target.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.textContent = newValue
  }

  if(e.target.classList.contains('btn-secondary')){
    e.target.parentElement.style.display = 'none'
  }

  if(e.target.classList.contains('options')){
    e.target.parentElement.nextElementSibling.classList.toggle('visible')
    e.stopPropagation()
  }

  if(e.target.classList.contains('dropdown')){
    e.target.parentElement.parentElement.previousElementSibling.classList.toggle('visible')
    e.stopPropagation()
  }

  if(e.target.classList.contains('edit')){
    // e.target.parentElement.nextElementSibling.classList.toggle('visible')
    // e.stopPropagation()
  }

  if(e.target.classList.contains('delete')){
    const ticket = e.target.parentElement.parentElement.classList.add('animated')
    const newValue =  Number(e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.textContent) - 1
    e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.textContent = newValue
    setTimeout(() => {
     ticket.remove()
    },1500)
  }

  
  if(e.target.classList.contains('editColumn')){
   const value = e.target.parentElement.nextElementSibling.firstElementChild.textContent
   document.querySelector("#editColumnValue").value = value.substr(1,value.length)
   document.querySelector("#exampleModalLabel2").textContent = `edit ${value.substr(1,value.length)}`
   document.querySelector('.updateContent').dataset.id =  e.target.parentElement.parentElement.dataset.id
  }

  if(e.target.classList.contains('updateColumn')){
   const containers = document.querySelectorAll('.container')
   containers.forEach( container =>{
    if( container.dataset.id === e.target.parentElement.parentElement.dataset.id){
    const updatedColumn = document.querySelector('#editColumnValue').value
      container.firstElementChild.nextElementSibling.firstElementChild.childNodes[1].nodeValue = updatedColumn
    }
   })
  }

  if(e.target.classList.contains('deleteColumn')){
    e.target.parentElement.parentElement.classList.add('animated')
    const parent = e.target.parentElement.parentElement
     setTimeout(() => {
      parent.remove()
    },2000)   
  }

})

body.addEventListener('dragstart', (e) => {
  if(e.target.classList.contains('ticket')){
    e.dataTransfer.setData('text', e.target.id);
  }
})

body.addEventListener('dragover', (e) => {
  if(e.target.classList.contains('scrollable')){
    e.preventDefault()
  }
})

body.addEventListener('drop', (e) => {
  if(e.target.classList.contains('scrollable')){
    e.stopPropagation()
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable)
  }
})


editTicketButtons.forEach(editTicketButton => {
  editTicketButton.addEventListener('click', (e) => {
   const value = e.target.parentElement.parentElement.firstElementChild.textContent
   value.substr(0,value.length - 3)

  })
})

