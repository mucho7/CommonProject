package com.function.session.api.dto.response;

import com.function.session.api.data.Room;

import lombok.Getter;

@Getter
public class RoomResponseDto {
	private Long roomId;
	private String hostId;
	private String title;
	private Integer hostRating;
	private String mode;
	private Integer numberUsers;
	private Integer max;

	public RoomResponseDto(Room entity) {
		this.roomId = entity.getRoomId();
		this.hostId = entity.getHostId();
		this.title = entity.getTitle();
		this.hostRating = entity.getHostRating();
		this.mode = entity.getMode();
		this.numberUsers = entity.getNumberUsers();
		this.max = entity.getMax();
	}
}
