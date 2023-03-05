package com.ssafy.coco.api.members.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.members.dto.request.MemberLoginRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.PasswordChangeRequestDto;
import com.ssafy.coco.api.members.dto.request.PasswordSendRequestDto;
import com.ssafy.coco.api.members.dto.response.MemberResponseDto;
import com.ssafy.coco.api.members.service.MemberService;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "회원 관리 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {

	private final MemberService memberService;

	// CI/CD 정상 동작 테스트를 위한 메서드. 및 URI
	@ApiOperation(value = "Hello", notes = "CI/CD 정상 동작 테스트를 위한 API")
	@GetMapping("/hello")
	public String hello() {
		return "member";
	}

	@PostMapping("/register")
	@ApiOperation(value = "회원 가입", notes = "넘겨받은 회원정보를 바탕으로 회원을 DB에 등록한다.")
	public ResponseEntity registerMember(
		@RequestBody @ApiParam(value = "회원가입 정보", required = true) MemberRegisterRequestDto requestDto) {
		return ResponseEntity.ok(memberService.registerMember(requestDto));
	}

	@PutMapping("/info/{id}")
	@ApiOperation(value = "정보 변경", notes = "갱신된 사용자 정보를 {id}를 PK로 가지는 레코드에 적용한다.")
	public ResponseEntity updateMember(
		@PathVariable @ApiParam(value = "회원정보를 수정할 사용자의 {id}", required = true) String id,
		@RequestBody @ApiParam(value = "수정할 내용이 담긴 데이터 객체", required = true) MemberUpdateRequestDto requestDto,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		String updatedUserId = memberService.updateInfo(id, requestDto, accessToken);
		if (updatedUserId == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(id + " 사용자의 수정 권한이 없는 사용자입니다.");
		}
		return ResponseEntity.ok(updatedUserId);
	}

	@GetMapping("/info/{id}")
	@ApiOperation(value = "정보 조회", notes = "{id}에 해당하는 사용자 정보를 DB에서 가져온다.")
	public ResponseEntity findById(@PathVariable @ApiParam(value = "회원정보를 조회할 사용자의 {id}", required = true) String id) {
		MemberResponseDto member = memberService.findByUserId(id);
		if (member.getDelFlag() != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("탈퇴한 사용자입니다.");
		} else {
			return ResponseEntity.ok(member);
		}
	}

	@PostMapping("/delete/{id}")
	@ApiOperation(value = "회원 탈퇴", notes = "{id}의 사용자 정보에 탈퇴일(del_flag)을 기록한다.")
	public ResponseEntity deleteMember(@PathVariable @ApiParam(value = "탈퇴할 회원 ID", required = true) String id,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		String refreshToken = request.getHeader("refreshToken").substring(7);
		String changedId = memberService.deleteMember(id, accessToken, refreshToken);
		if (changedId == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없는 사용자입니다.");
		} else {
			return ResponseEntity.ok(changedId);
		}
	}

	@PutMapping("/rating")
	@ApiOperation(value = "평판 점수 변경", notes = "사용자의 평판점수를 변경한다.")
	public String ratingUpdate(
		@RequestBody @ApiParam(value = "평판점수 변경 요청 정보", required = true) MemberRatingUpdateRequestDto requestDto) {
		return memberService.ratingUpdate(requestDto);
	}

	@PostMapping("/tempPassword")
	@ApiOperation(value = "임시 비밀번호 발급 API", notes = "비밀번호를 재설정하려는 ID와 이메일을 받아 회원 본인인지 확인하고, 맞다면 8자 구성의 임시 비밀번호를 반환한다.")
	public String getTempPassword(
		@RequestBody @ApiParam(value = "임시 비밀번호 발급 요청 정보", required = true) PasswordSendRequestDto requestDto) {
		String userId = requestDto.getUserId();
		String userEmail = requestDto.getEmail();

		boolean isValidInformation = memberService.existUserByIdAndEmail(userId, userEmail);

		if (isValidInformation) {
			String tempPassword = memberService.getTmpPassword(userId);
			return tempPassword != null ? userId + " 님의 임시 비밀번호는 [ " + tempPassword + " ] 입니다." :
				userId + " 회원님은 탈퇴한 회원입니다.";
		} else {
			return "입력하신 정보에 일치하는 회원이 없습니다.";
		}
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "ID와 암호화된 PW가 DB에 있는 정보와 일치하는 경우 로그인을 승인한다.")
	public ResponseEntity login(
		@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) MemberLoginRequestDto requestDto,
		HttpServletResponse response) {
		String userId = requestDto.getUserId();
		String password = requestDto.getPassword();

		JwtTokenDto jwtToken = memberService.login(userId, password);

		if (jwtToken != null) {
			response.setHeader("Authorization", "bearer " + jwtToken.getAccessToken());
			response.setHeader("refreshToken", "bearer " + jwtToken.getRefreshToken());
			return ResponseEntity.ok("로그인 성공");
		}

		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ID 비밀번호를 다시 확인하세요.");
	}

	@PostMapping("/logout")
	@ApiOperation(value = "로그아웃", notes = "Http 헤더로부터 refreshToken을 추출하여 DB에서 삭제 한다.")
	public ResponseEntity logout(HttpServletRequest request) {
		String refreshToken = request.getHeader("refreshToken");
		if (refreshToken != null) {
			if (memberService.logout(refreshToken)) {
				return ResponseEntity.ok("정상적으로 로그아웃되었습니다.");
			} else {
				return ResponseEntity.accepted().body("refreshToken DB에는 현재 세션에 대한 리프레시 토큰이 없습니다.\n강제 로그아웃 합니다.");
			}
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 중인 세션이 아닙니다.");
	}

	@PostMapping("/changePassword")
	@ApiOperation(value = "비밀번호 변경", notes = "Request Header의 AccessToken으로부터 사용자 ID를 추출하여 해당 사용자의 비밀번호를 변경한다.")
	public ResponseEntity changePassword(
		@RequestBody @ApiParam(value = "새로운 비밀번호", required = true) PasswordChangeRequestDto requestDto,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		return ResponseEntity.ok(memberService.changePassword(accessToken, requestDto.getNewPassword()));
	}

}
