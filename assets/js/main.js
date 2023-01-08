/*  ---setting Global variables---   */
const bodyDom = document.getElementsByTagName('body')
const card = document.querySelector('.card-container')
const filterInput = document.getElementById('filter')
const allBtn = document.getElementById('allBtn');
const hotBtn = document.getElementById('hotBtn');
const coldBtn = document.getElementById('coldBtn');

let coffeeList = []

//console.log(card);

/*  function to load the API data  */
async function getAPI (type, value) {
    card.innerHTML=''
    
    try {
        const urlColdCofee = await fetch('https://api.sampleapis.com/coffee/iced');
        const coldCofeeList = await urlColdCofee.json();
        
        const urlHotCofee = await fetch('https://api.sampleapis.com/coffee/hot');
        const hotCofeeList = await urlHotCofee.json();
        
        coffeeList = [...hotCofeeList, ...coldCofeeList]
        console.log(coffeeList);

    //creating a card to all itens on the array by calling the function
        switch (type) {
            case 'all':
                await coldCofeeList.map(coffee => showCards(coffee, 'cold'))
                await hotCofeeList.map(coffee => showCards(coffee, 'hot'))
                break;
            case 'hot':
                await hotCofeeList.map(coffee => showCards(coffee, 'hot'))
                break;

            case 'cold':
                await coldCofeeList.map(coffee => showCards(coffee, 'cold'))
                break;

        }


       
    } catch (error) {
        console.log('Cannot load Hot cofee API');    
        //console.log(error);    
    }
    
}

function filterCoffee (value) {

    const filteredCoffee = []
     card.innerHTML=''
    
    if(value === '') {
        getAPI('all');
        return 
    }

    for (var i in coffeeList) {
        if (coffeeList[i].title.includes(value)){
            filteredCoffee.push(coffeeList[i])
        }
    }
    
    filteredCoffee.map(coffee => showCards(coffee))
    console.log(filteredCoffee);
}

function closeModal (modal) {
    modal.style.display = 'none'
}

function modalCard (title, image, description, ingredients) {

   
    const modalWrapper = document.createElement('div')
    const modal = document.createElement('div')
    
    const modalHeader = document.createElement('div')

    const modalTitle = document.createElement('h3')
    modalTitle.textContent = title
    modalTitle.classList.add(
            'text-lg',
            'font-semibold',
            'text-yellow-800'
        )
    
    const closeBtn = document.createElement('button')
    closeBtn.textContent = 'Close'
    closeBtn.classList.add('modal-button', 'p-2', 'text-red-400','hover:text-red-600' ,'hover:bg-gray-900','hover:bg-opacity-10' , 'font-semibold', 'text-xl')

    modalHeader.classList.add(
            'flex',
            'justify-between',
            'items-center',
            'border-b-2',
            'border-gray-400',
            'mb-3',
            'pb-3'
        )
    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(closeBtn)

    const modalImg = document.createElement('img')
    modalImg.classList.add(
            'h-28',
            'w-28',
            'rounded',
            'mb-5' 
        )

    modalImg.setAttribute('src', image)
        
    const modalIngridients = ingredients
    modalIngridients.classList.add(
            'text-red-900'
        )

    const modalDescription = document.createElement('p')
    modalDescription.textContent = description

    modalWrapper.classList.add(
            'modal-wrapper',
            'bg-gray-900',
            'bg-opacity-30',
            'w-full', 
            'h-full',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            'z-10',
            'fixed',
            'top-0',
            'left-0'
        )
    modal.classList.add(
            'modal',
            'w-80',
            'sm:w-2/5', 
            'h-4/5',
            'sm:h-3/5',
            'p-7',
            'bg-slate-100',
            'drop-shadow-2xl',
            'z-10'
        )
    
    modal.appendChild(modalHeader)    
    modal.appendChild(modalImg)    
    modal.appendChild(modalIngridients)    
    modal.appendChild(modalDescription)    
   
    //calling function to close the modal wheter clicking outside or clicking on close button 
    closeBtn.onclick = () => {closeModal(modalWrapper)}
    window.onclick = e => { if(e.target == modalWrapper) {closeModal(modalWrapper)} }

    modalWrapper.appendChild(modal)
    card.parentNode.appendChild(modalWrapper)
        
}

/*  Function that create all HTML DOM tags that holds and display the API info  */
function showCards (coffee, type) {
    
    const cardContent = document.createElement('div') 
    
    typeColor = type === 'hot' ? 'text-yellow-300' : 'text-teal-200'
    const divType = document.createElement('small')
    divType.textContent = type
    divType.classList.add(
            'bg-gray-900',
            'bg-opacity-40',
            typeColor,
            'font-semibold',
            'text-xs',
            '-translate-y-8',
            'rounded-md',
            'px-2', 
            'py-1',
            'mt-1'
        )

    const divTitle = document.createElement('h3')
    divTitle.classList.add(
            'font-bold',
            'text-lg',
            'text-yellow-900',
            'mb-2'
        ) 
    divTitle.textContent = coffee.title

    const divDescription = document.createElement('p') 
    divDescription.textContent = `Description: ${coffee.description}`
    divDescription.classList.add(
                'my-2',
                'leading-5',
                'text-sm',
                'text-justify',
                'text-slate-900',
                'font-semibold'
            )
    
    const divImg = document.createElement('img')
    divImg.classList.add(
            'h-60',
            'rounded', 
            'w-60'
        )
    divImg.setAttribute('src', coffee.image)

    const divIngredients = document.createElement('p')
    divIngredients.textContent = "Ingredients: "
    
     const lastIngredient = coffee.ingredients.slice(-1)

    //inserting the ingredients by mapping the array of ingredients
    coffee.ingredients.map(ingredient => {
        const divIngredient = document.createElement('small')
        //checks if is the last ingredient or not
        ingredient == lastIngredient
         ? divIngredient.textContent = `${ingredient}` 
         : divIngredient.textContent = `${ingredient}, `
        
        divIngredients.appendChild(divIngredient)
    })    

    divIngredients.classList.add('-translate-y-4')

    cardContent.appendChild(divTitle)
    cardContent.appendChild(divImg)
    cardContent.appendChild(divType)
    cardContent.appendChild(divIngredients)
    //cardContent.appendChild(divDescription)
    cardContent.classList.add(
            'p-10', 
            'bg-yellow-800',
            'bg-opacity-80', 
            'rounded-xl', 
            'flex',
            'flex-col', 
            'justfy-center', 
            'items-center',
            'relative',
            'hover:cursor-pointer',
            'hover:bg-opacity-90'
        )
    
    card.appendChild(cardContent)
    
    //creationg a copy of the ingredients p tag
    const sendIngredients = document.createElement('p')
    sendIngredients.innerHTML = divIngredients.innerHTML;

    //sending the info to the modal function
    cardContent.addEventListener('click', () => {
        modalCard(coffee.title, coffee.image, coffee.description, sendIngredients);
    })
    
}

filterInput.addEventListener('keyup', (e) => {
    filterCoffee(filter.value);
})

allBtn.addEventListener('click', () => {
    getAPI('all')
})
hotBtn.addEventListener('click', () => {
    getAPI('hot')
})
coldBtn.addEventListener('click', () => {
    getAPI('cold')
})

document.addEventListener('load', getAPI('all'))

