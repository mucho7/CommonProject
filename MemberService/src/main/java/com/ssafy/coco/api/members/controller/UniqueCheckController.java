package com.ssafy.coco.api.members.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.members.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "중복 검사 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/check")
public class UniqueCheckController {

	private final MemberService memberService;

	@GetMapping("/id/{id}")
	@ApiOperation(value = "ID 중복 검사", notes = "{id}를 사용할 수 있는지 검사한다. 사용가능: true, 불가: false")
	public ResponseEntity idCheck(
		@PathVariable("id") @ApiParam(value = "중복 검사할 ID", required = true) String id) {
		boolean canUseId = memberService.idCheck(id);
		return ResponseEntity.ok(canUseId);
	}

	@GetMapping("/email/{email}")
	@ApiOperation(value = "이메일 중복 검사", notes = "{email}을 사용할 수 있는지 검사한다. 사용가능: true, 불가: false")
	public ResponseEntity<Boolean> emailCheck(
		@PathVariable("email") @ApiParam(value = "중복 검사할 Email", required = true) String email) {
		boolean canUseEmail = memberService.emailCheck(email);
		return ResponseEntity.ok(canUseEmail);
	}
}
