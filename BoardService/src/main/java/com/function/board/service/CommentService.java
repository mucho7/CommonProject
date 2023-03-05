package com.function.board.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.domain.comment.Comment;
import com.function.board.domain.comment.CommentRepository;
import com.function.board.dto.comment.CommentResponseDto;
import com.function.board.dto.comment.CommentSaveRequestDto;
import com.function.board.dto.comment.CommentUpdateRequestDto;
import com.function.board.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;

	@Transactional
	public Long save(Long boardId, CommentSaveRequestDto requestDto) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 존재하지 않습니다."));

		Comment comment = Comment.builder()
			.board(board)
			.writer(requestDto.getWriter())
			.content(requestDto.getContent())
			.build();
		commentRepository.save(comment);
		return comment.getId();
	}

	public CommentResponseDto findById(Long commentId) {
		Comment entity = commentRepository.findById(commentId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 댓글이 없습니다."));
		return new CommentResponseDto(entity);
	}

	@Transactional
	public Long update(Long commentId, CommentUpdateRequestDto requestDto) {
		Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
			new ResourceNotFoundException("해당 댓글이 존재하지 않습니다."));

		comment.update(requestDto);
		return commentId;
	}

	@Transactional
	public void delete(Long commentId) {
		var comment = commentRepository.findById(commentId).orElseThrow(() ->
			new ResourceNotFoundException("해당 댓글이 존재하지 않습니다."));
		commentRepository.delete(comment);
	}
}
