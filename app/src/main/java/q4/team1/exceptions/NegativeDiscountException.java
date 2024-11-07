package q4.team1.exceptions;

public class NegativeDiscountException extends IllegalArgumentException{

  public NegativeDiscountException(String message){
    super(message);
  }

  public NegativeDiscountException(){
    super();
  }

}
