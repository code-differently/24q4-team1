package q4.team1.integration;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.CartCalculator;
import q4.team1.CartItem;
import q4.team1.ShoppingCart;
import q4.team1.exceptions.CartIsEmptyException;
import q4.team1.exceptions.ItemHasNegativeException;
import q4.team1.exceptions.ItemNotFoundException;

public class ShoppingCartTest {
    CartCalculator sumCartCalculator;
    ShoppingCart cart;
    CartItem cartItem;

    @BeforeEach
    public void setUp(){
        cartItem = new CartItem("Kiwi", 10, 2.50);
        cart = new ShoppingCart();
        sumCartCalculator = new CartCalculator();
    }
    
    @Test
    public void testAddingItemsReturnsExpectedValue(){
        cart.addCartItem(cartItem);
        CartItem grapes = new CartItem("Grapes", 50, .50);
        cart.addCartItem(grapes);
        grapes.setQuantity(25);
        CartItem lobster = new CartItem("Lobster", 2, 25.00);
        cart.addCartItem(lobster);
        String expString = "name: Kiwi price: $25.0 quantity: 10\nname: Grapes price: $12.5 quantity: 25\nname: Lobster price: $50.0 quantity: 2\n";
        assertEquals(expString,cart.printCartItems());
    }

    @Test 
    public void testRemovingItemsFromCart(){
        cart.addCartItem(cartItem);
        CartItem berries = new CartItem("Berries", 30, 3.45);
        CartItem rice = new CartItem("5lb Rice Bag", 2, 5.55);
        CartItem chicken = new CartItem("Chicken/lb", 2, 7.25);
        cart.addCartItem(chicken);
        cart.addCartItem(berries);
        cart.addCartItem(rice);
        String expString = "name: Kiwi price: $25.0 quantity: 10\nname: Chicken/lb price: $14.5 quantity: 2\nname: Berries price: $103.5 quantity: 30\nname: 5lb Rice Bag price: $11.1 quantity: 2\n";
        assertEquals(expString, cart.printCartItems());
        cart.removeItem(chicken);
        expString = "name: Kiwi price: $25.0 quantity: 10\nname: Berries price: $103.5 quantity: 30\nname: 5lb Rice Bag price: $11.1 quantity: 2\n";
        assertEquals(expString, cart.printCartItems());
        cart.removeItem(rice);
        assertNotEquals(expString, cart.printCartItems());
    }

    @Test
    public void testHandlingEmptyCart_removingCartItemFromEmpty(){
        cart.addCartItem(cartItem);
        CartItem ribs = new CartItem("Ribs/stack", 2, 14.99);
        cart.addCartItem(ribs);
        cart.removeItem(cartItem);
        String expString = "name: Ribs/stack price: $29.98 quantity: 2\n";
        assertEquals(expString, cart.printCartItems());
        cart.clearCart();
        assertThrows(ItemNotFoundException.class, () -> cart.removeItem(ribs));
        assertThrows(CartIsEmptyException.class, ()-> cart.printCartItems());
    }
    @Test
    void testAddItem() { 
        cart.addCartItem(cartItem);
        CartItem item3 = new CartItem("Orange", 3, 5.00);
        cart.addCartItem(item3);
        assertEquals(2, cart.getCartItems().size());
        cart.removeItem(cartItem);
        assertEquals(1, cart.getCartItems().size());
        Exception exception = assertThrows(ItemHasNegativeException.class, () -> new CartItem("Invalid", 1, -2.00));
        assertEquals("Error item price cannot be negative", exception.getMessage());
        double expectedTotal = 3 * 5;
        assertEquals(expectedTotal,sumCartCalculator.calculatePrice(cart));
        cart.clearCart();
        assertTrue(cart.getCartItems().isEmpty(), "Cart should be empty after clearing.");
    }


}

