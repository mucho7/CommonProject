package com.function.session.api.service;

import static org.springframework.data.domain.Sort.Order.*;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.function.session.api.data.Room;
import com.function.session.api.data.RoomRepository;
import com.function.session.api.dto.request.RoomRegisterRequestDto;
import com.function.session.api.dto.request.RoomUpdateRequestDto;
import com.function.session.api.dto.response.RoomDetailResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {
	private final RoomRepository roomRepository;

	public List<Room> GetRoomList(String mode, String hostId, String title) {
		Specification<Room> spec = Specification.where(RoomSpecification.equalMode(mode));

		if (hostId != null && hostId.length() != 0) {
			spec = spec.and(RoomSpecification.equalHostId(hostId));
		}
		if (title != null && title.length() != 0) {
			spec = spec.and(RoomSpecification.likeTitle(title));
		}
		return roomRepository.findAll(spec, Sort.by(desc("hostRating")));
	}

	public RoomDetailResponseDto GetRoom(Long roomId) {
		Room room = roomRepository.findById(roomId)
			.orElseThrow(() -> new IllegalArgumentException("해당 방은 없습니다. 방 ID: " + roomId)); // error code: 500
		return new RoomDetailResponseDto(room);
	}

	@Transactional
	public Long RegisterRoom(RoomRegisterRequestDto requestDto) {
		return roomRepository.save(requestDto.toEntity()).getRoomId();
	}

	@Transactional
	public Room UpdateRoom(RoomUpdateRequestDto requestDto, Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null) {
			room.UpdateRoom(requestDto.getTitle(), requestDto.getContent(), requestDto.getMax());
		}
		return room;
	}

	@Transactional
	public Room UpdateRoomEnter(Long roomId, String userId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null) {
			//
			if (room.getIsLive() == 0) { // 아직 호스트 입장 전
				if (room.getHostId().equals(userId)) { // 호스트가 방에 입장할 때
					room.UpdateRoomIsLive();
					room.UpdateRoomNumberUsers(1);
				} else {
					throw new IllegalArgumentException("호스트가 아직 입장하지 않았습니다.");
				}
			} else {
				if (room.getNumberUsers() >= room.getMax()) {
					throw new IllegalArgumentException("꽉 찬 방입니다. 최대 참여자 수: " + room.getMax());
				} else { // 입장하기
					room.UpdateRoomNumberUsers(1);
				}
			}
			//
			// if (room.getHostId().equals(userId)) { // 호스트가 방에 입장할 때
			// 	room.UpdateRoomIsLive();
			// 	room.UpdateRoomNumberUsers(1);
			// } else { // 일반 사용자가 방에 입장할 때
			// 	if (room.getNumberUsers() >= room.getMax()) {
			// 		throw new IllegalArgumentException("꽉 찬 방입니다. 최대 참여자 수: " + room.getMax());
			// 	} else if (room.getIsLive() == 0) {
			// 		throw new IllegalArgumentException("호스트가 아직 입장하지 않았습니다.");
			// 	} else { // 입장하기
			// 		room.UpdateRoomNumberUsers(1);
			// 	}
			// }
		}
		return room;
	}

	@Transactional
	public Room UpdateRoomLeave(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null) {
			room.UpdateRoomNumberUsers(-1);
		}
		return room;
	}

	@Transactional
	public Room DeleteRoom(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null) {
			roomRepository.deleteById(roomId);
		}
		return room;
	}

}
