package bg.tu.library.service;

import bg.tu.library.entity.Author;
import bg.tu.library.entity.Book;
import bg.tu.library.entity.BookCategory;
import bg.tu.library.exception.AuthorNotFoundException;
import bg.tu.library.exception.BookCategoryNotFoundException;
import bg.tu.library.exception.BookNotFoundException;
import bg.tu.library.repository.BookCategoryRepository;
import bg.tu.library.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookCategoryService {

    private final BookCategoryRepository bookCategoryRepository;
    private final BookRepository bookRepository;

    public Integer save(BookCategory bookCategory, Integer bookId){
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (bookOptional.isEmpty()){
            throw new BookNotFoundException("Book with id " + bookId + " not found!");
        }
        bookCategory.setBook(bookOptional.get());
        return bookCategoryRepository.save(bookCategory).getId();
    }

    public List<BookCategory> findAll() {

        return bookCategoryRepository.findAll();
    }

    public void delete(Integer id) {
        Optional<BookCategory> bookCategoryOptional = bookCategoryRepository.findById(id);

        if (bookCategoryOptional.isPresent()) {
            bookCategoryRepository.delete(bookCategoryOptional.get());
        } else {
            throw new BookCategoryNotFoundException("Book category with id " + id + " was not found!");
        }
    }

    public List<BookCategory> findByCategoryName(String name) {
        Example<BookCategory> bookCategoryExample =
                Example.of(BookCategory.builder()
                        .categoryName(name)
                        .build(), ExampleMatcher.matching()
                        .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                        .withIgnoreCase());

        return bookCategoryRepository.findAll(bookCategoryExample);
    }
}
