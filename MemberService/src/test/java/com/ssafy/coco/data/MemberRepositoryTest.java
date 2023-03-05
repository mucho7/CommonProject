package com.ssafy.coco.data;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ssafy.coco.api.members.data.Member;
import com.ssafy.coco.api.members.data.MemberRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MemberRepositoryTest {
	@Autowired
	MemberRepository memberRepository;

	@AfterEach
	public void cleanup() {
		memberRepository.deleteAll();
	}

	// 아래 테스트 값은 자신이 DB에 넣고자 하는 값과 데이터 타입에 따라 유동적으로 수정해서 넣으시면 됩니다.
	private String testId = "test";
	private String testPw = "iamtestdata";
	private String testName = "나시험";
	private String testEmail = "test@ssafy.com";

	@Test
	public void SignInTest() {

		memberRepository.save(Member.builder()
			.userId(testId)
			.password(testPw)
			.name(testName)
			.email(testEmail)
			.build()
		);

		List<Member> all = memberRepository.findAll();

		Member member = all.get(0);

		assertThat(member.getUserId()).isEqualTo(testId);
	}

}
