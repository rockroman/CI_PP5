// filtering functionality on product pages
$('#sort-selector').change(function() {
    var selector = $(this);
    var currentUrl = new URL(window.location);

    var selectedVal = selector.val();
    if(selectedVal != "reset"){
        var sort = selectedVal.split("_")[0];
        var direction = selectedVal.split("_")[1];

        currentUrl.searchParams.set("sort", sort);
        currentUrl.searchParams.set("direction", direction);

        window.location.replace(currentUrl);
    } else {
        currentUrl.searchParams.delete("sort");
        currentUrl.searchParams.delete("direction");

        window.location.replace(currentUrl);
    }
})



$('.back-to-top').click(function(e) {
    window.scrollTo(0,0)
})






function updateCartTotal() {
    $.ajax({
      url: '/get_cart_total/',
      dataType: 'json',
      success: function(res) {
        var totalItems = res.total_items;
        var total_price = res.total_price
        $('.cart-total').text(totalItems);
        if(total_price == 0){
            $('.price').text('€0.00');

        }else{
            $('.price').html('€'+total_price);

        }

      }
    });;
  }




// new try



$('#addToCartBtn').on('click', function(){
    var _addBtn = $(this);
    var _qty = $('.product-qty').val();
    var _productId = $('.product-id').val();
    var _productName = $('.product-name').text();
    var _productImage = $('.product-image').val();
    var _productPrice = $('.product-price').val();

    console.log(_productPrice);

    if (_qty > 10 || _qty <= 0) {
        // code taken from https://djangocentral.com/django-ajax-with-jquery/
        // $('#addToCartBtn').addClass('active')
        _addBtn.removeClass('active').blur();
        $('.product-qty').removeClass('is-valid').addClass('is-invalid');
        $('.product-qty').blur();
        $('#Error').remove()
        $('.error-qty').before('<div class="invalid-feedback d-block" id="Error">quantity must be range 1 -10!</div>');

        return


    }


    // Ajax
    $.ajax({
        url:'/add_to_cart/',
        type : 'POST',
        headers: {
            'X-CSRFToken': $('#csrf_token').val()
        },
        data:{
            'id':_productId,
            'image':_productImage,
            'qty':_qty,
            'name':_productName,
            'price':_productPrice,
        },

        dataType:'json',
        beforeSend:function(){

            _addBtn.attr('disabled',true);
        },
        success:function(res){
            var message = res.my_message;
            console.log(message);

            updateCartTotal()
            $('.success-modal').modal('show');

            console.log(res.data);
            $('.product-qty').removeClass('is-invalid')
            $('#Error').remove()
            $('.product-qty').val(1)

            _addBtn.attr('disabled',false);





        }


    });


})



$('.addToCartBtn').on('click', function(){
    var _addBtn = $(this);
    var _qty = 1;
    // var _productName = $(this).closest('.all_products').find('.product-name').val();
    var _productId = $(this).closest('.all_products').find('.product-id').val();
    var _productName = $(this).closest('.all_products').find('.product-name').val();
    var _productImage = $(this).closest('.all_products').find('.product-image').val();
    var _productPrice = $(this).closest('.all_products').find('.product-price').val();

    console.log(_productId);
    console.log(_productName);
    console.log(_productPrice);

    $.ajax({
        url:'/add_to_cart/',
        type : 'POST',
        headers: {
            'X-CSRFToken': $(this).closest('.all_products').find('.csrf_token').val()
        },
        data:{
            'id':_productId,
            'image':_productImage,
            'qty':_qty,
            'name':_productName,
            'price':_productPrice,
        },

        dataType:'json',
        beforeSend:function(){

            _addBtn.attr('disabled',true);
        },
        success:function(res){

            updateCartTotal()
            $('.success-modal').modal('show');
            _addBtn.attr('disabled',false);
            console.log(res.data);






        }
    });



})

// new try image fromwishlist to cart nor rendering
$('.addToCartBtnWish').on('click', function(){
    var _addBtn = $(this);
    var _qty = 1;
    // var _productName = $(this).closest('.wishlist_products').find('.product-name').val();
    var _productId = $(this).closest('.wishlist_products').find('.product-id').val();
    var _productName = $(this).closest('.wishlist_products').find('.product-name').val();
    var _productImage = $(this).closest('.wishlist_products').find('.product-image').val();
    var _productPrice = $(this).closest('.wishlist_products').find('.product-price').val();

    console.log(_productId);
    console.log(_productName);
    console.log(_productPrice);
    console.log(_productImage);

    $.ajax({
        url:'/add_to_cart/',
        type : 'POST',
        headers: {
            'X-CSRFToken': $(this).closest('.wishlist_products').find('.csrf_token').val()
        },
        data:{
            'id':_productId,
            'image':_productImage,
            'qty':_qty,
            'name':_productName,
            'price':_productPrice,
        },

        dataType:'json',
        beforeSend:function(){

            _addBtn.attr('disabled',true);
        },
        success:function(res){

            updateCartTotal()
            $('.success-modal').modal('show');
            _addBtn.attr('disabled',false);
            console.log(res.data);






        }
    });



})



//

$(document).ready(function () {
    updateCartTotal();
    // updateWishlistCount();
    // updateWishlistTotal();
});

// window.addEventListener('popstate', function(event){
//     $.ajax({
//         url: '/wishlist_total/',
//         method: 'GET',
//         dataType: 'json',
//         success: function(res) {
//           var wishlist_count = res.wishlist_count;
//           console.log(wishlist_count);
//           $('.heart-total').text('dassdasd');
//         }
//       });


// })


// function updateWishlistTotal(){

//     $.ajax({
//       url: '/wishlist_total/',
//       method: 'GET',
//       dataType: 'json',

//       success: function(res) {
//         var wishlist_count = res.wishlist_count;
//         console.log(wishlist_count);
//         $('.heart-total').text(wishlist_count);
//       }
//     });

// }


// function updateWishlistCount() {
//     fetch('/wishlist_total/')
//       .then(response => response.json())
//       .then(data => {
//         const wishlistCount = data.wishlist_count;
//         console.log(wishlistCount);
//         $('.heart-total').text(wishlistCount);


//       })
//       .catch(error => {
//         console.error('Error fetching wishlist count:', error);
//       });
//   }



function modalFading(){
    $('.success-modal').modal('show');

    setTimeout(function(){
        $('.success-modal').modal('hide');

    }, 2000)

}


