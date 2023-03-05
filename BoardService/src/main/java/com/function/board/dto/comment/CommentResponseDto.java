package com.function.board.dto.comment;

import java.time.LocalDateTime;

import com.function.board.domain.comment.Comment;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentResponseDto {
	private final Long id;
	private final String content;
	private final String writer;
	private final LocalDateTime createdAt;

	@Builder
	public CommentResponseDto(Comment entity) {
		this.id = entity.getId();
		this.content = entity.getContent();
		this.writer = entity.getWriter();
		this.createdAt = entity.getCreatedAt();
	}
}
