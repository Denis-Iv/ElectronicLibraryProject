package bg.tu.library.controller;

import bg.tu.library.entity.Author;
import bg.tu.library.service.AuthorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/authors")
public class AuthorController {
    private final AuthorService authorService;

    @PostMapping(value = "/")
    public ResponseEntity<java.lang.Object> createAuthor(@RequestBody Author author) {
        return ResponseEntity.ok().body(authorService.save(author));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteAuthor(@PathVariable("id") Integer id) {
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<Author>> findAll() {
        return ResponseEntity.ok(authorService.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Author> findById(@PathVariable("id") Integer id) {
        return authorService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
