const addColumnButton = document.querySelector(".btn-primary");
const section = document.querySelector(".section");
const addPosition = document.querySelector(".addColumn");
const body = document.querySelector('body')


// addColumnButton.disabled = true

// document.getElementById("addColumnValue").addEventListener('change', (e) => {
// if(e.target.value !== '') return addColumnButton.disabled = false
//  addColumnButton.disabled = true
// })


addColumnButton.addEventListener("click", function(e){
  const newColumn = document.querySelector("#addColumnValue").value;
  const id = Date.now()
  const scrollableDiv = document.createElement('div')
  scrollableDiv.classList.add('scrollable')
  scrollableDiv.innerHTML = '<div class="addTicketInput"><input class="newTicketValue" type="text"/><button class="btn btn-success add">add</button><button class="btn btn-secondary">cancel</button></div>'
  scrollableDiv.addEventListener('dragover', handleDragOver)
  scrollableDiv.addEventListener('drop', handleDropEvent)
  
  const containerEl = document.createElement('div')
  containerEl.classList.add('container')
  containerEl.setAttribute('data-id',id)
  containerEl.innerHTML = `<span class="columnOptions"><p class="column editColumn" data-bs-toggle="modal" data-bs-target="#editColumnModal">edit column</p><p class="column deleteColumn">delete column</p></span>
  <div class="title"><p class='head'><span style="margin-right: 5px;background-color:lightgray;padding:2px 4px;border-radius: 50%;font-weight:normal;">0</span>${newColumn}</p><div style="display: flex;align-items: center;"><p class="symbol addTicket">+</p><p class="symbol dropdown">...</p></div></div>`
  containerEl.appendChild(scrollableDiv)
  addPosition.insertAdjacentElement("beforebegin", containerEl)

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
    const el = document.createElement('div')
    el.classList.add('tickets')
    el.setAttribute('id', id)
    el.setAttribute('data-id', id)
    el.setAttribute('draggable', 'true')
    el.innerHTML = `<p><a class='editTicket' data-bs-toggle="offcanvas" href="#offcanvasRight">${newTicket}</a><span class="options" >...</span></p><span class="ticketOption"><p class="column delete">delete ticket</p></span>`
    el.addEventListener('dragstart', handleDragStart)
    el.addEventListener('dragover', handleDragOver)
    el.addEventListener('drop', handleDrop)
    e.target.parentElement.insertAdjacentElement("afterend", el)
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

  if(e.target.classList.contains('editTicket')){
    const value = e.target.textContent
    document.querySelector('.offcanvas-title').textContent = value
    document.querySelector('.offcanvas-body').dataset.id = e.target.parentElement.parentElement.dataset.id
  }

  if(e.target.classList.contains('editColumn')){
   const value = e.target.parentElement.nextElementSibling.firstElementChild.textContent
   document.querySelector("#editColumnValue").value = value.substr(1,value.length)
   document.querySelector("#exampleModalLabel2").textContent = `edit ${value.substr(1,value.length)}`
   document.querySelector('.updateContent').dataset.id =  e.target.parentElement.parentElement.dataset.id
  }


  if(e.target.classList.contains('updateColumn')){
   const containers = document.querySelectorAll('.container')
   containers.forEach( container => {
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

const editTicketButton = document.querySelector('.bi-pencil')
editTicketButton.addEventListener('click', function(e){
this.parentElement.parentElement.nextElementSibling.firstElementChild.style.display = 'block'
 document.querySelector('.editTicketValue').value = this.parentElement.previousElementSibling.textContent
})

const updateTicketButton = document.querySelector('.save')
updateTicketButton.addEventListener('click', function(e){
  document.querySelector('.offcanvas-title').textContent = document.querySelector('.editTicketValue').value
  const tickets = document.querySelectorAll('.tickets')
  tickets.forEach( ticket => {
    if(ticket.dataset.id === e.target.parentElement.parentElement.dataset.id){
      const inputValue = document.querySelector('.editTicketValue').value
      ticket.firstElementChild.firstElementChild.textContent = inputValue
            e.target.parentElement.style.display = 'none'
    }
  })
})

const toggle = document.querySelector('.toggle')
toggle.addEventListener('click', function(){
  if(this.innerHTML == '<i class="bi bi-moon"></i>'){
    this.innerHTML = '<i class="bi bi-brightness-high"></i>'
    document.querySelector('body').style.backgroundColor = 'rgb(0 30 60)'
    document.querySelector('body').style.color = 'white'
    document.querySelector('.btn-close').style.backgroundColor = 'white'
    document.querySelector('.begin').style.backgroundColor = 'rgb(10 25 41)'
    document.querySelector('#offcanvasRight').style.backgroundColor = 'rgb(19, 47, 76)'
    document.querySelector('.bi-brightness-high').style.border = '1px solid rgb(19, 47, 76)'
    document.querySelector('#ticketDescription').style.backgroundColor = 'lightgray'
    document.querySelectorAll('.container').forEach(container => {
      container.style.backgroundColor = 'rgb(10 25 41)'
    })
    document.querySelectorAll('.tickets').forEach(ticket => {
      ticket.style.backgroundColor = 'lightgray'
    })
    document.querySelectorAll('.modal-content').forEach(modal => {
      modal.style.backgroundColor = 'rgb(19, 47, 76)'
    })
    document.querySelectorAll('.columnOptions').forEach(columnOption => {
      columnOption.style.backgroundColor = 'rgb(19, 47, 76)'
    })
    document.querySelectorAll('.ticketOption').forEach(option => {
      option.style.backgroundColor = 'rgb(19, 47, 76)'
    })
  }else{
    this.innerHTML = '<i class="bi bi-moon"></i>'
    document.querySelector('body').style.backgroundColor = 'white'
    document.querySelector('body').style.color = 'black'
    document.querySelector('.btn-close').style.color = 'black'
    document.querySelector('.begin').style.backgroundColor = 'rgb(234 239 241)'
    document.querySelector('#offcanvasRight').style.backgroundColor = 'white'
    document.querySelector('#ticketDescription').style.backgroundColor = 'white'
    document.querySelectorAll('.container').forEach(container => {
      container.style.backgroundColor = 'rgb(234 239 241)'
    })
    document.querySelectorAll('.tickets').forEach(ticket => {
      ticket.style.backgroundColor = 'white'
    })
    document.querySelectorAll('.modal-content').forEach(modal => {
      modal.style.backgroundColor = 'white'
    })
  }
})

function handleDragStart(e){
    dragSrcEl = this
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('text', e.target.id);
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDrop(e){
  e.stopPropagation()
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false
}

function handleDropEvent(e){
  e.stopPropagation()
  const id = e.dataTransfer.getData('text');
  const draggable = document.getElementById(id);
  e.target.appendChild(draggable)
}