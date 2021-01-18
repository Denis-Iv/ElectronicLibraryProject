package bg.tu.library.service;

import bg.tu.library.entity.Author;
import bg.tu.library.exception.AuthorNotFoundException;
import bg.tu.library.repository.AuthorRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    public Integer save(Author author) {
        return authorRepository.save(author).getId();
    }

    public Author findById(Integer id) {
        return authorRepository.findById(id)
                               .orElseThrow(() -> new AuthorNotFoundException("Author with id " + id + " was not found!"));
    }

    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    public void delete(Integer id) {
        Optional<Author> authorOptional = authorRepository.findById(id);

        if (authorOptional.isPresent()) {
            authorRepository.delete(authorOptional.get());
        } else {
            throw new AuthorNotFoundException("Author with id " + id + " was not found!");
        }
    }

    public List<Author> findByName(String name) {
        Example<Author> authorExample =
                Example.of(Author.builder()
                                 .name(name)
                                 .build(), ExampleMatcher.matching()
                                                         .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                                                         .withIgnoreCase());

        return authorRepository.findAll(authorExample);
    }
}
