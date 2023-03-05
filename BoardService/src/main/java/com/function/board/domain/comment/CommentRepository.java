package com.function.board.domain.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Query("select c from Comment c where c.board.id = :boardId")
	Page<Comment> findAllByBoardId(@Param("boardId") Long boardId, Pageable pageable);

}
