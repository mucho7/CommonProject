package com.function.board.dto.board;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

import com.function.board.domain.board.Board;
import com.function.board.domain.comment.Comment;
import com.function.board.dto.comment.CommentResponseDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardDetailTransferDto {

	private Long id;
	private String title;
	private List<ContentComponentDto> content;
	private String rawContent;
	private String writer;
	private int hit;
	private String code;
	private Page<CommentResponseDto> comments;
	private LocalDateTime createdAt;

	@Builder
	public BoardDetailTransferDto(Board entity, RefinedBoardDto dto, Page<Comment> comments) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = dto.getContent();
		this.rawContent = entity.getContent();
		this.writer = entity.getWriter();
		this.hit = entity.getHit();
		this.code = dto.getCode();
		this.createdAt = entity.getCreatedAt();
		this.comments = comments.map(CommentResponseDto::new);
	}

}
