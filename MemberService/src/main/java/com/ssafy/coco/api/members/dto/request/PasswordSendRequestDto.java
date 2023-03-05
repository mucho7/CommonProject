package com.ssafy.coco.api.members.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@ApiModel("임시 비밀번호 메일 요청 정보")
public class PasswordSendRequestDto {
	private String userId;
	private String email;
}
