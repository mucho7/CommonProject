package com.ssafy.coco.api.tokens.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JwtTokenDto {

	private String accessToken;
	private String refreshToken;
	private String userId;

}
