package com.function.session.api.data;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = -1952644854L;

    public static final QRoom room = new QRoom("room");

    public final StringPath content = createString("content");

    public final StringPath hostId = createString("hostId");

    public final NumberPath<Integer> hostRating = createNumber("hostRating", Integer.class);

    public final NumberPath<Integer> isLive = createNumber("isLive", Integer.class);

    public final NumberPath<Integer> max = createNumber("max", Integer.class);

    public final StringPath mode = createString("mode");

    public final NumberPath<Integer> numberUsers = createNumber("numberUsers", Integer.class);

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public final StringPath title = createString("title");

    public QRoom(String variable) {
        super(Room.class, forVariable(variable));
    }

    public QRoom(Path<? extends Room> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoom(PathMetadata metadata) {
        super(Room.class, metadata);
    }

}

