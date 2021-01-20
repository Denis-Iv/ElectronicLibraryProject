package bg.tu.library.controller;

import bg.tu.library.dto.ErrorDto;
import bg.tu.library.entity.BookCategory;
import bg.tu.library.exception.BookCategoryNotFoundException;
import bg.tu.library.exception.BookNotFoundException;
import bg.tu.library.service.BookCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/authors/books")
public class BookCategoryController {

    private final BookCategoryService bookCategoryService;

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<ErrorDto> handleBookCategoryNotFoundException(BookCategoryNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorDto.builder()
                        .message(exception.getMessage())
                        .build());
    }

    @PostMapping(value = "/authors/{books_id}")
    public ResponseEntity createBookCategory(@RequestBody BookCategory bookCategory, @PathVariable("book_id") Integer bookId) {
        return ResponseEntity.ok().body(bookCategoryService.save(bookCategory, bookId));
    }

    @DeleteMapping(value = "/books/categories/{id}")
    public ResponseEntity deleteBookCategory(@PathVariable("id") Integer id){
        bookCategoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/books/categories")
    public ResponseEntity<List<BookCategory>> findAll(){
        return ResponseEntity.ok(bookCategoryService.findAll());
    }
}
