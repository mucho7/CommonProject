package com.ssafy.coco.api.members.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.coco.api.members.data.Member;

import lombok.Getter;

@Getter
public class MemberResponseDto {

	private String id;
	private String name;
	private String email;
	private List<String> roles;
	private Integer rating;
	private LocalDateTime regTime;
	private LocalDateTime delFlag;

	public MemberResponseDto(Member entity) {
		this.id = entity.getUserId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.rating = entity.getRating();
		this.roles = entity.getRoles();
		this.regTime = entity.getRegTime();
		this.delFlag = entity.getDelFlag();
	}
}
