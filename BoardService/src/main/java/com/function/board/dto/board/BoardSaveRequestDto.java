package com.function.board.dto.board;

import com.function.board.domain.board.Board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardSaveRequestDto {
	private String title;
	private String content;
	private String writer;
	private String code;

	@Builder
	public BoardSaveRequestDto(String title, String content, String writer, String code) {
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.code = code;
	}

	public Board toEntity() {
		return Board.builder()
			.title(title)
			.content(content)
			.writer(writer)
			.code(code)
			.build();
	}
}
