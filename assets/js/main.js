/*  --- setting Global variables ---   */
const bodyDom = document.getElementsByTagName('body')
const card = document.querySelector('.card-container')
const filterInput = document.getElementById('filter')
const allBtn = document.getElementById('allBtn');
const hotBtn = document.getElementById('hotBtn');
const coldBtn = document.getElementById('coldBtn');
const appTitle = document.getElementById('appTitle');

let coffeeList = []

/*  --- function to load the API data ---   */
async function getAPI (type) {
    card.innerHTML=''
    
    try {

        //fetching cold coffee api
        const urlColdCofee = await fetch('https://api.sampleapis.com/coffee/iced');
        const coldCofeeList = await urlColdCofee.json();

        //fetching hot coffee api
        const urlHotCofee = await fetch('https://api.sampleapis.com/coffee/hot');
        const hotCofeeList = await urlHotCofee.json();
        
        //joining the two arrays
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
    }
    
}

/*  --- Function to filter the coffes by rerendering the cards 
        that matches the info typed on the input by the user ---    */
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

//Function to close the modal screen
function closeModal (modal) {
    modal.style.display = 'none'
}

/*  --- Function that creates a modal screen with tailwind classes and DOM elements
     based on the clicked card content ---  */
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
            'mb-10',
            'sm:mb-3',
            'pb-3'
        )
    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(closeBtn)

    const modalImg = document.createElement('img')
    modalImg.classList.add(
            'w-3/5',
            'h-2/5',
            'sm:w-3/5',
            'sm:h-2/5',
            'landscape:w-2/5',
            'landscape:h-3/5',
            'rounded',
            'float-left',
            'p-3' 
        )

    modalImg.setAttribute('src', image)
        
    const modalIngridients = ingredients
    modalIngridients.classList.add(
            'text-red-900',
            'mt-4',
            'block'
        )

    const modalDescription = document.createElement('p')
    modalDescription.textContent = 'INFO: '+ description
    modalDescription.classList.add(
        'pt-1',
        'h-2/5',
        'sm:h-3/5',
        'text-justify',
        'text-sm',
        'overflow-auto'
    )

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
            'bg-slate-100',
            'drop-shadow-2xl',
            'p-4','pt-5',
            'sm:p-7',
            'w-4/5',
            'h-3/5',
            'sm:h-4/5',
            'z-10',
            'md:w-3/5', 
            'md:h-4/5',
            'landscape:w-3/5',
            'landscape:h-4/5'
        )
    
    modal.appendChild(modalHeader)    
    modal.appendChild(modalImg)    
    modal.appendChild(modalDescription)    
    modal.appendChild(modalIngridients)    
   
    //calling function to close the modal wheter clicking outside or clicking on close button 
    closeBtn.onclick = () => {closeModal(modalWrapper)}
    window.onclick = e => { if(e.target == modalWrapper) {closeModal(modalWrapper)} }

    modalWrapper.appendChild(modal)
    card.parentNode.appendChild(modalWrapper)
        
}

/*  --- Function that create all HTML DOM tags that holds and display the API info ---  */
function showCards (coffee, type) {
    
    //main card content contains all info
    const cardContent = document.createElement('div') 

    //checks if the coffee is cold or hot and set a color and a text to each case 
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

//call a filter function every time an input is typed by the user
filterInput.addEventListener('keyup', () => {
   
    /*  setting the first letter to uppercase
        in other words, capitalizing the input  */
    const inputFirstLetter = filterInput.value.charAt(0).toUpperCase(); //firstletter to uppercase
    const inputAfterFirst = filterInput.value.slice(1)  //selecting the rest of the string
    const inputCapitalized =  inputFirstLetter + inputAfterFirst //concatenating both of them

    filterCoffee(inputCapitalized);
})

//buttons event for calling the api and filtering the coffees
allBtn.addEventListener('click', () => {
    getAPI('all')
})
hotBtn.addEventListener('click', () => {
    getAPI('hot')
})
coldBtn.addEventListener('click', () => {
    getAPI('cold')
})

//reloads the page on clicking on title 
appTitle.addEventListener('click', () => {
    window.location.reload();
}) 
appTitle.classList.add(
        'cursor-pointer'
    )

//loads the API when the page is loaded the first time    
document.addEventListener('load', getAPI('all'))

