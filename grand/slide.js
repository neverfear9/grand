let a=$("#prev");
let b=$("#next");
var btnclk=0;
a.click(function(){
	btnclk--;
	if(btnclk==-1)
		btnclk=2;
	func();
})
b.click(function(){	
	btnclk++;
	if(btnclk==3)
		btnclk=0;
	func();
})
const func=()=> 
{  
	if(btnclk==1) {
		$("#list0").hide();
		$("#list1").fadeIn("slow");
		$("#list2").hide();
		$(".intro_product_info > h2 > a").text("LED телевизор ARG LD40A6500");
		$(".intro_product_price").text("129 990 ₸");
		$(".intro_product_icon").attr("src","img/img_0_95_1690_1.webp");
	}
	else if(btnclk==2) {
		$("#list0").hide();
		$("#list1").hide();
		$("#list2").fadeIn("slow");
		$(".intro_product_info > h2 > a").text("Ноутбук Asus VivoBook 15 X513EA");
		$(".intro_product_price").text("359 990 ₸");
		$(".intro_product_icon").attr("src","img/notebook_2.webp");
	}
	else if(btnclk==0){
		$("#list0").fadeIn("slow");
		$("#list1").hide();
		$("#list2").hide();
		$(".intro_product_info > h2 > a").text("Ноутбук Apple MacBook Pro 14 Space Gray M1 Pro");
		$(".intro_product_price").text("1 257 990 ₸");
		$(".intro_product_icon").attr("src","img/product.svg");
	}
}
