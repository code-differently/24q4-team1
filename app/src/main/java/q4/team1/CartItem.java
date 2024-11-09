package q4.team1;

import q4.team1.exceptions.ItemHasNegativeException;

public class CartItem {

  private String name;
  private int quantity;
  private double price;
  private double orgPrice;


  public CartItem(String name, int quantity, double orgPrice){
    this.name = name;
    this.quantity = quantity;
    if (orgPrice < 0 ){
      throw new ItemHasNegativeException("Error item price cannot be negative");
    }
    this.orgPrice = orgPrice;
    this.price = orgPrice*quantity;
    
  }
  public String getName(){
    return name;
  }
  public int getQuantity(){
    return quantity;
  }
  public double getPrice(){
    return this.price = this.orgPrice*this.quantity;
  }
  public double getOrgPrice(){
    return this.orgPrice;
  }
  public void setName(String name){
    this.name = name;
  }
  public void setQuantity(int quantity){
    this.quantity = quantity;
    this.price = quantity * orgPrice;
  }
  @Override
  public String toString (){
    return "name: " + name + " price: $" + price + " " + "quantity: " + quantity;
  }
}
