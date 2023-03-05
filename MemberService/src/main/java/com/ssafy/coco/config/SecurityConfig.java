package com.ssafy.coco.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	/**
	 * ===== Spring Security 설정 관련 레퍼런스 링크 =====
	 *
	 * 1. CustomFilter를 이용한 인증 구현
	 * https://kimchanjung.github.io/programming/2020/07/02/spring-security-02/
	 *
	 * 2. 403 Forbidden이 뜰 때 설정
	 * https://ruzun88.github.io/spring/security/403-forbidden.html#config-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC-%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5
	 *
	 * 3. REST Api 설정
	 * https://sybarits.github.io/2020/11/08/rest-api-security.html
	 */

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.httpBasic()
			.disable()
			.csrf()
			.disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.logout()
			.logoutUrl("/logout")
			.logoutSuccessUrl("/") // Front와 연동 성공시 로그아웃 이후 연결 페이지 합의 볼 것.
			.invalidateHttpSession(true);
		// .and()
		// Access Token이 만료된 경우 ContextHolder에서 권한을 찾아 해당 요청에 대해서만 접근을 허용해줘야 하기 때문에 Filter를 완전히 제거할 수는 없음 (addFilterBefore 제거하지 말것!)
		// .addFilterBefore(UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
