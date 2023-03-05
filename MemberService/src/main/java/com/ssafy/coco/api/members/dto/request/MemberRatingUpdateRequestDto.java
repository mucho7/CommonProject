package com.ssafy.coco.api.members.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MemberRatingUpdateRequestDto {
	private String userId;
	private Integer amount;

}
