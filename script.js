const productBtn=document.querySelectorAll('.s_button_add_to_cart');
const cartProductsList = document.querySelector('.modal_main');
const fullPrice = document.querySelector('.fullprice');
let price=0;
const priceWithoutSpaces = (str) => {
	return str.replace(/ /g, ''); 
};
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};
const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};
function generateCartProduct(img, title, price, id){
	return `
<tbody class="cart_product" data-id=${id}>
<tr>
<td valign="middle"><a class="del"><i class="fas fa-xmark"></i></a></td>
<td valign="middle"><a href="product.html"><img src="${img}" width="60" height="60" /></a></td>
<td valign="middle"><a href="product.html">${title}</a></td>
<td class="quan" valign="middle"><a class="znak minus"><i class="fas fa-minus"></i></a><p class="quantity">1</p><a class="znak plus"><i class="fas fa-plus"></i></a></td>
<td class="cart-product_price" valign="middle">${price}</td>
<td class="cart-product_total" valign="middle">${price}</td>
</tr>
</tbody>
`;
}

const plusProduct = (productParent) => {
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_price').textContent));
	generateFullPrice(plusFullPrice(currentPrice));
	let quantityProducts=parseInt(productParent.querySelector('.quantity').textContent);
	quantityProducts++;
	productParent.querySelector('.quantity').textContent=`${quantityProducts}`;	
	let TotalPrice=parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_total').textContent));
	TotalPrice+=currentPrice;
	productParent.querySelector('.cart-product_total').textContent=`${normalPrice(TotalPrice)} ₸`
};
const minusProduct = (productParent) => {
	let quantityProducts=parseInt(productParent.querySelector('.quantity').textContent);
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_price').textContent));
	if(quantityProducts>1) {
		generateFullPrice(minusFullPrice(currentPrice));
		let quantityProducts=parseInt(productParent.querySelector('.quantity').textContent);
		quantityProducts--;
		productParent.querySelector('.quantity').textContent=`${quantityProducts}`;	
		let TotalPrice=parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_total').textContent));
		TotalPrice-=currentPrice;
		productParent.querySelector('.cart-product_total').textContent=`${normalPrice(TotalPrice)} ₸`
	}	
};
const deleteProduct = (productParent) => {
	let productsListLength = cartProductsList.querySelector('.table').children.length;
	let id = productParent.dataset.id;
	if($(`.special_product_item[data-id="${id}"]`)) {
		$('.s_button_add_to_cart').css("display","inline-flex");
	}
	if(productsListLength==1) {
		document.getElementById('0').style.display='block';
		document.getElementById('1').style.display='none';
		document.getElementById('agree').style.display='none';	
	}	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_total').textContent));
	generateFullPrice(minusFullPrice(currentPrice));
	productParent.remove();
};
const generateFullPrice = (price) => {
	fullPrice.textContent=`Итого к оплате: ${normalPrice(price)} ₸`;
	}
productBtn.forEach(el => {
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.special_product_item');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product_icon').getAttribute('src');
		let title = parent.querySelector('.product_title').textContent;
		let pricestring=parent.querySelector('.product_price').textContent;
		let priceNumber=parseInt(priceWithoutSpaces(pricestring));
		cartProductsList.querySelector('.table').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, pricestring, id));
		generateFullPrice(plusFullPrice(priceNumber));
		document.getElementById('0').style.display='none';
		document.getElementById('1').style.display='block';
		document.getElementById('agree').style.display='block';
		$(self).css("display","none");
		});
});
cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('plus')) {
		plusProduct(e.target.closest('.cart_product'));
	}
	else if(e.target.classList.contains('minus')) {
		minusProduct(e.target.closest('.cart_product'));
	}
	else if(e.target.classList.contains('del')) {
		deleteProduct(e.target.closest('.cart_product'));
	}
});

