package com.ssafy.coco.api.tokens.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.coco.api.tokens.JwtTokenProvider;
import com.ssafy.coco.api.tokens.data.RefreshToken;
import com.ssafy.coco.api.tokens.data.RefreshTokenRepository;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtTokenService {

	private final JwtTokenProvider jwtTokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;

	@Transactional
	public JwtTokenDto login(String userId, List<String> roles) {
		JwtTokenDto tokenDto = jwtTokenProvider.createToken(userId, roles);
		log.info("로그인 과정에서 생성된 JwtTokenDto: " + tokenDto);
		RefreshToken refreshToken = RefreshToken.builder()
			.userId(userId)
			.refreshToken(tokenDto.getRefreshToken())
			.build();
		String requestUserId = refreshToken.getUserId();
		if (refreshTokenRepository.existsByUserId(requestUserId)) {
			log.info(requestUserId + "의 기존 Refresh Token을 삭제합니다.");
			refreshTokenRepository.deleteByUserId(requestUserId);
		}
		log.info(requestUserId + "의 Refresh Token을 생성합니다.");
		refreshTokenRepository.save(refreshToken);
		return tokenDto;
	}

	@Transactional
	public boolean logout(String refreshToken) {
		if (refreshToken.startsWith("bearer ")) {
			refreshToken = refreshToken.substring(7);
		}
		if (refreshTokenRepository.existsByRefreshToken(refreshToken)) {
			log.info("DB에서 refresh 토큰 조회에 성공했습니다. " + refreshToken);
			refreshTokenRepository.deleteByRefreshToken(refreshToken);
			return true;
		} else {
			log.info("DB에서 refreshToken 조회에 실패했습니다.");
		}
		return false;
	}

	public boolean validateRequest(String userId, String accessToken) {
		String extractedId = jwtTokenProvider.getUserIdFromAccessToken(accessToken);
		System.out.println("[validateRequest@JwtTokenService]Id: " + userId + ", extractedId: " + extractedId);
		return extractedId.equals(userId);
	}

	public String getUserIdFromAccessToken(String accessToken) {
		return jwtTokenProvider.getUserIdFromAccessToken(accessToken);
	}
}