package bg.tu.library.controller;

import bg.tu.library.dto.BookCoverDto;
import bg.tu.library.dto.BookRatingDto;
import bg.tu.library.dto.ErrorDto;
import bg.tu.library.entity.Book;
import bg.tu.library.exception.AuthorNotFoundException;
import bg.tu.library.exception.BookNotFoundException;
import bg.tu.library.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/authors")
public class BookController {
    private final BookService bookService;

    @ExceptionHandler(AuthorNotFoundException.class)
    public ResponseEntity<ErrorDto> handleAuthorNotFoundException(AuthorNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorDto.builder()
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<ErrorDto> handleBookNotFoundException(BookNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorDto.builder()
                        .message(exception.getMessage())
                        .build());
    }

    @PostMapping(value = "/{author_id}/books")
    public ResponseEntity createBook(@RequestBody Book book, @PathVariable("author_id") Integer authorId) {
        return ResponseEntity.ok().body(bookService.save(book, authorId));
    }

    @PostMapping(value = "/books/{book_id}/rating")
    public ResponseEntity addRating(@RequestBody BookRatingDto bookRating, @PathVariable("book_id") Integer bookId) {
        bookService.addBookRating(bookRating, bookId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(value = "/books/{book_id}/cover")
    public ResponseEntity updateBookCover(@RequestBody BookCoverDto bookCoverDto, @PathVariable("book_id") Integer bookId) {
        bookService.setCover(bookCoverDto, bookId);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/books/{id}")
    public ResponseEntity deleteBook(@PathVariable("id") Integer id){
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/books/category/{category}")
    public ResponseEntity<List<Book>> getByCategory(@PathVariable("category") String category){
        return ResponseEntity.ok(bookService.findByCategory(category));
    }

    @GetMapping(value = "/books")
    public ResponseEntity<List<Book>> findAll(){ return ResponseEntity.ok(bookService.findAll());}

    @GetMapping(value = "/books/{id}")
    public ResponseEntity<Book> findById(@PathVariable("id") Integer id){
        return bookService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping(value = "/books/{id}/rating")
    public ResponseEntity<Double> getRatingForBook(@PathVariable("id") Integer id){
        return ResponseEntity.ok().body(bookService.getRatingForBook(id).orElse(0.0));
    }
}
