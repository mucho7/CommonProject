package com.function.board.domain.board;

import static com.function.board.domain.board.QBoard.*;
import static org.apache.commons.lang.StringUtils.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardSearchCondition;
import com.function.board.dto.board.QBoardListResponseDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public Page<BoardListResponseDto> searchPage(BoardSearchCondition condition, Pageable pageable) {
		List<BoardListResponseDto> content = queryFactory
			.select(new QBoardListResponseDto(board))
			.from(board)
			.where(titleContaining(condition.getTitle()),
				contentContaining(condition.getContent()),
				writerContaining(condition.getWriter()))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(board.createdAt.desc())
			.fetch();

		Long resultCount = queryFactory
			.select(board.count())
			.from(board)
			.where(titleContaining(condition.getTitle()),
				contentContaining(condition.getContent()),
				writerContaining(condition.getWriter()))
			.fetchOne();
		resultCount = (resultCount == null) ? 0 : resultCount;
		return new PageImpl<>(content, pageable, resultCount);
	}

	private BooleanExpression titleContaining(String title) {
		return isEmpty(title) ? null : board.title.contains(title);
	}

	private BooleanExpression contentContaining(String content) {
		return isEmpty(content) ? null : board.content.contains(content);
	}

	private BooleanExpression writerContaining(String writer) {
		return isEmpty(writer) ? null : board.writer.contains(writer);
	}

}
