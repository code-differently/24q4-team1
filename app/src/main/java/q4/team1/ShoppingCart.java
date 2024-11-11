package q4.team1;

import java.util.ArrayList;

import q4.team1.exceptions.CartIsEmptyException;
import q4.team1.exceptions.ItemNotFoundException;

/**
 * The {@code ShoppingCart} class represents a shopping cart that contains a list of {@link CartItem} objects.
 * It provides methods to add items to the cart, remove items, retrieve the items, print the contents of the cart,
 * and clear the cart.
 * <p>The shopping cart is stored as an {@link ArrayList}, and the class ensures that operations like removing
 * an item or printing the cart contents handle cases where the cart is empty or the item is not found.</p>
 */
public class ShoppingCart {
    private final ArrayList<CartItem> shoppingCart;

    /**
     * Constructs a new, empty {@code ShoppingCart}.
     * Initializes an empty {@link ArrayList} to hold the cart items.
     */
    public ShoppingCart(){
        shoppingCart = new ArrayList<>();
    }

    /**
     * Adds a {@link CartItem} to the shopping cart.
     *
     * @param item The {@code CartItem} to add to the cart.
     *             Must not be {@code null}.
     */
    public void addCartItem(CartItem item){
        shoppingCart.add(item);
    }

    /**
     * Retrieves the list of {@link CartItem} objects in the shopping cart.
     *
     * @return An {@code ArrayList} containing the items in the cart.
     */
    public ArrayList<CartItem> getCartItems(){
        return shoppingCart;
    }

    /**
     * Prints the contents of the shopping cart. Each item is printed on a new line,
     * and if the cart is empty, a {@link CartIsEmptyException} is thrown.
     * Returns a string representation of the cart items that is also printed to the console.
     *
     * @return A string representation of all cart items.
     * @throws CartIsEmptyException if the cart is empty.
     */
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

    /**
     * Clears all items from the shopping cart.
     * After calling this method, the cart will be empty.
     */
    public void clearCart(){
        shoppingCart.clear();
    }

    /**
     * Removes a specific {@link CartItem} from the shopping cart.
     * If the item is not found in the cart, an {@link ItemNotFoundException} is thrown.
     *
     * @param item The {@code CartItem} to remove from the cart.
     * @throws ItemNotFoundException if the item is not found in the cart.
     */
    public void removeItem(CartItem item){
        if(!shoppingCart.contains(item)){
            throw new ItemNotFoundException("Cannot find item");
        }
        shoppingCart.remove(item);
    }
}
