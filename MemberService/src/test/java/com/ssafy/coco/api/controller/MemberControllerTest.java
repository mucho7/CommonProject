package com.ssafy.coco.api.controller;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ssafy.coco.api.members.data.Member;
import com.ssafy.coco.api.members.data.MemberRepository;
import com.ssafy.coco.api.members.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberUpdateRequestDto;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MemberControllerTest {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Autowired
	private MemberRepository memberRepository;

	@AfterEach
	public void tearDown() throws Exception {
		memberRepository.deleteAll();
	}

	private String testId = "test";
	private String testPw = "iamtestdata";
	private String testName = "나시험";
	private String testEmail = "test@ssafy.com";

	@Test
	public void memberRegisterTest() throws Exception {

		MemberRegisterRequestDto requestDto = MemberRegisterRequestDto.builder()
			.userId(testId)
			.password(testPw)
			.name(testName)
			.email(testEmail)
			.build();

		String url = "http://localhost:" + port + "/member";

		ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestDto, String.class);

		List<Member> all = memberRepository.findAll();

		assertThat(all.get(0).getUserId()).isEqualTo(testId);
		assertThat(all.get(0).getEmail()).isEqualTo(testEmail);
		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void memberUpdateTest() throws Exception {
		Member registeredMember = memberRepository.save(Member.builder()
			.userId(testId)
			.password(testPw)
			.email(testEmail)
			.name(testName)
			.build()
		);

		String targetId = registeredMember.getUserId();
		String expectedPassword = "";
		String expectedEmail = "test_na@ssafy.com";
		String expectedName = "나검사";

		MemberUpdateRequestDto requestDto = MemberUpdateRequestDto.builder()
			.email(expectedEmail)
			.password((expectedPassword != null && !expectedPassword.equals("") ? expectedPassword :
				registeredMember.getPassword()))
			.name(expectedName)
			.build();

		String url = "http://localhost:" + port + "/member/info" + targetId;

		HttpEntity<MemberUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

		ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		// assertThat(responseEntity.getBody()).isGreaterThan(0L);
		List<Member> all = memberRepository.findAll();
		assertThat(all.get(0).getEmail()).isEqualTo(expectedEmail);
		assertThat(all.get(0).getName()).isEqualTo(expectedName);
		assertThat(all.get(0).getPassword()).isEqualTo(registeredMember.getPassword());
		assertThat(all.get(0).getRoles().get(0)).isEqualTo("user");
	}

	@Test
	public void memberRatingUpdateTest() throws Exception {
		Member registeredMember = memberRepository.save(Member.builder()
			.userId(testId)
			.password(testPw)
			.email(testEmail)
			.name(testName)
			.build()
		);

		Integer amount = 12;

		String targetId = registeredMember.getUserId();

		MemberRatingUpdateRequestDto requestDto = MemberRatingUpdateRequestDto.builder()
			.userId(targetId)
			.amount(amount)
			.build();

		String url = "http://localhost:" + port + "/member/info/rating";

		HttpEntity<MemberRatingUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

		ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		List<Member> all = memberRepository.findAll();
		assertThat(all.get(0).getRating()).isEqualTo(amount);
	}
}
