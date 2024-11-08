package q4.team1;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.exceptions.NegativeDiscountException;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

public class PercentDiscountTest {
    ArrayList<CartItem> items;

    @BeforeEach
    void setUp() {
        items = new ArrayList<CartItem>();
        CartItem item1 = new CartItem("Item1", 1, 20.0);
        CartItem item2 = new CartItem("Item2", 1, 10.0);
        items.add(item1);
        items.add(item2);
    }
    @Test
    void testCalculateDiscount_validItems() {
       // Arrange
       PercentDiscount percentDiscount = new PercentDiscount(items, 0.5);

       // Act
       double discountAmount = percentDiscount.calculateDiscount();

       // Assert
        assertEquals(15.0, discountAmount);
    }

    @Test
    void testCalculateDiscount_negativeDiscount() throws NegativeDiscountException {
        // Act and Assert
        assertThrows(NegativeDiscountException.class, () -> {new PercentDiscount(items, -0.5).calculateDiscount();});
    }

    @Test
    void testGetDiscountRate() {
        // Arrange
        PercentDiscount percentDiscount = new PercentDiscount(items, 0.5);

        // Act
        double discountRate = percentDiscount.getDiscountRate();

        // Assert
        assertEquals(0.5, discountRate);
    }
}
