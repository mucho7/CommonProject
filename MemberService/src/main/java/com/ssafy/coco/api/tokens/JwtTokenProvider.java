package com.ssafy.coco.api.tokens;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	/** ===== 레퍼런스 =====
	 * Spring Security & Jwt 로그인 적용하기
	 * https://velog.io/@jkijki12/Spirng-Security-Jwt-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
	 *
	 * jwt refresh token 적용기
	 * https://velog.io/@jkijki12/Jwt-Refresh-Token-%EC%A0%81%EC%9A%A9%EA%B8%B0
	 *
	 * https://velog.io/@solchan/%EB%B0%B1%EC%97%85-Refresh-Token-%EB%B0%9C%EA%B8%89%EA%B3%BC-Access-Token-%EC%9E%AC%EB%B0%9C%EA%B8%89
	 */

	@Value("${jwt.secret}")
	private String uniqueKey;

	private int accessTokenValidTime = 1000 * 60 * 90; // AccessToken 유효시간 : 90분 -> QA 테스트시 30초
	private int refreshTokenValidTime = 1000 * 60 * 60 * 12; // RefreshToken 유효시간 : 12시간 -> QA 테스트시 5분

	@PostConstruct
	protected void init() {
		uniqueKey = Base64.getEncoder().encodeToString(uniqueKey.getBytes());
	}

	// 유저 정보를 토대로 AccessToken, RefreshToken을 생성하는 메서드
	public JwtTokenDto createToken(String userId, List<String> roles) {
		Claims claims = Jwts.claims().setSubject(userId);
		claims.put("roles", roles);

		Date now = new Date();

		// Access Token 생성
		String accessToken = Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + accessTokenValidTime)) // Access Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		// Refresh Token 생성
		String refreshToken = Jwts.builder()
			.setExpiration(new Date(now.getTime() + refreshTokenValidTime)) // Refresh Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		return JwtTokenDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.userId(userId)
			.build();

	}

	// Jwt 토큰에서 회원 ID 추출
	public String getUserIdFromAccessToken(String token) {
		return Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(token).getBody().getSubject();
	}

}
