package com.function.board.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.function.board.dto.comment.CommentResponseDto;
import com.function.board.dto.comment.CommentSaveRequestDto;
import com.function.board.dto.comment.CommentUpdateRequestDto;
import com.function.board.service.CommentService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	@ApiOperation(value = "댓글 생성")
	@PostMapping("/{board_id}")
	public ResponseEntity<Long> save(@PathVariable("board_id") Long boardId, @RequestBody CommentSaveRequestDto requestDto) {
		commentService.save(boardId, requestDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "{comment_id}에 해당하는 댓글 단건 조회")
	@GetMapping("/{comment_id}")
	public ResponseEntity<CommentResponseDto> findById(@PathVariable("comment_id") Long commentId) {
		return ResponseEntity.ok(commentService.findById(commentId));
	}

	@ApiOperation(value = "댓글 수정")
	@PutMapping("/{comment_id}")
	public ResponseEntity<Long> update(@PathVariable("comment_id") Long commentId,
		@RequestBody CommentUpdateRequestDto requestDto) {
		return ResponseEntity.ok(commentService.update(commentId, requestDto));
	}

	@ApiOperation(value = "댓글 삭제")
	@DeleteMapping("/{comment_id}")
	public void delete(@PathVariable("comment_id") Long commentId) {
		commentService.delete(commentId);
	}

}
