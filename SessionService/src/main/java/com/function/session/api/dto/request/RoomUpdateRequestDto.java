package com.function.session.api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomUpdateRequestDto {
	private String title;
	private String content;
	private Integer max;

	@Builder
	public RoomUpdateRequestDto(String title, String content, Integer max) {
		this.title = title;
		this.content = content;
		this.max = max;
	}
}
