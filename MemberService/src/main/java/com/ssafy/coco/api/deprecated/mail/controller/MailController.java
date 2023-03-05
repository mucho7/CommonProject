package com.ssafy.coco.api.deprecated.mail.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.deprecated.mail.dto.MailDto;
import com.ssafy.coco.api.deprecated.mail.service.MailService;
import com.ssafy.coco.api.members.dto.request.PasswordSendRequestDto;
import com.ssafy.coco.api.members.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "[개발취소] 임시 비밀번호 발급 메일 API")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class MailController {

	private final MemberService memberService;
	private final MailService mailService;

	/**
	 * 만들어두긴 했으나, 내부 네트워크 환경에서 smtp 서버에 연결 불가로 인해 적극적인 개발이 불가능한 상황.
	 * 따라서 개발 방향을 변경하여 팝업이나 인페이지 방식으로 임시 비밀번호를 사용자에게 제공.
	 * 추후 사용을 위해 남겨두긴 하겠지만, 현재 프로젝트에서는 사용하지 않는 API.
	 */
	@PostMapping("/sendMail")
	public String sendPassword(
		@RequestBody @ApiParam(value = "임시 비밀번호 발급 요청 정보", required = true) PasswordSendRequestDto requestDto) {

		String userId = requestDto.getUserId();
		String email = requestDto.getEmail();

		boolean isAvaliable = memberService.existUserByIdAndEmail(userId, email);

		if (isAvaliable) {
			MailDto mailDto = mailService.createMailAndMakeTempPassword(userId, email);
			mailService.sendMail(mailDto);
			return "입력하신 이메일로 임시 비밀번호를 보내드렸습니다.";
		} else {
			return "입력한 정보에 해당하는 사용자가 없습니다.";
		}
	}
}
