package q4.team1;

import java.util.ArrayList;

import q4.team1.exceptions.CartIsEmptyException;
import q4.team1.exceptions.ItemNotFoundException;

public class ShoppingCart {
    private final ArrayList<CartItem> shoppingCart;
    
    public ShoppingCart(){
        shoppingCart = new ArrayList<>();
    }

    public void addCartItem(CartItem item){
        shoppingCart.add(item);
    }
    public ArrayList<CartItem> getCartItems(){
        return shoppingCart;
    }
    public String printCartItems(){
        String value = "";
        if(shoppingCart.isEmpty()){
            throw new CartIsEmptyException("This cart is empty");
        }
        System.out.println("############################");
        for(CartItem item : shoppingCart){
            System.out.println(item.toString());
            value += item.toString() + "\n";
        }
        System.out.println("############################");
        return value;

    }
    public void clearCart(){
        shoppingCart.clear();
    }
    public void removeItem(CartItem item){
        if(!shoppingCart.contains(item) ){
            throw new ItemNotFoundException("Can not find item");
        }
        shoppingCart.remove(item);
    }

}
