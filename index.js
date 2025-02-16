import {menuArray} from './data.js'

const orderBtn = document.getElementById('complete-btn')
const payBtn = document.getElementById('pay-btn')
const payForm = document.getElementById('card-form')
const checkoutSection = document.getElementById('checkout-section')
const menuEl = document.getElementById('menu-sct')

/**RENDERING**/
renderMenu()
 /**RENDER MENU**/
function renderMenu(){
    let menu = ''
    menuArray.forEach(function(dish){
        menu += `
            <div class='product'>
					<p class='product-icon'>${dish.emoji}</p>
					<div class='product-description'>
						<h4 class='product-name biggest-font'>${dish.name}</h4>
						<p class='product-ingredients'>${dish.ingredients}</p>
						<p class='price big-font'>$${dish.price}</p>
					</div>
					<div class='buttons'>
						<button class='product-btn' id='minus-btn' data-remove='${dish.id}'>-</button>
						<button class='product-btn' id='plus-btn' data-add='${dish.id}'>+</button>
					</div>
				</div>
        `
    })
    menuEl.insertAdjacentHTML('afterbegin',menu)
}
/**RENDER ORDER**/
function renderOrder (){
	/*order summary*/
	const orderSummary = document.getElementById('order-summary')
	const totalPrice = document.getElementById('total-price')
	let finalOrder = ''
	const orderArray = menuArray.filter(function(dish){
		return dish.amount > 0
	})
	if (orderArray.length > 0){
		orderBtn.disabled = false
	}
	orderArray.forEach(function(plate){
		finalOrder += `
		<div class="product-summary">
			<p class="selected-product biggest-font">${plate.name}<span class="amount smaller-font">${plate.amount}</span></p>
			<p id='product-total' class="price big-font">$ ${plate.price * plate.amount}</p>
		</div>`
	})
	/*order total*/
	const totalPriceAmount = orderArray.reduce(function(total, currentPlate){
		return total + currentPlate.price * currentPlate.amount
	},0)
	totalPrice.innerText = `$ ${totalPriceAmount}`
	/*order render*/
	orderSummary.innerHTML = finalOrder
	
}

/**LINK ADD-REMOVE BTNS**/
menuEl.addEventListener('click', function(e){
	if (e.target.dataset.add){
		updateDishAmount(e.target.dataset.add, 'increment')
	} else if (e.target.dataset.remove) {
		updateDishAmount(e.target.dataset.remove, 'decrement')
	}
	renderOrder()
})

/**ADD REMOVE DISHES**/
function updateDishAmount (dishId, action){
	const targetDishObj = menuArray.find(function(dish){
		return dish.id == dishId
	})
	
	if (!targetDishObj)return
	
	if (action === 'increment'){
		targetDishObj.amount ++
	} else if (action === 'decrement' && targetDishObj.amount > 0){
		targetDishObj.amount --
	}
}

/**PAY FORM-APPEAR**/
orderBtn.addEventListener('click', function finishOrder(){
	payForm.style.display = 'inline'
})
/**PAY FORM-PAY**/

payForm.addEventListener('submit', function(e){
  	e.preventDefault()
 	payForm.style.display = 'none'
	checkoutSection.innerHTML = `
	<div id='order-final-message'>
		Thanks, James! Your order is on its way!
	</div>`
})