/*  ---setting Global variables---   */
const card = document.querySelector('.card-container')
const select = document.getElementById('selectType')
const filterInput = document.getElementById('filter')
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
    //console.log(value);
    //console.log(coffeeList);

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
            'hover:bg-opacity-90',
            'hover:cursor-pointer'
        )
    
    
    card.appendChild(cardContent)

    // cardContent.addEventListener('click', (e) => {
    //     console.log(e.target);
    //     console.log(coffee.description);
    // })
    
}

select.addEventListener('change', (e)=>{
    console.log(select.value);
    getAPI(select.value)
})

filterInput.addEventListener('keyup', (e) => {
    filterCoffee(filter.value);
})

document.addEventListener('load', getAPI('all'))

// getAPI('')


