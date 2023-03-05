package com.ssafy.coco.api.members.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@ApiModel("검증 요청 사용자 ID")
public class ValidateRequestDto {
	private String userId;
}
