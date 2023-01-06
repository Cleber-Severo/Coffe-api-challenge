/*  ---setting Global variables---   */
const card = document.querySelector('.card-container')


/*  function to load the API data  */
async function getAPI () {
    try {
        const urlHotCofee = await fetch('https://api.sampleapis.com/coffee/hot')
        let hotCofeeList = await urlHotCofee.json()
        console.log(hotCofeeList)

    //creating a card to all itens on the array by calling the function
        hotCofeeList.map(coffee => showCards(coffee, 'hot'))

    } catch (error) {
        console.log('Cannot load Hot cofee API');    
        console.log(error);    
    }

    try {
        const urlColdCofee = await fetch('https://api.sampleapis.com/coffee/iced')
        let coldCofeeList = await urlColdCofee.json()
        console.log(coldCofeeList)

        coldCofeeList.map(coffee => showCards(coffee, 'cold'))

    } catch (error) {
        console.log('Cannot load cold cofee API'); 
    }
}

/*  Function that create all HTML DOM tags that holds and display the API info  */
function showCards (coffee, type) {
    
    const cardContent = document.createElement('div') 
    console.log(type);
    typeColor = type === 'hot' ? 'text-yellow-300' : 'text-teal-500'
    const divType = document.createElement('small')
    divType.textContent = type + ' coffee'
    divType.classList.add(
            'bg-yellow-800',
            'bg-opacity-50',
            typeColor,
            'font-semibold',
            'rounded-md',
            'px-2', 
            'py-1',
            'absolute',
            'right-3',
            'top-3'
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


    cardContent.appendChild(divType)
    cardContent.appendChild(divTitle)
    cardContent.appendChild(divImg)
    cardContent.appendChild(divIngredients)
    cardContent.appendChild(divDescription)
    cardContent.classList.add(
            'p-10', 
            'bg-yellow-800',
            'bg-opacity-80', 
            'rounded-xl', 
            'flex',
            'flex-col', 
            'justfy-center', 
            'items-center',
            'relative'
        )
    
    
    card.appendChild(cardContent)
    
}

getAPI()


