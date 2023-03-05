package com.ssafy.coco.api.members.dto.request;

import java.util.Collections;

import com.ssafy.coco.api.members.data.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MemberRegisterRequestDto {
	private String userId;
	private String password;
	private String name;
	private String email;

	public Member toEntity() {
		return Member.builder()
			.userId(userId)
			.password(password)
			.name(name)
			.email(email)
			.roles(Collections.singletonList("ROLE_USER"))
			.build();
	}
}
