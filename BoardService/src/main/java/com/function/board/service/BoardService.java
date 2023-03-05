package com.function.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.domain.comment.Comment;
import com.function.board.domain.comment.CommentRepository;
import com.function.board.dto.board.BoardDetailTransferDto;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardSearchCondition;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.dto.board.ContentComponentDto;
import com.function.board.dto.board.RefinedBoardDto;
import com.function.board.exception.InvalidInputException;
import com.function.board.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;

	@Transactional
	public Long save(BoardSaveRequestDto requestDto) {
		if(requestDto.getContent().length() > 3000) {
			throw new InvalidInputException("내용은 3000자를 넘을 수 없습니다.");
		}
		return boardRepository.save(requestDto.toEntity()).getId();
	}

	@Transactional
	public Long upload(BoardSaveRequestDto requestDto) {
		if(requestDto.getContent().length() > 3000) {
			throw new InvalidInputException("내용은 3000자를 넘을 수 없습니다.");
		}
		return boardRepository.save(requestDto.toEntity()).getId();
	}

	@Transactional(readOnly = true)
	public Page<BoardListResponseDto> paging(Pageable pageable) {
		return boardRepository.findAll(pageable)
			.map(BoardListResponseDto::new);
	}

	@Transactional(readOnly = true)
	public Page<BoardListResponseDto> searchPage(BoardSearchCondition condition, Pageable pageable) {
		return boardRepository.searchPage(condition, pageable);
	}

	@Transactional(readOnly = true)
	public List<BoardListResponseDto> findAll() {
		return boardRepository.findAll().stream()
			.map(BoardListResponseDto::new)
			.collect(Collectors.toList());
	}

	@Transactional
	public BoardDetailTransferDto findById(Long boardId, HttpServletRequest request, HttpServletResponse response, Pageable pageable) {
		Board entity = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 없습니다."));

		updateViewCheck(boardId, request, response);
		RefinedBoardDto refinedBoardDto = refineData(entity);
		Page<Comment> comments = commentRepository.findAllByBoardId(boardId, pageable);
		return new BoardDetailTransferDto(entity, refinedBoardDto, comments);
	}

	@Transactional
	public Long update(Long boardId, BoardUpdateRequestDto requestDto) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 없습니다."));

		if(requestDto.getContent().length() > 3000) {
			throw new InvalidInputException("내용은 3000자를 넘을 수 없습니다.");
		}

		board.update(requestDto);
		return boardId;
	}

	@Transactional
	public void delete(Long boardId) {
		var board = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 존재하지 않습니다."));
		boardRepository.delete(board);
	}

	@Transactional
	public void updateViewCheck(Long boardId, HttpServletRequest request, HttpServletResponse response) {
		Cookie oldCookie = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("viewCount")) {
					oldCookie = cookie;
				}
			}
		}

		if (oldCookie != null) {
			if (!oldCookie.getValue().contains("["+ boardId +"]")) {
				updateView(boardId);
				oldCookie.setValue(oldCookie.getValue() + "_[" + boardId + "]");
				oldCookie.setPath("/");
				oldCookie.setMaxAge(60 * 60 * 24);
				response.addCookie(oldCookie);
			}
		} else {
			updateView(boardId);
			Cookie newCookie = new Cookie("viewCount", "[" + boardId + "]");
			newCookie.setPath("/");
			newCookie.setMaxAge(60 * 60 * 24);
			response.addCookie(newCookie);
		}
	}

	@Transactional
	public int updateView(Long boardId) {
		return boardRepository.updateView(boardId);
	}

	@Transactional
	public RefinedBoardDto refineData(Board board) {
		String[] content = board.getContent().split("\n");

		List<ContentComponentDto> contents = new ArrayList<>();

		ContentComponentDto contentComponent;
		List<String> contentList = new ArrayList<>();

		boolean isFirst = true;

		//0-4. 검색 패턴 설정(---[숫자])
		String pattern = "^\\---\\d{1,3}";

		int startIndex = 0;
		int endIndex = 0;

		for(String c : content) {

			//1. 블록 구문 검사
			if(Pattern.matches(pattern, c)) {
				//시작과 끝 인덱스 지정
				if(isFirst) {
					startIndex = Integer.parseInt(c.replace("---", "")) - 1;
					isFirst = false;

					//저장할 내용이 있으니깐
					if(contentList.size() != 0){
						contentComponent = new ContentComponentDto();
						contentComponent.setContent(contentList);
						contentComponent.setStartIndex(-1);
						contentComponent.setEndIndex(-1);
						contents.add(contentComponent);

						contentList = new ArrayList<>();
					}
				}
				else {
					endIndex = Integer.parseInt(c.replace("---", "")) - 1;

					if(endIndex < startIndex){
						isFirst = true;
						continue;
					}

					isFirst = true;
					contentComponent = new ContentComponentDto();

					//2. 컴포넌트에 담고 리스트에 추가
					contentComponent.setContent(contentList);
					contentComponent.setStartIndex(startIndex);
					contentComponent.setEndIndex(endIndex);
					contentList = new ArrayList<>();

					//4. 리스트 추가
					contents.add(contentComponent);
				}
			}
			else {
				contentList.add(c);
			}
		}

		if(contentList.size() != 0) {
			contentComponent = new ContentComponentDto();
			contentComponent.setContent(contentList);
			contentComponent.setStartIndex(-1);
			contentComponent.setEndIndex(-1);
			contents.add(contentComponent);
		}

		return RefinedBoardDto.builder()
			.content(contents)
			.code(board.getCode())
			.build();
	}

}
