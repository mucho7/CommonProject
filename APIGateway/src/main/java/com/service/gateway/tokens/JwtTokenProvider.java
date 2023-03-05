package com.service.gateway.tokens;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import com.service.gateway.member.data.MemberRepository;
import com.service.gateway.tokens.data.RefreshToken;
import com.service.gateway.tokens.data.RefreshTokenRepository;
import com.service.gateway.tokens.dto.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
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

	private int accessTokenValidTime = 1000 * 60 * 90; // AccessToken 유효시간. (단위: ms) DEFAULT: 90분, QA 및 디버깅: 30초

	private int refreshTokenValidTime = 1000 * 60 * 60 * 12; // RefreshToken 유효시간. (단위: ms) DEFAULT: 12시간, QA 및 디버깅: 5분

	private final MemberRepository memberRepository;

	private final RefreshTokenRepository refreshTokenRepository;

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

		// DB에 새로 발급받은 refreshToken 반영하는 부분
		updateRefreshTokenInRepository(userId, refreshToken);

		return JwtTokenDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.userId(userId)
			.build();
	}

	@Transactional
	void updateRefreshTokenInRepository(String userId, String newRefreshToken) {
		RefreshToken refreshTokenData = RefreshToken.builder()
			.userId(userId)
			.refreshToken(newRefreshToken)
			.build();
		if (refreshTokenRepository.existsByUserId(userId)) {
			log.info(userId + "의 기존 Refresh Token을 삭제합니다.");
			refreshTokenRepository.deleteByUserId(userId);
		}
		log.info(userId + "의 Refresh Token을 생성합니다.");
		refreshTokenRepository.save(refreshTokenData);
	}

	// RefreshToken에는 기본적으로 사용자 ID가 없음. 따라서 refreshToken Repository를 찾아서 사용자 ID를 가져오는 방식 사용.
	public String getUserIdFromRefreshToken(String refreshToken) {
		Optional<RefreshToken> refreshTokenDto = refreshTokenRepository.findByRefreshToken(refreshToken);

		return refreshTokenDto.map(RefreshToken::getUserId).orElse(null);
	}

	public List<String> getRoles(String userId) {
		return memberRepository.findByUserId(userId).get().getRoles();
	}

	public JwtTokenDto resolveToken(ServerHttpRequest request) {
		JwtTokenDto tokenDto = new JwtTokenDto();
		HttpHeaders requestHeader = request.getHeaders();
		tokenDto.setAccessToken(requestHeader.get("Authorization").get(0).substring(7));
		tokenDto.setRefreshToken(requestHeader.get("refreshToken").get(0).substring(7));
		if (!refreshTokenRepository.existsByRefreshToken(tokenDto.getRefreshToken())) {
			tokenDto = null;
		}
		System.out.println("[resolveToken@JwtTokenProvider]" + tokenDto);
		return tokenDto;
	}

	// 토큰 정보를 검증하는 메서드
	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(token);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (SecurityException | MalformedJwtException e) {
			log.info("유효하지 않은 Token !! -> " + token);
		} catch (ExpiredJwtException e) {
			log.info("만료된 Token !! -> " + token);
		} catch (UnsupportedJwtException e) {
			log.info("지원하지 않는 형식의 Token !! -> " + token);
		} catch (IllegalArgumentException e) {
			log.info("Token이 빈 문자열을 반환하였습니다 !! -> " + token);
		}
		return false;
	}

}
