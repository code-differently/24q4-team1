package q4.team1.exceptions;

public class ItemHasNegativeException extends IllegalArgumentException{
  public ItemHasNegativeException(String message){
    super(message);
  }

  public ItemHasNegativeException(){
    super();
  }
}
