package bg.tu.library.controller;

import bg.tu.library.entity.Book;
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

    @PostMapping(value = "/{author_id}/books")
    public ResponseEntity<java.lang.Object> createBook(@RequestBody Book book, @PathVariable("author_id") Integer authorId) {
        return ResponseEntity.ok().body(bookService.save(book, authorId));
    }

    @DeleteMapping(value = "/books/{id}")
    public ResponseEntity deleteBook(@PathVariable("id") Integer id){
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/books")
    public ResponseEntity<List<Book>> findAll(){ return ResponseEntity.ok(bookService.findAll());}

    @GetMapping(value = "/books/{id}")
    public  ResponseEntity<Book> findById(@PathVariable("id") Integer id){
        return bookService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
