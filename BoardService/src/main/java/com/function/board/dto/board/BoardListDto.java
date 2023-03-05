package com.function.board.dto.board;

import java.time.LocalDateTime;

import org.springframework.core.io.Resource;

import com.function.board.domain.board.Board;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardListDto {
	private final Long id;
	private final String title;
	private final String writer;
	private final int commentCnt;
	private final int hit;
	private final LocalDateTime createdAt;
	private Resource img;

	@QueryProjection
	@Builder
	public BoardListDto(Board entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.writer = entity.getWriter();
		this.commentCnt = entity.getComments().size();
		this.hit = entity.getHit();
		this.createdAt = entity.getCreatedAt();
		this.img = null;
	}

}
