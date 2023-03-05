package com.ssafy.coco.api.members.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class MemberUpdateRequestDto {
	private String name;
	private String email;
}
