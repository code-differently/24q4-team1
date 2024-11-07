package q4.team1;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AppTest {

}

  private CartItem cartItem;

    @BeforeEach
    public void setUp() {
        cartItem = new CartItem("Apple", 5, 1.99);
    }

    @Test
    public void testConstructor() {
        assertEquals("Apple", cartItem.getName(), "Name should be 'Apple'");
        assertEquals(5, cartItem.getQuantity(), "Quantity should be 5");
        assertEquals(1.99, cartItem.getPrice(), "Price should be 1.99");
        assertEquals(1.99, cartItem.getOrgPrice(), "Original price should be 1.99");
    }
    @Test
    public void testGetName() {
        assertEquals("Apple", cartItem.getName(), "getName() should return 'Apple'");
    }

    @Test
    public void testSetName() {
        cartItem.setName("Orange");
        assertEquals("Orange", cartItem.getName(), "setName() should change the name to 'Orange'");
    }

    @Test
    public void testGetQuantity() {
        assertEquals(5, cartItem.getQuantity(), "getQuantity() should return 5");
    }

    @Test
    public void testSetQuantity() {
        cartItem.setQuantity(10);
        assertEquals(10, cartItem.getQuantity(), "setQuantity() should change the quantity to 10");
    }

    @Test
    public void testGetPrice() {
        assertEquals(1.99, cartItem.getPrice(), "getPrice() should return 1.99");
    }

    @Test
    public void testSetPrice() {
        cartItem.setPrice(2.49);
        assertEquals(2.49, cartItem.getPrice(), "setPrice() should change the price to 2.49");
    }

    @Test
    public void testGetOrgPrice() {
        assertEquals(1.99, cartItem.getOrgPrice(), "getOrgPrice() should return the original price of 1.99");
    }

    @Test
    public void testToString() {
        String expected = "name: Apple price: $1.99 quantity: 5";
        assertEquals(expected, cartItem.toString(), "toString() should return the correct format");
    }












