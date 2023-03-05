package com.function.board.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.function.board.client.BoardUploadServiceClient;
import com.function.board.dto.board.BoardDetailTransferDto;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardSearchCondition;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.service.BoardService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	private final BoardUploadServiceClient boardUploadServiceClient;

	@ApiOperation(value = "게시글 생성")
	@PostMapping(produces = "multipart/form-data")
	public ResponseEntity<Object> save(@RequestPart("board") BoardSaveRequestDto requestDto,
										@RequestPart("file") MultipartFile file) throws Exception {
		int boardId = boardService.upload(requestDto).intValue();
		boardUploadServiceClient.uploadFile(file, boardId);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "TEST")
	@PostMapping("/hello2")
	public String hello2(@RequestBody String test) {
		return test;
	}

	@ApiOperation(value = "게시글 목록 조회")
	@GetMapping("/list")
	public ResponseEntity<List<BoardListResponseDto>> boardList() {
		return ResponseEntity.ok(boardService.findAll());
	}

	@ApiOperation(value = "게시글 목록 페이징")
	@GetMapping()
	public ResponseEntity<Page<BoardListResponseDto>> paging(@PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		return ResponseEntity.ok(boardService.paging(pageable));
	}

	@ApiOperation(value = "{board_id}로 게시글 조회")
	@GetMapping("/{id}")
	public ResponseEntity<BoardDetailTransferDto> findById(@PathVariable("id") Long id, HttpServletRequest request, HttpServletResponse response, @PageableDefault(size=20) Pageable pageable) {
		return ResponseEntity.ok(boardService.findById(id, request, response, pageable));
	}

	@ApiOperation(value = "조건 설정 및 키워드 이용하여 게시글 검색")
	@GetMapping("/search")
	public ResponseEntity<Page<BoardListResponseDto>> searchPage(BoardSearchCondition condition, Pageable pageable) {
		return ResponseEntity.ok(boardService.searchPage(condition, pageable));
	}

	@ApiOperation(value = "게시글 수정")
	@PutMapping("/{id}")
	public ResponseEntity<Long> update(@PathVariable("id") Long id, @RequestBody BoardUpdateRequestDto requestDto) {
		return ResponseEntity.ok(boardService.update(id, requestDto));
	}

	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Long id) {
		boardService.delete(id);
	}

}
