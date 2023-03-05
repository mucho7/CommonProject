package com.function.board.dto.board;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RefinedBoardDto {

	private List<ContentComponentDto> content;
	private String code;

}
