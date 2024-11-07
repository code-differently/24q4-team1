package q4.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.exceptions.ItemNotFoundException;
import q4.team1.exceptions.NegativeDiscountException;

public class FixedDiscountTest {

  @Test
  public void testDiscountException_AmountIsNegative(){

    assertThrows(NegativeDiscountException.class, () -> {
      new FixedDiscount(new ArrayList<CartItem>(), -99);
    });
  }

  @Test
  public void testDiscountException_ItemsAreNull(){
    assertThrows(ItemNotFoundException.class, () -> {
      new FixedDiscount(null, 2);
    });
  }

  @Test
  public void testCalculateDiscountWorks(){
    CartItem item = new CartItem("Banana", 2, 5);
    ArrayList<CartItem> items = new ArrayList<>();
    items.add(item);

    Discount fixed = new FixedDiscount(items, 2);

    assertEquals(8, fixed.calculateDiscount());
  }
}
