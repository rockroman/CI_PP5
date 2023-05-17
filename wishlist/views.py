# Imports
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# 3rd party:
from django.shortcuts import render,get_object_or_404, HttpResponseRedirect, redirect, reverse
from django.contrib import messages

# Internal:
from .models import Wishlist
from products.models import Product

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


def wishlist(request):
    """
    view to render the wishlist page
    """
    wishlist_items = Wishlist.objects.filter(user=request.user)
    template = 'wishlist/wishlist.html'

    context = {
        'wishlist_items': wishlist_items,
    }
    return render(request, template, context)


def add_to_wishlist(request):
    if request.method == 'POST':
        product_id = request.POST.get('product-id')
        product = get_object_or_404(Product, id=product_id)
        redirect_url = request.POST.get('my_redirect_url')

        try:
            wish_item = Wishlist.objects.get(user=request.user, product=product)
            if wish_item:
                messages.info(request, f'{wish_item.product} already on a wishlist')
        except Wishlist.DoesNotExist:
            Wishlist.objects.create(user=request.user, product=product)
            messages.success(request, f'{product.name} added to wishlist')

        return HttpResponseRedirect(redirect_url)


def remove_from_wishlist(request):

    if request.method == 'POST':
        item_id = request.POST.get('item-id')
        print(item_id)
        wish_item = get_object_or_404(Wishlist, pk=item_id)
        wish_item.delete()
        messages.success(request, f'{wish_item.product.name} deleted from wishlist')
    return HttpResponseRedirect(reverse('wishlist:wishlist'))
