package q4.team1;

public class CartItem {

  private String name;
  private int quantity;
  private double price;
  private double orgPrice;


  public CartItem(String name, int quantity, double orgPrice){
    this.name = name;
    this.quantity = quantity;
    this.orgPrice = orgPrice;
    this.price = orgPrice;
  }
  public String getName(){
    return name;
  }
  public int getQuantity(){
    return quantity;
  }
  public double getPrice(){
    return this.price*this.quantity;
  }
  public double getOrgPrice(){
    return this.orgPrice*this.quantity;
  }
  public void setName(String name){
    this.name = name;
  }
  public void setQuantity(int quantity){
    this.quantity = quantity;
  }
  @Override
  public String toString (){
    return "name: " + name + " price: $" + price + " " + "quantity: " + quantity;
  }
}
