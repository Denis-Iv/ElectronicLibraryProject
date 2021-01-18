package bg.tu.library.repository;

import bg.tu.library.entity.Author;
import bg.tu.library.entity.Book;
import bg.tu.library.entity.BookRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRatingRepository extends JpaRepository<BookRating, Integer> {
    List<BookRating> findByBook(Book book);
}
