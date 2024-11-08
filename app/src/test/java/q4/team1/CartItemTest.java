package q4.team1;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

 public class CartItemTest {
  CartItem cartItem;

    @BeforeEach
    public void setUp() {
        cartItem = new CartItem("Apple", 5, 1.99);
    }

    @Test
    public void testConstructor() {
        assertEquals("Apple", cartItem.getName());
        assertEquals(5, cartItem.getQuantity());
        assertEquals(1.99, cartItem.getOrgPrice());
        assertEquals(5 * 1.99, cartItem.getPrice(), 0.001); 
    }

    @Test
    public void testGetName() {
        assertEquals("Apple", cartItem.getName());
    }

    @Test
    public void testSetName() {
        cartItem.setName("Orange");
        assertEquals("Orange", cartItem.getName());
    }

    @Test
    public void testGetQuantity() {
        assertEquals(5, cartItem.getQuantity());
    }

    @Test
    public void testSetQuantity() {
        cartItem.setQuantity(10);
        assertEquals(10, cartItem.getQuantity());
    }

    @Test
    public void testGetPrice() {
        assertEquals(9.95, cartItem.getPrice());
    }

    @Test
    public void testGetOrgPrice() {
        assertEquals(1.99, cartItem.getOrgPrice());
    }

    @Test
    public void testToString() {
        String expected = "name: Apple price: $9.95 quantity: 5";
        assertEquals(expected, cartItem.toString());
    }
    @Test
    public void testSetQuantity_(){
        CartItem.setQuantity(10); 
    
    assertEquals(10, cartItem.getQuantity());
    
    
    double expectedPrice = 10 * cartItem.getOrgPrice();   
    
    
    assertEquals(expectedPrice, cartItem.getPrice(), 0.001);  
}

 }







