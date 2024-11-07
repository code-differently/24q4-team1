package q4.team1;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

public class PercentDiscountTest {
    ArrayList<CartItem> items;
    @Test
    public void testCalculateDiscount() {
       // Arrange
       items = new ArrayList<CartItem>();
       CartItem item1 = new CartItem("Item1", 1, 20.0);
       CartItem item2 = new CartItem("Item2", 1, 10.0);
       items.add(item1);
       items.add(item2);
       PercentDiscount percentDiscount = new PercentDiscount(items, 0.5);

       // Act
       double discountAmount = percentDiscount.calculateDiscount();

       // Assert
        assertEquals(15.0, discountAmount);
    }
}
