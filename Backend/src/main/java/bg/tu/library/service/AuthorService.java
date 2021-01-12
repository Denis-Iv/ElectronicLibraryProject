package bg.tu.library.service;

import bg.tu.library.entity.Author;
import bg.tu.library.repository.AuthorRepository;
import lombok.AllArgsConstructor;
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

    public Optional<Author> findById(Integer id) {
        return authorRepository.findById(id);
    }

    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    public void delete(Integer id) {
        Optional<Author> authorOptional = authorRepository.findById(id);

        if (authorOptional.isPresent()) {
            authorRepository.delete(authorOptional.get());
        } else {
            throw new RuntimeException("Author not found");
        }
    }
}
