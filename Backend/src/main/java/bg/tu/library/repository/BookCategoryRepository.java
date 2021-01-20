package bg.tu.library.repository;

import bg.tu.library.entity.Book;
import bg.tu.library.entity.BookCategory;
import bg.tu.library.entity.BookRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookCategoryRepository extends  JpaRepository<BookCategory, Integer>, QueryByExampleExecutor<BookCategory> {

}
