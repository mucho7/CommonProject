package com.function.session.api.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.session.api.data.Room;
import com.function.session.api.dto.request.RoomRegisterRequestDto;
import com.function.session.api.dto.request.RoomUpdateRequestDto;
import com.function.session.api.dto.response.RoomDetailResponseDto;
import com.function.session.api.service.RoomService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/session")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
public class RoomController {
	@Autowired
	private RoomService roomService;

	@GetMapping
	@ApiOperation(value = "세션 방 목록 조회")
	public ResponseEntity<List<Room>> GetRoomList(@RequestParam String mode,
		@RequestParam(required = false) String hostId,
		@RequestParam(required = false) String title) {
		return ResponseEntity.ok(roomService.GetRoomList(mode, hostId, title));
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "세션 방 상세 보기")
	public ResponseEntity<RoomDetailResponseDto> GetRoom(@PathVariable Long id) {
		return ResponseEntity.ok(roomService.GetRoom(id));
	}

	@PostMapping
	@ApiOperation(value = "세션 방 생성")
	public ResponseEntity<?> RegisterRoom(@RequestBody RoomRegisterRequestDto requestDto) {
		return ResponseEntity.created(URI.create("/room/" + roomService.RegisterRoom(requestDto))).build();
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "세션 방 수정")
	public ResponseEntity<?> UpdateRoom(@PathVariable Long id, @RequestBody RoomUpdateRequestDto requestDto) {
		Room room = roomService.UpdateRoom(requestDto, id);
		if (room != null) {
			return ResponseEntity.ok(id);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/enter/{id}") // "/room/enter/{id}?userId={userId}"
	@ApiOperation(value = "세션 방 입장", notes = "- 호스트가 입장하면, is_live가 1이 된다.\n"
		+ "- 일반 사용자가 입장을 시도하면, (is_live == 1) && (참여자수 < max) 일때만 입장가능하다.\n"
		+ "- 참여자수 + 1")
	public ResponseEntity<?> UpdateRoomEnter(@PathVariable Long id, @RequestParam String userId) {
		Room room = roomService.UpdateRoomEnter(id, userId);
		if (room != null) {
			return ResponseEntity.ok(id);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/leave/{id}")
	@ApiOperation(value = "세션 방 나가기", notes = "참여자수 - 1")
	public ResponseEntity<?> UpdateRoomLeave(@PathVariable Long id) {
		Room room = roomService.UpdateRoomLeave(id);
		if (room != null) {
			return ResponseEntity.ok(id);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "세션 방 삭제")
	public ResponseEntity<?> DeleteRoom(@PathVariable Long id) {
		Room room = roomService.DeleteRoom(id);
		if (room != null) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
