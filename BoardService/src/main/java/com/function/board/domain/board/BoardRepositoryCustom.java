package com.function.board.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardSearchCondition;

public interface BoardRepositoryCustom {

	Page<BoardListResponseDto> searchPage(BoardSearchCondition condition, Pageable pageable);

}
