package com.function.session.api.dto.request;

import com.function.session.api.data.Room;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomRegisterRequestDto {
	private String hostId;
	private String title;
	private String content;
	private Integer hostRating;
	private String mode;
	private Integer max;

	@Builder
	public RoomRegisterRequestDto(String hostId, String title, String content, Integer hostRating,
		String mode, Integer max) {
		this.hostId = hostId;
		this.title = title;
		this.content = content;
		this.hostRating = hostRating;
		this.mode = mode;
		this.max = max;
	}

	public Room toEntity() {
		return Room.builder()
			.hostId(hostId)
			.title(title)
			.content(content)
			.hostRating(hostRating)
			.mode(mode)
			.max(max)
			.build();
	}
}
