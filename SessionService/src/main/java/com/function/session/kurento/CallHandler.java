/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.function.session.kurento;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.kurento.client.IceCandidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.function.session.api.service.RoomService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

// import sun.tools.jconsole.JConsole;

/**
 *
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class CallHandler extends TextWebSocketHandler {

	private static final Logger log = LoggerFactory.getLogger(CallHandler.class);

	private static final Gson gson = new GsonBuilder().create();

	@Autowired
	private RoomManager roomManager;

	@Autowired
	private UserRegistry registry;

	@Autowired
	private RoomService roomService; // 호스트가 나가면 해당 룸 DB에서 삭제하기 위함, 일반 사용자 나가면 인원수-- 하기 위함.

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		final JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

		final UserSession user = registry.getBySession(session);

		if (user != null) {
			log.debug("Incoming message from user '{}': {}", user.getName(), jsonMessage);
		} else {
			log.debug("Incoming message from new user: {}", jsonMessage);
		}

		switch (jsonMessage.get("id").getAsString()) {
			case "joinRoom":
				joinRoom(jsonMessage, session);
				break;
			case "receiveVideoFrom":
				final String senderName = jsonMessage.get("sender").getAsString();
				final UserSession sender = registry.getByName(senderName);
				final String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
				user.receiveVideoFrom(sender, sdpOffer);
				break;
			// case "leaveRoom":
			// 	leaveRoom(user);
			// 	break;
			case "onIceCandidate":
				JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();

				if (user != null) {
					IceCandidate cand = new IceCandidate(candidate.get("candidate").getAsString(),
						candidate.get("sdpMid").getAsString(), candidate.get("sdpMLineIndex").getAsInt());
					user.addCandidate(cand, jsonMessage.get("name").getAsString());
				}
				break;
			case "sendChat":
				sendChat(jsonMessage);
				break;
			case "sendImageData":
				sendImageData(jsonMessage);
				break;
			case "toggleAuthorization":
				controlAuthorization(jsonMessage);
				break;
			case "startRelay":
				startReading(user);
				break;
			case "endReading":
				announceUserTurn(jsonMessage.get("roomName").getAsString(), 0);
				break;
			case "endMyTurn":
				announceUserTurn(jsonMessage.get("roomName").getAsString(), jsonMessage.get("index").getAsInt());
				break;
			default:
				break;
		}
	}

	private void sendChat(JsonObject params) throws Exception {
		final String roomName = params.get("roomName").getAsString();
		final String userName = params.get("userName").getAsString();

		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);

		final JsonObject chat = new JsonObject();
		chat.addProperty("id", "noticeChat");
		chat.addProperty("userName", userName);
		chat.addProperty("chat", params.get("chat").getAsString());
		emitMessage(participantsList, chat);
	}

	private void sendImageData(JsonObject params) throws Exception {
		final UserSession user = registry.getByName(params.get("userName").getAsString());
		final List<UserSession> participantsList = roomManager.getRoom(user.getRoomName()).getParticipantsList(user);
		emitMessage(participantsList, params);
	}

	private void controlAuthorization(JsonObject params) throws Exception {
		final String userName = params.get("userName").getAsString();
		final List<UserSession> participantsList = roomManager.getRoom(registry.getByName(userName).getRoomName())
			.getParticipantsList(null);
		emitMessage(participantsList, params);
	}

	private Map<String, List<UserSession>> relayCodingOrder = new HashMap<>();

	private void startReading(UserSession user) throws Exception {
		final String roomName = user.getRoomName();
		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);

		Collections.shuffle(participantsList); // 랜덤으로 순서 재배치
		relayCodingOrder.put(roomName, participantsList);

		final JsonObject message = new JsonObject();
		message.addProperty("id", "startReading");
		emitMessage(participantsList, message);
	}

	// private void startCoding(JsonObject params) throws Exception {
	// 	final String roomName = params.get("roomName").getAsString();
	// 	// final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);
	//
	// 	// Collections.shuffle(participantsList); // 랜덤으로 순서 재배치
	// 	//
	// 	// relayCodingOrder.put(roomName, participantsList);
	//
	// 	announceUserTurn(roomName, 0);
	// }

	private void announceUserTurn(String roomName, int index) throws Exception {
		final List<UserSession> order = relayCodingOrder.get(roomName);
		final List<UserSession> participantsList = roomManager.getRoom(roomName).getParticipantsList(null);
		final int size = order.size();

		String nowName = null;
		for (int i = index; i < size; i++) {
			nowName = order.get(i).getName();
			if (registry.getByName(nowName) != null) {
				break;
			}
			index = i + 1;
		}

		if (index == size) {
			final JsonObject message = new JsonObject();
			message.addProperty("id", "endRelay");
			emitMessage(participantsList, message);

			relayCodingOrder.remove(roomName);
		} else {
			// UserSession user = order.get(index);
			// String nowName = user.getName();
			String nextName;

			if (index + 1 == size) {
				nextName = "마지막 순서";
			} else {
				nextName = order.get(index + 1).getName();
			}
			// 참여자들에게 지금 차례, 다음 차례 사람 정보 알리기
			final JsonObject message = new JsonObject();
			message.addProperty("id", "relayCoding");
			message.addProperty("index", index);
			message.addProperty("now", nowName);
			message.addProperty("next", nextName);
			emitMessage(participantsList, message);
			// // 지금 차례인 사용자에게 알리기
			// final JsonObject yourTurnMessage = new JsonObject();
			// yourTurnMessage.addProperty("id", "yourTurn");
			// yourTurnMessage.addProperty("index", index);
			// user.sendMessage(yourTurnMessage);
		}

	}

	private void announceHostLeft(String roomName, UserSession host) throws Exception {
		final List<UserSession> participantsList = roomManager.getRoom(roomName)
			.getParticipantsList(host);

		final JsonObject message = new JsonObject();
		message.addProperty("id", "leaveByHost");
		emitMessage(participantsList, message);
	}

	private void emitMessage(List<UserSession> users, JsonObject message) throws IOException {
		for (final UserSession user : users) {
			user.sendMessage(message);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// UserSession user = registry.removeBySession(session);
		// roomManager.getRoom(user.getRoomName()).leave(user);

		System.out.println("...After Connection Closed..."); //

		// // Ver 1.
		// UserSession user = registry.removeBySession(session);
		// final String roomName = user.getRoomName();
		// final String userName = user.getName();
		// // if (userName.equals(roomName)) { // 호스트가 나가면
		// if (userName.equals("host")) { // 호스트가 나가면
		// 	announceHostLeft(roomName, user);
		// 	// roomService.DeleteRoom(roomName);
		// }
		// roomManager.getRoom(roomName).leave(user);

		// Ver.2: leaveRoom + afterConnectionClosed
		UserSession user = registry.removeBySession(session);
		final String roomName = user.getRoomName();
		final String userName = user.getName();
		final Room room = roomManager.getRoom(roomName);
		final String hostName = room.getHostName();
		room.leave(user);
		if (room.getParticipants().isEmpty()) {
			roomManager.removeRoom(room);
		}
		// 인원수 - 1
		if (hostName != null) {
			roomService.UpdateRoomLeave(Long.parseLong(roomName));
		}
		// 호스트가 나갔다면, 해당 방 삭제하고 모두 나가기
		if (userName.equals(hostName)) {
			room.setHostName(null);
			System.out.println("...DB에서 해당 방 삭제하기, 방이름: " + roomName);
			if (roomService.DeleteRoom(Long.parseLong(roomName)) == null) {
				System.out.println("...삭제 실패: 해당 룸 없음...");
			}
			announceHostLeft(roomName, null);
		}
	}

	private void joinRoom(JsonObject params, WebSocketSession session) throws IOException {
		final String roomName = params.get("room").getAsString();
		final String name = params.get("name").getAsString();

		log.info("PARTICIPANT {}: trying to join room {}", name, roomName);

		Room room = roomManager.getRoom(roomName, name); // 수정 2023.02.13.
		final UserSession user = room.join(name, session);
		registry.register(user);

	}

	private void leaveRoom(UserSession user) throws IOException {
		System.out.println("...Leave Room..."); //
		final Room room = roomManager.getRoom(user.getRoomName());
		room.leave(user);
		if (room.getParticipants().isEmpty()) {
			roomManager.removeRoom(room);
		}
	}
}
