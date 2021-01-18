package bg.tu.library.controller;

import bg.tu.library.dto.AuthorDto;
import bg.tu.library.dto.ErrorDto;
import bg.tu.library.entity.Author;
import bg.tu.library.exception.AuthorNotFoundException;
import bg.tu.library.service.AuthorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/authors")
public class AuthorController {
    @ExceptionHandler(AuthorNotFoundException.class)
    public ResponseEntity<ErrorDto> handleAuthorNotFoundException(AuthorNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(ErrorDto.builder()
                                           .message(exception.getMessage())
                                           .build());
    }

    private final AuthorService authorService;
    private final ModelMapper mapper;

    @PostMapping(value = "/")
    public ResponseEntity createAuthor(@RequestBody Author author) {
        return ResponseEntity.ok().body(authorService.save(author));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteAuthor(@PathVariable("id") Integer id) {
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/example")
    public ResponseEntity<List<AuthorDto>> findAll(@PathVariable("category") String category) {
        return ResponseEntity.ok(authorService.findByName(category)
                                              .stream()
                                              .map(author -> mapper.map(author, AuthorDto.class))
                                              .collect(Collectors.toList()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<AuthorDto> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(mapper.map(authorService.findById(id), AuthorDto.class));
    }
}
