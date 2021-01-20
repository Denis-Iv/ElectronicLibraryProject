package bg.tu.library.exception;

public class BookCategoryNotFoundException extends RuntimeException {
    public BookCategoryNotFoundException(String message) {
        super(message);
    }
}
