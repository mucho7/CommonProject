package com.function.board.dto.board;

import java.time.LocalDateTime;

import com.function.board.domain.board.Board;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BoardListResponseDto {
	private final Long id;
	private final String title;
	private final String writer;
	private final int commentCnt;
	private final int hit;
	private final LocalDateTime createdAt;

	@QueryProjection
	@Builder
	public BoardListResponseDto(Board entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.writer = entity.getWriter();
		this.commentCnt = entity.getComments().size();
		this.hit = entity.getHit();
		this.createdAt = entity.getCreatedAt();
	}

}
