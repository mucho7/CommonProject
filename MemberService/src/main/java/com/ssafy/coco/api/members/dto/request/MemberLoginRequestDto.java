package com.ssafy.coco.api.members.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("사용자 로그인 요청 정보")
public class MemberLoginRequestDto {
	@ApiModelProperty(name = "사용자 ID")
	private String userId;

	@ApiModelProperty(name = "암호화된 사용자 Password")
	private String password;
}
