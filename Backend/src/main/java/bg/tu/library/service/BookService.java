package bg.tu.library.service;

import bg.tu.library.entity.Author;
import bg.tu.library.entity.Book;
import bg.tu.library.repository.AuthorRepository;
import bg.tu.library.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookService {
    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;



    public Integer save(Book book, Integer authorId) {
        Optional<Author> authorOptional = authorRepository.findById(authorId);
        if (!authorOptional.isPresent()){
            throw new RuntimeException("Author not found!");
        }
        book.setAuthor(authorOptional.get());
        return bookRepository.save(book).getId();
    }

    public Optional<Book> findById(Integer id) {
        return bookRepository.findById(id);
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public void delete(Integer id) {
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isPresent()) {
            bookRepository.delete(bookOptional.get());
        } else {
            throw new RuntimeException("Book not found");
        }
    }

    public Optional<Book> findByCategory(String category){
        return bookRepository.findByCategory(category);
    }
}
