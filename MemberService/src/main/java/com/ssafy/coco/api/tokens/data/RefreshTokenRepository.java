package com.ssafy.coco.api.tokens.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByRefreshToken(String refreshToken);

	boolean existsByUserId(String userId);

	boolean existsByRefreshToken(String refreshToken);

	void deleteByUserId(String userId);

	void deleteByRefreshToken(String refreshToken);
}
