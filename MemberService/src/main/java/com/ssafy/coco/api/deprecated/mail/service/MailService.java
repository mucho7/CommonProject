package com.ssafy.coco.api.deprecated.mail.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.ssafy.coco.api.deprecated.mail.dto.MailDto;
import com.ssafy.coco.api.members.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MailService {

	private final MailSender mailSender;
	private final MemberService memberService;

	@Value("${spring.mail.username}")
	String mailAuthor;

	/**
	 * 이메일로 임시 비밀번호를 보내기 위해 만들어 둔 메서드이지만,
	 * 프로젝트의 개발 방향이 중간에 바뀌게 됨에 따라 추후 사용을 위해 만들어두기만 한 코드.
	 * @param userId 비밀번호를 재설정할 사용자 ID
	 * @param email 사용자임을 증명하기 위해 가입한 ID와 이메일 정보가 일치하는지 확인 및 임시 비밀번호 메일의 받는사람 주소.
	 * @return 생성된 임시 비밀번호 메일 Data Transfer Object
	 */
	public MailDto createMailAndMakeTempPassword(String userId, String email) {
		String tempPassword = memberService.makeTempPassword();
		MailDto mailDto = new MailDto();
		mailDto.setAddress(email);
		mailDto.setTitle("[CoCo] 임시 비밀번호가 발급되었습니다.");
		mailDto.setMessage(
			"안녕하세요. CoCo입니다. \n" + userId + "님의 임시 비밀번호는 [ " + tempPassword
				+ " ] 입니다. \n\n임시 비밀번호로 로그인 후 반드시 비밀번호를 변경해주세요.");
		memberService.updatePassword(userId, tempPassword);
		return mailDto;
	}

	public void sendMail(MailDto mailDto) {

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mailDto.getAddress());
		message.setSubject(mailDto.getTitle());
		message.setText(mailDto.getMessage());
		message.setFrom(mailAuthor);
		System.out.println("보낸 메일 정보: " + message);
		mailSender.send(message);
	}
}
