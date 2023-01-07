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

function modalCard (title, image) {

    const modalWrapper = document.createElement('div')
    const modal = document.createElement('div')
    const closeBtn = document.createElement('button')
    closeBtn.textContent = 'button'
    const modalTitle = document.createElement('h3')
    modalTitle.textContent = title
    // const modalDescription = description
    // const modalImg = divImg
    console.log(cardInfo);
    modalWrapper.classList.add(
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
            'w-3/5',
            'h-3/5',
            'p-10',
            'bg-slate-100',
            'drop-shadow-2xl',
            'z-10'
        )
    
    modal.appendChild(modalTitle)    
    modal.appendChild(closeBtn)    
    
    closeBtn.addEventListener('click', closeModal)
    modalWrapper.addEventListener('click', () => {
        closeModal(modalWrapper)
    })
    // modal.appendChild(divImg)    
    
    modalWrapper.appendChild(modal)
    //document.appendChild(modalWrapper)
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

    cardContent.addEventListener('click', (e) => {
        cardInfo = e.currentTarget
        modalCard(coffee.title, coffee.image);
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
document.addEventListener('load', () => {
})
