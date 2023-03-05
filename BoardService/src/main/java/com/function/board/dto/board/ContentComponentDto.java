package com.function.board.dto.board;

import java.util.List;

import lombok.Data;

@Data
public class ContentComponentDto {

	private List<String> content;
	private int startIndex;
	private int endIndex;

}
