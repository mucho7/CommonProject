package com.function.session.api.data;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roomId;
	@Column(length = 32, nullable = false)
	private String hostId;
	@Column(length = 45, nullable = false)
	private String title;
	@Column(length = 255)
	private String content;
	@ColumnDefault("0")
	private Integer hostRating;
	@CreationTimestamp
	private LocalDateTime startTime;
	@Column(length = 10, nullable = false)
	private String mode;
	@ColumnDefault("0")
	private Integer isLive;
	@ColumnDefault("0")
	private Integer numberUsers;
	@ColumnDefault("10")
	private Integer max;

	@Builder
	public Room(String hostId, String title, String content, Integer hostRating, String mode,
		Integer max) {
		this.hostId = hostId;
		this.title = title;
		this.content = content;
		this.hostRating = hostRating;
		this.mode = mode;
		this.max = max;
	}

	public void UpdateRoom(String title, String content, Integer max) {
		if (title != null && title.length() != 0) {
			this.title = title;
		}
		if (content != null && content.length() != 0) {
			this.content = content;
		}
		if (max != null) {
			this.max = max;
		}
	}

	public void UpdateRoomIsLive() {
		this.isLive = 1;
	}

	public void UpdateRoomNumberUsers(Integer amount) {
		this.numberUsers += amount;
	}
}
