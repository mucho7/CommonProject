package com.function.session;

import org.kurento.client.KurentoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import com.function.session.kurento.CallHandler;
import com.function.session.kurento.RoomManager;
import com.function.session.kurento.UserRegistry;

@SpringBootApplication
@EnableWebSocket
public class SessionApplication implements WebSocketConfigurer {
	@Bean
	public UserRegistry registry() {
		return new UserRegistry();
	}

	@Bean
	public RoomManager roomManager() {
		return new RoomManager();
	}

	@Bean
	public CallHandler groupCallHandler() {
		return new CallHandler();
	}

	@Bean
	public KurentoClient kurentoClient() {
		// return KurentoClient.create();
		return KurentoClient.create("ws://i8a703.p.ssafy.io:8888/kurento");
		// return KurentoClient.create("ws://54.180.146.230:8888/kurento");
	}

	@Bean
	public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
		ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
		container.setMaxTextMessageBufferSize(32768);
		return container;
	}

	// @Bean
	// public ServletWebServerFactory serverFactory() {
	// 	TomcatServletWebServerFactory tomcatServletWebServerFactory
	// 		= new TomcatServletWebServerFactory();
	// 	tomcatServletWebServerFactory.addAdditionalTomcatConnectors(createStandardConnector());
	//
	// 	return tomcatServletWebServerFactory;
	// }
	//
	// private Connector createStandardConnector() {
	// 	Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
	// 	connector.setPort(8013);
	//
	// 	return connector;
	// }

	public static void main(String[] args) {
		SpringApplication.run(SessionApplication.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(groupCallHandler(), "/groupcall").setAllowedOrigins("*");
		// registry.addHandler(groupCallHandler(), "/groupcall");
	}
}
