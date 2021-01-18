package bg.tu.library.service;

import bg.tu.library.dto.BookCoverDto;
import bg.tu.library.dto.BookRatingDto;
import bg.tu.library.entity.Author;
import bg.tu.library.entity.Book;
import bg.tu.library.entity.BookRating;
import bg.tu.library.exception.AuthorNotFoundException;
import bg.tu.library.exception.BookNotFoundException;
import bg.tu.library.repository.AuthorRepository;
import bg.tu.library.repository.BookRatingRepository;
import bg.tu.library.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
@AllArgsConstructor
public class BookService {
    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;
    private final BookRatingRepository bookRatingRepository;

    public Integer save(Book book, Integer authorId) {
        Optional<Author> authorOptional = authorRepository.findById(authorId);
        if (authorOptional.isEmpty()){
            throw new AuthorNotFoundException("Author with id " + authorId + " not found!");
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
            throw new BookNotFoundException("Book with id " + id + " not found!");
        }
    }

    public List<Book> findByCategory(String category) {
        return bookRepository.findByCategory(category);
    }

    public void setCover(BookCoverDto bookCoverDto, Integer id) {
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();

            book.setCover(bookCoverDto.getCover());

            bookRepository.save(book);
        } else {
            throw new BookNotFoundException("Book with id " + id + " not found!");
        }
    }

    public void addBookRating(BookRatingDto bookRatingDto, Integer id) {
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            book.getBookRatings().add(BookRating.builder()
                                                .rating(bookRatingDto.getRating())
                                                .book(book).build());

            bookRepository.save(book);
        } else {
            throw new BookNotFoundException("Book with id " + id + " not found!");
        }
    }

    public OptionalDouble getRatingForBook(Integer id){
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();

            return bookRatingRepository.findByBook(book).stream().mapToInt(BookRating::getRating).average();
        } else {
            throw new BookNotFoundException("Book with id " + id + " not found!");
        }
    }
}
