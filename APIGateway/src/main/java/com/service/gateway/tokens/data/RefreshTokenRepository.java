package com.service.gateway.tokens.data;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByRefreshToken(String refreshToken);

	boolean existsByUserId(String userId);

	boolean existsByRefreshToken(String refreshToken);

	@Transactional
	void deleteByUserId(String userId);
}
